<script setup lang="ts">
import type { TMovie } from "@/api/types"
import PageCard from "./PageCard.vue"

import CardSkeleton from "../ui/CardSkeleton.vue"
defineProps<{
  data: TMovie[] | undefined
  isLoading: boolean
  itemsPerPage: number
}>()
</script>

<template>
  <div class="page">
    <template v-if="isLoading">
      <card-skeleton v-for="i in itemsPerPage" :key="i" />
    </template>
    <template v-else><page-card v-for="movie in data" :movie :key="movie.imdbID" /></template>
  </div>
</template>

<style lang="css" scoped>
.page {
  display: grid;
  grid-template-columns: repeat(4, 170px);
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem 0;
}
</style>
