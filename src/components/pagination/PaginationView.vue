<script lang="ts" setup>
import SearchInfo from "./SearchInfo.vue"
import { usePagination } from "@/composables/usePagination"
import { getSearchResults } from "@/api"
import PaginationControls from "./PaginationControls.vue"
import PageView from "./PageView.vue"
import { usePaginationSearchParams } from "@/composables/usePaginationSearchParams"
import { computed } from "vue"
import SearchLoader from "@/components/ui/SearchLoader.vue"
import { API_ITEMS_PER_PAGE, ITEMS_PER_PAGE } from "./constants"

const params = usePaginationSearchParams()

const page = computed({
  set: (page: number) => params.set(() => ({ page })),
  get: () => params.page.value
})

const { pages, next, prev, currentPage, total, error, isLoading, isReady, setPage } = usePagination(
  getSearchResults,
  { s: params.s, page },
  ITEMS_PER_PAGE,
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
      :itemsPerPage="ITEMS_PER_PAGE"
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
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 1rem var(--content-horizontal-padding);
  border-left: 2px solid var(--border-light);
  border-right: 2px solid var(--border-light);
}
</style>
