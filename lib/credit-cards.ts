// Mock credit card data for the application
// In a real application, this would be fetched from a database or API

// Add these interfaces at the top after the existing CreditCard interface
export interface PriceHistory {
  date: string
  annualFee: string
  welcomeBonus: string
  changes: string[]
}

export interface OfferHistory {
  id: string
  title: string
  description: string
  validFrom: string
  validTo: string
  isActive: boolean
  category: "welcome-bonus" | "cashback" | "rewards" | "fee-waiver" | "special-offer"
}

// Update the CreditCard interface to include new fields
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
  // New fields for bonus features
  priceHistory?: PriceHistory[]
  offerHistory?: OfferHistory[]
  lastUpdated?: string
  bankSpecificHighlights?: {
    category: string
    benefits: string[]
    description: string
  }[]
}

const creditCards: CreditCard[] = [
  {
    id: "hdfc-regalia",
    name: "Regalia Credit Card",
    bank: "HDFC Bank",
    slug: "hdfc-regalia",
    network: "Visa",
    annualFee: "₹2,500 (Waived on spending ₹3,00,000/year)",
    rewardsRate: "4 points per ₹150 spent",
    welcomeBonus: "5,000 reward points on first transaction",
    tags: ["Travel", "Airport Lounge", "Dining", "Premium"],
    aiSummary:
      "The HDFC Regalia is a premium travel credit card offering complimentary airport lounge access worldwide, strong reward rates on travel and dining, and comprehensive travel insurance. It's ideal for frequent travelers who can easily meet the annual spend requirement to waive the annual fee.",
    rating: 4.5,
    reviewCount: 1245,
    lastUpdated: "2025-01-13",
    priceHistory: [
      {
        date: "2025-01-01",
        annualFee: "₹2,500 (Waived on spending ₹3,00,000/year)",
        welcomeBonus: "5,000 reward points on first transaction",
        changes: ["Current pricing structure"],
      },
      {
        date: "2024-07-01",
        annualFee: "₹2,500 (Waived on spending ₹2,50,000/year)",
        welcomeBonus: "3,000 reward points on first transaction",
        changes: ["Increased spend requirement for fee waiver", "Enhanced welcome bonus"],
      },
      {
        date: "2024-01-01",
        annualFee: "₹2,000 (Waived on spending ₹2,50,000/year)",
        welcomeBonus: "3,000 reward points on first transaction",
        changes: ["Annual fee increased by ₹500"],
      },
    ],
    offerHistory: [
      {
        id: "hdfc-regalia-offer-1",
        title: "New Year Special: Double Welcome Bonus",
        description: "Get 10,000 reward points instead of 5,000 on your first transaction",
        validFrom: "2025-01-01",
        validTo: "2025-01-31",
        isActive: true,
        category: "welcome-bonus",
      },
      {
        id: "hdfc-regalia-offer-2",
        title: "Festive Season: Extra Lounge Visits",
        description: "Get 4 additional complimentary lounge visits during festive season",
        validFrom: "2024-10-01",
        validTo: "2024-11-30",
        isActive: false,
        category: "special-offer",
      },
    ],
    bankSpecificHighlights: [
      {
        category: "HDFC Bank Ecosystem",
        benefits: [
          "Priority customer service with dedicated relationship manager",
          "Preferential rates on home loans (0.25% discount)",
          "Free HDFC Bank Preferred account with higher transaction limits",
          "Complimentary demat account with reduced brokerage",
        ],
        description: "Exclusive benefits for HDFC Bank's premium banking customers",
      },
      {
        category: "Digital Banking",
        benefits: [
          "Enhanced mobile banking features",
          "Priority support through HDFC Bank app",
          "Instant credit limit enhancement online",
          "Real-time spend analytics and budgeting tools",
        ],
        description: "Advanced digital banking features for tech-savvy users",
      },
    ],
    // ... rest of the existing fields remain the same
    benefits: [
      "Complimentary airport lounge access (domestic & international)",
      "1% fuel surcharge waiver at all fuel stations",
      "2X reward points on weekend dining",
      "Milestone benefits up to 10,000 bonus points",
      "Comprehensive travel insurance coverage",
    ],
    benefitCategories: {
      Travel: [
        "Complimentary airport lounge access (8 visits per year)",
        "Travel concierge services",
        "Comprehensive travel insurance up to ₹50 lakhs",
        "Foreign currency markup fee of 2% (lower than standard)",
      ],
      Dining: [
        "2X reward points on weekend dining",
        "Up to 25% discount at partner restaurants",
        "Complimentary vouchers worth ₹1,000 annually",
      ],
      Shopping: [
        "Exclusive offers on premium brands",
        "Extended warranty on purchases",
        "Purchase protection insurance",
      ],
    },
    fees: {
      "Annual Fee": "₹2,500 (Waived on spending ₹3,00,000/year)",
      "Interest Rate": "3.49% per month (41.88% p.a.)",
      "Cash Advance Fee": "2.5% or ₹500, whichever is higher",
      "Late Payment Fee": "₹750 for outstanding up to ₹10,000, ₹950 beyond",
      "Foreign Transaction Fee": "2% of transaction amount",
      "Card Replacement Fee": "₹200",
    },
    eligibility: [
      "Age: 21-65 years",
      "Minimum annual income: ₹6,00,000",
      "Good credit score (750+)",
      "Salaried or self-employed individuals",
      "Existing HDFC Bank relationship preferred",
    ],
    bankSpecificBenefits: [
      "Priority customer service",
      "Preferential rates on HDFC Bank loans",
      "Complimentary HDFC Bank account maintenance",
      "Access to HDFC Bank investment products",
    ],
    reviews: [
      {
        id: "1",
        user: "Rajesh Kumar",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Excellent card for travel. The lounge access is fantastic and the reward points add up quickly. Customer service is responsive.",
      },
      {
        id: "2",
        user: "Priya Sharma",
        rating: 4,
        date: "1 month ago",
        comment:
          "Good rewards on dining and travel. The annual fee waiver is achievable if you use the card regularly. Travel insurance is comprehensive.",
      },
    ],
    applyLink: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia-credit-card",
  },
  // Add similar enhanced data for other cards...
  {
    id: "axis-magnus",
    name: "Magnus Credit Card",
    bank: "Axis Bank",
    slug: "axis-magnus",
    network: "Mastercard",
    annualFee: "₹12,500 (Waived on spending ₹25,00,000/year)",
    rewardsRate: "12 Edge Miles per ₹200 spent",
    welcomeBonus: "25,000 Edge Miles on spending ₹1,50,000 in first 45 days",
    tags: ["Premium", "Travel", "Airport Lounge", "Golf", "Concierge"],
    aiSummary:
      "The Axis Magnus is a super-premium credit card designed for high-net-worth individuals. It offers exceptional travel benefits including unlimited lounge access, golf privileges, and a dedicated concierge service. The high annual fee is justified by premium benefits and accelerated rewards.",
    rating: 4.7,
    reviewCount: 856,
    lastUpdated: "2025-01-13",
    priceHistory: [
      {
        date: "2025-01-01",
        annualFee: "₹12,500 (Waived on spending ₹25,00,000/year)",
        welcomeBonus: "25,000 Edge Miles on spending ₹1,50,000 in first 45 days",
        changes: ["Current pricing structure"],
      },
      {
        date: "2024-04-01",
        annualFee: "₹12,500 (Waived on spending ₹15,00,000/year)",
        welcomeBonus: "25,000 Edge Miles on spending ₹1,50,000 in first 45 days",
        changes: [
          "Increased spend requirement for fee waiver from ₹15L to ₹25L",
          "Enhanced benefits to justify higher threshold",
        ],
      },
      {
        date: "2023-10-01",
        annualFee: "₹10,000 (Waived on spending ₹15,00,000/year)",
        welcomeBonus: "20,000 Edge Miles on spending ₹1,00,000 in first 45 days",
        changes: ["Annual fee increased by ₹2,500", "Welcome bonus enhanced"],
      },
    ],
    offerHistory: [
      {
        id: "axis-magnus-offer-1",
        title: "Premium Launch: Enhanced Golf Benefits",
        description: "Get 8 complimentary golf games per month instead of 4 for first 6 months",
        validFrom: "2025-01-01",
        validTo: "2025-06-30",
        isActive: true,
        category: "special-offer",
      },
      {
        id: "axis-magnus-offer-2",
        title: "Travel Season: Bonus Miles",
        description: "Earn 2X Edge Miles on all travel bookings during summer season",
        validFrom: "2024-04-01",
        validTo: "2024-06-30",
        isActive: false,
        category: "rewards",
      },
    ],
    bankSpecificHighlights: [
      {
        category: "Burgundy Private Banking",
        benefits: [
          "Dedicated relationship manager with 24/7 availability",
          "Priority banking services at all Axis Bank branches",
          "Complimentary Burgundy Private account with premium features",
          "Exclusive investment opportunities and wealth management services",
        ],
        description: "Access to Axis Bank's most premium banking tier",
      },
      {
        category: "Exclusive Partnerships",
        benefits: [
          "Priority reservations at Michelin-starred restaurants",
          "Exclusive access to luxury hotel upgrades worldwide",
          "VIP treatment at premium golf courses",
          "Concierge services for luxury shopping and experiences",
        ],
        description: "Curated luxury experiences through exclusive partnerships",
      },
    ],
    // ... rest of existing fields
    benefits: [
      "Unlimited domestic and international airport lounge access",
      "Complimentary golf games at premium courses",
      "24/7 concierge services",
      "Priority Pass membership",
      "Comprehensive travel and purchase protection",
    ],
    benefitCategories: {
      Travel: [
        "Unlimited airport lounge access worldwide",
        "Priority Pass membership with unlimited visits",
        "Travel insurance up to ₹1 crore",
        "Foreign currency markup fee of 2%",
        "Complimentary hotel upgrades",
      ],
      Lifestyle: [
        "Complimentary golf games (4 per month)",
        "Access to premium golf courses",
        "Spa and wellness benefits",
        "Fine dining experiences",
      ],
      Concierge: [
        "24/7 lifestyle concierge",
        "Travel planning assistance",
        "Event booking and reservations",
        "Emergency assistance worldwide",
      ],
    },
    fees: {
      "Annual Fee": "₹12,500 (Waived on spending ₹25,00,000/year)",
      "Interest Rate": "3.49% per month (41.88% p.a.)",
      "Cash Advance Fee": "2.5% or ₹500, whichever is higher",
      "Late Payment Fee": "₹1,100 for outstanding up to ₹10,000, ₹1,300 beyond",
      "Foreign Transaction Fee": "2% of transaction amount",
      "Card Replacement Fee": "₹300",
    },
    eligibility: [
      "Age: 21-70 years",
      "Minimum annual income: ₹15,00,000",
      "Excellent credit score (800+)",
      "Invitation only or existing Axis Bank premium customer",
      "High net worth individuals preferred",
    ],
    bankSpecificBenefits: [
      "Burgundy Private Banking privileges",
      "Preferential rates on Axis Bank products",
      "Priority banking services",
      "Exclusive investment opportunities",
    ],
    reviews: [
      {
        id: "1",
        user: "Vikram Singh",
        rating: 5,
        date: "1 week ago",
        comment:
          "Outstanding premium card. The concierge service is exceptional and the travel benefits are unmatched. Worth every penny of the annual fee.",
      },
      {
        id: "2",
        user: "Anita Gupta",
        rating: 4,
        date: "3 weeks ago",
        comment:
          "Great card for frequent travelers. The unlimited lounge access and golf benefits are fantastic. High annual fee but justified by benefits.",
      },
    ],
    applyLink: "https://www.axisbank.com/retail/cards/credit-card/magnus-credit-card",
  },
  {
    id: "sbi-card-elite",
    name: "SBI Card ELITE",
    bank: "SBI Card",
    slug: "sbi-card-elite",
    network: "Visa",
    annualFee: "₹4,999 (Waived on spending ₹5,00,000/year)",
    rewardsRate: "5 reward points per ₹100 spent",
    welcomeBonus: "5,000 reward points on first transaction",
    tags: ["Travel", "Airport Lounge", "Dining", "Movies"],
    aiSummary:
      "SBI Card ELITE offers excellent value for money with strong reward rates, complimentary airport lounge access, and attractive milestone benefits. It's perfect for users who want premium benefits without the ultra-high annual fee of super-premium cards.",
    rating: 4.3,
    reviewCount: 987,
    benefits: [
      "Complimentary airport lounge access (8 visits per year)",
      "1% fuel surcharge waiver",
      "Movie ticket discounts",
      "Milestone benefits up to 25,000 points",
      "Dining discounts at partner restaurants",
    ],
    benefitCategories: {
      Travel: [
        "8 complimentary airport lounge visits per year",
        "Travel insurance up to ₹25 lakhs",
        "Foreign currency markup fee of 3.5%",
        "Railway lounge access",
      ],
      Entertainment: [
        "Movie ticket discounts up to ₹250 per month",
        "BookMyShow offers",
        "Entertainment vouchers worth ₹2,000 annually",
      ],
      Dining: [
        "Up to 15% discount at partner restaurants",
        "Complimentary dining vouchers",
        "Special offers on food delivery apps",
      ],
    },
    fees: {
      "Annual Fee": "₹4,999 (Waived on spending ₹5,00,000/year)",
      "Interest Rate": "3.35% per month (40.20% p.a.)",
      "Cash Advance Fee": "2.5% or ₹500, whichever is higher",
      "Late Payment Fee": "₹750 for outstanding up to ₹10,000, ₹950 beyond",
      "Foreign Transaction Fee": "3.5% of transaction amount",
      "Card Replacement Fee": "₹200",
    },
    eligibility: [
      "Age: 21-65 years",
      "Minimum annual income: ₹4,50,000",
      "Good credit score (700+)",
      "Salaried or self-employed individuals",
      "Existing SBI relationship preferred",
    ],
    bankSpecificBenefits: [
      "Priority customer service",
      "Preferential rates on SBI loans",
      "Complimentary SBI account benefits",
      "Access to SBI investment products",
    ],
    reviews: [
      {
        id: "1",
        user: "Amit Patel",
        rating: 4,
        date: "5 days ago",
        comment:
          "Good value for money card. The reward rate is decent and the lounge access is useful. Customer service could be better.",
      },
      {
        id: "2",
        user: "Sneha Reddy",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Excellent card for everyday use. The movie discounts and dining offers are great. Easy to achieve the annual fee waiver.",
      },
    ],
    applyLink: "https://www.sbicard.com/en/personal/credit-cards/premium-cards/sbi-card-elite.page",
    lastUpdated: "2025-01-13",
    priceHistory: [
      {
        date: "2025-01-01",
        annualFee: "₹4,999 (Waived on spending ₹5,00,000/year)",
        welcomeBonus: "5,000 reward points on first transaction",
        changes: ["Current pricing structure"],
      },
      {
        date: "2024-07-01",
        annualFee: "₹4,999 (Waived on spending ₹4,00,000/year)",
        welcomeBonus: "5,000 reward points on first transaction",
        changes: ["Increased spend requirement for fee waiver"],
      },
      {
        date: "2024-01-01",
        annualFee: "₹4,999 (Waived on spending ₹3,00,000/year)",
        welcomeBonus: "3,000 reward points on first transaction",
        changes: ["Enhanced welcome bonus"],
      },
    ],
    offerHistory: [
      {
        id: "sbi-card-elite-offer-1",
        title: "New Year Special: Double Welcome Bonus",
        description: "Get 10,000 reward points instead of 5,000 on your first transaction",
        validFrom: "2025-01-01",
        validTo: "2025-01-31",
        isActive: true,
        category: "welcome-bonus",
      },
      {
        id: "sbi-card-elite-offer-2",
        title: "Festive Season: Extra Movie Tickets",
        description: "Get 2 additional complimentary movie tickets during festive season",
        validFrom: "2024-10-01",
        validTo: "2024-11-30",
        isActive: false,
        category: "special-offer",
      },
    ],
    bankSpecificHighlights: [
      {
        category: "SBI Banking Ecosystem",
        benefits: [
          "Priority customer service with dedicated relationship manager",
          "Preferential rates on home loans (0.25% discount)",
          "Free SBI Advantage Plus account with higher transaction limits",
          "Complimentary demat account with reduced brokerage",
        ],
        description: "Exclusive benefits for SBI's premium banking customers",
      },
      {
        category: "Digital Banking",
        benefits: [
          "Enhanced mobile banking features",
          "Priority support through SBI YONO app",
          "Instant credit limit enhancement online",
          "Real-time spend analytics and budgeting tools",
        ],
        description: "Advanced digital banking features for tech-savvy users",
      },
    ],
  },
  {
    id: "icici-emeralde",
    name: "Emeralde Credit Card",
    bank: "ICICI Bank",
    slug: "icici-emeralde",
    network: "Visa",
    annualFee: "₹12,000 (Waived on spending ₹8,00,000/year)",
    rewardsRate: "2 reward points per ₹100 spent",
    welcomeBonus: "10,000 reward points on first transaction",
    tags: ["Premium", "Travel", "Airport Lounge", "Concierge", "Golf"],
    aiSummary:
      "ICICI Emeralde is a premium lifestyle credit card offering comprehensive travel benefits, golf privileges, and concierge services. It's designed for affluent customers who value luxury experiences and premium service quality.",
    rating: 4.4,
    reviewCount: 743,
    benefits: [
      "Unlimited domestic airport lounge access",
      "International airport lounge access (4 visits per year)",
      "Complimentary golf games",
      "24/7 concierge services",
      "Comprehensive travel insurance",
    ],
    benefitCategories: {
      Travel: [
        "Unlimited domestic airport lounge access",
        "4 international airport lounge visits per year",
        "Travel insurance up to ₹75 lakhs",
        "Foreign currency markup fee of 3.5%",
      ],
      Golf: ["2 complimentary golf games per month", "Access to premium golf courses", "Golf lessons and coaching"],
      Concierge: ["24/7 lifestyle concierge", "Travel assistance", "Restaurant reservations", "Event planning"],
    },
    fees: {
      "Annual Fee": "₹12,000 (Waived on spending ₹8,00,000/year)",
      "Interest Rate": "3.49% per month (41.88% p.a.)",
      "Cash Advance Fee": "2.5% or ₹500, whichever is higher",
      "Late Payment Fee": "₹950 for outstanding up to ₹10,000, ₹1,100 beyond",
      "Foreign Transaction Fee": "3.5% of transaction amount",
      "Card Replacement Fee": "₹250",
    },
    eligibility: [
      "Age: 21-65 years",
      "Minimum annual income: ₹12,00,000",
      "Excellent credit score (750+)",
      "Invitation only or existing ICICI premium customer",
      "High net worth individuals",
    ],
    bankSpecificBenefits: [
      "Wealth Management services",
      "Priority banking privileges",
      "Preferential rates on ICICI products",
      "Exclusive investment opportunities",
    ],
    reviews: [
      {
        id: "1",
        user: "Rohit Agarwal",
        rating: 4,
        date: "1 week ago",
        comment:
          "Good premium card with decent benefits. The golf privileges are nice and the concierge service is helpful. Reward rate could be better.",
      },
      {
        id: "2",
        user: "Kavya Nair",
        rating: 5,
        date: "10 days ago",
        comment:
          "Excellent service and benefits. The unlimited domestic lounge access is very convenient for business travel. Highly recommended.",
      },
    ],
    applyLink: "https://www.icicibank.com/personal-banking/cards/credit-card/emeralde-credit-card",
    lastUpdated: "2025-01-13",
    priceHistory: [
      {
        date: "2025-01-01",
        annualFee: "₹12,000 (Waived on spending ₹8,00,000/year)",
        welcomeBonus: "10,000 reward points on first transaction",
        changes: ["Current pricing structure"],
      },
      {
        date: "2024-07-01",
        annualFee: "₹12,000 (Waived on spending ₹7,00,000/year)",
        welcomeBonus: "10,000 reward points on first transaction",
        changes: ["Increased spend requirement for fee waiver"],
      },
      {
        date: "2024-01-01",
        annualFee: "₹10,000 (Waived on spending ₹7,00,000/year)",
        welcomeBonus: "8,000 reward points on first transaction",
        changes: ["Annual fee increased by ₹2,000", "Enhanced welcome bonus"],
      },
    ],
    offerHistory: [
      {
        id: "icici-emeralde-offer-1",
        title: "New Year Special: Double Reward Points",
        description: "Get 4 reward points per ₹100 spent for the first month",
        validFrom: "2025-01-01",
        validTo: "2025-01-31",
        isActive: true,
        category: "rewards",
      },
      {
        id: "icici-emeralde-offer-2",
        title: "Festive Season: Extra Golf Games",
        description: "Get 4 additional complimentary golf games during festive season",
        validFrom: "2024-10-01",
        validTo: "2024-11-30",
        isActive: false,
        category: "special-offer",
      },
    ],
    bankSpecificHighlights: [
      {
        category: "ICICI Wealth Management",
        benefits: [
          "Dedicated relationship manager with 24/7 availability",
          "Priority banking services at all ICICI Bank branches",
          "Complimentary ICICI Bank Wealth account with premium features",
          "Exclusive investment opportunities and wealth management services",
        ],
        description: "Access to ICICI Bank's most premium banking tier",
      },
      {
        category: "Exclusive Partnerships",
        benefits: [
          "Priority reservations at Michelin-starred restaurants",
          "Exclusive access to luxury hotel upgrades worldwide",
          "VIP treatment at premium golf courses",
          "Concierge services for luxury shopping and experiences",
        ],
        description: "Curated luxury experiences through exclusive partnerships",
      },
    ],
  },
  {
    id: "hdfc-millennia",
    name: "Millennia Credit Card",
    bank: "HDFC Bank",
    slug: "hdfc-millennia",
    network: "Visa",
    annualFee: "₹1,000 (Waived on spending ₹30,000/year)",
    rewardsRate: "5% cashback on online spends (up to ₹1,000/month)",
    welcomeBonus: "₹1,000 cashback on first transaction",
    tags: ["Cashback", "Online Shopping", "No Annual Fee", "Entry Level"],
    aiSummary:
      "HDFC Millennia is perfect for young professionals and online shoppers. With 5% cashback on online purchases and easy annual fee waiver, it's an excellent entry-level card for building credit history while earning rewards on everyday digital transactions.",
    rating: 4.2,
    reviewCount: 2156,
    benefits: [
      "5% cashback on online spends (up to ₹1,000/month)",
      "2.5% cashback on groceries, departmental stores",
      "1% cashback on all other spends",
      "Easy annual fee waiver",
      "Instant EMI facility",
    ],
    benefitCategories: {
      Cashback: [
        "5% cashback on online shopping (capped at ₹1,000/month)",
        "2.5% cashback on groceries and departmental stores",
        "1% cashback on all other transactions",
        "No minimum redemption amount",
      ],
      Digital: [
        "Instant EMI on purchases above ₹2,500",
        "Zero processing fee on EMI conversions",
        "Digital wallet loading benefits",
        "Online bill payment rewards",
      ],
    },
    fees: {
      "Annual Fee": "₹1,000 (Waived on spending ₹30,000/year)",
      "Interest Rate": "3.49% per month (41.88% p.a.)",
      "Cash Advance Fee": "2.5% or ₹500, whichever is higher",
      "Late Payment Fee": "₹500 for outstanding up to ₹5,000, ₹750 beyond",
      "Foreign Transaction Fee": "3.5% of transaction amount",
      "Card Replacement Fee": "₹200",
    },
    eligibility: [
      "Age: 21-60 years",
      "Minimum annual income: ₹3,00,000",
      "Good credit score (650+)",
      "Salaried or self-employed individuals",
      "First-time credit card holders welcome",
    ],
    bankSpecificBenefits: [
      "Easy approval for HDFC customers",
      "Preferential rates on personal loans",
      "Complimentary HDFC account benefits",
      "Access to HDFC investment products",
    ],
    reviews: [
      {
        id: "1",
        user: "Arjun Mehta",
        rating: 4,
        date: "3 days ago",
        comment:
          "Great card for online shopping. The 5% cashback is excellent and the annual fee waiver is very achievable. Perfect for young professionals.",
      },
      {
        id: "2",
        user: "Pooja Singh",
        rating: 4,
        date: "1 week ago",
        comment:
          "Good entry-level card with decent cashback rates. Customer service is responsive and the app is user-friendly.",
      },
    ],
    applyLink: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/millennia-credit-card",
    lastUpdated: "2025-01-13",
    priceHistory: [
      {
        date: "2025-01-01",
        annualFee: "₹1,000 (Waived on spending ₹30,000/year)",
        welcomeBonus: "₹1,000 cashback on first transaction",
        changes: ["Current pricing structure"],
      },
      {
        date: "2024-07-01",
        annualFee: "₹1,000 (Waived on spending ₹25,000/year)",
        welcomeBonus: "₹1,000 cashback on first transaction",
        changes: ["Increased spend requirement for fee waiver"],
      },
      {
        date: "2024-01-01",
        annualFee: "₹1,000 (Waived on spending ₹20,000/year)",
        welcomeBonus: "₹500 cashback on first transaction",
        changes: ["Enhanced welcome bonus"],
      },
    ],
    offerHistory: [
      {
        id: "hdfc-millennia-offer-1",
        title: "New Year Special: Extra Cashback",
        description: "Get 7.5% cashback on all online spends for the first month",
        validFrom: "2025-01-01",
        validTo: "2025-01-31",
        isActive: true,
        category: "cashback",
      },
      {
        id: "hdfc-millennia-offer-2",
        title: "Festive Season: Extra Shopping Discounts",
        description: "Get 10% discount on shopping at partner stores during festive season",
        validFrom: "2024-10-01",
        validTo: "2024-11-30",
        isActive: false,
        category: "special-offer",
      },
    ],
    bankSpecificHighlights: [
      {
        category: "HDFC Banking Ecosystem",
        benefits: [
          "Easy approval for HDFC customers",
          "Preferential rates on personal loans",
          "Complimentary HDFC account benefits",
          "Access to HDFC investment products",
        ],
        description: "Exclusive benefits for HDFC's banking customers",
      },
      {
        category: "Digital Banking",
        benefits: [
          "Enhanced mobile banking features",
          "Priority support through HDFC Bank app",
          "Instant credit limit enhancement online",
          "Real-time spend analytics and budgeting tools",
        ],
        description: "Advanced digital banking features for tech-savvy users",
      },
    ],
  },
  {
    id: "axis-ace",
    name: "ACE Credit Card",
    bank: "Axis Bank",
    slug: "axis-ace",
    network: "Mastercard",
    annualFee: "₹499 (Waived on spending ₹2,00,000/year)",
    rewardsRate: "5% cashback on bill payments, 4% on Swiggy/Zomato",
    welcomeBonus: "₹500 cashback on first transaction",
    tags: ["Cashback", "Bill Payments", "Food Delivery", "No Annual Fee"],
    aiSummary:
      "Axis ACE is designed for digital-savvy users who frequently use online services. With high cashback rates on bill payments and food delivery, plus easy annual fee waiver, it's perfect for managing everyday digital expenses efficiently.",
    rating: 4.1,
    reviewCount: 1876,
    benefits: [
      "5% cashback on bill payments via Google Pay",
      "4% cashback on Swiggy, Zomato orders",
      "2% cashback on Flipkart, Myntra purchases",
      "1.5% cashback on all other spends",
      "No minimum redemption amount",
    ],
    benefitCategories: {
      "Digital Payments": [
        "5% cashback on utility bill payments via Google Pay",
        "4% cashback on food delivery (Swiggy, Zomato)",
        "2% cashback on e-commerce (Flipkart, Myntra)",
        "Instant cashback credit",
      ],
      Convenience: [
        "No minimum redemption threshold",
        "Automatic cashback credit",
        "Easy online account management",
        "Mobile app notifications",
      ],
    },
    fees: {
      "Annual Fee": "₹499 (Waived on spending ₹2,00,000/year)",
      "Interest Rate": "3.49% per month (41.88% p.a.)",
      "Cash Advance Fee": "2.5% or ₹500, whichever is higher",
      "Late Payment Fee": "₹500 for outstanding up to ₹5,000, ₹750 beyond",
      "Foreign Transaction Fee": "3.5% of transaction amount",
      "Card Replacement Fee": "₹200",
    },
    eligibility: [
      "Age: 18-65 years",
      "Minimum annual income: ₹3,00,000",
      "Good credit score (650+)",
      "Salaried or self-employed individuals",
      "Digital payment users preferred",
    ],
    bankSpecificBenefits: [
      "Easy approval process",
      "Digital-first customer service",
      "Integration with Axis mobile app",
      "Quick card delivery",
    ],
    reviews: [
      {
        id: "1",
        user: "Karan Joshi",
        rating: 4,
        date: "2 days ago",
        comment:
          "Excellent card for bill payments and food delivery. The cashback is instant and the annual fee waiver is very easy to achieve.",
      },
      {
        id: "2",
        user: "Riya Kapoor",
        rating: 4,
        date: "5 days ago",
        comment:
          "Perfect for digital payments. Love the high cashback on Google Pay bill payments. Great value for money card.",
      },
    ],
    applyLink: "https://www.axisbank.com/retail/cards/credit-card/ace-credit-card",
    lastUpdated: "2025-01-13",
    priceHistory: [
      {
        date: "2025-01-01",
        annualFee: "₹499 (Waived on spending ₹2,00,000/year)",
        welcomeBonus: "₹500 cashback on first transaction",
        changes: ["Current pricing structure"],
      },
      {
        date: "2024-07-01",
        annualFee: "₹499 (Waived on spending ₹1,50,000/year)",
        welcomeBonus: "₹500 cashback on first transaction",
        changes: ["Increased spend requirement for fee waiver"],
      },
      {
        date: "2024-01-01",
        annualFee: "₹499 (Waived on spending ₹1,00,000/year)",
        welcomeBonus: "₹250 cashback on first transaction",
        changes: ["Enhanced welcome bonus"],
      },
    ],
    offerHistory: [
      {
        id: "axis-ace-offer-1",
        title: "New Year Special: Extra Cashback",
        description: "Get 7.5% cashback on all bill payments for the first month",
        validFrom: "2025-01-01",
        validTo: "2025-01-31",
        isActive: true,
        category: "cashback",
      },
      {
        id: "axis-ace-offer-2",
        title: "Festive Season: Extra Food Delivery Discounts",
        description: "Get 10% discount on food delivery orders during festive season",
        validFrom: "2024-10-01",
        validTo: "2024-11-30",
        isActive: false,
        category: "special-offer",
      },
    ],
    bankSpecificHighlights: [
      {
        category: "Axis Banking Ecosystem",
        benefits: [
          "Easy approval for Axis customers",
          "Digital-first customer service",
          "Integration with Axis mobile app",
          "Quick card delivery",
        ],
        description: "Exclusive benefits for Axis's banking customers",
      },
      {
        category: "Digital Banking",
        benefits: [
          "Enhanced mobile banking features",
          "Priority support through Axis Bank app",
          "Instant credit limit enhancement online",
          "Real-time spend analytics and budgeting tools",
        ],
        description: "Advanced digital banking features for tech-savvy users",
      },
    ],
  },
]

export async function getCreditCards(filter: Record<string, any> = {}, limit?: number): Promise<CreditCard[]> {
  let filteredCards = creditCards

  // Apply filters
  if (filter.bank) {
    filteredCards = filteredCards.filter((card) => card.bank.toLowerCase().includes(filter.bank.toLowerCase()))
  }

  if (filter.tags) {
    filteredCards = filteredCards.filter((card) => filter.tags.some((tag: string) => card.tags.includes(tag)))
  }

  if (filter.annualFeeRange) {
    // Filter by annual fee range logic would go here
  }

  if (limit) {
    filteredCards = filteredCards.slice(0, limit)
  }

  return filteredCards
}

export async function getAllCreditCards(): Promise<CreditCard[]> {
  return creditCards
}

export async function getTopCreditCards(): Promise<CreditCard[]> {
  return creditCards.slice(0, 3)
}

export async function getCreditCardBySlug(slug: string): Promise<CreditCard | null> {
  return creditCards.find((card) => card.slug === slug) || null
}

export async function getCardsByIds(ids: string[]): Promise<CreditCard[]> {
  return creditCards.filter((card) => ids.includes(card.id))
}

export async function getSimilarCards(cardId: string): Promise<CreditCard[]> {
  const currentCard = creditCards.find((card) => card.id === cardId)
  if (!currentCard) return []

  // Find cards with similar tags or from the same bank
  return creditCards
    .filter(
      (card) =>
        card.id !== cardId &&
        (card.bank === currentCard.bank || card.tags.some((tag) => currentCard.tags.includes(tag))),
    )
    .slice(0, 3)
}

export async function searchCreditCards(query: string): Promise<CreditCard[]> {
  if (!query.trim()) return []

  const searchTerm = query.toLowerCase()

  return creditCards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchTerm) ||
      card.bank.toLowerCase().includes(searchTerm) ||
      card.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      card.benefits?.some((benefit) => benefit.toLowerCase().includes(searchTerm)) ||
      card.aiSummary?.toLowerCase().includes(searchTerm),
  )
}
