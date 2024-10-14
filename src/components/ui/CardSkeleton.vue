<script lang="ts" setup />

<template>
  <div class="card">
    <div class="image skeleton" />
    <ul class="desc">
      <div class="skeleton" />
      <div class="skeleton" />
      <div class="skeleton" />
      <div class="skeleton" />
    </ul>
  </div>
</template>

<style lang="css" scoped>
@keyframes skeleton-loading {
  to {
    background-position: left;
  }
}
.skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: var(--border-light);
  cursor: progress;
  background: linear-gradient(90deg, #ddda 40%, #efefefaa, #ddda 60%) right / 300% 100%;
  animation: skeleton-loading 0.7s linear infinite;
}

@media (prefers-reduced-motion) {
  .skeleton {
    animation: none;
  }
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 20%;
  width: 170px;
}

.image {
  width: 170px;
  height: 250px;
}

.desc {
  flex: 1 1 auto;
  margin: 0.5rem 0 0;
  padding: 0;
  width: 100%;
}

.desc > div {
  list-style: none;
  height: 1rem;
  margin: 0;
  font-size: 0.8rem;
  width: 100%;
}

@media screen and (max-width: 425px) {
  .card {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  .image-container {
    width: 100%;
  }

  .image {
    width: 100%;
    height: 450px;
  }

  .desc > li {
    font-size: 1rem;
  }
}
</style>
