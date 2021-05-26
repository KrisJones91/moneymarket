<template>
  <div
    class="home"
  >

  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { tickerService } from '../services/TickerService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({})
    onMounted(async() => {
      await tickerService.searchSymbols()
      await tickerService.getPrice()
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  user-select: none;
  > img {
    height: 200px;
    width: 200px;
  }
}
</style>
