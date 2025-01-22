import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { BoardType, PieceType, Turn } from "@/lib";
import { START_POSITION_FEN } from "@/lib/constants";
import { fen2position } from "@/lib/chess";

export const useGameStore = defineStore("game", () => {
  // 1. Board state management
  const board: Ref<BoardType> = ref(fen2position(START_POSITION_FEN));

  // Proper array mutation for Vue reactivity
  const updateBoard = (
    prevRow: number,
    prevCol: number,
    newRow: number,
    newCol: number,
    newPiece: PieceType, // Added null type for empty squares
  ) => {
    // Create new array to ensure reactivity
    const newBoard = board.value.map((row) => [...row]);
    newBoard[newRow][newCol] = newPiece;
    newBoard[prevRow][prevCol] = null;
    board.value = newBoard;
  };

  // 2. Turn management with proper typing
  const turn = ref<Turn>("white"); // Explicit type for safety
  const updateTurn = () => {
    turn.value = turn.value === "white" ? "black" : "white";
  };

  return {
    board: computed(() => board.value), // Expose as computed
    updateBoard,
    turn: computed(() => turn.value), // Expose as computed
    updateTurn,
  };
});
