import _ from 'lodash'

import { CoolingPiece } from './piece.js'

let _locTable = []

function loc(u, v) {
    // Return a canonical reference to the array [u, v] so that locations can be 
    // compared for equality and used in sets.
    //console.log(`Loc ${u} ${v}`)
    for (const i of _.range(_locTable.length, u+1, 1)) {
        _locTable[i] = []
        //console.log(`Row ${i}`)
    }

    for (const i of _.range(_locTable[u].length, v+1, 1)) {
        _locTable[u][i] = [u, i]
        //console.log(`Cell ${u} ${i}`)
    }

    return _locTable[u][v]
}

export class CoolingGame {
    constructor() {
        this.width = 6
        this.height = 10
        this.maxGroup = 6
        this.scoreDecay = 0.5

        this.lastScore = 0
        this.averageScore = null
        this.messages = []
        this.board = []
    }

    start() {
        this.lastScore = 0
        this.averageScore = null
        this.messages = []

        this.fillBoard()
    }

    fillBoard() {
        this.board = _.map(
            _.range(this.height),
            () => _.map(
                _.range(this.width),
                () => CoolingPiece.random()
            )
        )

        this.coolBoard()
    }

    boardScore() {
        return _.sumBy(this.board, row => _.sumBy(row, piece => piece.score()))
    }
    
    rotateChain(chain, rotation) {
        //TODO: Verify chain is valid
        let chainPieces = chain.map(([u,v]) => ({u, v, piece: this.pieceAt([u,v], chain, rotation)}))
        for (const {u, v, piece} of chainPieces) {
            this.board[u][v] = piece
        }

        this.coolBoard()
        this.newRow()
        this.coolBoard()
    }

    neighbors([i,j]) {
        let neighbors = []
        if (i > 0) {
            neighbors.push(loc(i-1, j))
        }
        if (j > 0) {
            neighbors.push(loc(i, j-1))
        }
        if (i < this.height-1) {
            neighbors.push(loc(i+1, j))
        }
        if (j < this.width-1) {
            neighbors.push(loc(i, j+1))
        }
        return neighbors
    }

    pieceAt([u,v], chain=[], rotation=0) {
        chain = chain.map(([u1,v1]) => loc(u1,v1))
        let l = loc(u,v)
        let i = chain.indexOf(l)
        if (i == -1 || !rotation) {
            return this.board[u][v]
        }
        
        let l2 = chain.at((i - rotation) % chain.length)
        let [u2, v2] = l2
        return this.board[u2][v2]
    }

    coolBoard() {
        let sizes = _.map(
            _.range(this.height),
            () => _.map(
                _.range(this.width),
                () => 0
            )
        )

        for (const i of _.range(this.height)) {
            for (const j of _.range(this.width)) {
                if (sizes[i][j] > 0) {
                    continue
                }

                let l = loc(i,j)
                let area = new Set([l])
                let perimeter = new Set(this.neighbors(l))

                for (const p of perimeter) {
                    if (this.pieceAt(l).kind == this.pieceAt(p).kind) {
                        area.add(p)
                        for (const n of this.neighbors(p)) {
                            if (!area.has(n)) {
                                perimeter.add(n)
                            }
                        }
                    }
                }

                for (const a of area) {
                    let [u,v] = a
                    sizes[u][v] = area.size
                    let piece = this.pieceAt(a)
                    piece.heat = Math.min(piece.heat, Math.max(0, this.maxGroup-area.size))
                    //console.log(area, area.size)
                }
            }
        }
        //console.log(sizes)
    }

    newRow() {
        this.score(this.board.shift())
        this.board.push(_.map(
            _.range(this.width),
            () => CoolingPiece.random()
        ))
    }

    score(row) {
        this.lastScore = _.sumBy(row, piece => piece.score())
        if (this.averageScore === null) {
            this.averageScore = this.lastScore
        }
        else {
            this.averageScore = this.averageScore * (1-this.scoreDecay) + this.lastScore * this.scoreDecay
        }
    }
}