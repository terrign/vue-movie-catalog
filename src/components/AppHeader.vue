<script lang="ts" setup>
import UserInfo from "./UserInfo.vue"
import MovieSearch from "./MovieSearch.vue"
</script>

<template>
  <header class="header">
    <h1 class="title">Movie catalog</h1>
    <movie-search />
    <user-info />
  </header>
</template>

<style lang="css" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-light-blue);
  padding: 1rem var(--content-horizontal-padding);
  gap: 2rem;
}

.title {
  flex-shrink: 0;
}
</style>
