import { EResponse, type TMovie, type TOmdbResponse, type TSearchParams } from "./types"
import { unref } from "vue"

const { VITE_API_URL, VITE_API_KEY } = import.meta.env

const getSearchResults = async (
  params: TSearchParams
): Promise<{ data: TMovie[]; total: number }> => {
  const res: TOmdbResponse = await fetch(
    `${VITE_API_URL}/?s=${unref(params.s)}&page=${unref(params.page)}&apiKey=${VITE_API_KEY}`
  ).then((res) => res.json())

  if (res.Response === EResponse.OK) {
    return { data: res.Search, total: +res.totalResults }
  }

  throw new Error(res.Error)
}

export { getSearchResults }
