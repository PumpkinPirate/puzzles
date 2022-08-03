import bearUrl from './img/bear.png'
import snakeUrl from './img/snake.png'
import crownUrl from './img/crown.png'
import sealUrl from './img/seal.png'
import batUrl from './img/bat.png'
import straightUrl from './img/straight.png'
import mountainUrl from './img/mountain.png'
import butterflyUrl from './img/butterfly.png'
import lobsterUrl from './img/lobster.png'
import hexagonUrl from './img/hexagon.png'
import hookUrl from './img/hook.png'
import lUrl from './img/L.png'

var pieces = [
    {
        name: "Straight",
        weight: 4,
        image: straightUrl
    },
    {
        name: "L",
        weight: 8,
        image: lUrl
    },
    {
        name: "Crown",
        weight: 9,
        image: crownUrl
    },
    {
        name: "Mountian",
        weight: 15,
        image: mountainUrl
    },
    {
        name: "Bear",
        weight: 15,
        image: bearUrl
    },
    {
        name: "Bat",
        weight: 4,
        image: batUrl
    },
    {
        name: "Seal",
        weight: 11,
        image: sealUrl
    },
    {
        name: "Lobster",
        weight: 9,
        image: lobsterUrl
    },
    {
        name: "Hook",
        weight: 15,
        image: hookUrl
    },
    {
        name: "Hexagon",
        weight: 4,
        image: hexagonUrl
    },
    {
        name: "Butterfly",
        weight: 7,
        image: butterflyUrl
    },
    {
        name: "Snake",
        weight: 4,
        image: snakeUrl
    },
]

var total_weight = pieces.map(p => p.weight).reduce((t, w) => t + w, 0)

export function random() {
    var r = Math.random() * total_weight
    var t = 0
    for (const p of pieces) {
        t += p.weight
        if (t > r)
            return p
    }
}
