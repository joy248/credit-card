"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { CreditCard } from "@/types/credit-card" // Import CreditCard type

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  cards?: CreditCard[]
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Use direct API call instead of the function to ensure environment variables are used
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()

      // Even if the response is not ok, we'll use the data if it has text
      // This handles cases where the API returns an error but still provides a fallback response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text || "Sorry, I couldn't process your request. Please try again.",
        cards: data.cards || [],
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error processing chat query:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please try again.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[500px] max-h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Ask me about credit cards in India!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] ${
                  message.role === "user"
                    ? "bg-purple-600 text-white rounded-2xl rounded-tr-none"
                    : "bg-gray-200 text-gray-900 rounded-2xl rounded-tl-none"
                } p-3`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>

                {message.cards && message.cards.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    {message.cards.map((card) => (
                      <Card key={card.id} className="p-3 bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{card.name}</h4>
                            <p className="text-sm text-gray-500">{card.bank}</p>
                          </div>
                          <Badge>{card.network}</Badge>
                        </div>
                        <div className="mt-2 text-sm">
                          <p className="line-clamp-2">
                            {card.aiSummary ||
                              card.summary ||
                              `A ${card.bank} credit card with ${card.tags.join(", ")} benefits.`}
                          </p>
                        </div>
                        <div className="mt-2 flex justify-end">
                          <Button size="sm" variant="outline" asChild>
                            <a href={`/cards/${card.slug}`}>View Details</a>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-3">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about credit cards..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
