<script setup lang="ts">
import { getFile } from "@/lib/chess/notation";
import { range } from "@/lib/utils";
</script>

<template>
  <div id="files">
    <p
      v-for="file of range(0, 8)"
      :key="file"
      v-text="getFile(file)"
      class="mx-auto" />
  </div>
</template>

<style>
#files {
  grid-area: files;
  display: grid;
  grid-template-columns: repeat(8, 85px);
  place-items: center;
  color: aliceblue;
}
</style>
