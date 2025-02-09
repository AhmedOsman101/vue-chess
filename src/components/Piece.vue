<script setup lang="ts">
import type { Color, Piece, Position } from "@/lib";
import { getValidMoves } from "@/lib/chess/moves";
import { useGameStore } from "@/stores/game";
import { computed, ref, watchEffect } from "vue";

const props = defineProps<{
	row: number;
	col: number;
}>();

const gs = useGameStore();

const piece = computed(() => gs.board[props.row][props.col]);
const position = ref<Position>({ row: props.row, col: props.col });
const visible = ref(true);

const squareColor = computed(() =>
	(props.row + props.col) % 2 === 0 ? "white" : "black",
);

const isHighlighted = computed(() => {
	return gs.validMoves.some(
		(move) => move.row === props.row && move.col === props.col,
	);
});

const highlightClass = computed(() => {
	if (!isHighlighted.value) return "";

	const targetPiece = gs.board[props.row][props.col];
	// Check if it's a capture move (square contains opponent's piece)
	return targetPiece && targetPiece.color !== gs.turn ? "capture" : "highlight";
});

const handleDrag = (e: DragEvent) => {
	if (!piece.value) return; // Don't drag empty squares

	const dt = e.dataTransfer;
	if (!dt) return;

	setTimeout(() => {
		visible.value = false;
	}, 0);

	dt.effectAllowed = "move";
	dt.setData(
		"text/plain",
		`${piece.value.color}-${piece.value.type}-${position.value.row}-${position.value.col}`,
	);

	gs.setSelectedPiece(piece.value);

	gs.setValidMoves(getValidMoves(gs.selectedPiece as Piece, gs.board, gs.turn));
};

const dropCleaner = () => {
	gs.setValidMoves([]);
	gs.setSelectedPiece(null);
};

const handleDrop = (e: DragEvent) => {
	e.preventDefault();

	const dt = e.dataTransfer;
	if (!dt) return dropCleaner();

	const [color, type, originRow, originCol] = dt.getData("text").split("-");

	const originPosition: Position = {
		row: +originRow,
		col: +originCol,
	};

	if (color !== gs.turn) return dropCleaner();

	const boardElement = document.getElementById("board");
	if (!boardElement) return dropCleaner();

	const { width, left, top } = boardElement.getBoundingClientRect();
	const size = Math.floor(width / 8);

	const col = Math.floor((e.clientX - left) / size);
	const row = Math.floor((e.clientY - top) / size);

	// Validate board boundaries
	if (col < 0 || col >= 8 || row < 0 || row >= 8) return dropCleaner();

	const newPosition = { row: row, col: col };

	if (newPosition === originPosition) return dropCleaner();

	const isMatch = gs.validMoves.find(
		(move) => move.row === newPosition.row && move.col === newPosition.col,
	);

	if (!isMatch) return dropCleaner();

	const newPiece: Piece = {
		type: type as Piece["type"],
		color: color as Color,
		position: newPosition,
	};

	gs.setLastMove({ from: originPosition, to: newPosition }, newPiece);
	gs.setBoard(+originRow, +originCol, row, col, newPiece);
	gs.toggleTurn();
	dropCleaner();
};

const handleDragEnd = () => {
	visible.value = true;
};

// Update highlights when valid moves change
watchEffect(() => {
	// Force DOM update by accessing computed values
	isHighlighted.value;
	highlightClass.value;
});
</script>
<template>
  <div
    class="grid place-items-center size[85px]"
    :class="[squareColor, highlightClass]"
    @drop="handleDrop"
    @dragover.prevent>
    <div
      class="size-[85px] piece"
      :class="{
        'cursor-grab': piece,
        'opacity-0': !visible,
        'pointer-events-none': !piece,
      }"
      draggable="true"
      @dragstart="handleDrag"
      @dragend="handleDragEnd"
      :style="
        piece ?
          `background-image: url(/pieces/${piece.color}-${piece.type}.png)`
        : ''
      " />
  </div>
</template>

<style>
.piece {
  background-position: center;
  background-size: contain;
}

.highlight,
.capture {
  position: relative;
}

.highlight::after {
  content: "";
  position: absolute;
  background: rgba(0, 0, 0, 0.25);
  width: calc(85px * 0.35);
  aspect-ratio: 1;
  border-radius: 50%;
}

.capture::after {
  content: "";
  position: absolute;
  width: calc(85px * 0.8);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 7px solid rgba(50, 0, 0, 0.5);
}
</style>
