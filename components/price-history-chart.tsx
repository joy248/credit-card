"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { PriceHistory } from "@/lib/credit-cards"

interface PriceHistoryChartProps {
  priceHistory: PriceHistory[]
  cardName: string
}

export default function PriceHistoryChart({ priceHistory, cardName }: PriceHistoryChartProps) {
  if (!priceHistory || priceHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No price history available</p>
        </CardContent>
      </Card>
    )
  }

  const sortedHistory = [...priceHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getTrendIcon = (current: PriceHistory, previous: PriceHistory) => {
    const currentFee = extractFeeAmount(current.annualFee)
    const previousFee = extractFeeAmount(previous.annualFee)

    if (currentFee > previousFee) return <TrendingUp className="h-4 w-4 text-red-500" />
    if (currentFee < previousFee) return <TrendingDown className="h-4 w-4 text-green-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const extractFeeAmount = (feeString: string): number => {
    const match = feeString.match(/₹([\d,]+)/)
    return match ? Number.parseInt(match[1].replace(/,/g, "")) : 0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Price & Offer History</CardTitle>
        <p className="text-sm text-gray-600">Track changes in annual fees and welcome bonuses over time</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedHistory.map((entry, index) => (
            <div key={entry.date} className="border-l-2 border-gray-200 pl-4 pb-4 relative">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-white border-2 border-purple-500 rounded-full"></div>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">
                    {new Date(entry.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {index < sortedHistory.length - 1 && getTrendIcon(entry, sortedHistory[index + 1])}
                </div>
                {index === 0 && <Badge variant="secondary">Current</Badge>}
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Annual Fee: </span>
                  <span className="font-medium">{entry.annualFee}</span>
                </div>
                <div>
                  <span className="text-gray-600">Welcome Bonus: </span>
                  <span className="font-medium">{entry.welcomeBonus}</span>
                </div>

                {entry.changes && entry.changes.length > 0 && (
                  <div className="mt-2">
                    <span className="text-gray-600 text-xs">Changes:</span>
                    <ul className="list-disc list-inside text-xs text-gray-700 mt-1">
                      {entry.changes.map((change, changeIndex) => (
                        <li key={changeIndex}>{change}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Price Trend Analysis</h4>
          <p className="text-xs text-gray-700">
            {sortedHistory.length > 1
              ? `Over the past ${Math.round((new Date(sortedHistory[0].date).getTime() - new Date(sortedHistory[sortedHistory.length - 1].date).getTime()) / (1000 * 60 * 60 * 24 * 30))} months, 
              the annual fee has ${
                extractFeeAmount(sortedHistory[0].annualFee) >
                extractFeeAmount(sortedHistory[sortedHistory.length - 1].annualFee)
                  ? "increased"
                  : extractFeeAmount(sortedHistory[0].annualFee) <
                      extractFeeAmount(sortedHistory[sortedHistory.length - 1].annualFee)
                    ? "decreased"
                    : "remained stable"
              }.`
              : "Insufficient data for trend analysis."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
