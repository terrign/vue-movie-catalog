<script setup lang="ts">
import type { TMovie } from "@/api/types"
import FallbackImage from "@/assets/imagePlaceHolder.png"
import { ref } from "vue"

const { movie } = defineProps<{ movie: TMovie }>()
const { Poster, Year, Title, Type, imdbID } = movie

const imageSource = ref(Poster)

const imageClasses = ref("image")

const imageErrorHandler = () => {
  imageSource.value = FallbackImage
  imageClasses.value += " placeholder"
}
</script>

<template>
  <div class="card">
    <div class="image-container">
      <img
        :src="imageSource"
        :class="imageClasses"
        height="240"
        width="160"
        @error="imageErrorHandler"
      />
    </div>
    <ul class="desc">
      <li>Name: {{ Title }}</li>
      <li>Year: {{ Year }}</li>
      <li>
        ImdbID: <a :href="`https://www.imdb.com/title/${imdbID}`">{{ imdbID.substring(2) }}</a>
      </li>
      <li>Type: {{ Type }}</li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 20%;
  width: 170px;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid var(--border-light);
  background-color: var(--border-light);
  transition: transform 0.1s linear;
}

.image {
  flex: 2 1 auto;
  width: 160px;
  height: 240px;
  object-fit: contain;
  object-position: center;
}

.placeholder {
  object-fit: cover;
}

.desc {
  flex: 1 1 auto;
  margin: 0.5rem 0 0;
  word-wrap: break-word;
  padding: 0;
  width: 100%;
}

.desc > li {
  list-style: none;
  margin: 0;
  font-size: 0.8rem;
  word-break: break-all;
}
</style>
