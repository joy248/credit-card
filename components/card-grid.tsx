import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getCreditCards } from "@/lib/credit-cards"

interface CardGridProps {
  filter?: Record<string, any>
  limit?: number
}

export default async function CardGrid({ filter = {}, limit }: CardGridProps) {
  const cards = await getCreditCards(filter, limit)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card key={card.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{card.name}</CardTitle>
                <CardDescription>{card.bank}</CardDescription>
              </div>
              <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center">{card.network}</div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-4">
              <div className="h-40 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-3/4 h-44 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl transform rotate-6 shadow-lg flex items-center justify-center text-white font-medium">
                  {card.bank} {card.name}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Annual Fee</span>
                  <span className="font-medium">{card.annualFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rewards Rate</span>
                  <span className="font-medium">{card.rewardsRate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Welcome Bonus</span>
                  <span className="font-medium">{card.welcomeBonus}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/compare?cards=${card.id}`}>Compare</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/cards/${card.slug}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
