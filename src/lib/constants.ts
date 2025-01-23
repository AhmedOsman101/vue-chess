import type { Piece } from ".";

// BLACK PIECES
export const BLACK_ROOK: Piece = { type: "rook", color: "black" };
export const BLACK_KNIGHT: Piece = { type: "knight", color: "black" };
export const BLACK_BISHOP: Piece = { type: "bishop", color: "black" };
export const BLACK_QUEEN: Piece = { type: "queen", color: "black" };
export const BLACK_KING: Piece = { type: "king", color: "black" };
export const BLACK_PAWN: Piece = { type: "pawn", color: "black" };
// WHITE PIECES
export const WHITE_ROOK: Piece = { type: "rook", color: "white" };
export const WHITE_KNIGHT: Piece = { type: "knight", color: "white" };
export const WHITE_BISHOP: Piece = { type: "bishop", color: "white" };
export const WHITE_QUEEN: Piece = { type: "queen", color: "white" };
export const WHITE_KING: Piece = { type: "king", color: "white" };
export const WHITE_PAWN: Piece = { type: "pawn", color: "white" };

export const START_POSITION_FEN: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

export const PIECES_MAP: Record<string, Piece> = {
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
