<template>
  <div class="puzzle">
    <PentominoBoard />
  </div>
</template>

<script>
// @ is an alias to /src
import PentominoBoard from '/src/components/pentomino/Board.vue'

export default {
  name: 'Home',
  components: {
    PentominoBoard
  }
}
</script>
