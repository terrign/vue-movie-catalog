import { ref } from "vue"

const width = ref(window.innerWidth)

const updateWidth = () => {
  width.value = window.innerWidth
}

window.addEventListener("resize", updateWidth)

export { width }
