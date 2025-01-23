import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { BoardType, Color, Piece, Position, Square } from "@/lib";
import { START_POSITION_FEN } from "@/lib/constants";
import { fen2position } from "@/lib/chess/notation";

export const useGameStore = defineStore("game", () => {
  // 1. Board state management
  let fen = START_POSITION_FEN; // START_POSITION_FEN
  const board = ref<BoardType>(fen2position(fen));

  // Proper array mutation for Vue reactivity
  const setBoard = (
    prevRow: number,
    prevCol: number,
    newRow: number,
    newCol: number,
    newPiece: Piece // Added null type for empty squares
  ) => {
    // Create new array to ensure reactivity
    const newBoard = board.value.map((row) => [...row]);
    newBoard[newRow][newCol] = newPiece;
    newBoard[prevRow][prevCol] = null;
    board.value = newBoard;
  };

  // 2. Turn management with proper typing
  const turn = ref<Color>("white"); // Explicit type for safety
  const toggleTurn = () => {
    turn.value = turn.value === "white" ? "black" : "white";
  };

  const validMoves = ref<Position[]>([]);
  const setValidMoves = (moves: Position[]) => {
    validMoves.value = moves;
  };

  // const lastMove = ref<Move | null>(null);
  const selectedPiece = ref<Square>(null);
  const setSelectedPiece = (piece: Square) => {
    selectedPiece.value = piece;
  };

  return {
    board: computed(() => board.value), // Expose as computed
    turn: computed(() => turn.value), // Expose as computed
    validMoves: computed(() => validMoves.value), // Expose as computed
    selectedPiece: computed(() => selectedPiece.value), // Expose as computed
    setBoard,
    toggleTurn,
    setValidMoves,
    setSelectedPiece,
  };
});
