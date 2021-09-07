<template>
  <button @click.stop="start">Start</button>

  <div class="board"
    @contextmenu.prevent=""
    @mouseup="handle_click"
    @mousemove="handle_move"
    @wheel.prevent="handle_wheel">

    <div class="box_piece" :style="{'grid-area': 'piece'+i}" v-for="(p, i) in game.pieces" :key="i"
         @click.stop="game.pick_up(i)">
      <PentominoShape v-if="p" :shape="p.shape" :grain="p.horizontal?'h':'v'" color="brown" outline="black" />
    </div>

    <div class="hole_space" :style="{'grid-area': 'hole'+a}" v-for="(h, a) in game.holes" :key="a"
      @click="e=>place_piece(e, a)">
      <div v-if="h" class="hole_wrapper">
        <PentominoShape :shape="h.shape" :color="warning_color(h.hole_warning(), 'black')" :border="2"/>
        <div v-for="p, b in h.pieces" :key="b" class="hole_piece"
          :style="{position: 'absolute', left: (p.j+2)*30+'px', top: (p.i+2)*30+'px'}">
          <PentominoShape v-if="b==h.pieces.length-1" :shape="p.piece.shape" :grain="p.piece.horizontal?'h':'v'"
             :color="warning_color(h.piece_warning(), 'sienna')" outline="black"/>
          <PentominoShape v-else :shape="p.piece.shape" :grain="p.piece.horizontal?'h':'v'" color="sienna" outline="black"/>
        </div>
      </div>
    </div>

    <div class="active_piece" :style="{position: 'absolute', left: mouse_x-30+'px', top: mouse_y-30+'px'}">
      <PentominoShape v-if="game.active_piece" :shape="game.active_piece.shape"
        :grain="game.active_piece.horizontal?'h':'v'" color="brown" outline="black" />
    </div>
    <div class="score">
      <h3>Score:</h3>
      {{ game.score }}
    </div>
    <div class="message">
      <div v-for="(m, i) in game.messages" :key=i> {{ m }} </div>
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
    mouse_y: 10,
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
        var i = Number(e.target.dataset.i)
        var j = Number(e.target.dataset.j)
        this.game.place_active_piece(hole_index, i, j)
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
.board {
  display: grid;
  grid-template: "hole0 hole0  hole0  hole1  hole1  hole1"    1fr
                 "score piece0 piece1 piece1 piece2 message"  180px
                 "hole2 hole2  hole2  hole3  hole3  hole3"    1fr /
                  1fr   180px  90px   90px   180px  1fr;
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
