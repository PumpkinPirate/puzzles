<template>
    <div class="shape">
        <div v-for="i in rows" :key="i" class="row">
            <div v-for="j in cols" :key="j" class="cell" :style="cell_style(i,j)"
                :data-i="i" :data-j="j">
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'PentominoShape',
    props: {
        shape: Object,
        color: String,
        outline: String,
        border: {type: Number, default: 0},
        grain: {type: String, default: ""}
    },

    computed: {
        rows() {
            return _.range(-this.border, this.shape.i_max() + this.border + 1)
        },

        cols() {
            return _.range(-this.border, this.shape.j_max() + this.border + 1)
        }
    },

    methods: {
        cell_style(i,j) {
            var style = {}
            if (this.shape.includes([i,j])) {
                style.background = this.color
                if (this.grain == "h") {
                    style['border-top'] = "1px solid black"
                }

                if (this.grain == "v") {
                    style['border-left'] = "1px solid black"
                }

                if (this.outline) {
                    if (!this.shape.includes([i-1, j])) {
                        style['border-top'] = "2px solid " + this.outline
                    }
                    if (!this.shape.includes([i+1, j])) {
                        style['border-bottom'] = "2px solid " + this.outline
                    }
                    if (!this.shape.includes([i, j-1])) {
                        style['border-left'] = "2px solid " + this.outline
                    }
                    if (!this.shape.includes([i, j+1])) {
                        style['border-right'] = "2px solid " + this.outline
                    }
                }
            }
            return style
        }
    }
}
</script>

<style scoped>
.cell {
    box-sizing: border-box;
    height: 30px;
    width: 30px;
    display: inline-block;
    margin: 0
}

.row {
    margin: 0;
    height: 30px;
}

.shape {
    display: inline-block;
    margin: 15px;
}
</style>