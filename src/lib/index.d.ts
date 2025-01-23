export type Piece = {
  type: "rook" | "knight" | "bishop" | "queen" | "king" | "pawn";
  color: Color;
  position?: Position;
};

export type Square = Piece | null;

type Position = {
  row: number;
  col: number;
};

type Move = {
  from: Position;
  to: Position;
};

export type Color = "black" | "white";

export type BoardType = (Piece | null)[][];

export type GameState = {};
