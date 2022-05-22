<template>
    <g pointer-events="all">
        <rect x="-1.4" y="-1.4" width="2.8" height="2.8" :stroke="stroke()" stroke-width="0.2" fill="none" /> 
    </g>
</template>

<script setup>
const props = defineProps({
    active: Boolean,
    first: Boolean,
})

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
</style>