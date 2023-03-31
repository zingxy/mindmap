import { ControlPoint } from './Q'

export interface Point {
    x: number
    y: number
}
export interface MindMapTreeNode {
    /* meta */
    id: string
    height: number
    width: number
    children: MindMapTreeNode['id'][]
}

export type MindMapTreeLayoutNode = {
    id: MindMapTreeNode['id']
    node: MindMapTreeNode
    parent: MindMapTreeLayoutNode | null
    layoutHeight: number
    layoutChildren: MindMapTreeLayoutNode[]
} & Point

const GAP = 50 // 层间距
const MARGIN = 15 // 节点距离， 实际上相邻会叠加
// get layout information
export function getLayoutArr(
    root: MindMapTreeNode,
    arr: MindMapTreeNode[]
): MindMapTreeLayoutNode[] {
    const layoutArr: MindMapTreeLayoutNode[] = []

    function dfs(root: MindMapTreeNode): MindMapTreeLayoutNode {
        // base case
        if (!root.children?.length) {
            // root is a leaf node, set layoutHeight = root.height
            const layoutNode: MindMapTreeLayoutNode = {
                id: root.id,
                x: 0,
                y: 0,
                parent: null,
                node: root,
                layoutHeight: root.height + 2 * MARGIN,
                layoutChildren: [],
            }
            layoutArr.push(layoutNode)
            return layoutNode
        }

        // make progress

        const layoutNode: MindMapTreeLayoutNode = {
            id: root.id,
            x: 0,
            y: 0,
            parent: null,
            node: root,
            layoutHeight: 0,
            layoutChildren: [],
        }
        // layoutHeight = sum of  childrens layoutHeight + GAP between o
        for (const childId of root.children) {
            const child = arr.find((item) => item.id === childId)!
            const childLayoutNode = dfs(child)
            childLayoutNode.parent = layoutNode
            layoutNode.layoutHeight += childLayoutNode.layoutHeight
            layoutNode.layoutChildren.push(childLayoutNode)
        }
        layoutArr.push(layoutNode)
        return layoutNode
    }
    dfs(root)
    return layoutArr
}

export function computeTreePosition(root: MindMapTreeLayoutNode) {
    const Q = [root]
    while (Q.length > 0) {
        const len = Q.length
        for (let i = 0; i < len; i++) {
            const node = Q.shift()!
            const layoutChildren = computeChildrenPosition(node)
            for (const child of layoutChildren) {
                Q.push(child)
            }
        }
    }
}

/**
/**
 * 计算layoutNode的位置
 * rootLayout中点作为父连接点
 */
export function computeChildrenPosition(root: MindMapTreeLayoutNode) {
    const layoutChildren = root.layoutChildren
    const totalHeight = root.layoutHeight
    const anchor: Point = {
        x: root.x + root.node.width,
        // 改变这个可以获得奇怪的效果
        // y: root.y + 0.5 * root.node.height,
        y: root.y + 0.5 * totalHeight,
    }
    const originH = anchor.y - 0.5 * totalHeight
    let acc = 0
    for (const child of layoutChildren) {
        child.x = anchor.x + GAP
        child.y = originH + acc
        acc += child.layoutHeight
    }
    return layoutChildren
}

export function computeControlPoints(
    parent: MindMapTreeLayoutNode,
    child: MindMapTreeLayoutNode
): ControlPoint {
    const start = { x: 0, y: 0 }
    start.x = parent.x + parent.node.width
    start.y = 0.5 * parent.layoutHeight + parent.y
    const end = { x: 0, y: 0 }
    end.x = child.x
    end.y = child.y + 0.5 * child.layoutHeight

    const mid = { x: start.x, y: end.y }
    return { p1: start, p2: mid, p3: end }
}
