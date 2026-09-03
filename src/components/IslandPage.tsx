import type { ReactNode } from 'react'
import '../island.css'

type IslandPageProps = {
  children: ReactNode
  center?: boolean
}

export function IslandPage({ children, center = false }: IslandPageProps) {
  return <main className={center ? 'island island--center' : 'island'}>{children}</main>
}
