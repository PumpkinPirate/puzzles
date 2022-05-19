import _ from 'lodash'

let pieceKinds = ['A', 'B', 'C', 'D', 'E']

export class CoolingPiece {
    constructor(kind, heat) {
        this.id = _.uniqueId("piece")
        this.kind = kind
        this.heat = heat
    }

    static random() {
        
        return new CoolingPiece(_.sample(pieceKinds), 3)
    }
}