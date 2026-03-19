import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

;(function() {
  'use strict'

  // 立即隐藏原页面 loading spinner
  const style = document.createElement('style')
  style.textContent = '.app-loading { display: none !important; }'
  document.documentElement.appendChild(style)

  function mountApp() {
    document.body.style.visibility = 'hidden'
    document.body.innerHTML = '<div id="bit-reserve-app"></div>'
    // 阻止原网站脚本继续执行
    document.querySelectorAll('script[src]').forEach(el => el.remove())
    document.querySelectorAll('link[rel="stylesheet"]').forEach(el => el.remove())
    const app = createApp(App)
    app.mount('#bit-reserve-app')
    document.body.style.visibility = ''
  }

  if (document.body) {
    mountApp()
  } else {
    // 用 MutationObserver 监听 body 出现，比 setInterval 更快
    const observer = new MutationObserver(() => {
      if (document.body) {
        observer.disconnect()
        mountApp()
      }
    })
    observer.observe(document.documentElement, { childList: true })
  }
})()

