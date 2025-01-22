import type { BoardType, PieceType } from ".";

export const BLACK_ROOK: PieceType = { type: "rook", color: "black" };
export const BLACK_KNIGHT: PieceType = { type: "knight", color: "black" };
export const BLACK_BISHOP: PieceType = { type: "bishop", color: "black" };
export const BLACK_QUEEN: PieceType = { type: "queen", color: "black" };
export const BLACK_KING: PieceType = { type: "king", color: "black" };
export const BLACK_PAWN: PieceType = { type: "pawn", color: "black" };

export const WHITE_ROOK: PieceType = { type: "rook", color: "white" };
export const WHITE_KNIGHT: PieceType = { type: "knight", color: "white" };
export const WHITE_BISHOP: PieceType = { type: "bishop", color: "white" };
export const WHITE_QUEEN: PieceType = { type: "queen", color: "white" };
export const WHITE_KING: PieceType = { type: "king", color: "white" };
export const WHITE_PAWN: PieceType = { type: "pawn", color: "white" };

export const START_POISITION: BoardType = [
  [
    BLACK_ROOK,
    BLACK_KNIGHT,
    BLACK_BISHOP,
    BLACK_QUEEN,
    BLACK_KING,
    BLACK_BISHOP,
    BLACK_KNIGHT,
    BLACK_ROOK,
  ],
  [
    BLACK_PAWN,
    BLACK_PAWN,
    BLACK_PAWN,
    BLACK_PAWN,
    BLACK_PAWN,
    BLACK_PAWN,
    BLACK_PAWN,
    BLACK_PAWN,
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    WHITE_ROOK,
    WHITE_KNIGHT,
    WHITE_BISHOP,
    WHITE_QUEEN,
    WHITE_KING,
    WHITE_BISHOP,
    WHITE_KNIGHT,
    WHITE_ROOK,
  ],
  [
    WHITE_PAWN,
    WHITE_PAWN,
    WHITE_PAWN,
    WHITE_PAWN,
    WHITE_PAWN,
    WHITE_PAWN,
    WHITE_PAWN,
    WHITE_PAWN,
  ],
];
