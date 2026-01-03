import { Flashcard } from "./generated/prisma/client";

export type { Flashcard };

export type FlashcardCreateInput = {
  front: string;
  back: string;
  tags?: string[];
  difficulty?: number;
};

export type FlashcardUpdateInput = {
  front?: string;
  back?: string;
  tags?: string[];
  difficulty?: number;
};
