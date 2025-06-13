"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, RefreshCw } from "lucide-react"
import type { CreditCard } from "@/lib/credit-cards"

interface AISummaryGeneratorProps {
  card: CreditCard
  initialSummary?: string
}

export default function AISummaryGenerator({ card, initialSummary }: AISummaryGeneratorProps) {
  const [summary, setSummary] = useState(initialSummary || card.aiSummary || "")
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null)

  const generateNewSummary = async () => {
    setIsGenerating(true)
    try {
      // Use API endpoint instead of direct function call
      const response = await fetch("/api/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ card }),
      })

      const data = await response.json()
      setSummary(data.summary)
      setLastGenerated(new Date())
    } catch (error) {
      console.error("Failed to generate summary:", error)
      // Use a fallback summary if API fails
      setSummary(
        `The ${card.name} by ${card.bank} offers ${card.rewardsRate} rewards with an annual fee of ${card.annualFee}. This card is ideal for users seeking ${card.tags.slice(0, 2).join(" and ").toLowerCase()} benefits, with standout features including ${card.benefits?.slice(0, 2).join(" and ")}. ${card.bank} customers enjoy additional ecosystem benefits and preferential treatment across banking services.`,
      )
      setLastGenerated(new Date())
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (!summary && !isGenerating) {
      generateNewSummary()
    }
  }, [])

  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center text-purple-900">
            <Sparkles className="h-5 w-5 mr-2" />
            AI-Generated Summary
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={generateNewSummary}
            disabled={isGenerating}
            className="border-purple-200 hover:bg-purple-100"
          >
            {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="flex items-center space-x-2 text-purple-700">
            <div className="animate-pulse flex space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-sm">Generating personalized summary...</span>
          </div>
        ) : (
          <div>
            <p className="text-gray-800 leading-relaxed">{summary}</p>
            {lastGenerated && (
              <p className="text-xs text-purple-600 mt-3">Generated {lastGenerated.toLocaleString()}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
