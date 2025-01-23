import type { BoardType, Color, Piece, Position } from ".";
import { PIECES_MAP } from "./constants";
import { char2num, getChar, isNumber } from "./utils";

export const getFile = (col: number): String => getChar(97 + col);
export const file2number = (col: String): number => char2num(col) - 97;

export const isValidSquare = (row: number, col: number): boolean => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

export const pos2pgn = (pos: Position): string =>
  `${getFile(pos.col)}${8 - pos.row}`;

export const coord2pgn = (row: number, col: number): string =>
  `${getFile(col)}${8 - row}`;

export const pgn2pos = (pgn: string): Record<string, number> => {
  const row: number = 8 - +pgn[1];
  const col: number = file2number(pgn[0]);
  return { row, col };
};

export const getPieceKey = (piece: Piece): string | undefined => {
  return Object.entries(PIECES_MAP).find(
    ([_, p]) => p.type === piece.type && p.color === piece.color
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
        // const position: string = pos2pgn(row, col);
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

export const isOnHomeSquare = (pawn: Piece) => {
  return pawn.color == "black" ?
      pawn.position?.row == 1 // black's pawns start at the 7th rank (index 8 - 7)
    : pawn.position?.row == 6; // white's pawns start at the 2nd rank (index 8 - 2)
};

export const pawnMoves = (pawn: Piece, board: BoardType, turn: Color) => {
  if (pawn.color != turn) return [];

  const moves: Position[] = [];

  let row = pawn.position!.row;
  let col = pawn.position!.col;

  if (pawn.color == "white") {
    // pushing the pawn 1 square forward
    if (!board[row - 1][col]) {
      moves.push({ row: row - 1, col });
    }

    // pushing the pawn 2 square if it's on home square
    if (isOnHomeSquare(pawn) && !board[row - 2][col]) {
      moves.push({ row: row - 2, col });
    }
    // captures
    let diagonalPieces = [board[row - 1][col - 1], board[row - 1][col + 1]];
    if (diagonalPieces[0] && diagonalPieces[0].color == "black") {
      moves.push({ row: row - 1, col: col - 1 });
    }
    if (diagonalPieces[1] && diagonalPieces[1].color == "black") {
      moves.push({ row: row - 1, col: col + 1 });
    }
  } else if (pawn.color == "black") {
    // pushing the pawn 1 square forward
    if (!board[row + 1][col]) {
      moves.push({ row: row + 1, col });
    }
    // pushing the pawn 2 square if it's on home square
    if (isOnHomeSquare(pawn) && !board[row + 2][col]) {
      moves.push({ row: row + 2, col });
    }
    // captures
    let diagonalPieces = [board[row + 1][col - 1], board[row + 1][col + 1]];
    if (diagonalPieces[0] && diagonalPieces[0].color == "white") {
      moves.push({ row: row + 1, col: col - 1 });
    }
    if (diagonalPieces[1] && diagonalPieces[1].color == "white") {
      moves.push({ row: row + 1, col: col + 1 });
    }
  }
  console.log("🚀 ~ pawnMoves ~ moves:", moves);

  return moves;
};

export const rookMoves = (rook: Piece, board: BoardType, turn: Color) => {
  if (rook.color != turn) return [];

  const moves: Position[] = [];

  let row = rook.position!.row;
  let col = rook.position!.col;

  const directions: number[][] = [
    [1, 0], // up
    [-1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  directions.forEach((dir) => {
    for (let i = 1; i < 8; i++) {
      let newRow = row + dir[0] * i;
      let newCol = col + dir[1] * i;
      if (!isValidSquare(newRow, newCol)) break;

      if (board[newRow][newCol]) {
        if (board[newRow][newCol].color != rook.color) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }

      moves.push({ row: newRow, col: newCol });
    }
  });

  return moves;
};

export const bishopMoves = (bishop: Piece, board: BoardType, turn: Color) => {
  if (bishop.color != turn) return [];

  const moves: Position[] = [];

  let row = bishop.position!.row;
  let col = bishop.position!.col;

  const directions: number[][] = [
    [-1, -1], // top left
    [-1, 1], // top right
    [1, -1], // bottom left
    [1, 1], // bottom right
  ];

  directions.forEach((dir) => {
    for (let i = 1; i < 8; i++) {
      let newRow = row + dir[0] * i;
      let newCol = col + dir[1] * i;
      if (!isValidSquare(newRow, newCol)) break;

      if (board[newRow][newCol]) {
        if (board[newRow][newCol].color != bishop.color) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }

      moves.push({ row: newRow, col: newCol });
    }
  });

  return moves;
};

export const knightMoves = (knight: Piece, board: BoardType, turn: Color) => {
  if (knight.color != turn) return [];

  const moves: Position[] = [];

  let row = knight.position!.row;
  let col = knight.position!.col;

  const directions: number[][] = [
    [2, -1], // down left
    [2, 1], // down right
    [-2, -1], // top left
    [-2, 1], // top right

    [-1, 2], // right up
    [-1, -2], // right down
    [1, 2], // left up
    [1, -2], // left down
  ];

  directions.forEach((dir) => {
    let newRow = row + dir[0];
    let newCol = col + dir[1];
    if (!isValidSquare(newRow, newCol)) return;

    if (board[newRow][newCol]) {
      if (board[newRow][newCol].color != knight.color) {
        moves.push({ row: newRow, col: newCol });
      }
      return;
    }

    moves.push({ row: newRow, col: newCol });
  });

  return moves;
};

export const getValidMoves = (piece: Piece, board: BoardType, turn: Color) => {
  switch (piece.type) {
    case "rook":
      return rookMoves(piece, board, turn);

    case "bishop":
      return bishopMoves(piece, board, turn);

    case "knight":
      return knightMoves(piece, board, turn);

    case "pawn":
      return pawnMoves(piece, board, turn);

    case "bishop":
      return bishopMoves(piece, board, turn);

    case "bishop":
      return bishopMoves(piece, board, turn);

    default:
      return [];
  }
};

let temp = getValidMoves(
  {
    color: "white",
    type: "knight",
    position: {
      row: 4,
      col: 4,
    },
  },
  fen2position("rnbqkbnr/pppppppp/8/8/4N3/8/PPP1P1PP/RNBQKB1R"),
  "white"
);

// console.log("🚀 ~ temp:");
// temp.forEach((i) => console.info(pos2pgn(i)));

// "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
// "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR"
// "rnbqkbnr/pppp1ppp/8/8/4p3/8/PPPPPPPP/RNBQKBNR"
// "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR"
