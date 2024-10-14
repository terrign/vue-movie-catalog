<script setup lang="ts">
import { width } from "@/store/width"
import { normalizePagesNav } from "@/utils"
import { computed, watch } from "vue"

const { currentPage, totalPages } = defineProps<{
  next: () => void
  prev: () => void
  setPage: (pageNum: number) => void
  currentPage: number
  totalPages: number
}>()

const page = computed(() => currentPage)

const pages = computed(() =>
  normalizePagesNav({
    currentPage,
    totalPages,
    showPages: { fromCurrent: width.value > 576 ? 2 : 1, edges: width.value > 576 ? 2 : 1 }
  })
)

watch(
  page,
  () => {
    window.scrollTo({ top: 0 })
  },
  { immediate: true }
)
</script>

<template>
  <footer class="controls">
    <button @click="prev" class="page-button" :data-inactive="currentPage === 1">&lt;</button>
    <template v-for="pageNum in pages" :key="pageNum">
      <button
        class="page-button"
        v-if="typeof pageNum === 'number'"
        @click="() => setPage(pageNum)"
        :data-active="currentPage === pageNum"
      >
        {{ pageNum }}
      </button>
      <span v-else class="empty">. . .</span>
    </template>
    <button @click="next" class="page-button" :data-inactive="currentPage === totalPages">
      &gt;
    </button>
  </footer>
</template>

<style lang="css" scoped>
.empty {
  line-height: 2rem;
  white-space: nowrap;
}
.controls {
  display: flex;
  justify-content: center;
  margin-top: auto;
  gap: 0.2rem;
}

.page-button {
  background-color: transparent;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 2rem;
  width: 2rem;
}

.page-button[data-active="true"] {
  border: 1px solid var(--border-light);
}

.page-button[data-inactive="true"] {
  color: var(--inactive-button-color);
  font-weight: 300;
}

@media (pointer: fine) {
  .page-button:hover:not([data-inactive="true"]):not([data-active="true"]) {
    background-color: var(--button-hover);
    cursor: pointer;
  }
}

@media (pointer: coarse) {
  .page-button:active:not([data-inactive="true"]):not([data-active="true"]) {
    background-color: var(--button-hover);
    cursor: pointer;
  }
}
</style>
