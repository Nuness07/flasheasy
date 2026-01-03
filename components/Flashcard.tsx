"use client";

import { useState } from "react";
import { Flashcard as FlashcardType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  card: FlashcardType;
  onFlip?: () => void;
  className?: string;
}

export function Flashcard({ card, onFlip, className }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div
      className={cn(
        "relative h-64 w-full cursor-pointer perspective-1000",
        className
      )}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Flashcard: ${
        isFlipped ? "Back" : "Front"
      } side. Press Enter to flip.`}
      aria-pressed={isFlipped}
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-500 transform-style-preserve-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rounded-lg border bg-card p-8 shadow-lg flex items-center justify-center",
            !isFlipped ? "z-10" : "z-0"
          )}
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Front</p>
            <p className="text-2xl font-semibold">{card.front}</p>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rounded-lg border bg-card p-8 shadow-lg flex items-center justify-center rotate-y-180",
            isFlipped ? "z-10" : "z-0"
          )}
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Back</p>
            <p className="text-2xl font-semibold">{card.back}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
