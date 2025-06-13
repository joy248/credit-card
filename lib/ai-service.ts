import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { searchCreditCards } from "./credit-cards"
import type { CreditCard, ChatResponse, PriceHistory } from "@/types/credit-card"

// Hardcode the API key directly for immediate use
// In production, this should be an environment variable
const API_KEY =
  "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"

export async function processChatQuery(query: string): Promise<ChatResponse> {
  try {
    // First, search for relevant cards based on the query
    const relevantCards = await searchCreditCards(query)

    // Use AI to generate a response and potentially filter cards further
    const { text } = await generateText({
      model: openai("gpt-4o-mini", { apiKey: API_KEY }),
      system: `You are a helpful credit card advisor for Indian banks. You help users find the best credit cards based on their needs.

Available credit cards data:
${JSON.stringify(relevantCards.slice(0, 10), null, 2)}

Guidelines:
- Provide helpful, accurate information about credit cards
- Recommend specific cards when appropriate
- Explain benefits clearly
- Consider user's spending patterns and preferences
- Be concise but informative
- Focus on Indian credit card market
- Mention specific card names when recommending

If the user asks for comparisons, provide detailed comparisons.
If they ask about specific benefits like lounge access, fuel surcharge waiver, etc., filter and recommend accordingly.`,
      prompt: `User query: "${query}"
      
Please provide a helpful response about credit cards. If specific cards match the user's requirements, mention them by name.`,
    })

    // Determine which cards to return based on the query
    let cardsToReturn: CreditCard[] = []

    // Simple keyword matching to determine relevant cards
    const queryLower = query.toLowerCase()

    if (queryLower.includes("lounge") || queryLower.includes("airport")) {
      cardsToReturn = relevantCards
        .filter(
          (card) =>
            card.tags.includes("Airport Lounge") ||
            card.benefits?.some((benefit) => benefit.toLowerCase().includes("lounge")),
        )
        .slice(0, 3)
    } else if (queryLower.includes("fuel") || queryLower.includes("petrol")) {
      cardsToReturn = relevantCards
        .filter(
          (card) =>
            card.tags.includes("Fuel") || card.benefits?.some((benefit) => benefit.toLowerCase().includes("fuel")),
        )
        .slice(0, 3)
    } else if (queryLower.includes("cashback")) {
      cardsToReturn = relevantCards
        .filter((card) => card.tags.includes("Cashback") || card.rewardsRate.toLowerCase().includes("cashback"))
        .slice(0, 3)
    } else if (queryLower.includes("no annual fee") || queryLower.includes("free")) {
      cardsToReturn = relevantCards
        .filter((card) => card.tags.includes("No Annual Fee") || card.annualFee.toLowerCase().includes("waived"))
        .slice(0, 3)
    } else if (queryLower.includes("first time") || queryLower.includes("beginner")) {
      cardsToReturn = relevantCards
        .filter(
          (card) =>
            card.tags.includes("Entry Level") ||
            card.eligibility?.some((criteria) => criteria.toLowerCase().includes("first-time")),
        )
        .slice(0, 3)
    } else if (queryLower.includes("travel")) {
      cardsToReturn = relevantCards.filter((card) => card.tags.includes("Travel")).slice(0, 3)
    } else if (queryLower.includes("premium") || queryLower.includes("luxury")) {
      cardsToReturn = relevantCards.filter((card) => card.tags.includes("Premium")).slice(0, 3)
    } else if (queryLower.includes("compare") || queryLower.includes("vs")) {
      // For comparison queries, return the most relevant cards
      cardsToReturn = relevantCards.slice(0, 3)
    } else {
      // For general queries, return top relevant cards
      cardsToReturn = relevantCards.slice(0, 3)
    }

    return {
      text,
      cards: cardsToReturn,
    }
  } catch (error) {
    console.error("Error processing chat query:", error)
    throw new Error("Failed to process your request. Please try again.")
  }
}

export async function generateCardSummary(card: CreditCard): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini", { apiKey: API_KEY }),
      system: `You are a credit card expert specializing in Indian banking products. Generate comprehensive, helpful summaries that highlight key benefits, ideal user profiles, and unique selling points.`,
      prompt: `Generate a detailed 3-4 sentence summary for this Indian credit card:
      
Card: ${card.name} by ${card.bank}
Annual Fee: ${card.annualFee}
Rewards: ${card.rewardsRate}
Welcome Bonus: ${card.welcomeBonus}
Key Benefits: ${card.benefits?.join(", ")}
Tags: ${card.tags.join(", ")}
Bank-Specific Benefits: ${card.bankSpecificBenefits?.join(", ")}

Recent Price Changes: ${
        card.priceHistory
          ? `Annual fee was ${card.priceHistory[card.priceHistory.length - 1]?.annualFee} and is now ${card.annualFee}`
          : "No recent changes"
      }

Focus on:
1. Who this card is best suited for (income level, lifestyle, spending patterns)
2. Key advantages and standout benefits
3. Value proposition compared to competitors
4. Any recent changes or improvements
5. Bank ecosystem benefits

Make it engaging and informative for potential applicants.`,
    })

    return text
  } catch (error) {
    console.error("Error generating card summary:", error)
    return `The ${card.name} by ${card.bank} offers ${card.rewardsRate} rewards with an annual fee of ${card.annualFee}. This card is ideal for users seeking ${card.tags.slice(0, 2).join(" and ").toLowerCase()} benefits, with standout features including ${card.benefits?.slice(0, 2).join(" and ")}. ${card.bank} customers enjoy additional ecosystem benefits and preferential treatment across banking services.`
  }
}

// Add a new function to generate price trend analysis
export async function generatePriceTrendAnalysis(priceHistory: PriceHistory[], cardName: string): Promise<string> {
  if (!priceHistory || priceHistory.length < 2) {
    return "Insufficient price history data for trend analysis."
  }

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini", { apiKey: API_KEY }),
      system: `You are a financial analyst specializing in credit card pricing trends. Analyze price history data and provide insights.`,
      prompt: `Analyze the price history for ${cardName} and provide insights:

Price History:
${priceHistory.map((entry) => `${entry.date}: ${entry.annualFee}, Welcome Bonus: ${entry.welcomeBonus}, Changes: ${entry.changes.join(", ")}`).join("\n")}

Provide a 2-3 sentence analysis covering:
1. Overall pricing trend (increasing, decreasing, stable)
2. Value proposition changes
3. Recommendations for potential applicants regarding timing

Be concise and actionable.`,
    })

    return text
  } catch (error) {
    console.error("Error generating price trend analysis:", error)
    return "Unable to generate price trend analysis at this time."
  }
}
