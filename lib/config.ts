// Configuration for the credit card comparison app

export const config = {
  openai: {
    apiKey:
      process.env.OPENAI_API_KEY ||
      "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",
  },
  app: {
    name: "CardCompare",
    description: "Find and compare the best credit cards across major Indian banks",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  features: {
    aiChat: true,
    cardComparison: true,
    priceHistory: true,
    userReviews: true,
  },
}

export default config
