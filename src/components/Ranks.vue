<script setup lang="ts">
import { range } from "@/lib/utils";
</script>

<template>
  <div id="ranks">
    <p
      v-for="rank of range(8, 0, -1)"
      v-text="rank"
      :key="rank"
      class="mx-auto" />
  </div>
</template>

<style>
#ranks {
  grid-area: ranks;
  display: grid;
  grid-template-rows: repeat(8, 85px);
  place-items: center;
  color: aliceblue;
}
</style>
