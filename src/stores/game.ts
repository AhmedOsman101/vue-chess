import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { BoardType, Color, Move, Piece, Position, Square } from "@/lib";
import { START_POSITION_FEN } from "@/lib/constants";
import { fen2position, pos2pgn } from "@/lib/chess/notation";

export const useGameStore = defineStore("game", () => {
  // 1. Board state management
  const board = ref<BoardType>(fen2position(START_POSITION_FEN));
  // const board = ref<BoardType>(fen2position("8/8/8/8/8/qq6/P7/8 w - - 0 1"));

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

  const setLastMove = (move: Move, piece: Piece) => {
    lastMove.value = move;
    let isCapture, pgn;
    const { row, col } = move!.to;
    const oldPiece = board.value[row][col];

    if (!oldPiece) isCapture = false;
    else if (oldPiece.color != piece.color) isCapture = true;

    if (piece.type == "pawn") {
      pgn = pos2pgn(move!.to, piece, isCapture, move?.from.col);
    } else {
      pgn = pos2pgn(move!.to, piece, isCapture);
    }

    console.log("🚀 ~ setLastMove ~ isCapture:", isCapture);

    if (turn.value == "white") {
      moveHistory.value.push([pgn]);
    } else {
      moveHistory.value[moveHistory.value.length - 1].push(pgn);
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
