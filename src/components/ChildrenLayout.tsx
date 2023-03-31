import {
    MindMapTreeLayoutNode,
    computeControlPoints,
} from './typing'
// 根据layoutArr自动计算布局

import Q from './Q'

interface ChildrenLayoutProps {
    //   parent: MindMapTreeNode
    root: MindMapTreeLayoutNode
}

export default function ChildrenLayout({
    root: rootLayoutNode,
}: ChildrenLayoutProps) {
    const layoutChildren = rootLayoutNode.layoutChildren
    // computeChildrenPosition(rootLayoutNode)

    return (
        <g>
            {layoutChildren.map((child) => {
                return (
                    <LayoutNode
                        key={child.id}
                        root={child}
                        parent={rootLayoutNode}
                    />
                )
            })}
        </g>
    )
}

interface LayoutNodeProps {
    root: MindMapTreeLayoutNode
    parent: MindMapTreeLayoutNode
}
export function LayoutNode({ root, parent }: LayoutNodeProps) {
    const controlPoints = computeControlPoints(parent, root)
    return (
        <>
            <Q {...controlPoints} />
            <rect
                x={root.x}
                y={root.y}
                height={root.layoutHeight}
                width={root.node.width}
                stroke="black"
                fill="none"
            ></rect>
        </>
    )
}
