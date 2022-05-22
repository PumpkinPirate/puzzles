<template>
    <g pointer-events="none">
        <circle cx="0" cy="0" r="1.3" :fill="fill()" />
        <text x="-0.5" y="0.7" fill="white">{{piece.score()}}</text>
    </g>
</template>

<script setup>
const props = defineProps({
    piece: Object,
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
</script>

<style scoped>
text {
    font-size: 2px;
}
</style>