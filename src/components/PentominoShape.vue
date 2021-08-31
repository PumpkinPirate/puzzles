<template>
    <div class="piece">
        <div v-for="(row, i) in shape" :key="i" class="row">
            <div v-for="(cell, j) in row" :key="j" class="cell" :style="cell_style(cell)"
                :data-i="i" :data-j="j">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'PentominoShape',
    props: {
        shape: Array,
        color: String
    },

    setup() {
    },

    methods: {
        cell_style(cell) {
            return cell ? {background: this.color} : {}
        }
    }
}
</script>

<style scoped>
.cell {
    height: 30px;
    width: 30px;
    display: inline-block;
    margin: 0
}

.row {
    margin: 0;
    height: 30px;
}

.piece {
    display: inline-block;
    margin: 15px;
}
</style>