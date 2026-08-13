import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  r: number
  tw: number
  sp: number
  drift: number
}

type Meteor = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mouse = { x: 0.5, y: 0.5 }
    const particles: Particle[] = []
    const meteors: Meteor[] = []
    let width = 0
    let height = 0
    let raf = 0
    let meteorTimer = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const seed = () => {
      particles.length = 0
      const count = Math.round((width * height) / 2600)
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() ** 2 * 1.6 + 0.2,
          tw: Math.random() * Math.PI * 2,
          sp: 0.006 + Math.random() * 0.018,
          drift: (Math.random() - 0.5) * 0.04,
        })
      }
    }

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 0.7 + width * 0.15,
        y: Math.random() * height * 0.35,
        vx: 5 + Math.random() * 4,
        vy: 2.2 + Math.random() * 2,
        life: 0,
        max: 42 + Math.random() * 18,
      })
    }

    const onMove = (event: PointerEvent) => {
      mouse.x = event.clientX / width
      mouse.y = event.clientY / height
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const mx = (mouse.x - 0.5) * 18
      const my = (mouse.y - 0.5) * 12

      for (const star of particles) {
        star.tw += star.sp
        star.x += star.drift
        if (star.x < -4) star.x = width + 4
        if (star.x > width + 4) star.x = -4

        const twinkle = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(star.tw))
        const px = star.x + mx * star.r
        const py = star.y + my * star.r

        if (star.r > 1.05) {
          const glow = ctx.createRadialGradient(px, py, 0, px, py, star.r * 6)
          glow.addColorStop(0, `rgba(255, 236, 200, ${twinkle * 0.28})`)
          glow.addColorStop(1, 'rgba(255, 236, 200, 0)')
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(px, py, star.r * 6, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = `rgba(255, 248, 232, ${twinkle})`
        ctx.beginPath()
        ctx.arc(px, py, star.r, 0, Math.PI * 2)
        ctx.fill()
      }

      meteorTimer += 1
      if (meteorTimer > 280 && Math.random() < 0.012) {
        spawnMeteor()
        meteorTimer = 0
      }

      for (let i = meteors.length - 1; i >= 0; i -= 1) {
        const meteor = meteors[i]
        if (!meteor) continue
        meteor.life += 1
        meteor.x += meteor.vx
        meteor.y += meteor.vy
        const fade = 1 - meteor.life / meteor.max

        ctx.strokeStyle = `rgba(255, 244, 220, ${fade * 0.85})`
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.moveTo(meteor.x, meteor.y)
        ctx.lineTo(meteor.x - meteor.vx * 7, meteor.y - meteor.vy * 7)
        ctx.stroke()

        ctx.fillStyle = `rgba(255, 252, 245, ${fade})`
        ctx.beginPath()
        ctx.arc(meteor.x, meteor.y, 1.5, 0, Math.PI * 2)
        ctx.fill()

        if (meteor.life > meteor.max) meteors.splice(i, 1)
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}
