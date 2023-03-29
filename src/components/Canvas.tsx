import React, { useState } from 'react'

import { nanoid } from 'nanoid'

import { getLayoutHeight, items, items as nodes } from '../mock'
import { MindMapTreeNode, getLayoutArr } from './typing'

const nodeArr: MindMapTreeNode[] = [
  {
    id: '1',
    height: 50,
    width: 50,
    children: ['2', '3', '4'],
  },
  {
    id: '2',
    height: 50,
    width: 50,
    children: [],
  },
  {
    id: '3',
    height: 50,
    width: 50,
    children: [],
  },
  {
    id: '4',
    height: 50,
    width: 50,
    children: ['5', '6'],
  },
  {
    id: '5',
    height: 50,
    width: 50,
    children: [],
  },
  {
    id: '6',
    height: 50,
    width: 50,
    children: [],
  },
]

const layoutArr = getLayoutArr(nodeArr[0], nodeArr)

console.log(layoutArr)

export interface MindNodeType {
  id: string
  /* 起点坐标 */
  x: number
  y: number
  /* 内容区域宽高 */
  height: number
  width: number
  children?: string[]
  /* 当前元素的布局高度 */
  layoutHeight?: number
  /* 每个子元素的布局高度 */
  childrenLayout?: number[]
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
          {child.id}
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

interface GroupLayoutProps {
  parent: MindNodeType
  childrenLayout: {
    id: string
    height: number
  }[]
  totalHeight: number
}
/* 根据父元素位置，自动子元素排版 */
function GroupLayout({
  parent,
  childrenLayout,
  totalHeight,
}: GroupLayoutProps) {
  const anchor = {
    x: parent.x + parent.width,
    y: parent.y + (1 / 2) * parent.height,
    id: '',
  }
  const origin = { x: 0, y: 0, id: '', height: 0, width: 0 }
  origin.x = anchor.x + 50
  origin.y = anchor.y - (1 / 2) * totalHeight

  const layoutPoints: Pick<
    MindNodeType,
    'x' | 'y' | 'id' | 'height' | 'width'
  >[] = [origin]

  const firstNode = items.find((i) => i.id === childrenLayout[0].id)!

  origin.id = firstNode.id
  origin.height = firstNode.height
  origin.width = firstNode.width

  for (let i = 1; i < childrenLayout.length; i++) {
    const { id, height } = childrenLayout[i]
    const node = items.find((i) => i.id === id)!

    layoutPoints.push({
      id,
      x: origin.x,
      y: layoutPoints[layoutPoints.length - 1].y + height,
      height: node.height,
      width: node.width,
    })
  }
  return (
    <g>
      {layoutPoints.map((p) => {
        return (
          <MindNode
            key={p.id}
            child={p}
            parent={parent}
          />
        )
      })}
    </g>
  )
}

function Canvas() {
  const [items, setItems] = useState<MindNodeType[]>(nodes)

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
      <MindNode
        parent={items[0]}
        child={items[0]}
      />
      <GroupLayout
        parent={items[0]}
        totalHeight={200}
        childrenLayout={[
          { id: '2', height: 50 },
          { id: '3', height: 100 },
          { id: '4', height: 50 },
        ]}
      />
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
