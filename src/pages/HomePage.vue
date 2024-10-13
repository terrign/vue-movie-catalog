<script setup lang="ts">
import AppHeader from "@/components/header/AppHeader.vue"
import PaginationView from "@/components/pagination/PaginationView.vue"
</script>

<template>
  <app-header />
  <main>
    <pagination-view />
  </main>
</template>

<style scoped lang="css">
main {
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
