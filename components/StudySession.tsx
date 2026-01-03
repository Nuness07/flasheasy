'use client'

import { useState, useEffect } from 'react'
import { Flashcard as FlashcardType } from '@/lib/types'
import { Flashcard } from './Flashcard'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Renders an interactive flashcard study session that fetches cards on mount and provides navigation controls.
 *
 * Shows a loading message while cards are being fetched, a prompt when no cards exist, or the current flashcard with Previous/Next controls (circular navigation) when cards are available.
 *
 * @returns The rendered study session element containing loading, empty, or flashcard views with navigation.
 */
export function StudySession() {
  const [cards, setCards] = useState<FlashcardType[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    try {
      const response = await fetch('/api/cards')
      if (response.ok) {
        const data = await response.json()
        setCards(data)
      }
    } catch (error) {
      console.error('Error fetching cards:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading cards...</p>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-muted-foreground text-lg">No cards to study</p>
        <p className="text-sm text-muted-foreground">
          Create some flashcards to get started!
        </p>
      </div>
    )
  }

  const currentCard = cards[currentIndex]

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      <div className="w-full">
        <Flashcard card={currentCard} />
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={cards.length <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="text-sm text-muted-foreground min-w-[100px] text-center">
          {currentIndex + 1} / {cards.length}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={cards.length <= 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
