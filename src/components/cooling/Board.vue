<template>
    <button @click.stop="start">Start</button>
    <div class="score-box">
        <p>Last: {{ game.lastScore }}</p>
        <p>Avg: {{ game.averageScore }}</p>
        <p>Board: {{ game.boardScore() }}</p>
      </div>
    <div class="wrapper">
      <svg class="puzzle-board cooling-board"
          ref="svg"
          viewBox="0 0 24 35"
          preserveAspectRatio="xMidYMid meet"
          @mouseleave="cancelChain()">
          
          <rect x="0" y="0" width="24" height="35" fill="none" stroke="black" stroke-width="0.1" />

          <g v-for="{i, j, piece} of pieces()" :key="piece.id" class="piece-container">
            <Cell :active="findInChain(i, j) >= 0" :first="findInChain(i, j) == 0"
                :style="cellTransformStyle(i, j)"
                @click="clickPiece(i, j)"
                @mouseenter="mouseoverPiece(i, j)" />
            <Piece :piece="piece"
                   style="transition: transform 0.5s;"
                   :style="cellTransformStyle(i, j)"/>
          </g>
          
      </svg>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import _ from 'lodash'
import {CoolingGame} from '/src/cooling/game.js'
import Piece from './Piece.vue'
import Cell from './Cell.vue'
import { routerViewLocationKey } from 'vue-router';

let game = reactive(new CoolingGame())
let chain = ref([])
let rotation =ref(null)

function start() {
  game.start()
}

function pieces() {
  let pieces = []
  if (!game.board.length) {
    return pieces
  }
  for (const i of _.range(game.height)) {
    for (const j of _.range(game.width)) {
      pieces.push({i,j, piece: game.pieceAt([i,j], chain.value, rotation.value)})
    }
  }
  return _.sortBy(pieces, ({piece}) => piece.id)
}

function findInChain(i, j) {
  return chain.value.findIndex(([ci,cj]) => ci == i && cj == j)
}

function cellTransformStyle(i, j) {
  return `transform: translate(${4.5 + 3*j}px, ${4.5 + 3*i}px)`
}

function clickPiece(i, j) {
  let chainIndex = findInChain(i, j)
  if (rotation.value && chainIndex >= 0) {
    doRotation()
  }
  else if (chain.value.length) {
    cancelChain()
  }
  else {
    startChain(i,j)
  }
}

function mouseoverPiece(i, j) {
  if (rotation.value !== null) {
    setRotation(i, j)
  }
  else if (findInChain(i, j) == 0 && chain.value.length > 2) {
    finishChain()
  }
  else if (chain.value.length) {
    continueChain(i, j)
  }
}

function startChain(i,j) {
  chain.value = [[i,j]]
}

function continueChain(i, j) {
    var chainIndex = findInChain(i, j)
    if (chainIndex >= 0) {
      chain.value.splice(chainIndex+1)
    }
    else {
      chain.value.push([i,j])
    }
}

function finishChain() {
  rotation.value = 0
}

function setRotation(i, j) {
  var chainIndex = findInChain(i, j)
  if (chainIndex >= 0) {
    rotation.value = chainIndex
  }
  
}

function doRotation() {
  game.rotateChain(chain.value, rotation.value)
  cancelChain()
}

function cancelChain() {
  chain.value = []
  rotation.value = null
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
.score-box{
    float: left;
}
.puzzle-board {
    width: 100%;
    height: 100%;
}
</style>
