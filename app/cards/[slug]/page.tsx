import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Share2, Star, Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCreditCardBySlug, getSimilarCards } from "@/lib/credit-cards"

// Add these imports at the top
import PriceHistoryChart from "@/components/price-history-chart"
import OfferHistoryComponent from "@/components/offer-history"
import BankSpecificHighlights from "@/components/bank-specific-highlights"
import AISummaryGenerator from "@/components/ai-summary-generator"

interface CardPageProps {
  params: {
    slug: string
  }
}

export default async function CardPage({ params }: CardPageProps) {
  const card = await getCreditCardBySlug(params.slug)

  if (!card) {
    notFound()
  }

  const similarCards = await getSimilarCards(card.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/cards" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">{card.name}</h1>
            <Badge>{card.bank}</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Card Details */}
            <div className="bg-white rounded-lg border p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{card.name}</h1>
                  <p className="text-gray-600">{card.bank}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{card.rating}</span>
                    <span className="text-gray-500 ml-1">({card.reviewCount} reviews)</span>
                  </div>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-center mb-8">
                <div className="w-72 h-44 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg flex items-center justify-center text-white font-medium">
                  {card.bank} {card.name}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Annual Fee</p>
                  <p className="font-medium">{card.annualFee}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Rewards Rate</p>
                  <p className="font-medium">{card.rewardsRate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Welcome Bonus</p>
                  <p className="font-medium">{card.welcomeBonus}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">AI-Generated Summary</h3>
                <AISummaryGenerator card={card} initialSummary={card.aiSummary} />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {card.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button asChild>
                  <a href={card.applyLink} target="_blank" rel="noopener noreferrer">
                    Apply Now
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/compare?cards=${card.id}`}>Compare</Link>
                </Button>
              </div>
            </div>

            {/* Tabs for Details */}
            <Tabs defaultValue="benefits" className="bg-white rounded-lg border">
              <TabsList className="w-full border-b rounded-none p-0">
                <TabsTrigger value="benefits" className="flex-1 rounded-none py-3">
                  Benefits
                </TabsTrigger>
                <TabsTrigger value="fees" className="flex-1 rounded-none py-3">
                  Fees & Charges
                </TabsTrigger>
                <TabsTrigger value="eligibility" className="flex-1 rounded-none py-3">
                  Eligibility
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 rounded-none py-3">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="benefits" className="p-6">
                <h3 className="text-lg font-medium mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {card.benefits.map((benefit, index) => (
                    <li key={index} className="flex">
                      <div className="mr-3 mt-1 text-green-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>{benefit}</div>
                    </li>
                  ))}
                </ul>

                {card.benefitCategories && (
                  <div className="mt-8 space-y-6">
                    {Object.entries(card.benefitCategories).map(([category, benefits]) => (
                      <div key={category}>
                        <h4 className="text-md font-medium mb-3">{category}</h4>
                        <ul className="space-y-2">
                          {benefits.map((benefit, index) => (
                            <li key={index} className="flex">
                              <div className="mr-3 mt-1 text-purple-500">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                              <div className="text-gray-700">{benefit}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="fees" className="p-6">
                <h3 className="text-lg font-medium mb-4">Fees & Charges</h3>
                <div className="space-y-4">
                  {Object.entries(card.fees).map(([fee, value]) => (
                    <div key={fee} className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-700">{fee}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="eligibility" className="p-6">
                <h3 className="text-lg font-medium mb-4">Eligibility Criteria</h3>
                <ul className="space-y-3">
                  {card.eligibility.map((criterion, index) => (
                    <li key={index} className="flex">
                      <div className="mr-3 mt-1 text-blue-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>{criterion}</div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    Final approval is subject to the bank's discretion and may require additional documentation.
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">User Reviews</h3>
                  <Button>Write a Review</Button>
                </div>

                <div className="space-y-6">
                  {card.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600">
                            {review.user.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{review.user}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            {/* Similar Cards */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <h3 className="font-medium mb-4">Similar Cards</h3>
              <div className="space-y-4">
                {similarCards.map((similarCard) => (
                  <Link key={similarCard.id} href={`/cards/${similarCard.slug}`} className="block">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{similarCard.name}</h4>
                            <p className="text-sm text-gray-500">{similarCard.bank}</p>
                          </div>
                          <Badge variant="outline">{similarCard.network}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Price History */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <PriceHistoryChart priceHistory={card.priceHistory || []} cardName={card.name} />
            </div>

            {/* Add the offer history section: */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <OfferHistoryComponent offerHistory={card.offerHistory || []} cardName={card.name} />
            </div>

            {/* Bank Specific Benefits */}
            <div className="bg-white rounded-lg border p-6">
              <BankSpecificHighlights bankSpecificHighlights={card.bankSpecificHighlights} bankName={card.bank} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
