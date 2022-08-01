<template>
    <div class="puzzle">
        <ShieldBoard />
    </div>
</template>

<script>
// @ is an alias to /src
import ShieldBoard from '/src/components/shield/Board.vue'

export default {
    name: 'Home',
    components: {
        ShieldBoard
    }
}
</script>
