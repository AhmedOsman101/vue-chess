<script setup lang="ts">
import { useGameStore } from "@/stores/game";

const gs = useGameStore();
</script>
<template>
  <section
    class="bg-zinc-800 w-64 h-[680px]"
    id="movehistory">
    <p class="text-center font-bold text-xl">Move History</p>
    <ol class="list-decimal">
      <li
        v-for="(move, index) in gs.moveHistory"
        :key="index">
        {{ move[0] || "" }}
        {{ move[1] || "" }}
      </li>
    </ol>
  </section>
</template>

<style>
@reference "../assets/base.css";
#movehistory {
  grid-area: moves;
  @apply mx-10 p-10 pt-5 text-white;
}
</style>
