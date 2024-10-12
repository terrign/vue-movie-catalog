<script lang="ts" setup>
import { ref } from "vue"
import AppInput from "./AppInput.vue"
import { useRoute, useRouter } from "vue-router"
import { debounce } from "@/utils"

const route = useRoute()
const router = useRouter()

const searchQuery = ref(route.query.s)

const updateQuery = debounce(() => {
  router.push({ query: { ...route.query, s: searchQuery.value } })
})
</script>

<template>
  <app-input v-model="searchQuery" @update:model-value="updateQuery" />
</template>

<style lang="css" scoped></style>
