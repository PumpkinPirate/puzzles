<template>
    <button @click.stop="start">Start</button>

    <div class="wrapper">
        <svg class="puzzle-board pentomino-board"
            ref="svg"
            viewBox="0 0 24 35"
            preserveAspectRatio="xMidYMid meet"
            :cursor="game.active_piece?'none':'auto'"
            @contextmenu.prevent=""
            @mouseup="handle_click"
            @mousemove="handle_move"
            @wheel.prevent="handle_wheel">
            
            <rect x="0" y="0" width="24" height="35" fill="none" stroke="black" stroke-width="0.1" />

            <Hole v-if="game.holes[0]" :key="game.holes[0].id" :hole="game.holes[0]" transform="translate(0,0)" @click="e=>place_piece(e, 0)" />
            <Hole v-if="game.holes[1]" :key="game.holes[1].id" :hole="game.holes[1]" transform="translate(12,0)" @click="e=>place_piece(e, 1)" />
            <Hole v-if="game.holes[2]" :key="game.holes[2].id" :hole="game.holes[2]" transform="translate(0,21)" @click="e=>place_piece(e, 2)" />
            <Hole v-if="game.holes[3]" :key="game.holes[3].id" :hole="game.holes[3]" transform="translate(12,21)" @click="e=>place_piece(e, 3)" />

            
            <g transform="translate(3,14)">
                <rect height="6" width="6" fill="#EEE" @click="game.pick_up(0)" />
                <Piece v-if="game.pieces[0]" :piece="game.pieces[0]" pointer-events="none" transform="translate(2.5, 2.5)" />
            </g>
            <g transform="translate(9,14)">
                <rect height="6" width="6" fill="#EEE" @click="game.pick_up(1)" />
                <Piece v-if="game.pieces[1]" :piece="game.pieces[1]" pointer-events="none" transform="translate(2.5, 2.5)" />
            </g>
            <g transform="translate(15,14)">
                <rect height="6" width="6" fill="#EEE" @click="game.pick_up(2)" />
                <Piece v-if="game.pieces[2]" :piece="game.pieces[2]" pointer-events="none" transform="translate(2.5, 2.5)" />
            </g>

            <Piece v-if="game.active_piece" :piece="game.active_piece" pointer-events="none" 
                :transform="'translate(' + Math.floor(mouse_x) + ',' + Math.floor(mouse_y) + ')'" />
        </svg>
    </div>
</template>

<script>
import Hole from './Hole.vue'
import Piece from './Piece.vue'
import {PentominoGame} from '/src/pentomino/game.js'

export default {
  name: 'PentominoBoard',
  data() { return {
    game: new PentominoGame(),
    mouse_x: 10,
    mouse_y: 10,
  }},

  components: {
    Hole, Piece
  },

  methods: {
      start() {
          this.game.start()
      },

      handle_click(e) {
        if (e.button == 2) {
          this.game.flip()
        }
      },

      handle_wheel(e) {
        if (e.deltaY > 0) {
          this.game.rot_cw()
        } else {
          this.game.rot_ccw()
        }
      },
      
      transform_coords(event, element=null) {
          var svg = this.$refs.svg
          var point = svg.createSVGPoint()
          point.x = event.clientX
          point.y = event.clientY
          element = element || svg
          return point.matrixTransform(element.getScreenCTM().inverse())
      },

      handle_move(e) {
        var point = this.transform_coords(e)
        this.mouse_x = point.x
        this.mouse_y = point.y
      },

      place_piece(e, hole_index) {
        if (!e.target.classList.contains("hole-bg")) {
          return
        }
        var point = this.transform_coords(e, e.target)
        var x = Math.floor(point.x) - 2
        var y = Math.floor(point.y) - 2
        this.game.place_active_piece(hole_index, x, y)
      },

      warning_color(t, c) {
        if (t==1) return 'red'
        else if (t==2) return 'orange'
        else if (t==3) return 'DarkGoldenRod'
        else return c
      }
  }
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

.pentomino-board {
    width: 100%;
    height: 100%;
}

.active_piece, .hole_piece {
  pointer-events: none;
}

.hole_wrapper {
  position: relative;
  display: inline-block;
}

.score {
  grid-area: score;
  text-align: center;
}

.message {
  grid-area: message;
  font-size: 200%;
  font-weight: bold;
}
</style>
