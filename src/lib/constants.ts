import type { PieceType } from ".";

// BLACK PIECES
export const BLACK_ROOK: PieceType = { type: "rook", color: "black" };
export const BLACK_KNIGHT: PieceType = { type: "knight", color: "black" };
export const BLACK_BISHOP: PieceType = { type: "bishop", color: "black" };
export const BLACK_QUEEN: PieceType = { type: "queen", color: "black" };
export const BLACK_KING: PieceType = { type: "king", color: "black" };
export const BLACK_PAWN: PieceType = { type: "pawn", color: "black" };
// WHITE PIECES
export const WHITE_ROOK: PieceType = { type: "rook", color: "white" };
export const WHITE_KNIGHT: PieceType = { type: "knight", color: "white" };
export const WHITE_BISHOP: PieceType = { type: "bishop", color: "white" };
export const WHITE_QUEEN: PieceType = { type: "queen", color: "white" };
export const WHITE_KING: PieceType = { type: "king", color: "white" };
export const WHITE_PAWN: PieceType = { type: "pawn", color: "white" };

export const START_POSITION_FEN: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

export const PIECES_MAP: Record<string, PieceType> = {
  // BLACK PIECES
  r: BLACK_ROOK,
  n: BLACK_KNIGHT,
  b: BLACK_BISHOP,
  q: BLACK_QUEEN,
  k: BLACK_KING,
  p: BLACK_PAWN,
  // WHITE PIECES
  R: WHITE_ROOK,
  N: WHITE_KNIGHT,
  B: WHITE_BISHOP,
  Q: WHITE_QUEEN,
  K: WHITE_KING,
  P: WHITE_PAWN,
};
