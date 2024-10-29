import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  //const apiURL = env.VITE_API_URL 

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: https://jed-tw3l.onrender.com,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
