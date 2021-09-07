import _, { range } from 'lodash'

export class Shape {
    constructor(squares) {
        this.squares = squares
    }

    add(square) {
        this.squares.push(square)
    }

    i_min(j) {
        var squares = this.squares
        if (j != undefined) {
            squares = _.filter(squares, s=>s[1]==j)
        }
        return _.min(_.map(squares, s=>s[0]))
    }

    j_min(i) {
        var squares = this.squares
        if (i != undefined) {
            squares = _.filter(squares, s=>s[0]==i)
        }
        return _.min(_.map(squares, s=>s[1]))
    }

    i_max(j) {
        var squares = this.squares
        if (j != undefined) {
            squares = _.filter(squares, s=>s[1]==j)
        }
        return _.max(_.map(squares, s=>s[0]))
    }

    j_max(i) {
        var squares = this.squares
        if (i != undefined) {
            squares = _.filter(squares, s=>s[0]==i)
        }
        return _.max(_.map(squares, s=>s[1]))
    }

    difference(other, offset=[0,0]) {
        return new Shape(_.differenceWith(
            this.squares,
            _.map(other.squares, ([i,j])=>[i+offset[0], j+offset[1]]),
            _.isEqual
        ))
    }

    overlaps(other, offset=[0,0]) {
        return _.intersectionWith(
            this.squares,
            _.map(other.squares, ([i,j])=>[i+offset[0], j+offset[1]]),
            _.isEqual
        ).length > 0
    }

    includes(square) {
        for (var s of this.squares) {
            if (_.isEqual(square, s)) {
                return true
            }
        }
        return false
    }

    empty() {
        return this.squares.length == 0
    }

    rot_cw() {
        var i_max = this.i_max()
        this.squares = _.map(
            this.squares,
            ([i,j]) => [j, i_max - i]
        )
    }

    rot_ccw() {
        var j_max = this.j_max()
        this.squares = _.map(
            this.squares,
            ([i,j]) => [j_max - j, i]
        )
    }

    flip() {
        var j_max = this.j_max()
        this.squares = _.map(
            this.squares,
            ([i,j]) => [i, j_max - j]
        )
    }

    static from_grid(grid, offset=[0,0]) {
        var squares = []
        for (var i of range(grid.length)) {
            for (var j of range(grid[i].length)) {
                if (grid[i][j]) {
                    squares.push([i+offset[0],j+offset[1]])
                }
            }
        }
        return new Shape(squares)
    }
}