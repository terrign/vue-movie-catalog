import type { Ref } from "vue"

enum EResponse {
  OK = "True",
  ERROR = "False"
}

type TMovie = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

type TSucceedResponse = {
  Search: TMovie[]
  totalResults: `${number}`
  Response: EResponse.OK
}

type TErrorResponse = {
  Response: EResponse.ERROR
  Error: string
}

type TSearchParams = {
  s: Ref<string> | string
  page: Ref<number> | number
}

type TOmdbResponse = TSucceedResponse | TErrorResponse

export { type TMovie, type TOmdbResponse, EResponse, type TSearchParams, type TSucceedResponse }
