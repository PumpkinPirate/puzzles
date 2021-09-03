import _ from 'lodash'

import { PentominoPiece } from './piece.js'
import { PentominoHole } from './hole.js'

export class PentominoGame {
    constructor() {
        this.hole_size = 10
        this.holes = [null, null, null, null]
        this.pieces = [null, null, null]
        this.active_piece = null
    }

    start() {
        this.holes = [null, null, null, null]
        this.pieces = [null, null, null]
        this.active_piece = null

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
        if (this.active_piece) {
            this.holes[hole_index].add_piece(i, j, this.active_piece)
            this.active_piece = null
            this.make_pieces()
        }
        
    }
}