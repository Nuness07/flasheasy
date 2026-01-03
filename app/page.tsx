'use client'

import { useState } from 'react'
import { StudySession } from '@/components/StudySession'
import { CardList } from '@/components/CardList'
import { Button } from '@/components/ui/button'
import { BookOpen, List } from 'lucide-react'

type View = 'study' | 'cards'

/**
 * Top-level page component that renders the Flasheasy header and a main content area which switches views.
 *
 * The header provides two navigation buttons that toggle the active view between the study session and the user's card list. The main area renders the StudySession when the study view is active and the CardList when the cards view is active.
 *
 * @returns The page's JSX layout: a header with navigation and a main content area that renders either `StudySession` or `CardList` depending on the active view.
 */
export default function Home() {
  const [view, setView] = useState<View>('study')

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Flasheasy</h1>
            <nav className="flex gap-2">
              <Button
                variant={view === 'study' ? 'default' : 'outline'}
                onClick={() => setView('study')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Study
              </Button>
              <Button
                variant={view === 'cards' ? 'default' : 'outline'}
                onClick={() => setView('cards')}
              >
                <List className="h-4 w-4 mr-2" />
                My Cards
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {view === 'study' ? <StudySession /> : <CardList />}
      </main>
    </div>
  )
}