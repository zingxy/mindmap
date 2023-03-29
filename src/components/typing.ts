const GAP = 0
interface Point {
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
  childrenLayoutHeight: number[]
} & Point

export function getLayoutArr(
  root: MindMapTreeNode,
  arr: MindMapTreeNode[]
): MindMapTreeLayoutNode[] {
  const layoutArr: MindMapTreeLayoutNode[] = []

  function dfs(root: MindMapTreeNode): MindMapTreeLayoutNode {
    // base case
    if (!root.children?.length) {
      const layoutNode: MindMapTreeLayoutNode = {
        id: root.id,
        x: 0,
        y: 0,
        parent: null,
        node: root,
        layoutHeight: root.height,
        childrenLayoutHeight: [],
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
      layoutHeight: (root.children.length - 1) * GAP,
      childrenLayoutHeight: [],
    }

    for (const childId of root.children) {
      const child = arr.find((item) => item.id === childId)!
      const childLayoutNode = dfs(child)
      childLayoutNode.parent = layoutNode
      layoutNode.layoutHeight += childLayoutNode.layoutHeight
      layoutNode.childrenLayoutHeight.push(childLayoutNode.layoutHeight)
    }
    layoutArr.push(layoutNode)
    return layoutNode
  }
  dfs(root)
  return layoutArr
}
