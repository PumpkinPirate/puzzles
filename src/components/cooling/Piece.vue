<template>
    <g pointer-events="all">
        <circle cx="0" cy="0" r="1.3" :fill="fill()" />
        <rect x="-1.4" y="-1.4" width="2.8" height="2.8" :stroke="stroke()" stroke-width="0.2" fill="none" /> 
        <text x="-0.5" y="0.7" fill="white">{{piece.heat}}</text>
    </g>
</template>

<script setup>
const props = defineProps({
    piece: Object,
    active: Boolean,
    first: Boolean,
})

function fill() {
    return {
        'A': 'red',
        'B': 'green',
        'C': 'blue',
        'D': 'orange',
        'E': 'cyan',
    }[props.piece.kind]
}

function stroke() {
    if (props.first) {
        return "black"
    }
    else if (props.active) {
        return "silver"
    }
    else {
        return "none"
    }
}
</script>

<style scoped>
text {
    font-size: 2px;
}
</style>