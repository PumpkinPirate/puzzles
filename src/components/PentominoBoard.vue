<template>
  <button @click.stop="start">Start</button>

  <div class="board"
    @contextmenu.prevent=""
    @mouseup="handle_click"
    @mousemove="handle_move"
    @wheel.prevent="handle_wheel">

    <div class="box_piece" :style="{'grid-area': 'piece'+i}" v-for="(p, i) in game.pieces" :key="i"
         @click.stop="game.pick_up(i)">
      <PentominoShape v-if="p" :shape="p.shape" color="brown" />
    </div>

    <div class="hole_space" :style="{'grid-area': 'hole'+a}" v-for="(h, a) in game.holes" :key="a"
      @click="e=>place_piece(e, a)">
      <div v-if="h" class="hole_wrapper">
        <PentominoShape :shape="h.shape" color="black" />
        <div v-for="p, b in h.pieces" :key="b" class="hole_piece"
          :style="{position: 'absolute', left: p.j*30+'px', top: p.i*30+'px'}">
          <PentominoShape :shape="p.piece.shape" color="brown" />
        </div>
      </div>
    </div>

    <div class="active_piece" :style="{position: 'absolute', left: mouse_x-30+'px', top: mouse_y-30+'px'}">
      <PentominoShape v-if="game.active_piece" :shape="game.active_piece.shape" color="brown" />
  </div>
  </div>

  
</template>

<script>
import PentominoShape from './PentominoShape.vue'
import {PentominoGame} from '@/pentomino/game.js'

export default {
  name: 'PentominoBoard',
  data() { return {
    game: new PentominoGame(),
    mouse_x: 10,
    mouse_y: 10
  }},

  components: {
    PentominoShape
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

      handle_move(e) {
        this.mouse_x = e.pageX
        this.mouse_y = e.pageY
      },

      place_piece(e, hole_index) {
        if (!e.target.classList.contains("cell")) {
          return
        }
        var i = e.target.dataset.i
        var j = e.target.dataset.j
        console.log(e.target)
        this.game.place_active_piece(hole_index, i, j)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board {
  display: grid;
  grid-template: "hole0  .      hole1"
                 "piece0 piece1 piece2"
                 "hole2  .      hole3"
}

.active_piece, .hole_piece {
  pointer-events: none;
}

.hole_wrapper {
  position: relative;
  display: inline-block;
}

</style>
