<template>
    <g class="hole">
        <rect class="hole-bg"
            width="12" height="14" 
            fill="none" 
            pointer-events="all"/>
        
        <Shape :shape="hole.shape" fill="black" transform="translate(2,2)" pointer-events="none" v-bind="warning_attrs">
            <animate v-if="hole.hole_warning() == 3"
                />
        </Shape>

        <Piece v-for="(p, i) in hole.pieces" :key="i" :piece="p.piece" :transform="'translate(' + (2+p.x) + ',' + (2+p.y) + ')'" pointer-events="none">
            <animateMotion v-if="i==hole.pieces.length-1 && hole.piece_warning() == 2"
                dur="300ms"
                repeatCount="indefinite"
                path="M 0 0 L 0.08 0.025 L -0.025 0.08 L -0.08 -0.025 Z" />
            <animateMotion v-if="i==hole.pieces.length-1 && hole.piece_warning() == 1"
                dur="125ms"
                repeatCount="indefinite"
                path="M 0 0 L 0.2 0.1 L -0.1 0.2 L -0.2 -0.1 Z" />
        </Piece>
    </g>
</template>

<script>
import Shape from './Shape.vue'
import Piece from './Piece.vue'

export default {
    name: 'Hole',

    props: {
        hole: Object
    },

    components: {
        Shape,
        Piece
    },

    computed: {
        warning_attrs() {
            var attrs = {}
            var warning = this.hole.hole_warning()
            if (warning == 3) {
                attrs['stroke'] = "gold"
                attrs['stroke-width'] = "0.3"
            }
            else if (warning == 2) {
                attrs['stroke'] = "darkorange"
                attrs['stroke-width'] = "0.4"
            }
            else if (warning == 1) {
                attrs['stroke'] = "red"
                attrs['stroke-width'] = "0.5"
            }
            return attrs
        }
    }
}
</script>

<style scoped>

</style>