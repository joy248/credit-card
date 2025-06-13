"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function APITest() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const testAPI = async () => {
    setIsLoading(true)
    setError("")
    setResult("")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "What are the best travel credit cards in India?",
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data.text || "API test successful!")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>API Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testAPI} disabled={isLoading} className="w-full">
          {isLoading ? "Testing..." : "Test OpenAI API"}
        </Button>

        {result && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-800">{result}</p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-800">Error: {error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
