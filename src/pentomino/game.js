import _ from 'lodash'

import { PentominoPiece } from './piece.js'
import { PentominoHole } from './hole.js'

export class PentominoGame {
    constructor() {
        this.hole_size = 4
        this.holes = [null, null, null, null]
        this.pieces = [null, null, null]
        this.active_piece = null
        this.score = 0
        this.combo = 0
        this.messages = []
    }

    start() {
        this.holes = [null, null, null, null]
        this.pieces = [null, null, null]
        this.active_piece = null
        this.score = 0
        this.combo = 0
        this.messages = []

        this.make_holes()
        this.make_pieces()
    }

    make_holes() {
        for (var i of _.range(this.holes.length)) {
            if (this.holes[i] == null) {
                this.holes[i] = PentominoHole.random(this.hole_size)
            }
        }
    }

    make_pieces() {
        for (var i of _.range(this.pieces.length)) {
            if (this.pieces[i] == null) {
                this.pieces[i] = PentominoPiece.random()
            }
        }
    }

    pick_up(i) {
        [this.active_piece, this.pieces[i]] = [this.pieces[i], this.active_piece]
    }

    flip() {
        if (this.active_piece) {
            this.active_piece.flip()
        }
    }

    rot_cw() {
        if (this.active_piece) {
            this.active_piece.rot_cw()
        }
    }

    rot_ccw() {
        if (this.active_piece) {
            this.active_piece.rot_ccw()
        }
    }

    place_active_piece(hole_index, i, j) {
        var hole = this.holes[hole_index]
        if (hole.can_place(i,j, this.active_piece)) {
            hole.add_piece(i, j, this.active_piece)
            this.active_piece = null
            this.make_pieces()

            for (var h of this.holes) {
                if (h != hole && !h.filled()) {
                    h.step_timer()
                }
            }

            this.score_hole(hole)

            this.check_filled_holes()
        }
    }

    score_hole(hole) {
        if (hole.filled()) {
            var extra = hole.moves - hole.size
            if (extra == 0) {
                this.combo = this.combo + 1
                this.score = this.score + 80 + 20 * this.combo
                this.messages = ["Perfect!"]
                if (this.combo > 1) {
                    this.messages = ["Perfect x" + this.combo + "!"]
                }
            }
            else if (extra == 1) {
                this.combo = 0
                this.score = this.score + 80
                this.messages = ["Good"]
            }
            else if (extra == 2) {
                this.combo = 0
                this.score = this.score + 60
                this.messages = ["Ok"]
            }
            else {
                this.combo = 0
                this.score = this.score + 40
                this.messages = ["Hmmmm"]
            }

            if (hole.pieces.every(p=>p.piece.horizontal)) {
                this.messages.push(" Grain Bonus!")
                this.score = this.score + 20
            }

            if (hole.pieces.every(p=>p.piece.name[0] == hole.pieces[0].piece.name[0])) {
                this.messages.push(" Set Bonus!")
                this.score = this.score + 20
            }
        }
    }

    check_filled_holes() {
        var filled = _.map(this.holes, h=>h.filled())

        if (filled[0] && filled[1] && filled[2]) {
            this.holes = [this.holes[3], null, null, null]
        }
        else if (filled[0] && filled[1] && filled[3]) {
            this.holes = [null, this.holes[2], null, null]
        }
        else if (filled[0] && filled[2] && filled[3]) {
            this.holes = [null, null, this.holes[1], null]
        }
        else if (filled[1] && filled[2] && filled[3]) {
            this.holes = [null, null, null, this.holes[0]]
        }

        else if (filled[0] && filled[1]) {
            this.holes = [this.holes[2], this.holes[3], null, null]
        }
        else if (filled[2] && filled[3]) {
            this.holes = [null, null, this.holes[0], this.holes[1]]
        }
        else if (filled[0] && filled[2]) {
            this.holes = [this.holes[1], null, this.holes[3], null]
        }
        else if (filled[1] && filled[3]) {
            this.holes = [null, this.holes[0], null, this.holes[2]]
        }

        this.make_holes()
    }
}