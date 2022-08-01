<template>
    <div class="wrapper">
        <button @click="generate">Generate</button>
        <p>{{ piece.name }}</p>
    </div>
</template>

<script>
import { random } from "/src/shield/piece.js"

export default {
    name: 'ShieldBoard',
    data() {
        return {
            piece: {name: ''}
        }
    },

    methods: {
        generate () {
            this.piece = random()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
    position: absolute;
    top: 5em;
    left: 1em;
    right: 1em;
    bottom: 1em;
}
</style>
