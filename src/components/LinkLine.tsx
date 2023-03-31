import { ControlPoint } from './Q'
import React from 'react'

function LinkLine(props: ControlPoint) {
    const { p1, p2, p3 } = props
    const points = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`
    return (
        <polyline
            points={points}
            fill="none"
            stroke="black"
            strokeLinejoin="round"
            strokeWidth={5}
        ></polyline>
    )
}

export default LinkLine
