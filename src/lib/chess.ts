import type { BoardType, PieceType, Turn } from ".";
import { PIECES_MAP, START_POSITION_FEN } from "./constants";
import { char2num, getChar, isNumber } from "./utils";

export const getFile = (col: number): String => getChar(97 + col);
export const file2number = (col: String): number => char2num(col) - 97;
export const pos2pgn = (row: number, col: number): string => `${getFile(col)}${8 - row}`;

export const pgn2pos = (pgn: string): Record<string, number> => {
  const row: number = 8 - +pgn[1];
  const col: number = file2number(pgn[0]);
  return { row, col };
};

export const getPieceKey = (piece: PieceType): string | undefined => {
  return Object.entries(PIECES_MAP).find(
    ([_, p]) => p.type === piece.type && p.color === piece.color,
  )?.[0];
};

export const fen2position = (fen: String): BoardType => {
  const board: BoardType = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  let col: number = 0;

  fen.split("/").forEach((rank, row) => {
    col = 0;
    for (let i = 0; i < rank.length; i++) {
      const cell: string = rank[i];

      if (isNumber(cell)) {
        board[row].fill(null, col, +cell);
        col += +cell;
      } else {
        const position: string = pos2pgn(row, col);
        board[row][col] = {
          ...PIECES_MAP[cell],
          position,
        };
        col++;
      }
    }
  });

  return board;
};

export const isOnHomeSquare = (pawn: PieceType) => {
  return pawn.color == "black"
    ? pawn.position?.endsWith("7") // black's pawns start at the 7th rank
    : pawn.position?.endsWith("2"); // white's pawns start at the 2nd rank
};

export const pawnMoves = (pawn: PieceType, board: BoardType, turn: Turn) => {
  if (pawn.color != turn) return null;

  const moves: Array<string> = [];
  let { row, col } = pgn2pos(pawn.position as string);
  if (pawn.color == "white") {
    // pushing the pawn 1 square forward
    if (!board[row - 1][col]) {
      moves.push(pos2pgn(row - 1, col));
    }
    // pushing the pawn 2 square if it's on home square
    if (isOnHomeSquare(pawn) && !board[row - 2][col]) {
      moves.push(pos2pgn(row - 2, col));
    }
    // captures
    let diagonalPieces = [board[row - 1][col - 1], board[row - 1][col + 1]];
    if (diagonalPieces[0] && diagonalPieces[0].color == "black") {
      moves.push(pos2pgn(row - 1, col - 1));
    }
    if (diagonalPieces[1] && diagonalPieces[1].color == "black") {
      moves.push(pos2pgn(row - 1, col + 1));
    }
  } else if (pawn.color == "black") {
    // pushing the pawn 1 square forward
    if (!board[row + 1][col]) {
      moves.push(pos2pgn(row + 1, col));
    }
    // pushing the pawn 2 square if it's on home square
    if (isOnHomeSquare(pawn) && !board[row + 2][col]) {
      moves.push(pos2pgn(row + 2, col));
    }
    // captures
    let diagonalPieces = [board[row + 1][col - 1], board[row + 1][col + 1]];
    if (diagonalPieces[0] && diagonalPieces[0].color == "white") {
      moves.push(pos2pgn(row + 1, col - 1));
    }
    if (diagonalPieces[1] && diagonalPieces[1].color == "white") {
      moves.push(pos2pgn(row + 1, col + 1));
    }
  }

  return moves;
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

// console.info(position2fen(fen2position("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")));

// console.dir(
//   pawnMoves(
//     {
//       color: "white",
//       type: "pawn",
//       position: "e2",
//     },
//     fen2position("rnbqkbnr/pppp1ppp/8/8/4p3/8/PPPPPPPP/RNBQKBNR"),
//     "white",
//   ),
// );

// let r = fen2position("rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR");
// console.dir(r);
