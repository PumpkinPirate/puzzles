import _ from 'lodash'

var pieces = [
    {
        name: "P1",
        weight: 22,
        shape: [
            [1,1],
            [1,1],
            [1,0]
        ]
    },
    {
        name: "P2",
        weight: 22,
        shape: [
            [1,1,1],
            [1,1,0]
        ]
    },
    {
        name: "F1",
        weight: 14,
        shape: [
            [0,1,1],
            [1,1,0],
            [0,1,0]
        ]
    },
    {
        name: "F2",
        weight: 14,
        shape: [
            [0,1,0],
            [1,1,1],
            [1,0,0]
        ]
    },
    {
        name: "Y",
        weight: 14*2,
        shape: [
            [1,1,1,1],
            [0,1,0,0]
        ]
    },
    {
        name: "N",
        weight: 8*2,
        shape: [
            [1,1,1,0],
            [0,0,1,1]
        ]
    },
    {
        name: "L",
        weight: 8*2,
        shape: [
            [1,1,1,1],
            [0,0,0,1]
        ]
    },
    {
        name: "T1",
        weight: 7,
        shape: [
            [1,1,1],
            [0,1,0],
            [0,1,0]
        ]
    },
    {
        name: "T2",
        weight: 7,
        shape: [
            [1,0,0],
            [1,1,1],
            [1,0,0]
        ]
    },
    {
        name: "W",
        weight: 4*2,
        shape: [
            [1,1,1,0],
            [0,0,1,1]
        ]
    },
    {
        name: "V",
        weight: 4*2,
        shape: [
            [1,0,0],
            [1,0,0],
            [1,1,1]
        ]
    },
    {
        name: "U1",
        weight: 4,
        shape: [
            [1,1],
            [1,0],
            [1,1]
        ]
    },
    {
        name: "U2",
        weight: 4,
        shape: [
            [1,0,1],
            [1,1,1]
        ]
    },
    {
        name: "Z1",
        weight: 4,
        shape: [
            [1,1,0],
            [0,1,0],
            [0,1,1]
        ]
    },
    {
        name: "Z2",
        weight: 4,
        shape: [
            [1,0,0],
            [1,1,1],
            [0,0,1]
        ]
    },
    {
        name: "X",
        weight: 3*2,
        shape: [
            [0,1,0],
            [1,1,1],
            [0,1,0]
        ]
    },
    {
        name: "I",
        weight: 4,
        shape: [
            [1,1,1,1,1]
        ]
    },
]

var total_weight = pieces.map(p => p.weight).reduce((t,w)=>t+w, 0)

function empty_shape(h, w) {
    return _.times(h, () => _.times(w, _.constant(0)))
}

export class PentominoPiece {
    constructor(shape, name) {
        this.shape = _.cloneDeep(shape)
        this.name = name
        this.horizontal = true
    }

    get height() {
        return this.shape.length
    }

    get width() {
        return _.max(this.shape.map(row => row.length)) || 0
    }

    rot_cw() {
        var new_height = this.width
        var new_width = this.height
        var new_shape = empty_shape(new_height, new_width)
        for (var i of _.range(new_height)) {
            for (var j of _.range(new_width)) {
                new_shape[i][j] = this.shape[new_width-j-1][i]
            }
        }
        this.shape = new_shape
        this.horizontal = !this.horizontal
    }

    rot_ccw() {
        var new_height = this.width
        var new_width = this.height
        var new_shape = empty_shape(new_height, new_width)
        for (var i of _.range(new_height)) {
            for (var j of _.range(new_width)) {
                new_shape[i][j] = this.shape[j][new_height-i-1]
            }
        }
        this.shape = new_shape
        this.horizontal = !this.horizontal
    }

    flip() {
        this.shape = this.shape.map(_.reverse)
    }

    static random() {
        var r = Math.random() * total_weight
        var t = 0
        for (const p of pieces) {
            t += p.weight
            if (t > r)
                return new PentominoPiece(p.shape, p.name)
        }
    }
}
