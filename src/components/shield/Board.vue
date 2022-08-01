<template>
    <div class="wrapper">
        <button @click="generate">Generate</button>
        <p v-for="piece, i in pieces" @click="remove(i)">{{ piece.name }}</p>
    </div>
</template>

<script>
import { remove } from "@vue/shared"
import { random } from "/src/shield/piece.js"

export default {
    name: 'ShieldBoard',
    data() {
        return {
            pieces: []
        }
    },

    methods: {
        generate () {
            this.pieces.unshift(random())
        },

        remove (i) {
            this.pieces.splice(i, 1)
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
