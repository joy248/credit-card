import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchForm from "@/components/search-form"
import { searchCreditCards } from "@/lib/credit-cards"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const searchResults = await searchCreditCards(query)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">Search Results</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <SearchForm />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold">Results for "{query}"</h2>
          <p className="text-gray-600">{searchResults.length} cards found</p>
        </div>

        <Tabs defaultValue="cards">
          <TabsList className="mb-6">
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="banks">Banks</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="cards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((card) => (
                <Card key={card.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">{card.name}</h3>
                        <p className="text-gray-500">{card.bank}</p>
                      </div>
                      <Badge>{card.network}</Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Annual Fee</span>
                        <span className="font-medium">{card.annualFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Rewards Rate</span>
                        <span className="font-medium">{card.rewardsRate}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {card.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{card.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/compare?cards=${card.id}`}>Compare</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/cards/${card.slug}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {searchResults.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No cards found</h3>
                <p className="text-gray-600 mb-6">Try a different search term or browse all cards</p>
                <Button asChild>
                  <Link href="/cards">Browse All Cards</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="banks">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Bank search results would go here */}
              <div className="text-center py-12 col-span-3">
                <p className="text-gray-600">Bank search results will be displayed here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="benefits">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Benefits search results would go here */}
              <div className="text-center py-12 col-span-3">
                <p className="text-gray-600">Benefits search results will be displayed here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
