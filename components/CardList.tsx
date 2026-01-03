'use client'

import { useState, useEffect } from 'react'
import { Flashcard } from '@/lib/types'
import { Button } from './ui/button'
import { CardForm } from './CardForm'
import { Edit, Trash2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

/**
 * Render a client-side UI for viewing and managing flashcards.
 *
 * Fetches and displays cards from /api/cards, shows loading and empty states,
 * and provides controls to create, edit, and delete cards (including an inline
 * form for creating/editing and confirmation before deletion).
 *
 * @returns A JSX element containing the flashcards list and associated controls.
 */
export function CardList() {
  const router = useRouter()
  const [cards, setCards] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null)
  const [showForm, setShowForm] = useState(false)

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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card?')) {
      return
    }

    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
        fetchCards()
      }
    } catch (error) {
      console.error('Error deleting card:', error)
    }
  }

  const handleEdit = (card: Flashcard) => {
    setEditingCard(card)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingCard(null)
    fetchCards()
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingCard(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading cards...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My Flashcards</h2>
        <Button
          onClick={() => {
            setEditingCard(null)
            setShowForm(!showForm)
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          {showForm ? 'Cancel' : 'New Card'}
        </Button>
      </div>

      {showForm && (
        <div className="border rounded-lg p-6 bg-card">
          <h3 className="text-lg font-semibold mb-4">
            {editingCard ? 'Edit Card' : 'Create New Card'}
          </h3>
          <CardForm
            card={editingCard || undefined}
            onSuccess={handleFormSuccess}
            onCancel={handleCancel}
          />
        </div>
      )}

      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 border rounded-lg p-8">
          <p className="text-muted-foreground text-lg">No cards yet</p>
          <p className="text-sm text-muted-foreground text-center">
            Create your first flashcard to get started!
          </p>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Card
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow"
            >
              <div className="space-y-2 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Front</p>
                  <p className="font-semibold">{card.front}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Back</p>
                  <p className="text-sm">{card.back}</p>
                </div>
                {card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {card.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-secondary rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {card.difficulty && (
                  <p className="text-xs text-muted-foreground">
                    Difficulty: {card.difficulty}/5
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(card)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(card.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
