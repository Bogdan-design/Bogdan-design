import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  // resolve: {
  //   alias: [{ find: '@', replacement: path.resolve(_dirname, 'src') }],
  // },
})
