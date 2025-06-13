import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { card } = await request.json()

    if (!card) {
      return NextResponse.json({ error: "Card data is required" }, { status: 400 })
    }

    // For now, let's skip the AI part and return a mock response
    // This will help us test if the API route itself is working
    const mockSummary = `The ${card.name} by ${card.bank} offers ${card.rewardsRate} rewards with an annual fee of ${card.annualFee}. This card is ideal for users seeking ${card.tags.slice(0, 2).join(" and ").toLowerCase()} benefits, with standout features including ${card.benefits?.slice(0, 2).join(" and ")}. ${card.bank} customers enjoy additional ecosystem benefits and preferential treatment across banking services.`

    return NextResponse.json({ summary: mockSummary })
  } catch (error) {
    console.error("Error generating summary:", error)
    return NextResponse.json(
      {
        error: "Failed to generate summary",
        summary:
          "This credit card offers a competitive rewards program and benefits package tailored to its target audience. With its annual fee structure and welcome bonus, it provides good value for the right user profile. Consider your spending habits and lifestyle needs when evaluating this card.",
      },
      { status: 200 }, // Return 200 even for errors to avoid client-side error handling
    )
  }
}
