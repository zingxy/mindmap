import type { MindMapTreeNode } from './components/typing'
export const items: MindMapTreeNode[] = [
    {
        id: '1',
        height: 50,
        width: 50,
        children: ['2', '3', '4', '7'],
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
