import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { BoardType, Color, Move, Piece, Position, Square } from "@/lib";
import { START_POSITION_FEN } from "@/lib/constants";
import { fen2position, pos2pgn } from "@/lib/chess/notation";

export const useGameStore = defineStore("game", () => {
  // 1. Board state management
  const board = ref<BoardType>(fen2position(START_POSITION_FEN));

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

  const lastMove = ref<Move>(null);
  const moveHistory = ref<String[][]>([]);

  const setLastMove = (move: Move) => {
    lastMove.value = move;
    if (turn.value == "white") {
      moveHistory.value.push([pos2pgn(move!.to)]);
    } else {
      moveHistory.value[moveHistory.value.length - 1].push(pos2pgn(move!.to));
    }
  };

  const selectedPiece = ref<Square>(null);
  const setSelectedPiece = (piece: Square) => {
    selectedPiece.value = piece;
  };

  return {
    board: computed(() => board.value), // Expose as computed
    turn: computed(() => turn.value), // Expose as computed
    validMoves: computed(() => validMoves.value), // Expose as computed
    selectedPiece: computed(() => selectedPiece.value), // Expose as computed
    lastMove: computed(() => lastMove.value), // Expose as computed
    moveHistory: computed(() => moveHistory.value), // Expose as computed
    setBoard,
    toggleTurn,
    setValidMoves,
    setSelectedPiece,
    setLastMove,
  };
});
