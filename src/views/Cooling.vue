<template>
  <div class="puzzle">
    <CoolingBoard />
  </div>
</template>

<script>
// @ is an alias to /src
import CoolingBoard from '/src/components/cooling/Board.vue'

export default {
  name: 'Home',
  components: {
    CoolingBoard
  }
}
</script>
