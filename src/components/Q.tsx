import type { Point } from './typing'
export type QProps = Record<'p1' | 'p2' | 'p3', Point>
export default function Q({ p1, p2, p3 }: QProps) {
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
            <path
                d={d}
                fill="none"
                stroke="black"
            />
        </>
    )
}
