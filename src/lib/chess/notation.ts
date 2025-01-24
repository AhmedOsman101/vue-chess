import type { BoardType, GameState, Piece, Position, Square } from "..";
import { PIECES_MAP } from "../constants";
import { char2num, getChar, isNumber } from "../utils";

export const getFile = (col: number): String => getChar(97 + col);
export const file2number = (col: String): number => char2num(col) - 97;

export const pos2pgn = (
  pos: Position,
  piece: Square = null,
  capture = false,
  pawnCol = -1
): string => {
  let result = "";
  if (piece) {
    switch (piece.type) {
      case "pawn":
        console.log("🚀 ~ pawn:", pawnCol);
        if (capture) result += getFile(pawnCol);
        break;
      default:
        result += `${getPieceKey(piece).toUpperCase()}`;
        break;
    }

    if (capture) result += "x";
  }
  result += `${getFile(pos.col)}${8 - pos.row}`;
  return result;
};

export const pgn2pos = (pgn: string): Position => {
  if (!/^[a-h][1-8]$/.test(pgn)) throw new Error(`Invalid PGN: ${pgn}`);
  const row: number = 8 - +pgn[1];
  const col: number = file2number(pgn[0]);
  return { row, col };
};

export const getPieceKey = (piece: Piece): string => {
  switch (piece.type) {
    case "pawn":
      return piece.color == "black" ? "p" : "P";
    case "rook":
      return piece.color == "black" ? "r" : "R";
    case "knight":
      return piece.color == "black" ? "n" : "N";
    case "bishop":
      return piece.color == "black" ? "b" : "B";
    case "queen":
      return piece.color == "black" ? "q" : "Q";
    case "king":
      return piece.color == "black" ? "k" : "K";
    default:
      throw new Error("Invalid FEN character");
  }
};

export const fen2position = (fen: String): BoardType => {
  const board: BoardType = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  let col: number = 0;

  fen
    .split(" ")[0]
    .split("/")
    .forEach((rank, row) => {
      col = 0;
      for (let i = 0; i < rank.length; i++) {
        const cell: string = rank[i];

        if (isNumber(cell)) {
          board[row].fill(null, col, +cell);
          col += +cell;
        } else {
          board[row][col] = {
            ...PIECES_MAP[cell],
            position: { row, col },
          };
          col++;
        }
      }
    });

  return board;
};

export const position2fen = (board: BoardType) => {
  let fen: string = "";
  for (let r = 0; r < board.length; r++) {
    let spaces = 0;
    const row = board[r];
    for (let col = 0; col < row.length; col++) {
      const cell = row[col];
      if (cell != null) {
        if (spaces > 0) {
          fen += spaces;
          spaces = 0;
        }
        fen += getPieceKey(cell);
      } else {
        spaces++;
        if (col == 7) fen += spaces;
      }
    }
    if (r < 7) fen += "/";
  }
  return fen;
};

export const parseFEN = (
  fen: string
): { board: BoardType; state: GameState } => {
  const [position, turn, castling, enPassant, halfMove, fullMove] =
    fen.split(" ");

  return {
    board: fen2position(position),
    state: {
      turn: turn == "w" ? "white" : "black",
      enPassant: enPassant === "-" ? null : pgn2pos(enPassant),
      castling,
      halfMove: parseInt(halfMove, 10),
      fullMove: parseInt(fullMove, 10),
    },
  };
};
