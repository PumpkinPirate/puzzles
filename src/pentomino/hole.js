import _, { range } from 'lodash'

import {Shape} from './shape.js'

const min_width = 6
const max_width = 8
const max_height = 10
const timer_start = 8

function random_rows(total, h=max_height)
{
    if (total < min_width || h < 1) {
        return null
    }
    else if (total <= max_width) {
        return [total]
    }
    else {
        var choices = _.shuffle(range(min_width, max_width+1))
        for (var i of choices) {
            var rows = random_rows(total - i, h-1)
            if (rows) {
                rows.push(i)
                return rows
            }
        }
        return null
    }
}

export class PentominoHole {
    constructor(shape, size) {
        this.shape = shape
        this.size = size
        this.pieces = []
        this.timer = timer_start
        this.moves = 0
    }

    can_place(i, j, piece) {
        if (!piece) {
            return false
        }
        return this.remaining_shape().overlaps(piece.shape, [i,j])
    }

    add_piece(i, j, piece) {
        this.pieces.push({ i, j, piece })
        this.timer = timer_start
        this.moves = this.moves + 1
    }

    piece_warning() {
        if (this.pieces.length && this.timer <= 2) {
            return this.timer
        }
        return 0
    }

    hole_warning() {
        if (this.pieces.length == 0 && this.timer <= 3) {
            return this.timer
        }
        return 0
    }

    step_timer() {
        this.timer = this.timer - 1
        if (this.timer <= 0) {
            if (this.pieces.length) {
                this.pieces.pop()
            }
            else {
                var i = _.random(this.shape.i_min(), this.shape.i_max())
                var j = _.random(1) ? this.shape.j_min(i) - 1 : this.shape.j_max(i) + 1
                this.shape.add([i,j])
            }
            this.timer = timer_start
        }
    }

    remaining_shape() {
        var remaining = this.shape
        for (var {piece, i, j} of this.pieces) {
            remaining = remaining.difference(piece.shape, [i,j])
        }
        return remaining
    }

    filled() {
        return this.remaining_shape().empty()
    }

    static random(size) {
        var rows = random_rows(size * 5)
        var squares = []

        _.forEach(rows, (r, i) => {
            let offset = _.random(max_width - r)
            squares.push(..._.map(range(r), j=>[i, j+offset]))
        })

        return new PentominoHole(new Shape(squares), size)
    }
}
