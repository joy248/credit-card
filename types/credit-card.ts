export interface CreditCard {
  id: string
  name: string
  bank: string
  slug: string
  network: string
  annualFee: string
  rewardsRate: string
  welcomeBonus: string
  tags: string[]
  summary?: string
  aiSummary?: string
  rating?: number
  reviewCount?: number
  benefits?: string[]
  benefitCategories?: Record<string, string[]>
  fees?: Record<string, string>
  eligibility?: string[]
  bankSpecificBenefits?: string[]
  reviews?: {
    id: string
    user: string
    rating: number
    date: string
    comment: string
  }[]
  applyLink?: string
}

export interface ChatResponse {
  text: string
  cards?: CreditCard[]
}
