import sessionsJson from './sessions.json'

export type SwimSession = {
  date: string
  note: string
  milestone: boolean
}

export type SwimPhase = {
  title: string
  sessions: SwimSession[]
}

function parseSession(item: unknown): SwimSession | null {
  if (!item || typeof item !== 'object') return null
  const record = item as Record<string, unknown>
  if (typeof record.date !== 'string' || typeof record.note !== 'string') return null

  return {
    date: record.date.trim(),
    note: record.note.trim(),
    milestone: record.milestone === true,
  }
}

function parseSessionList(items: unknown) {
  if (!Array.isArray(items)) return []
  return items
    .flatMap((item) => {
      const session = parseSession(item)
      return session ? [session] : []
    })
    .sort((a, b) => a.date.localeCompare(b.date))
}

function parsePhase(item: unknown, index: number): SwimPhase | null {
  if (Array.isArray(item)) {
    const sessions = parseSessionList(item)
    if (sessions.length === 0) return null
    return { title: `第 ${index + 1} 期`, sessions }
  }

  if (!item || typeof item !== 'object') return null
  const record = item as Record<string, unknown>
  const sessions = parseSessionList(record.sessions)
  if (sessions.length === 0) return null

  const title =
    typeof record.title === 'string' && record.title.trim()
      ? record.title.trim()
      : `第 ${index + 1} 期`

  return { title, sessions }
}

export const phases: SwimPhase[] = (sessionsJson as unknown[])
  .flatMap((item, index) => {
    const phase = parsePhase(item, index)
    return phase ? [phase] : []
  })

export const sessionCount = phases.reduce((sum, phase) => sum + phase.sessions.length, 0)
