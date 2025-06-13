import { NextResponse } from "next/server"
import { searchCreditCards } from "@/lib/credit-cards"

// Hardcode the API key directly for immediate use
// In production, this should be an environment variable
const API_KEY =
  "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"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required and must be a string" }, { status: 400 })
    }

    // First, search for relevant cards based on the query
    const relevantCards = await searchCreditCards(message)

    // For now, let's skip the AI part and return a mock response
    // This will help us test if the API route itself is working
    const mockResponse = {
      text: `Here's some information about credit cards that match your query: "${message}". I've found ${relevantCards.length} cards that might be relevant for you.`,
      cards: relevantCards.slice(0, 3),
    }

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json(
      {
        error: "Failed to process your request",
        text: "I'm sorry, I couldn't process your request at the moment. Please try again later.",
        cards: [],
      },
      { status: 200 }, // Return 200 even for errors to avoid client-side error handling
    )
  }
}
