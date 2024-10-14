<script lang="ts" setup>
import SearchInfo from "./SearchInfo.vue"
import { usePagination } from "@/composables/usePagination"
import { getSearchResults } from "@/api"
import PaginationControls from "./PaginationControls.vue"
import PageView from "./PageView.vue"
import { usePaginationSearchParams } from "@/composables/usePaginationSearchParams"
import { computed } from "vue"
import SearchLoader from "@/components/ui/SearchLoader.vue"
import { API_ITEMS_PER_PAGE } from "./constants"
import { width } from "@/store/width"

const params = usePaginationSearchParams()

const page = computed({
  set: (page: number) => params.set(() => ({ page })),
  get: () => params.page.value
})

const itemsPerPage = computed(() => {
  if (width.value <= 768 && width.value > 576) {
    return 9
  }
  return 8
})

const { pages, next, prev, currentPage, total, error, isLoading, isReady, setPage } = usePagination(
  getSearchResults,
  { s: params.s, page },
  itemsPerPage,
  API_ITEMS_PER_PAGE
)
</script>

<template>
  <section class="wrapper">
    <search-loader v-if="!isReady && isLoading" />
    <search-info
      :total-results="total.results"
      :search="params.s.value"
      :error="error"
      :is-loading="isLoading"
      :is-ready="isReady"
    />
    <page-view
      v-if="isReady && !error"
      :data="pages[currentPage]"
      :isLoading="isLoading"
      :itemsPerPage="itemsPerPage"
    />
    <pagination-controls
      v-if="isReady && !error"
      :next
      :prev
      :setPage
      :currentPage
      :total-pages="total.pages"
    />
  </section>
</template>

<style lang="css" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 1rem var(--content-horizontal-padding);
  border: 2px solid var(--border-light);
  border-top: none;
  flex: 1;
}

@media screen and (max-width: 1240px) {
  .wrapper {
    border: none;
  }
}
</style>
