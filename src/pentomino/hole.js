import _ from 'lodash'

var min_width = 6
var max_width = 8
var max_height = 10

function random_rows(total, h=max_height)
{
    if (total < min_width || h < 1) {
        return null
    }
    else if (total <= max_width) {
        return [total]
    }
    else {
        var choices = _.shuffle(_.range(min_width, max_width+1))
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
    }

    add_piece(i, j, piece) {
        this.pieces.push({ i, j, piece })
    }

    static random(size) {
        var rows = random_rows(size * 5)
        var shape = []
        for (var r of rows) {
            let offset = _.random(max_width - r)
            let row = _.times(max_width, _.constant(0))
            row = _.fill(row, 1, offset, offset+r)
            shape.push(row)
        }
        return new PentominoHole(shape, size)
    }
}
