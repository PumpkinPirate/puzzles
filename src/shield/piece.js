var pieces = [
    {
        name: "Straight",
        weight: 4,
    },
    {
        name: "L",
        weight: 8,
    },
    {
        name: "Paw",
        weight: 9,
    },
    {
        name: "Mountian",
        weight: 15,
    },
    {
        name: "Claw",
        weight: 15,
    },
    {
        name: "V",
        weight: 4,
    },
    {
        name: "Seal",
        weight: 11,
    },
    {
        name: "Tadpole",
        weight: 9,
    },
    {
        name: "Hook",
        weight: 15,
    },
    {
        name: "Hexagon",
        weight: 4,
    },
    {
        name: "Hourglass",
        weight: 7,
    },
    {
        name: "S",
        weight: 4,
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
