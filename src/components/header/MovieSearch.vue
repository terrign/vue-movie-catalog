<script lang="ts" setup>
import { ref, watch } from "vue"
import AppInput from "../ui/AppInput.vue"

import { debounce } from "@/utils"
import { usePaginationSearchParams } from "@/composables/usePaginationSearchParams"

const { s, set } = usePaginationSearchParams()

const searchQuery = ref(s.value)

const updateQuery = debounce(() => {
  set(() => ({ s: searchQuery.value, page: 1 }))
})

watch(searchQuery, updateQuery)

const { className } = defineProps<{ className?: string }>()
</script>

<template>
  <app-input v-model="searchQuery" :className />
</template>

<style lang="css" scoped></style>
