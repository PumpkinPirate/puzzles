<template>
  <div class="home">
    <PentominoBoard />
  </div>
</template>

<script>
// @ is an alias to /src
import PentominoBoard from '@/components/PentominoBoard.vue'

export default {
  name: 'Home',
  components: {
    PentominoBoard
  }
}
</script>
