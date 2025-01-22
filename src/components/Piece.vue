<script setup lang="ts">
import type { Color, PieceType } from "@/lib";
import { pgn2pos, pos2pgn } from "@/lib/chess";
import { useGameStore } from "@/stores/game";
import { computed, ref, type Ref } from "vue";

const props = defineProps<{
  row: number;
  col: number;
}>();

const gameStore = useGameStore();

// Reactive piece reference using computed
const piece = computed(() => gameStore.board[props.row][props.col]);
const position: Ref<string> = ref(pos2pgn(props.row, props.col));
const visible = ref(true);

const getColor = (row: number, col: number): Color =>
  (row + col) % 2 == 0 ? "white" : "black";

const handleDrag = (e: DragEvent) => {
  if (!piece.value) return; // Don't drag empty squares

  const dt = e.dataTransfer;
  if (!dt) return;

  setTimeout(() => {
    visible.value = false;
  }, 0);

  dt.effectAllowed = "move";
  dt.setData("text/plain", `${piece.value.color}-${piece.value.type}-${position.value}`);
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();

  const dt = e.dataTransfer;
  if (!dt) return;

  const [color, type, originPosition] = dt.getData("text").split("-");

  if (color != gameStore.turn) return;

  const boardElement = document.getElementById("board");
  if (!boardElement) return;

  const { width, left, top } = boardElement.getBoundingClientRect();
  const size = Math.floor(width / 8);

  const x = Math.floor((e.clientX - left) / size);
  const y = Math.floor((e.clientY - top) / size);

  // Validate board boundaries
  if (x < 0 || x >= 8 || y < 0 || y >= 8) return;

  const { row: originRow, col: originCol } = pgn2pos(originPosition);
  const newPosition = pos2pgn(y, x);

  if (newPosition == originPosition) return;

  const newPiece: PieceType = {
    type: type as PieceType["type"],
    color: color as Color,
    position: newPosition,
  };

  gameStore.updateBoard(originRow, originCol, y, x, newPiece);
  gameStore.updateTurn();
};

const handleDragEnd = (e: any) => {
  visible.value = true;
};
</script>
<template>
  <div
    :class="getColor(row, col)"
    class="grid place-items-center size[85px]"
    @drop="handleDrop"
    @dragover.prevent
  >
    <div
      class="size-[85px] piece"
      :class="{ 'cursor-grab': piece != null, 'opacity-0': !visible }"
      draggable="true"
      @dragstart="handleDrag"
      @dragend="handleDragEnd"
      :style="
        piece
          ? `background-image: url(/pieces/${piece?.color}-${piece?.type}.png)`
          : `background-image: unset`
      "
    />
    <!-- visible
      ? `background-image: url(/pieces/${piece?.color}-${piece?.type}.png)`
      : `background-image: unset` -->
  </div>
</template>

<style>
.piece {
  background-position: center;
  background-size: contain;
}
</style>
