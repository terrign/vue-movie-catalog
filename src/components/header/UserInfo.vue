<script lang="ts" setup>
import UserIcon from "@/assets/icons/user.svg"
</script>

<template>
  <div class="user-info">
    <user-icon class="icon" />
    <span>Alexander Borisenko</span>
    <span>&#9660;</span>
  </div>
</template>

<style lang="css" scoped>
.user-info {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.icon {
  height: 1rem;
  width: 1rem;
  font-weight: 500;
  margin-right: 0.5rem;
}
</style>
