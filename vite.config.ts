import path from 'node:path'
import fs from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const ARTICLE_ROOTS = [
  { prefix: '/oss-coding', root: path.resolve('C:/myProject/blogs/coding-article') },
  { prefix: '/oss-english', root: path.resolve('C:/myProject/blogs/english-article') },
] as const

function localArticlesPlugin(prefix: string, root: string): Plugin {
  return {
    name: `local-articles-${prefix.replace(/^\//, '')}`,
    configureServer(server) {
      server.middlewares.use(prefix, (req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          next()
          return
        }

        const relative = decodeURIComponent((req.url ?? '/').split('?')[0] ?? '/')
        const filePath = path.resolve(root, `.${relative}`)
        const fromRoot = path.relative(root, filePath)
        if (fromRoot.startsWith('..') || path.isAbsolute(fromRoot)) {
          res.statusCode = 403
          res.end('Forbidden')
          return
        }

        fs.readFile(filePath, (error, data) => {
          if (error) {
            res.statusCode = 404
            res.end('Not found')
            return
          }

          const ext = path.extname(filePath).toLowerCase()
          const types: Record<string, string> = {
            '.json': 'application/json; charset=utf-8',
            '.markdown': 'text/markdown; charset=utf-8',
            '.md': 'text/markdown; charset=utf-8',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
          }
          res.setHeader('Content-Type', types[ext] ?? 'application/octet-stream')
          res.end(data)
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), ...ARTICLE_ROOTS.map(({ prefix, root }) => localArticlesPlugin(prefix, root))],
})
