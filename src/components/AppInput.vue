<script lang="ts" setup>
const model = defineModel()

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <input type="text" class="search" placeholder="Search" v-model="model" v-bind="$attrs" />
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
