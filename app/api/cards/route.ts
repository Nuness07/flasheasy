import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { FlashcardCreateInput } from '@/lib/types'

/**
 * Retrieve all flashcards ordered by creation time, newest first.
 *
 * @returns A JSON response containing the array of flashcards on success, or a JSON error object `{ error: 'Failed to fetch cards' }` with HTTP status 500 on failure.
 */
export async function GET() {
  try {
    const cards = await prisma.flashcard.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(cards)
  } catch (error) {
    console.error('Error fetching cards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cards' },
      { status: 500 }
    )
  }
}

/**
 * Create a new flashcard from the JSON request body.
 *
 * @returns `NextResponse` containing the created flashcard with status `201`; returns a `400` JSON error when `front` or `back` are missing, or a `500` JSON error if creation fails.
 */
export async function POST(request: NextRequest) {
  try {
    const body: FlashcardCreateInput = await request.json()
    const { front, back, tags, difficulty } = body

    if (!front || !back) {
      return NextResponse.json(
        { error: 'Front and back are required' },
        { status: 400 }
      )
    }

    const card = await prisma.flashcard.create({
      data: {
        front,
        back,
        tags: tags || [],
        difficulty,
      },
    })

    return NextResponse.json(card, { status: 201 })
  } catch (error) {
    console.error('Error creating card:', error)
    return NextResponse.json(
      { error: 'Failed to create card' },
      { status: 500 }
    )
  }
}
