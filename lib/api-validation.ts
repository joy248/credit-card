// API validation utilities

export function validateOpenAIKey(apiKey: string): boolean {
  if (!apiKey) {
    console.error("OpenAI API key is missing")
    return false
  }

  if (!apiKey.startsWith("sk-")) {
    console.error("Invalid OpenAI API key format")
    return false
  }

  return true
}

export function getOpenAIKey(): string {
  const apiKey =
    process.env.OPENAI_API_KEY ||
    "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"

  if (!validateOpenAIKey(apiKey)) {
    throw new Error("Invalid or missing OpenAI API key")
  }

  return apiKey
}
