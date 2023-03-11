import React, { useState } from 'react'

import { nanoid } from 'nanoid'

interface MindNodeType {
    id: string
    x: number
    y: number
    height: number
    width: number
    children?: MindNodeType[]
}

interface MindNodeProps {
    child: MindNodeType
    parent: MindNodeType
}

interface Point {
    x: number
    y: number
}

function MindNode({ child, parent }: MindNodeProps) {
    const { x, y, height, width } = child

    const points = getControlPoints(parent, child)

    return (
        <g
            stroke="black"
            fill="none"
            strokeWidth={2}
        >
            <foreignObject
                x={x}
                y={y}
                height={height}
                width={width}
            >
                <div
                    tabIndex={1}
                    className="w-full h-full bg-green-500 flex items-center justify-center rounded-md"
                    onKeyDown={(e) => {
                        e.preventDefault()
                        console.log(e.key)
                    }}
                    onClick={(e) => {
                        const div = e.target as HTMLDivElement
                        div.focus()
                    }}
                >
                    Root
                </div>
            </foreignObject>
            <Q {...points} />
        </g>
    )
}

type QProps = Record<'p1' | 'p2' | 'p3', Point>
/* 绘制二次贝塞尔曲线 */
function Q({ p1, p2, p3 }: QProps) {
    const d = `M ${p1.x} ${p1.y} Q ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`
    return (
        <>
            {[p1, p2, p3].map((p, idx) => (
                <circle
                    key={idx}
                    cx={p.x}
                    cy={p.y}
                    r={2}
                />
            ))}
            <path d={d} />
        </>
    )
}

function Canvas() {
    const [items, setItems] = useState<MindNodeType[]>([
        { id: nanoid(), x: 200, y: 200, height: 50, width: 50 },
    ])

    return (
        <svg
            width="100vw"
            height="100vh"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id="smallGrid"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 8 0 L 0 0 0 8"
                        fill="none"
                        stroke="gray"
                        strokeWidth="0.5"
                    />
                </pattern>
                <pattern
                    id="grid"
                    width="80"
                    height="80"
                    patternUnits="userSpaceOnUse"
                >
                    <rect
                        width="80"
                        height="80"
                        fill="url(#smallGrid)"
                    />
                    <path
                        d="M 80 0 L 0 0 0 80"
                        fill="none"
                        stroke="gray"
                        strokeWidth="1"
                    />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                fill="url(#grid)"
            />
            {/* content */}
            {items.map((item, idx) => {
                return (
                    <MindNode
                        key={idx}
                        parent={items[0]}
                        child={item}
                    />
                )
            })}
        </svg>
    )
}

/* 获取三个控制点 */
function getControlPoints(parent: MindNodeType, child: MindNodeType): QProps {
    const start = { x: 0, y: 0 }
    start.x = parent.x + parent.width
    start.y = parent.y + 0.5 * parent.height

    const end = { x: 0, y: 0 }
    end.x = child.x
    end.y = child.y + 0.5 * child.height

    const mid = { x: 0, y: 0 }

    mid.x = start.x
    mid.y = end.y

    return { p1: start, p2: mid, p3: end }
}

export default Canvas
