export type PieceType = {
  type: "rook" | "knight" | "bishop" | "queen" | "king" | "pawn";
  color: Color;
  position?: string;
};



export type Square = PieceType | null;

export type Color = "black" | "white";
export type Turn = "black" | "white";

export type BoardType = (PieceType | null)[][];
