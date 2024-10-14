import { useAsync } from "@/composables/useAsync"
import { memoized, resolvePagesToFetch } from "@/utils"
import { computed, ref, watch, type Ref } from "vue"

type TPaginatedFetchReturn = { data: any[]; total: number }

const usePagination = <
  T extends TPaginatedFetchReturn,
  P extends {
    s: Ref<string>
    page: Ref<number>
  }
>(
  paginatedDataFetch: (params: P) => Promise<T>,
  params: P,
  itemsPerPage: Ref<number>,
  apiItemsPerPage: number
) => {
  const { data, call, error } = useAsync(memoized(paginatedDataFetch))
  //Page index === page number === pages[key]
  const pages: Ref<Record<number, T["data"]>> = ref({})
  //isReady === true, when pages.value filled with proper amount of pages which correspondes to current search term
  const isReady: Ref<boolean> = ref<boolean>(false)
  const total = computed(() => ({
    pages: Math.ceil((data.value?.total ?? 1) / itemsPerPage.value),
    results: data.value?.total ?? 0
  }))
  const currentPage = params.page
  const isLoading = ref<boolean>(false)

  const fillPage = async (pageNum: number) => {
    if (pages.value[pageNum] && pages.value[pageNum].length === itemsPerPage.value) {
      return
    }

    isLoading.value = true

    const promises = resolvePagesToFetch(pageNum, itemsPerPage.value, apiItemsPerPage).map(
      ({ pageToFetch, startIndex }) =>
        call({ ...params, page: pageToFetch }).then((res) => {
          const data = res?.data
          if (data) {
            return data.slice(startIndex)
          }
        })
    )

    Promise.allSettled<Promise<T["data"] | undefined>>(promises)
      .then((result) => {
        pages.value[pageNum] = result
          .map((it) => (it.status === "fulfilled" ? it.value : []))
          .flat()
          .slice(0, itemsPerPage.value)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const init = () => {
    isReady.value = false

    if (!params.s.value) {
      return
    }

    isLoading.value = true

    //Since we can't know total amount of items/pages for initial fetch,
    //we just fetch the page, which data will be used and memo it. Thus we
    //receive total amount without redundant data fetching
    call({
      ...params,
      page: Math.ceil((itemsPerPage.value / apiItemsPerPage) * currentPage.value)
    })
      .then(() => {
        const newPages: Record<number, T["data"]> = {}

        for (let i = 1; i <= total.value.pages; i++) {
          newPages[i] = []
        }

        pages.value = newPages
        isReady.value = true
      })
      .then(() => {
        fillPage(currentPage.value)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  watch(params.s, init, { immediate: true })
  watch(params.page, fillPage)
  watch(itemsPerPage, init)

  const setPage = (newPage: number) => {
    if (newPage < 1 || newPage > total.value.pages) {
      return
    }

    currentPage.value = newPage
  }

  const next = () => {
    if (currentPage.value === total.value.pages) {
      return
    }
    currentPage.value++
  }

  const prev = () => {
    if (currentPage.value === 1) {
      return
    }
    currentPage.value--
  }

  return {
    next,
    prev,
    setPage,
    isReady,
    error,
    pages,
    currentPage,
    total,
    isLoading,
    itemsPerPage
  }
}

export { usePagination }
