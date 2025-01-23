import type { BoardType, Color, Piece, Position, Square } from "..";
import { PIECE_DIRECTIONS } from "../constants";

export const isValidSquare = (row: number, col: number): boolean => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
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

  return moves;
};

export const knightMoves = (knight: Piece, board: BoardType, turn: Color) => {
  if (knight.color != turn) return [];

  const moves: Position[] = [];

  let row = knight.position!.row;
  let col = knight.position!.col;

  const directions: number[][] = PIECE_DIRECTIONS[knight.type];

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

export const slidingPieceMoves = (
  piece: Piece,
  board: BoardType,
  turn: Color
) => {
  if (piece.color != turn) return [];

  const moves: Position[] = [];
  const directions: number[][] = PIECE_DIRECTIONS[piece.type];

  let row = piece.position!.row;
  let col = piece.position!.col;

  directions.forEach((dir) => {
    for (let i = 1; i < 8; i++) {
      let newRow = row + dir[0] * i;
      let newCol = col + dir[1] * i;
      if (!isValidSquare(newRow, newCol)) break;

      const opposingPiece = board[newRow][newCol];
      if (opposingPiece) {
        if (opposingPiece.color != piece.color) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }

      moves.push({ row: newRow, col: newCol });
    }
  });

  return moves;
};

export const kingMoves = (
  king: Piece,
  board: BoardType,
  turn: Color,
  skip = false
) => {
  if (king.color != turn && !skip) return [];

  let moves: Position[] = [];

  let row = king.position!.row;
  let col = king.position!.col;
  let opposingKing: Square = null;

  const directions: number[][] = PIECE_DIRECTIONS[king.type];

  const opposingKingDirections: number[][] = PIECE_DIRECTIONS["opposingKing"];

  directions.forEach((dir) => {
    let newRow = row + dir[0];
    let newCol = col + dir[1];
    if (!isValidSquare(newRow, newCol)) return;
    const opposingPiece = board[newRow][newCol];

    // if there is a friendly piece ahead skip the move
    if (opposingPiece && opposingPiece.color == king.color && !skip) return;
    moves.push({ row: newRow, col: newCol });
  });

  if (!skip) {
    opposingKingDirections.forEach((dir) => {
      let newRow = row + dir[0];
      let newCol = col + dir[1];
      if (!isValidSquare(newRow, newCol)) return;
      const opposingPiece = board[newRow][newCol];

      if (opposingPiece && opposingPiece.type == "king") {
        opposingKing = opposingPiece;
        return;
      }
    });
  }

  if (opposingKing) {
    const opposingKingMoves = kingMoves(opposingKing, board, turn, true);
    moves = moves.filter(
      (n) => !opposingKingMoves.some((m) => m.row === n.row && m.col === n.col)
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
