import type { MindNodeType } from './components/Canvas'

export const items: MindNodeType[] = [
  {
    id: '1',
    x: 100,
    y: 100,
    height: 50,
    width: 50,
    children: ['2', '3', '4'],
  },
  {
    id: '2',
    x: 100,
    y: 100,
    height: 50,
    width: 50,
  },
  {
    id: '3',
    x: 100,
    y: 100,
    height: 50,
    width: 50,
  },
  {
    id: '4',
    x: 100,
    y: 100,
    height: 50,
    width: 50,
    children: ['5', '6'],
  },
  {
    id: '5',
    x: 100,
    y: 100,
    height: 50,
    width: 50,
  },
  {
    id: '6',
    x: 100,
    y: 100,
    height: 50,
    width: 50,
  },
]

export function getLayoutHeight(root: MindNodeType) {
  if (!root.children || root.children.length === 0) {
    root.layoutHeight = root.height
    return root.height
  }
  let totalHeight = 0
  root.childrenLayout = []
  for (const childId of root.children) {
    const child = items.find((i) => i.id == childId)!
    const childLayoutHeihgt = getLayoutHeight(child)
    root.childrenLayout.push(childLayoutHeihgt)
    totalHeight += childLayoutHeihgt
  }
  root.layoutHeight = totalHeight
  return totalHeight
}
