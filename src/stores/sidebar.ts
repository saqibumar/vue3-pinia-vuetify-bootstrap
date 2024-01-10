import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const hidden = ref(false)
  const sidebarState = computed(() => hidden.value)
  function toggle() {
    return !hidden.value
  }

  return { hidden, sidebarState, toggle }
})
