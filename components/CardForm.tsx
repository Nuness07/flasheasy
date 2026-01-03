"use client";

import { useState } from "react";
import { Flashcard, FlashcardCreateInput } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

interface CardFormProps {
  card?: Flashcard;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CardForm({ card, onSuccess, onCancel }: CardFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FlashcardCreateInput>({
    front: card?.front || "",
    back: card?.back || "",
    tags: card?.tags || [],
    difficulty: card?.difficulty || undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = card ? `/api/cards/${card.id}` : "/api/cards";
      const method = card ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.refresh();
        onSuccess?.();
        if (!card) {
          setFormData({ front: "", back: "", tags: [], difficulty: undefined });
        }
      } else {
        const error = await response.json();
        console.error("Error saving card:", error);
      }
    } catch (error) {
      console.error("Error saving card:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTagsChange = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    setFormData({ ...formData, tags });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="front" className="text-sm font-medium">
          Front (English word/phrase)
        </label>
        <Input
          id="front"
          value={formData.front}
          onChange={(e) => setFormData({ ...formData, front: e.target.value })}
          placeholder="e.g., Hello"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="back" className="text-sm font-medium">
          Back (Translation/Definition)
        </label>
        <Input
          id="back"
          value={formData.back}
          onChange={(e) => setFormData({ ...formData, back: e.target.value })}
          placeholder="e.g., Hola"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="tags" className="text-sm font-medium">
          Tags (comma-separated)
        </label>
        <Input
          id="tags"
          value={formData.tags?.join(", ") || ""}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder="e.g., greetings, basic"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="difficulty" className="text-sm font-medium">
          Difficulty (1-5)
        </label>
        <Input
          id="difficulty"
          type="number"
          min="1"
          max="5"
          value={formData.difficulty || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              difficulty: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
          placeholder="Optional"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : card ? "Update Card" : "Create Card"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
