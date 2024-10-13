import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"

type TSearchParams = { s: string; page: number }

const usePaginationSearchParams = () => {
  const router = useRouter()
  const route = useRoute()

  const query = computed(() => route.query)

  const s = computed(() => {
    const raw = query.value.s

    if (!raw || typeof raw === "object") {
      return ""
    }

    return raw
  })

  const page = computed(() => {
    const raw = Number(query.value.page)

    if (isNaN(raw) || !raw) {
      return 1
    }

    return raw
  })

  const set = (fn: (prev: TSearchParams) => Partial<TSearchParams>) => {
    router.push({ query: { ...query.value, ...fn({ s: s.value, page: page.value }) } })
  }

  return { s, page, set }
}

export { usePaginationSearchParams }
