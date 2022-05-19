import _ from 'lodash'

import { CoolingPiece } from './piece.js'

let _locTable = []

function loc(u, v) {
    // Return a canonical reference to the array [u, v] so that locations can be 
    // compared for equality and used in sets.
    console.log(`Loc ${u} ${v}`)
    for (const i of _.range(_locTable.length, u+1, 1)) {
        _locTable[i] = []
        console.log(`Row ${i}`)
    }

    for (const i of _.range(_locTable[u].length, v+1, 1)) {
        _locTable[u][i] = [u, i]
        console.log(`Cell ${u} ${i}`)
    }

    return _locTable[u][v]
}

export class CoolingGame {
    constructor() {
        this.width = 6
        this.height = 10
        this.maxGroup = 6
        this.score = 0
        this.combo = 0
        this.board = []
        this.messages = []
    }

    start() {
        this.score = 0
        this.combo = 0
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

    rotateChain(chain) {
        //TODO: Verify chain is valid
        let [u0, v0] = chain[0]
        let next_piece = this.board[u0][v0]
        for (let i of _.range(1, chain.length)) {
            let [u, v] = chain[i]
            let last_piece = next_piece
            next_piece = this.board[u][v]
            this.board[u][v] = last_piece
        }
        this.board[u0][v0] = next_piece

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

    pieceAt([i,j]) {
        return this.board[i][j]
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
        this.board.shift()
        this.board.push(_.map(
            _.range(this.width),
            () => CoolingPiece.random()
        ))
    }
}