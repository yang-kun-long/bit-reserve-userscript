import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monkey from 'vite-plugin-monkey'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: 'BIT 研讨室预约助手',
        namespace: 'bit.edu.cn',
        version: '1.0.0',
        description: '优化 BIT 研讨室预约体验，提供快速流畅的预约界面',
        author: 'BIT Student',
        match: ['http://stu.bit.edu.cn/xsfw/sys/cdyyapp/*', 'https://stu.bit.edu.cn/xsfw/sys/cdyyapp/*'],
        icon: 'https://stu.bit.edu.cn/favicon.ico',
        grant: ['GM_xmlhttpRequest', 'GM_setValue', 'GM_getValue'],
        'run-at': 'document-start',
        require: [
          'https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js',
        ],
      },
      build: {
        externalGlobals: {
          vue: 'Vue',
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
})
