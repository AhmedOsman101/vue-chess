export type PieceType = {
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  color: "white" | "black";
};

export enum Color {
  Black = "black",
  White = "white",
}

export type Position = {
  rank: number;
  file: number;
};

export type BoardType = (PieceType | null)[][];
