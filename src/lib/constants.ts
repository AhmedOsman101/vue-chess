import type { Piece } from ".";

// BLACK PIECES
export const BLACK_ROOK: Piece = { type: "rook", color: "black" } as const;
export const BLACK_KNIGHT: Piece = { type: "knight", color: "black" } as const;
export const BLACK_BISHOP: Piece = { type: "bishop", color: "black" } as const;
export const BLACK_QUEEN: Piece = { type: "queen", color: "black" } as const;
export const BLACK_KING: Piece = { type: "king", color: "black" } as const;
export const BLACK_PAWN: Piece = { type: "pawn", color: "black" } as const;
// WHITE PIECES
export const WHITE_ROOK: Piece = { type: "rook", color: "white" } as const;
export const WHITE_KNIGHT: Piece = { type: "knight", color: "white" } as const;
export const WHITE_BISHOP: Piece = { type: "bishop", color: "white" } as const;
export const WHITE_QUEEN: Piece = { type: "queen", color: "white" } as const;
export const WHITE_KING: Piece = { type: "king", color: "white" } as const;
export const WHITE_PAWN: Piece = { type: "pawn", color: "white" } as const;

export const START_POSITION_FEN: string =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

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

export const PIECE_DIRECTIONS: Record<string, number[][]> = {
  rook: [
    [1, 0], // up
    [-1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ],
  bishop: [
    [-1, -1], // top left
    [-1, 1], // top right
    [1, -1], // bottom left
    [1, 1], // bottom right
  ],
  queen: [
    // straight moves
    [1, 0], // up
    [-1, 0], // down
    [0, -1], // left
    [0, 1], // right
    // diagonal moves
    [-1, -1], // top left
    [-1, 1], // top right
    [1, -1], // bottom left
    [1, 1], // bottom right
  ],
  king: [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // right
    [0, 1], // left

    [-1, -1], // top left
    [-1, 1], // top right
    [1, -1], // bottom left
    [1, 1], // bottom right
  ],
  opposingKing: [
    [-2, 2], // 2 top, 2 right
    [-2, 1], // 2 top, 1 right
    [-2, 0], // 2 top, 0 right
    [-2, -1], // 2 top, 1 left
    [-2, -2], // 2 top, 2 left

    [2, 2], // 2 down, 2 right
    [2, 1], // 2 down, 1 right
    [2, 0], // 2 down, 0 right
    [2, -1], // 2 down, 1 left
    [2, -2], // 2 down, 2 left

    [-1, -2], // 2 left, 1 up
    [0, -2], // 2 left, 0 up
    [1, -2], // 2 left, 1 down

    [-1, 2], // 2 right, 1 up
    [0, 2], // 2 right, 0 up
    [1, 2], // 2 right, 1 down
  ],
  knight: [
    [2, -1], // down left
    [2, 1], // down right
    [-2, -1], // top left
    [-2, 1], // top right

    [-1, 2], // right up
    [-1, -2], // right down
    [1, 2], // left up
    [1, -2], // left down
  ],
};
