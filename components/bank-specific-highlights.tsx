"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Star, Shield, Zap } from "lucide-react"
import type { CreditCard } from "@/lib/credit-cards"

interface BankSpecificHighlightsProps {
  bankSpecificHighlights: CreditCard["bankSpecificHighlights"]
  bankName: string
}

export default function BankSpecificHighlights({ bankSpecificHighlights, bankName }: BankSpecificHighlightsProps) {
  if (!bankSpecificHighlights || bankSpecificHighlights.length === 0) {
    return null
  }

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes("banking")) return <Building2 className="h-5 w-5" />
    if (category.toLowerCase().includes("premium") || category.toLowerCase().includes("private"))
      return <Star className="h-5 w-5" />
    if (category.toLowerCase().includes("digital")) return <Zap className="h-5 w-5" />
    return <Shield className="h-5 w-5" />
  }

  const getCategoryColor = (category: string) => {
    if (category.toLowerCase().includes("banking")) return "from-blue-500 to-blue-600"
    if (category.toLowerCase().includes("premium") || category.toLowerCase().includes("private"))
      return "from-purple-500 to-purple-600"
    if (category.toLowerCase().includes("digital")) return "from-green-500 to-green-600"
    return "from-gray-500 to-gray-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          {bankName} Exclusive Benefits
        </CardTitle>
        <p className="text-sm text-gray-600">Special privileges and benefits exclusive to {bankName} customers</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {bankSpecificHighlights.map((highlight, index) => (
            <div key={index} className="relative">
              <div
                className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${getCategoryColor(highlight.category)} rounded-full`}
              ></div>

              <div className="pl-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${getCategoryColor(highlight.category)} text-white`}
                  >
                    {getCategoryIcon(highlight.category)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{highlight.category}</h4>
                    <p className="text-sm text-gray-600">{highlight.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {highlight.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
          <h4 className="font-medium text-purple-900 mb-2">Why Choose {bankName}?</h4>
          <p className="text-sm text-purple-800">
            {bankName} offers a comprehensive ecosystem of financial services, making it easier to manage all your
            banking needs in one place while enjoying exclusive benefits and preferential treatment.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
