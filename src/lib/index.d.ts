export type Piece = {
	type: "rook" | "knight" | "bishop" | "queen" | "king" | "pawn";
	color: Color;
	position?: Position;
};

export type Square = Piece | null;

export type Position = {
	row: number;
	col: number;
};

type MoveType = {
	from: Position;
	to: Position;
};

export type Move = MoveType | null;

export type Color = "black" | "white";

export type BoardType = (Piece | null)[][];

export type GameState = {
	turn: Color;
	enPassant: Position | null;
	castling: string;
	halfMove: number;
	fullMove: number;
};
