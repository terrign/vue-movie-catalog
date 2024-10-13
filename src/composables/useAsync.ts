import { ref, type Ref } from "vue"

type TUseAsyncReturn<R, A extends any[]> = {
  data: Ref<R | null>
  error: Ref<string | null>
  isReady: Ref<boolean>
  isLoading: Ref<boolean>
  call: (...args: A) => Promise<R | null>
}

const useAsync = <R, A extends any[]>(
  asyncFn: (...args: A) => Promise<R>
): TUseAsyncReturn<R, A> => {
  const data = ref<R | null>(null) as Ref<R | null>
  const isReady = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const call = async (...args: A) => {
    error.value = null
    isReady.value = false
    isLoading.value = true

    try {
      const result = await asyncFn(...args)
      data.value = result
      isReady.value = true

      return result
    } catch (e) {
      if (e instanceof Error) {
        data.value = null
        error.value = e.message
      }

      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    isReady,
    isLoading,
    error,
    call
  }
}

export { useAsync }
