import type { BoardType, Color, Piece, Position, Square } from "..";
import { PIECE_DIRECTIONS } from "../constants";

export const isValidSquare = (row: number, col: number): boolean => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

// black's pawns start at 7th rank (index 7 - 6) 1 % 5 = 1
// whites's pawns start at 2nd rank (index 7 - 1) 6 % 5 = 1
export const isOnHomeSquare = (pawn: Piece) =>
  (pawn.position?.row as number) % 5 === 1;

export const pawnMoves = (pawn: Piece, board: BoardType, turn: Color) => {
  if (pawn.color !== turn) return [];

  const moves: Position[] = [];

  const row = pawn.position!.row;
  const col = pawn.position!.col;

  if (pawn.color === "white") {
    // pushing the pawn 1 square forward
    if (!board[row - 1][col]) moves.push({ row: row - 1, col });

    // pushing the pawn 2 square if it's on home square
    if (isOnHomeSquare(pawn) && !board[row - 2][col] && !board[row - 1][col]) {
      moves.push({ row: row - 2, col });
    }
    // captures
    const captures: Square[] = [
      board[row - 1][col - 1],
      board[row - 1][col + 1],
    ];
    if (captures[0] && captures[0].color === "black") {
      moves.push({ row: row - 1, col: col - 1 });
    }
    if (captures[1] && captures[1].color === "black") {
      moves.push({ row: row - 1, col: col + 1 });
    }
  } else if (pawn.color === "black") {
    // pushing the pawn 1 square forward
    if (!board[row + 1][col]) moves.push({ row: row + 1, col });

    // pushing the pawn 2 square if it's on home square
    if (isOnHomeSquare(pawn) && !board[row + 1][col] && !board[row + 2][col]) {
      moves.push({ row: row + 2, col });
    }
    // captures
    const captures: Square[] = [
      board[row + 1][col - 1],
      board[row + 1][col + 1],
    ];
    if (captures[0] && captures[0].color === "white") {
      moves.push({ row: row + 1, col: col - 1 });
    }
    if (captures[1] && captures[1].color === "white") {
      moves.push({ row: row + 1, col: col + 1 });
    }
  }

  return moves;
};

export const knightMoves = (knight: Piece, board: BoardType, turn: Color) => {
  if (knight.color !== turn) return [];

  const moves: Position[] = [];

  const row = knight.position!.row;
  const col = knight.position!.col;

  const directions: number[][] = PIECE_DIRECTIONS[knight.type];

  for (const dir of directions) {
    const newRow = row + dir[0];
    const newCol = col + dir[1];
    if (!isValidSquare(newRow, newCol)) continue;

    const opposingPiece = board[newRow][newCol];

    if (opposingPiece) {
      if (opposingPiece.color !== knight.color) {
        moves.push({ row: newRow, col: newCol });
      }
      continue;
    }

    moves.push({ row: newRow, col: newCol });
  }

  return moves;
};

export const slidingPieceMoves = (
  piece: Piece,
  board: BoardType,
  turn: Color
) => {
  if (piece.color !== turn) return [];

  const moves: Position[] = [];
  const directions: number[][] = PIECE_DIRECTIONS[piece.type];

  const row = piece.position!.row;
  const col = piece.position!.col;

  for (const dir of directions) {
    for (let i = 1; i < 8; i++) {
      const newRow = row + dir[0] * i;
      const newCol = col + dir[1] * i;
      if (!isValidSquare(newRow, newCol)) break;

      const opposingPiece = board[newRow][newCol];
      if (opposingPiece) {
        if (opposingPiece.color !== piece.color) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }

      moves.push({ row: newRow, col: newCol });
    }
  }

  return moves;
};

export const kingMoves = (
  king: Piece,
  board: BoardType,
  turn: Color,
  skip = false
): Position[] => {
  if (king.color !== turn && !skip) return [];

  let moves: Position[] = [];

  const row = king.position!.row;
  const col = king.position!.col;
  let opposingKing: Square = null;

  const directions: number[][] = PIECE_DIRECTIONS[king.type];

  for (const dir of directions) {
    const newRow = row + dir[0];
    const newCol = col + dir[1];
    if (!isValidSquare(newRow, newCol)) continue;
    const opposingPiece = board[newRow][newCol];

    // if there is a friendly piece ahead skip the move
    if (opposingPiece && opposingPiece.color === king.color && !skip) continue;
    moves.push({ row: newRow, col: newCol });
  }

  if (!skip) {
    for (const dir of directions) {
      const newRow = row + dir[0];
      const newCol = col + dir[1];
      if (!isValidSquare(newRow, newCol)) continue;
      const opposingPiece = board[newRow][newCol];

      if (opposingPiece && opposingPiece.type === "king") {
        opposingKing = opposingPiece;
      }
    }
  }

  if (opposingKing) {
    const opposingKingMoves = kingMoves(opposingKing, board, turn, true);
    moves = moves.filter(
      n => !opposingKingMoves.some(m => m.row === n.row && m.col === n.col)
    );
  }

  return moves;
};

export const getValidMoves = (piece: Piece, board: BoardType, turn: Color) => {
  switch (piece.type) {
    case "rook":
    case "bishop":
    case "queen":
      return slidingPieceMoves(piece, board, turn);

    case "knight":
      return knightMoves(piece, board, turn);

    case "pawn":
      return pawnMoves(piece, board, turn);

    case "king":
      return kingMoves(piece, board, turn);

    default:
      return [];
  }
};

// let temp = getValidMoves(
//   {
//     color: "white",
//     type: "king",
//     position: {
//       row: 4,
//       col: 4,
//     },
//   },
//   fen2position("8/8/4k3/4p3/4K3/8/8/8 w - - 0 1"),
//   "white"
// );

// console.log(temp.find((m) => m.row == 5 && m.col == 2));

// console.log("🚀 ~ temp:");
// temp.forEach((i) => console.info(pos2pgn(i)));

// "8/8/4k3/8/4K3/8/8/8 w - - 0 1"
// "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1"
// "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w - - 0 1" // start position with no pawns
// "rnbqkbnr/ppp1pppp/8/3pP3/8/8/PPPP1PPP/RNBQKBNR w - d6 0 1" enPassant
