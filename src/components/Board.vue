<script setup lang="ts">
  import type { BoardType } from "@/lib/index";
  import { START_POISITION } from "@/lib/constants";
  import { getFile, range } from "@/lib/utils";
  import { ref, type Ref } from "vue";
  const board: Ref<BoardType> = ref(START_POISITION);
  const getColor = (rank: number, file: number): "black" | "white" => {
    return (rank + file) % 2 == 0 ? "white" : "black";
  };
</script>

<template>
  <section class="board-container">
    <div class="ranks">
      <p
        v-for="rank of range(8, 0, -1)"
        v-text="rank"
        class="mx-auto" />
    </div>
    <div
      class="border"
      id="board">
      <div v-for="row of range(0, 8)">
        <div v-for="col of range(0, 8)">
          <div
            :class="getColor(row, col)"
            class="piece">
            <img
              v-show="board[col][row]"
              :src="`/pieces/${board[col][row]?.color}-${board[col][row]?.type}.svg`"
              :alt="`${board[col][row]?.color}-${board[col][row]?.type}`" />
          </div>
        </div>
      </div>
    </div>
    <div class="files">
      <p
        v-for="file of range(0, 8)"
        v-text="getFile(file)"
        class="mx-auto" />
    </div>
  </section>
</template>

<style scoped>
  .board-container {
    display: grid;
    grid-template-areas: "ranks board" ". files";
    grid-template-columns: 50px auto;
    width: fit-content;

    .ranks {
      grid-area: ranks;
      display: grid;
      grid-template-rows: repeat(8, 85px);
      place-items: center;
      color: aliceblue;
    }

    .files {
      grid-area: files;
      display: grid;
      grid-template-columns: repeat(8, 85px);
      place-items: center;
      color: aliceblue;
      /* @apply border border-pink-600; */
    }
  }

  #board {
    height: 680px;
    width: 680px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    place-items: center;
    grid-area: board;

    .piece {
      width: 85px;
      height: 85px;
      @apply grid place-items-center;
    }
  }
</style>
