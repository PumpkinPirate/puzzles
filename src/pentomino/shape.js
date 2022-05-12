import _, { range } from 'lodash'

export class Shape {
    constructor(squares) {
        this.squares = squares
    }

    add(square) {
        this.squares.push(square)
    }

    x_min(y) {
        var squares = this.squares
        if (y != undefined) {
            squares = _.filter(squares, s=>s[1]==y)
        }
        return _.min(_.map(squares, s=>s[0]))
    }

    y_min(x) {
        var squares = this.squares
        if (x != undefined) {
            squares = _.filter(squares, s=>s[0]==x)
        }
        return _.min(_.map(squares, s=>s[1]))
    }

    x_max(y) {
        var squares = this.squares
        if (y != undefined) {
            squares = _.filter(squares, s=>s[1]==y)
        }
        return _.max(_.map(squares, s=>s[0]))
    }

    y_max(x) {
        var squares = this.squares
        if (x != undefined) {
            squares = _.filter(squares, s=>s[0]==x)
        }
        return _.max(_.map(squares, s=>s[1]))
    }

    outline() {
        var segments = []
        for (const [x,y] of this.squares) {
            if (!this.includes([x, y+1])) {
                segments.push([x, y+1, x+1, y+1])
            }
            if (!this.includes([x+1, y])) {
                segments.push([x+1, y+1, x+1, y])
            }
            if (!this.includes([x, y-1])) {
                segments.push([x+1, y, x, y])
            }
            if (!this.includes([x-1, y])) {
                segments.push([x, y, x, y+1])
            }
        }

        var paths = []
        while (segments.length) {
            var segment = segments.pop()
            var path = []
            do {
                path.push( [segment[0], segment[1]] )
                segment = segments.find(s => s[0] == segment[2] && s[1] == segment[3])
                _.pull(segments, segment)
            }  while (segment)

            paths.push(path)
        }
        return paths
    }

    difference(other, offset=[0,0]) {
        return new Shape(_.differenceWith(
            this.squares,
            _.map(other.squares, ([x,y])=>[x+offset[0], y+offset[1]]),
            _.isEqual
        ))
    }

    overlaps(other, offset=[0,0]) {
        return _.intersectionWith(
            this.squares,
            _.map(other.squares, ([x,y])=>[x+offset[0], y+offset[1]]),
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
        this.squares = _.map(
            this.squares,
            ([x,y]) => [-y, x]
        )
    }

    rot_ccw() {
        this.squares = _.map(
            this.squares,
            ([x,y]) => [y, -x]
        )
    }

    flip() {
        this.squares = _.map(
            this.squares,
            ([x,y]) => [-x, y]
        )
    }

    static from_grid(grid, offset=[0,0]) {
        var squares = []
        for (var i of range(grid.length)) {
            for (var j of range(grid[i].length)) {
                if (grid[i][j]) {
                    squares.push([j+offset[0],i+offset[1]])
                }
            }
        }
        return new Shape(squares)
    }
}