import path from 'node:path'
import fs from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const ARTICLES_ROOT = path.resolve('C:/myProject/coding-article')

function localArticlesPlugin(root: string): Plugin {
  return {
    name: 'local-coding-articles',
    configureServer(server) {
      server.middlewares.use('/oss-coding', (req, res, next) => {
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
  plugins: [react(), localArticlesPlugin(ARTICLES_ROOT)],
})
