"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchForm() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for credit cards, benefits, or banks..."
          className="w-full pl-4 pr-12 py-3 rounded-full bg-white text-gray-900 placeholder:text-gray-500 h-14"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" size="icon" className="absolute right-1 top-1 rounded-full h-12 w-12">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  )
}
