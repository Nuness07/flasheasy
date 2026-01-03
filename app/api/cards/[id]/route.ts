import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { FlashcardUpdateInput } from '@/lib/types'

/**
 * Retrieve a flashcard by its route `id`.
 *
 * @param params - A promise that resolves to an object containing the route `id` string.
 * @returns A NextResponse with the flashcard object when found; a 404 JSON error `{ error: 'Card not found' }` if no card exists for the given `id`; or a 500 JSON error `{ error: 'Failed to fetch card' }` on server error.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const card = await prisma.flashcard.findUnique({
      where: { id },
    })

    if (!card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(card)
  } catch (error) {
    console.error('Error fetching card:', error)
    return NextResponse.json(
      { error: 'Failed to fetch card' },
      { status: 500 }
    )
  }
}

/**
 * Update the flashcard identified by the `id` route parameter with any provided fields.
 *
 * Updates only the fields included in the request body (`front`, `back`, `tags`, `difficulty`) and returns the updated flashcard record.
 *
 * @returns The updated flashcard record
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: FlashcardUpdateInput = await request.json()
    const { front, back, tags, difficulty } = body

    const card = await prisma.flashcard.update({
      where: { id },
      data: {
        ...(front !== undefined && { front }),
        ...(back !== undefined && { back }),
        ...(tags !== undefined && { tags }),
        ...(difficulty !== undefined && { difficulty }),
      },
    })

    return NextResponse.json(card)
  } catch (error) {
    console.error('Error updating card:', error)
    return NextResponse.json(
      { error: 'Failed to update card' },
      { status: 500 }
    )
  }
}

/**
 * Delete the flashcard identified by the route `id` parameter.
 *
 * @param params - A promise resolving to route parameters; must contain `id` of the flashcard to delete.
 * @returns `{ success: true }` when the card is deleted; otherwise an error object `{ error: string }` with HTTP status 500.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.flashcard.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting card:', error)
    return NextResponse.json(
      { error: 'Failed to delete card' },
      { status: 500 }
    )
  }
}
