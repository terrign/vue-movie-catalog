<script setup lang="ts">
import AppHeader from "@/components/header/AppHeader.vue"
import PaginationView from "@/components/pagination/PaginationView.vue"
</script>

<template>
  <div class="wrapper">
    <app-header />
    <main>
      <pagination-view />
    </main>
  </div>
</template>

<style scoped lang="css">
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
