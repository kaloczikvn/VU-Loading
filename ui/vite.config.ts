
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import vext from "vite-plugin-vext";

export default defineConfig(({ command }) => {
  const isProduction = command === 'build'

  if (isProduction) {
    return {
      plugins: [
        react(),
        vext.default(),
        {
          name: 'create-coherent-html',
          writeBundle() {
            // Create HTML file for Coherent after build
            const htmlContent = `<!DOCTYPE html>
                                  <html lang="en">
                                    <head>
                                      <meta charset="utf-8" />
                                      <meta name="viewport" content="width=device-width, initial-scale=1" />
                                      <title>VU-Loading</title>
                                      <link rel="stylesheet" href="style.css">
                                      <script>
                                        window.process = {
                                          env: {
                                            NODE_ENV: 'production'
                                          }
                                        };
                                      </script>
                                    </head>
                                    <body>
                                      <div id="root"></div>
                                      <script src="app.umd.js"></script>
                                    </body>
                                  </html>`

            fs.writeFileSync(path.join('dist', 'index.html'), htmlContent)
          }
        }
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'globalThis',
      },
      build: {
        target: 'es2015',
        cssCodeSplit: false,
        lib: {
          entry: './src/main.tsx',
          name: 'App',
          formats: ['umd'],
          fileName: () => 'app.umd.js'
        },
        rollupOptions: {
          external: [],
          output: {
            globals: {}
          }
        }
      }
    }
  } else {
    // Development config
    return {
      plugins: [react(), vext.default()],
    }
  }
})