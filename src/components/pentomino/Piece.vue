<template>
    <g class="piece" pointer-events="none">
        <Shape :shape="piece.shape" fill="brown" stroke="black" stroke-width="0.2">
            <slot />
        </Shape>
    </g>
</template>

<script>
import Shape from './Shape.vue'

export default {
    name: 'Piece',

    props: {
        piece: Object
    },

    components: {
        Shape
    }
}
</script>

<style scoped>
</style>