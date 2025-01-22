<script setup lang="ts">
import { range } from "@/lib/utils";
import { getFile } from "@/lib/chess";
import Piece from "./Piece.vue";
</script>

<template>
  <section class="board-container">
    <div class="ranks">
      <p v-for="rank of range(8, 0, -1)" v-text="rank" :key="rank" class="mx-auto" />
    </div>
    <div class="border" id="board" ref="board">
      <div v-for="col of range(0, 8)">
        <div v-for="row of range(0, 8)">
          <Piece :key="`${row}-${col}`" :row="row" :col="col" />
        </div>
      </div>
    </div>
    <div class="files">
      <p v-for="file of range(0, 8)" :key="file" v-text="getFile(file)" class="mx-auto" />
    </div>
  </section>
</template>
