import { ReactNode, createContext, useContext } from 'react'
import { MindMapTreeLayoutNode } from '../components/typing'

const LayoutContext = createContext<MindMapTreeLayoutNode[]>([])

export function LayoutContextProvider({
    children,
    value,
}: {
    children: ReactNode
    value: MindMapTreeLayoutNode[]
}) {
    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    )
}

export function useLayoutArr() {
    return useContext(LayoutContext)
}
