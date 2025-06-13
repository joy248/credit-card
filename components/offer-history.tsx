"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Gift, Percent, CreditCard, Star } from "lucide-react"
import type { OfferHistory } from "@/lib/credit-cards"

interface OfferHistoryProps {
  offerHistory: OfferHistory[]
  cardName: string
}

export default function OfferHistoryComponent({ offerHistory, cardName }: OfferHistoryProps) {
  if (!offerHistory || offerHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Special Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No special offers available</p>
        </CardContent>
      </Card>
    )
  }

  const getOfferIcon = (category: string) => {
    switch (category) {
      case "welcome-bonus":
        return <Gift className="h-4 w-4" />
      case "cashback":
        return <Percent className="h-4 w-4" />
      case "rewards":
        return <Star className="h-4 w-4" />
      case "fee-waiver":
        return <CreditCard className="h-4 w-4" />
      default:
        return <Gift className="h-4 w-4" />
    }
  }

  const getOfferColor = (category: string) => {
    switch (category) {
      case "welcome-bonus":
        return "bg-green-100 text-green-800"
      case "cashback":
        return "bg-blue-100 text-blue-800"
      case "rewards":
        return "bg-purple-100 text-purple-800"
      case "fee-waiver":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const activeOffers = offerHistory.filter((offer) => offer.isActive)
  const pastOffers = offerHistory.filter((offer) => !offer.isActive)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Special Offers & Promotions</CardTitle>
        <p className="text-sm text-gray-600">Current and past promotional offers for {cardName}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Active Offers */}
          {activeOffers.length > 0 && (
            <div>
              <h4 className="font-medium text-green-700 mb-3 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Active Offers ({activeOffers.length})
              </h4>
              <div className="space-y-3">
                {activeOffers.map((offer) => (
                  <div key={offer.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`p-1 rounded ${getOfferColor(offer.category)}`}>
                          {getOfferIcon(offer.category)}
                        </div>
                        <h5 className="font-medium">{offer.title}</h5>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{offer.description}</p>
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Valid until {new Date(offer.validTo).toLocaleDateString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past Offers */}
          {pastOffers.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Past Offers ({pastOffers.length})
              </h4>
              <div className="space-y-3">
                {pastOffers.slice(0, 3).map((offer) => (
                  <div key={offer.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`p-1 rounded ${getOfferColor(offer.category)} opacity-60`}>
                          {getOfferIcon(offer.category)}
                        </div>
                        <h5 className="font-medium text-gray-700">{offer.title}</h5>
                      </div>
                      <Badge variant="outline">Expired</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {new Date(offer.validFrom).toLocaleDateString("en-IN")} -{" "}
                        {new Date(offer.validTo).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
                {pastOffers.length > 3 && (
                  <p className="text-sm text-gray-500 text-center">+{pastOffers.length - 3} more past offers</p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
