<script setup lang="ts">
import { range } from "@/lib/utils";
import Files from "./Files.vue";
import MoveHistory from "./MoveHistory.vue";
import Piece from "./Piece.vue";
import Ranks from "./Ranks.vue";
</script>

<template>
  <section id="board-container">
    <Ranks />
    <div
      id="board"
      ref="board">
      <div v-for="col of range(0, 8)" :key="col">
        <div v-for="row of range(0, 8)" :key="row">
          <Piece
            :key="`${row}-${col}`"
            :row="row"
            :col="col" />
        </div>
      </div>
    </div>
    <Files />
    <MoveHistory />
  </section>
</template>

<style>
#board-container {
  display: grid;
  grid-template-areas: "ranks board moves" ". files moves";
  grid-template-columns: 50px 1fr auto;
  width: fit-content;
}

#board {
  height: 680px;
  width: 680px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  place-items: center;
  grid-area: board;
  overflow: hidden;
}
</style>
