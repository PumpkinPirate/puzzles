<template>
    <g class="shape" pointer-events="all">
        <polygon v-for="path, i in outline" :points="path" :key="i" v-bind="$attrs">
            <slot />
        </polygon>
    </g>
</template>

<script>

export default {
    name: 'Shape',
    props: {
        shape: Object
    },
    inheritAttrs: false,

    computed: {
        outline() {
            const paths = this.shape.outline()
            return paths.map(path=>path.map(point=>point.join(",")).join("  "))
        }
    }
}
</script>

<style scoped>
</style>