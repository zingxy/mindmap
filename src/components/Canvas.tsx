import { MindMapTreeNode, computeTreePosition, getLayoutArr } from './typing'
import ChildrenLayout from './ChildrenLayout'

const nodeArr: MindMapTreeNode[] = [
    {
        id: '1',
        height: 50,
        width: 50,
        children: ['2', '3', '4', '7', '9'],
    },
    {
        id: '7',
        height: 50,
        width: 50,
        children: [],
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
        children: ['5', '6', '8'],
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
    {
        id: '8',
        height: 50,
        width: 50,
        children: [],
    },
    {
        id: '10',
        height: 50,
        width: 50,
        children: [],
    },
    {
        id: '11',
        height: 50,
        width: 50,
        children: [],
    },
    {
        id: '9',
        height: 50,
        width: 50,
        children: ['10', '11'],
    },
]
const layoutArr = getLayoutArr(nodeArr[0], nodeArr)
console.log(layoutArr)
const rootLayoutNode = layoutArr.find((i) => i.id == '1')!
rootLayoutNode.x = 100
rootLayoutNode.y = 100
function Canvas() {
    computeTreePosition(rootLayoutNode)
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
            {layoutArr.map((node) => {
                if (node.layoutChildren?.length > 0) {
                    return (
                        <ChildrenLayout
                            key={node.id}
                            root={node}
                        />
                    )
                }
            })}
        </svg>
    )
}

export default Canvas
