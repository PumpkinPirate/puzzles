<template>
    <button @click.stop="start">Start</button>
    <div class="wrapper">
      <svg class="puzzle-board cooling-board"
          ref="svg"
          viewBox="0 0 24 35"
          preserveAspectRatio="xMidYMid meet"
          :cursor="game.active_piece?'none':'auto'"
          @contextmenu.prevent=""
          @mouseleave="cancelChain()">
          
          <rect x="0" y="0" width="24" height="35" fill="none" stroke="black" stroke-width="0.1" />

          
          <g v-for="{i, j, piece} of pieces()" :key="piece.id" class="piece-container" :data-id="piece.id"
              :style="`transform: translate(${4.5 + 3*j}px, ${4.5 + 3*i}px)`">
            <Piece :piece="piece" :active="findInChain(i, j) >= 0" :first="findInChain(i, j) == 0"
                    @click="startChain(i,j)"
                    @mouseenter="continueChain(i,j)" />
          </g>
          
      </svg>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import _ from 'lodash'
import {CoolingGame} from '/src/cooling/game.js'
import Piece from './Piece.vue'
import { routerViewLocationKey } from 'vue-router';

let game = reactive(new CoolingGame())
let dragging = ref(false)
let chain = ref([])

function start() {
  game.start()
}

function pieces() {
  let pieces = []
  game.board.forEach((row, i) => row.forEach((piece, j) => {
    pieces.push({i,j, piece})}
  ))
  return _.sortBy(pieces, ({piece}) => piece.id)
}

function startChain(i,j) {
  if (dragging.value) {
    cancelChain()
  }
  else {
    dragging.value = true
    chain.value = [[i,j]]
  }
}

function findInChain(i, j) {
  return chain.value.findIndex(([ci,cj]) => ci == i && cj == j)
}

function continueChain(i, j) {
  if (dragging.value) {
    var location = findInChain(i, j)
    if (location == 0) {
      finishChain()
    }
    else if (location > 0) {
      chain.value.splice(location+1)
    }
    else {
      chain.value.push([i,j])
    }
  }
}

function finishChain() {
  game.rotateChain(chain.value)
  cancelChain()
}

function cancelChain() {
  dragging.value = false
  chain.value = []
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

.puzzle-board {
    width: 100%;
    height: 100%;
}

.piece-container{
  transition: transform 0.5s;
}
</style>
