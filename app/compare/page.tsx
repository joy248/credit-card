import Link from "next/link"
import { ArrowLeft, Plus, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCardsByIds, getAllCreditCards } from "@/lib/credit-cards"

interface ComparePageProps {
  searchParams: {
    cards?: string
  }
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const cardIds = searchParams.cards ? searchParams.cards.split(",") : []
  const cards = await getCardsByIds(cardIds)
  const allCards = await getAllCreditCards()

  // Get unique categories for comparison
  const benefitCategories = new Set<string>()
  const feeCategories = new Set<string>()

  cards.forEach((card) => {
    if (card.benefitCategories) {
      Object.keys(card.benefitCategories).forEach((category) => {
        benefitCategories.add(category)
      })
    }

    Object.keys(card.fees).forEach((fee) => {
      feeCategories.add(fee)
    })
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/cards" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">Compare Credit Cards</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <Card key={card.id} className="relative">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-full h-40 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-4 flex items-center justify-center text-white font-medium">
                    {card.bank} {card.name}
                  </div>
                  <h3 className="font-medium text-center">{card.name}</h3>
                  <p className="text-gray-500 text-center">{card.bank}</p>
                  <Badge className="mt-2">{card.network}</Badge>

                  <div className="mt-4 w-full">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Annual Fee</span>
                      <span className="font-medium">{card.annualFee}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Rewards</span>
                      <span className="font-medium">{card.rewardsRate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Welcome Bonus</span>
                      <span className="font-medium">{card.welcomeBonus}</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link href={`/cards/${card.slug}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {cards.length < 4 && (
            <Card className="border-dashed">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <Button variant="outline" size="lg" className="h-16 w-16 rounded-full mb-4">
                  <Plus className="h-6 w-6" />
                </Button>
                <p className="text-gray-500 text-center">Add another card to compare</p>
                <div className="mt-4 w-full">
                  <select className="w-full p-2 border rounded">
                    <option value="">Select a card...</option>
                    {allCards
                      .filter((card) => !cardIds.includes(card.id))
                      .map((card) => (
                        <option key={card.id} value={card.id}>
                          {card.bank} {card.name}
                        </option>
                      ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="bg-white rounded-lg border">
          <Tabs defaultValue="summary">
            <TabsList className="w-full border-b rounded-none p-0">
              <TabsTrigger value="summary" className="flex-1 rounded-none py-3">
                Summary
              </TabsTrigger>
              <TabsTrigger value="benefits" className="flex-1 rounded-none py-3">
                Benefits
              </TabsTrigger>
              <TabsTrigger value="fees" className="flex-1 rounded-none py-3">
                Fees & Charges
              </TabsTrigger>
              <TabsTrigger value="eligibility" className="flex-1 rounded-none py-3">
                Eligibility
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="p-6">
              <h3 className="text-lg font-medium mb-6">Summary Comparison</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">AI-Generated Comparison</h4>
                  <p className="text-gray-700">
                    {cards.length > 1
                      ? `When comparing ${cards.map((c) => c.name).join(" and ")}, the ${cards[0].name} offers better rewards for travel with ${cards[0].rewardsRate} points, while the ${cards[1].name} has lower annual fees at ${cards[1].annualFee}. The ${cards[0].name} provides superior lounge access with unlimited visits, whereas the ${cards[1].name} excels in cashback on everyday purchases.`
                      : "Select at least two cards to see an AI-generated comparison."}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 border">Feature</th>
                        {cards.map((card) => (
                          <th key={card.id} className="text-left p-3 border">
                            {card.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border font-medium">Annual Fee</td>
                        {cards.map((card) => (
                          <td key={card.id} className="p-3 border">
                            {card.annualFee}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Rewards Rate</td>
                        {cards.map((card) => (
                          <td key={card.id} className="p-3 border">
                            {card.rewardsRate}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Welcome Bonus</td>
                        {cards.map((card) => (
                          <td key={card.id} className="p-3 border">
                            {card.welcomeBonus}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Interest Rate</td>
                        {cards.map((card) => (
                          <td key={card.id} className="p-3 border">
                            {card.fees["Interest Rate"]}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Foreign Transaction Fee</td>
                        {cards.map((card) => (
                          <td key={card.id} className="p-3 border">
                            {card.fees["Foreign Transaction Fee"]}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Airport Lounge Access</td>
                        {cards.map((card) => (
                          <td key={card.id} className="p-3 border">
                            {card.tags.includes("Airport Lounge") ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-red-500" />
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Fuel Surcharge Waiver</td>
                        {cards.map((card) => (
                          <td key={card.id} className="p-3 border">
                            {card.tags.includes("Fuel") ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-red-500" />
                            )}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="p-6">
              <h3 className="text-lg font-medium mb-6">Benefits Comparison</h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 border">Benefit Category</th>
                      {cards.map((card) => (
                        <th key={card.id} className="text-left p-3 border">
                          {card.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(benefitCategories).map((category) => (
                      <tr key={category}>
                        <td className="p-3 border font-medium">{category}</td>
                        {cards.map((card) => (
                          <td key={card.id} className="p-3 border">
                            {card.benefitCategories && card.benefitCategories[category] ? (
                              <ul className="list-disc pl-5 space-y-1">
                                {card.benefitCategories[category].map((benefit, i) => (
                                  <li key={i} className="text-sm">
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-gray-400">Not available</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="fees" className="p-6">
              <h3 className="text-lg font-medium mb-6">Fees & Charges Comparison</h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 border">Fee Type</th>
                      {cards.map((card) => (
                        <th key={card.id} className="text-left p-3 border">
                          {card.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(feeCategories).map((fee) => (
                      <tr key={fee}>
                        <td className="p-3 border font-medium">{fee}</td>
                        {cards.map((card) => (
                          <td key={card.id} className="p-3 border">
                            {card.fees[fee] || <span className="text-gray-400">Not specified</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="eligibility" className="p-6">
              <h3 className="text-lg font-medium mb-6">Eligibility Comparison</h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 border">Card</th>
                      <th className="text-left p-3 border">Eligibility Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cards.map((card) => (
                      <tr key={card.id}>
                        <td className="p-3 border font-medium">{card.name}</td>
                        <td className="p-3 border">
                          <ul className="list-disc pl-5 space-y-1">
                            {card.eligibility.map((criterion, i) => (
                              <li key={i}>{criterion}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
