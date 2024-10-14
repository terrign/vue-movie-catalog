<script lang="ts" setup>
import { computed } from "vue"

const model = defineModel()
const { className } = defineProps<{ className?: string }>()

const classNames = computed(() => `search ${className}`)
</script>

<template>
  <input type="text" :class="classNames" placeholder="Search" v-model="model" />
</template>

<style lang="css" scoped>
.search {
  display: block;
  height: 2rem;
  width: 100%;
  margin: 0;
  padding: 0.5rem;
  border: 2px solid var(--border-light);
  border-top: 3px solid var(--border-dark);
  outline: none;
  box-sizing: border-box;
}
.search:focus-visible {
  border: 3px solid var(--border-dark);
  --padding: calc(0.5rem - 1px);
  padding: 0.5rem var(--padding) var(--padding);
}
</style>
