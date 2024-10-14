<script lang="ts" setup>
defineProps<{
  totalResults: number
  search: string
  error: string | null
  isReady: boolean
  isLoading: boolean
}>()
</script>

<template>
  <h2 v-if="isReady && !error" class="search-info">
    You searched for: {{ search }}, {{ totalResults }} found
  </h2>
  <h2 v-if="error" class="search-info">{{ error }}</h2>
</template>

<style lang="css" scoped>
.search-info {
  height: 1.5rem;
}

@media screen and (max-width: 576px) {
  .search-info {
    text-align: center;
  }
}
</style>
