import { MindMapTreeLayoutNode } from './typing'
// 根据layoutArr自动计算布局

import Q from './Q'

interface ChildrenLayoutProps {
    //   parent: MindMapTreeNode
    root: MindMapTreeLayoutNode
}
// 绘制该节点所有子节点
export default function ChildrenLayout({
    root: rootLayoutNode,
}: ChildrenLayoutProps) {
    const layoutChildren = rootLayoutNode.layoutChildren
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
    return (
        <>
            <Q
                start={parent}
                end={root}
            />
            {/* <rect
                className=""
                x={root.x}
                y={root.y}
                height={root.layoutHeight}
                width={root.node.width}
                stroke="black"
                fill="none"
                onClick={() => console.log('clicked')}
            ></rect> */}
            <foreignObject
                x={root.x}
                y={root.y + 0.5 * root.layoutHeight - 0.5 * root.node.height}
                width={root.node.width}
                height={root.node.height}
                stroke="red"
            >
                <div
                    className="flex justify-center items-center bg-slate-200 hover:bg-red-500"
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {root.id}
                </div>
            </foreignObject>
        </>
    )
}
