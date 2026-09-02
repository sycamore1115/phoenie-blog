import appsJson from './apps.json'

export type MiniProgram = {
  name: string
  link?: string
  qr?: string
  intro?: string
  hidden?: boolean
}

const qrFiles = import.meta.glob<string>('./*.{png,jpg,jpeg,webp,gif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function parseLink(value: unknown) {
  if (typeof value !== 'string') return undefined
  const link = value.trim()
  if (!/^https?:\/\//i.test(link)) return undefined
  return link
}

function parseQr(value: unknown) {
  if (typeof value !== 'string') return undefined
  const qr = value.trim().replaceAll('\\', '/')
  if (!qr || qr.includes('..')) return undefined
  return qr
}

function qrFileName(qr: string) {
  return qr.replace(/^\.\//, '').split('/').pop() ?? qr
}

export function qrSrc(qr: string) {
  if (/^(https?:|data:|blob:)/i.test(qr)) return qr
  if (qr.startsWith('/') && !qr.startsWith('/miniprogram/')) return qr

  const file = qrFileName(qr)
  const match = Object.entries(qrFiles).find(([key]) => {
    const path = key.replaceAll('\\', '/')
    return path === `./${file}` || path.endsWith(`/${file}`)
  })
  if (match) return match[1]

  return `/miniprogram/${file}`
}

function parseApp(item: unknown): MiniProgram | null {
  if (!item || typeof item !== 'object') return null
  const record = item as Record<string, unknown>
  if (typeof record.name !== 'string' || !record.name.trim()) return null
  if (record.hidden === true || record.hidden === 'true') return null

  const intro = typeof record.intro === 'string' ? record.intro.trim() : ''

  return {
    name: record.name.trim(),
    link: parseLink(record.link),
    qr: parseQr(record.qr),
    intro: intro || undefined,
  }
}

export const miniPrograms: MiniProgram[] = Array.isArray(appsJson)
  ? appsJson.flatMap((item) => {
      const app = parseApp(item)
      return app ? [app] : []
    })
  : []
