import { isRef } from "vue"

const debounce = <F extends (...args: any[]) => void>(fn: F, delay: number = 500) => {
  let timeoutID: number

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => fn.apply(this, args), delay)
  }
}

const stringify = (...args: any[]): string => {
  const replacer = (_: string, arg: any) => {
    if (isRef(arg)) {
      return arg.value
    }

    return arg
  }
  return JSON.stringify(args, replacer)
}

const memoized = <F extends (...args: any[]) => any>(fn: F) => {
  const cache = new Map()

  return function (this: ThisParameterType<F>, ...args: Parameters<F>): ReturnType<F> {
    const key = stringify(...args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn.apply(this, args)

    cache.set(key, result)

    return result
  }
}

const resolvePagesToFetch = (
  currentPage: number,
  itemsPerPage: number,
  apiItemsPerPage: number
): { pageToFetch: number; startIndex: number }[] => {
  const results: { pageToFetch: number; startIndex: number }[] = []

  const startItemIndex = (currentPage - 1) * itemsPerPage
  const endItemIndex = startItemIndex + itemsPerPage

  let currentApiPage = Math.floor(startItemIndex / apiItemsPerPage) + 1
  let currentApiPageStartIndex = (currentApiPage - 1) * apiItemsPerPage

  while (currentApiPageStartIndex < endItemIndex) {
    const nextApiPageStartIndex = currentApiPageStartIndex + apiItemsPerPage

    const fetchStartIndex = Math.max(startItemIndex, currentApiPageStartIndex)

    results.push({
      pageToFetch: currentApiPage,
      startIndex: fetchStartIndex - currentApiPageStartIndex
    })

    currentApiPage++
    currentApiPageStartIndex = nextApiPageStartIndex
  }

  return results
}

type TNormalizePagesNavParams = {
  currentPage: number
  totalPages: number
  showPages: {
    fromCurrent: number
    edges: number
  }
  spaceSymbol?: string
}

const createArray = (length: number) => new Array(length).fill(null)

const normalizePagesNav = ({
  currentPage,
  totalPages,
  showPages: { fromCurrent, edges },
  spaceSymbol = "_"
}: TNormalizePagesNavParams) => {
  if (totalPages <= (fromCurrent + edges) * 2 + 3) {
    return createArray(totalPages).map((_, i) => i + 1)
  }

  const end = createArray(edges)
    .fill(null)
    .map((_, i) => totalPages - i)
    .reverse()

  if (currentPage <= edges + fromCurrent + 1) {
    const longStart = createArray(edges + fromCurrent * 2 + 1).map((_, i) => i + 1)
    return [...longStart, spaceSymbol, ...end]
  }

  const start = createArray(edges).map((_, i) => i + 1)

  if (currentPage >= totalPages - (edges + fromCurrent)) {
    const longEnd = createArray(edges + fromCurrent * 2 + 1)
      .map((_, i) => totalPages - i)
      .reverse()
    return [...start, spaceSymbol, ...longEnd]
  }

  const left = createArray(fromCurrent)
    .map((_, i) => currentPage - i - 1)
    .reverse()
  const right = createArray(fromCurrent).map((_, i) => currentPage + i + 1)

  return [...start, spaceSymbol, ...left, currentPage, ...right, spaceSymbol, ...end]
}

const isImageUrl = (url: string) => url.startsWith("https://")

export { debounce, memoized, resolvePagesToFetch, createArray, normalizePagesNav, isImageUrl }
