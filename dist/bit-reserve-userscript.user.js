// ==UserScript==
// @name         BIT 研讨室预约助手
// @namespace    bit.edu.cn
// @version      1.0.0
// @author       BIT Student
// @description  优化 BIT 研讨室预约体验，提供快速流畅的预约界面
// @icon         https://stu.bit.edu.cn/favicon.ico
// @match        http://stu.bit.edu.cn/xsfw/sys/cdyyapp/*
// @match        https://stu.bit.edu.cn/xsfw/sys/cdyyapp/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

(function(vue) {
var d = new Set();
	var _virtual_monkey_css_side_effects_default = async (e) => {
		d.has(e) || (d.add(e), ((t) => {
			typeof GM_addStyle == "function" ? GM_addStyle(t) : (document.head || document.documentElement).appendChild(document.createElement("style")).append(t);
		})(e));
	};

_virtual_monkey_css_side_effects_default(` @import "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323:wght@400&display=swap";.bit-reserve-container[data-v-5e6e39b2]{--sdv-bg:#2d1b00;--sdv-bg2:#3d2800;--sdv-paper:#f5e6c8;--sdv-paper2:#edddb0;--sdv-border:#6b4c2a;--sdv-border-dark:#3d2800;--sdv-green:#4a7c3f;--sdv-green-dark:#2d5a27;--sdv-green-light:#6aab5e;--sdv-orange:#c8702a;--sdv-orange-dark:#a05520;--sdv-yellow:#e8c84a;--sdv-red:#c83030;--sdv-red-dark:#a02020;--sdv-text:#2d1b00;--sdv-text-light:#6b4c2a;--sdv-white:#fff8f0;--sdv-shadow:#1a0d00;--sdv-pixel:4px;background-color:var(--sdv-bg);background-image:repeating-linear-gradient(0deg,#0000,#0000 31px,#00000026 31px 32px),repeating-linear-gradient(90deg,#0000,#0000 31px,#00000014 31px 32px);min-height:100vh;padding:20px;font-family:VT323,"Press Start 2P",monospace}.loading[data-v-5e6e39b2],.error[data-v-5e6e39b2]{min-height:80vh;color:var(--sdv-paper);flex-direction:column;justify-content:center;align-items:center;font-family:VT323,monospace;font-size:22px;display:flex}.spinner[data-v-5e6e39b2]{background:var(--sdv-yellow);width:48px;height:48px;box-shadow:4px 0 0 var(--sdv-orange), 0 4px 0 var(--sdv-green), -4px 0 0 var(--sdv-orange-dark), 0 -4px 0 var(--sdv-green-dark);animation:.8s steps(4,end) infinite pixel-spin-5e6e39b2}@keyframes pixel-spin-5e6e39b2{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.error button[data-v-5e6e39b2]{background:var(--sdv-orange);color:var(--sdv-white);border:none;border-top:4px solid var(--sdv-yellow);border-left:4px solid var(--sdv-yellow);border-right:4px solid var(--sdv-orange-dark);border-bottom:4px solid var(--sdv-orange-dark);cursor:pointer;letter-spacing:1px;margin-top:20px;padding:10px 30px;font-family:VT323,monospace;font-size:20px;transition:filter .1s}.error button[data-v-5e6e39b2]:hover{filter:brightness(1.15)}.error button[data-v-5e6e39b2]:active{border-top:4px solid var(--sdv-orange-dark);border-left:4px solid var(--sdv-orange-dark);border-right:4px solid var(--sdv-yellow);border-bottom:4px solid var(--sdv-yellow)}.main-content[data-v-5e6e39b2]{max-width:1200px;margin:0 auto}.header[data-v-5e6e39b2]{text-align:center;color:var(--sdv-paper);margin-bottom:24px}.header h1[data-v-5e6e39b2]{color:var(--sdv-yellow);text-shadow:2px 2px 0 var(--sdv-shadow), -1px -1px 0 var(--sdv-border-dark);letter-spacing:2px;margin:0;font-family:"Press Start 2P",monospace;font-size:1.4em;line-height:1.6}.subtitle[data-v-5e6e39b2]{opacity:.85;color:var(--sdv-paper2);margin-top:10px;font-family:VT323,monospace;font-size:20px}.filters[data-v-5e6e39b2]{background:var(--sdv-paper);border-top:4px solid var(--sdv-paper2);border-left:4px solid var(--sdv-paper2);border-right:4px solid var(--sdv-border);border-bottom:4px solid var(--sdv-border);flex-wrap:wrap;align-items:center;gap:15px;margin-bottom:16px;padding:16px 20px;display:flex}.filter-item[data-v-5e6e39b2]{align-items:center;gap:8px;display:flex}.filter-item label[data-v-5e6e39b2]{color:var(--sdv-text);font-family:VT323,monospace;font-size:20px;font-weight:700}.filter-item input[data-v-5e6e39b2],.filter-item select[data-v-5e6e39b2]{border-top:3px solid var(--sdv-border-dark);border-left:3px solid var(--sdv-border-dark);border-right:3px solid var(--sdv-paper2);border-bottom:3px solid var(--sdv-paper2);background:var(--sdv-white);color:var(--sdv-text);outline:none;padding:6px 10px;font-family:VT323,monospace;font-size:18px}.refresh-btn[data-v-5e6e39b2]{background:var(--sdv-green);color:var(--sdv-white);border:none;border-top:3px solid var(--sdv-green-light);border-left:3px solid var(--sdv-green-light);border-right:3px solid var(--sdv-green-dark);border-bottom:3px solid var(--sdv-green-dark);cursor:pointer;letter-spacing:1px;margin-left:auto;padding:8px 20px;font-family:VT323,monospace;font-size:20px}.refresh-btn[data-v-5e6e39b2]:hover{filter:brightness(1.15)}.refresh-btn[data-v-5e6e39b2]:active{border-top:3px solid var(--sdv-green-dark);border-left:3px solid var(--sdv-green-dark);border-right:3px solid var(--sdv-green-light);border-bottom:3px solid var(--sdv-green-light)}.sites-container[data-v-5e6e39b2]{background:var(--sdv-paper);border-top:4px solid var(--sdv-paper2);border-left:4px solid var(--sdv-paper2);border-right:4px solid var(--sdv-border);border-bottom:4px solid var(--sdv-border);min-height:400px;padding:16px}.empty[data-v-5e6e39b2]{text-align:center;color:var(--sdv-text-light);padding:60px 20px;font-family:VT323,monospace;font-size:22px}.sites-grid[data-v-5e6e39b2]{grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;display:grid}.site-card[data-v-5e6e39b2]{background:var(--sdv-white);border-top:4px solid var(--sdv-paper2);border-left:4px solid var(--sdv-paper2);border-right:4px solid var(--sdv-border);border-bottom:4px solid var(--sdv-border);cursor:pointer;padding:14px;transition:filter .1s}.site-card[data-v-5e6e39b2]:hover{filter:brightness(.95);border-top:4px solid var(--sdv-border);border-left:4px solid var(--sdv-border);border-right:4px solid var(--sdv-paper2);border-bottom:4px solid var(--sdv-paper2)}.site-card h3[data-v-5e6e39b2]{color:var(--sdv-text);margin:0 0 8px;font-family:VT323,monospace;font-size:22px}.site-info[data-v-5e6e39b2]{gap:8px;margin-bottom:8px;display:flex}.badge[data-v-5e6e39b2]{background:var(--sdv-paper2);color:var(--sdv-text);border:2px solid var(--sdv-border);padding:2px 8px;font-family:VT323,monospace;font-size:16px}.badge.open[data-v-5e6e39b2]{background:var(--sdv-green);color:var(--sdv-white);border-color:var(--sdv-green-dark)}.badge.closed[data-v-5e6e39b2]{background:var(--sdv-red);color:var(--sdv-white);border-color:var(--sdv-red-dark)}.week-status[data-v-5e6e39b2]{gap:4px;display:flex}.day-status[data-v-5e6e39b2]{text-align:center;flex:1;padding:4px;font-family:VT323,monospace;font-size:14px}.day-status.locked[data-v-5e6e39b2]{background:var(--sdv-paper2);color:var(--sdv-text-light)}.day-status.available[data-v-5e6e39b2]{background:var(--sdv-green);color:var(--sdv-white)}.day-status.occupied[data-v-5e6e39b2]{background:var(--sdv-orange);color:var(--sdv-white)}.pagination[data-v-5e6e39b2]{color:var(--sdv-paper);justify-content:center;align-items:center;gap:20px;margin-top:20px;font-family:VT323,monospace;font-size:20px;display:flex}.pagination button[data-v-5e6e39b2]{background:var(--sdv-paper);color:var(--sdv-text);border:none;border-top:3px solid var(--sdv-paper2);border-left:3px solid var(--sdv-paper2);border-right:3px solid var(--sdv-border);border-bottom:3px solid var(--sdv-border);cursor:pointer;padding:6px 18px;font-family:VT323,monospace;font-size:18px}.pagination button[data-v-5e6e39b2]:disabled{opacity:.5;cursor:not-allowed}.modal[data-v-5e6e39b2]{z-index:1000;background:#1a0d00bf;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.modal-content[data-v-5e6e39b2]{background:var(--sdv-paper);border-top:6px solid var(--sdv-paper2);border-left:6px solid var(--sdv-paper2);border-right:6px solid var(--sdv-border-dark);border-bottom:6px solid var(--sdv-border-dark);width:90%;max-width:600px;max-height:80vh;padding:24px;font-family:VT323,monospace;position:relative;overflow-y:auto}.modal-content h2[data-v-5e6e39b2]{color:var(--sdv-text);border-bottom:3px solid var(--sdv-border);margin:0 0 16px;padding-bottom:8px;padding-right:30px;font-family:VT323,monospace;font-size:26px}.close-btn[data-v-5e6e39b2]{background:var(--sdv-red);border:none;border-top:3px solid #e06060;border-left:3px solid #e06060;border-right:3px solid var(--sdv-red-dark);border-bottom:3px solid var(--sdv-red-dark);cursor:pointer;color:var(--sdv-white);justify-content:center;align-items:center;width:28px;height:28px;font-family:VT323,monospace;font-size:16px;display:flex;position:absolute;top:10px;right:10px}.close-btn[data-v-5e6e39b2]:active{border-top:3px solid var(--sdv-red-dark);border-left:3px solid var(--sdv-red-dark);border-bottom:3px solid #e06060;border-right:3px solid #e06060}.detail-info p[data-v-5e6e39b2]{color:var(--sdv-text);margin:8px 0;font-size:18px}.rules[data-v-5e6e39b2]{margin-top:12px}.rules pre[data-v-5e6e39b2]{white-space:pre-wrap;background:var(--sdv-paper2);border-left:4px solid var(--sdv-border);color:var(--sdv-text);padding:10px;font-family:VT323,monospace;font-size:16px}.form-actions[data-v-5e6e39b2]{align-items:stretch;gap:10px;margin-top:12px;display:flex}.save-info-btn[data-v-5e6e39b2]{background:var(--sdv-paper2);color:var(--sdv-text);border:none;border-top:3px solid var(--sdv-white);border-left:3px solid var(--sdv-white);border-right:3px solid var(--sdv-border);border-bottom:3px solid var(--sdv-border);cursor:pointer;white-space:nowrap;flex:none;padding:10px 16px;font-family:VT323,monospace;font-size:18px}.save-info-btn[data-v-5e6e39b2]:hover{filter:brightness(.95)}.reserve-btn[data-v-5e6e39b2]{background:var(--sdv-green);width:auto;color:var(--sdv-white);border:none;border-top:4px solid var(--sdv-green-light);border-left:4px solid var(--sdv-green-light);border-right:4px solid var(--sdv-green-dark);border-bottom:4px solid var(--sdv-green-dark);cursor:pointer;letter-spacing:2px;flex:1;margin-top:0;padding:10px 12px;font-family:VT323,monospace;font-size:22px}.reserve-btn[data-v-5e6e39b2]:hover{filter:brightness(1.1)}.reserve-btn[data-v-5e6e39b2]:active{border-top:4px solid var(--sdv-green-dark);border-left:4px solid var(--sdv-green-dark);border-right:4px solid var(--sdv-green-light);border-bottom:4px solid var(--sdv-green-light)}.reserve-btn[data-v-5e6e39b2]:disabled{opacity:.6;cursor:not-allowed}.load-time-btn[data-v-5e6e39b2]{background:var(--sdv-paper2);border:none;border-top:3px solid var(--sdv-white);border-left:3px solid var(--sdv-white);border-right:3px solid var(--sdv-border);border-bottom:3px solid var(--sdv-border);cursor:pointer;width:100%;color:var(--sdv-text);margin-top:12px;padding:8px;font-family:VT323,monospace;font-size:18px}.load-time-btn[data-v-5e6e39b2]:disabled{opacity:.6;cursor:not-allowed}.time-slots[data-v-5e6e39b2]{margin-top:12px;font-size:18px}.slots-grid[data-v-5e6e39b2]{flex-wrap:wrap;gap:8px;margin-top:8px;display:flex}.slot[data-v-5e6e39b2]{background:var(--sdv-green);color:var(--sdv-white);border:2px solid var(--sdv-green-dark);padding:4px 10px;font-family:VT323,monospace;font-size:16px}.detail-loading[data-v-5e6e39b2]{text-align:center;color:var(--sdv-text-light);padding:30px;font-family:VT323,monospace;font-size:20px}.form-group[data-v-5e6e39b2]{margin-bottom:14px}.form-group label[data-v-5e6e39b2]{color:var(--sdv-text);margin-bottom:4px;font-family:VT323,monospace;font-size:20px;font-weight:700;display:block}.form-group input[data-v-5e6e39b2],.form-group select[data-v-5e6e39b2],.form-group textarea[data-v-5e6e39b2]{border:none;border-top:3px solid var(--sdv-border-dark);border-left:3px solid var(--sdv-border-dark);border-right:3px solid var(--sdv-paper2);border-bottom:3px solid var(--sdv-paper2);background:var(--sdv-white);width:100%;color:var(--sdv-text);box-sizing:border-box;outline:none;padding:7px 10px;font-family:VT323,monospace;font-size:18px}.form-group textarea[data-v-5e6e39b2]{resize:vertical;height:80px}.slots-check[data-v-5e6e39b2]{flex-wrap:wrap;gap:8px;margin-top:6px;display:flex}.slot-check-item[data-v-5e6e39b2]{cursor:pointer;border:2px solid #0000;align-items:center;gap:4px;padding:4px 10px;font-family:VT323,monospace;font-size:17px;display:flex}.slot-check-item.available[data-v-5e6e39b2]{background:var(--sdv-green);color:var(--sdv-white);border-color:var(--sdv-green-dark);font-weight:700}.slot-check-item.occupied[data-v-5e6e39b2]{color:var(--sdv-red-dark);border-color:var(--sdv-red);cursor:not-allowed;background:#f5e0e0}.slot-check-item.past[data-v-5e6e39b2]{background:var(--sdv-paper2);color:var(--sdv-text-light);border-color:var(--sdv-border);cursor:not-allowed;opacity:.6}.tabs[data-v-5e6e39b2]{justify-content:center;gap:8px;margin-top:12px;display:flex}.tab-btn[data-v-5e6e39b2]{background:var(--sdv-bg2);color:var(--sdv-paper2);border:none;border-top:3px solid var(--sdv-border);border-left:3px solid var(--sdv-border);border-right:3px solid var(--sdv-border-dark);border-bottom:3px solid var(--sdv-border-dark);cursor:pointer;letter-spacing:1px;padding:8px 20px;font-family:VT323,monospace;font-size:20px;transition:filter .1s}.tab-btn[data-v-5e6e39b2]:hover{filter:brightness(1.2)}.tab-btn.active[data-v-5e6e39b2]{background:var(--sdv-green);color:var(--sdv-white);border-top:3px solid var(--sdv-green-light);border-left:3px solid var(--sdv-green-light);border-right:3px solid var(--sdv-green-dark);border-bottom:3px solid var(--sdv-green-dark)}.records-container[data-v-5e6e39b2]{padding:10px 0}.record-card[data-v-5e6e39b2]{background:var(--sdv-paper);border-top:4px solid var(--sdv-paper2);border-left:4px solid var(--sdv-paper2);border-right:4px solid var(--sdv-border);border-bottom:4px solid var(--sdv-border);cursor:pointer;margin-bottom:10px;padding:12px 15px;transition:filter .1s}.record-card[data-v-5e6e39b2]:hover{filter:brightness(.96)}.record-header[data-v-5e6e39b2]{justify-content:space-between;align-items:center;margin-bottom:6px;display:flex}.record-site[data-v-5e6e39b2]{color:var(--sdv-text);font-family:VT323,monospace;font-size:20px;font-weight:700}.record-status[data-v-5e6e39b2]{border:2px solid #0000;padding:2px 8px;font-family:VT323,monospace;font-size:16px}.record-status.pending[data-v-5e6e39b2]{color:#7a5200;border-color:var(--sdv-orange);background:#fff3cd}.record-status.approved[data-v-5e6e39b2]{background:var(--sdv-paper2);color:var(--sdv-green-dark);border-color:var(--sdv-green)}.record-status.draft[data-v-5e6e39b2]{background:var(--sdv-paper2);color:var(--sdv-text-light);border-color:var(--sdv-border)}.record-info[data-v-5e6e39b2]{color:var(--sdv-text);font-family:VT323,monospace;font-size:18px}.record-time[data-v-5e6e39b2]{color:var(--sdv-text-light);margin-top:4px;font-family:VT323,monospace;font-size:15px}.loading-inline[data-v-5e6e39b2]{text-align:center;color:var(--sdv-paper);padding:20px;font-family:VT323,monospace;font-size:22px}.detail-fields[data-v-5e6e39b2]{margin-bottom:15px}.detail-row[data-v-5e6e39b2]{border-bottom:2px solid var(--sdv-paper2);color:var(--sdv-text);justify-content:space-between;padding:8px 0;font-family:VT323,monospace;font-size:18px;display:flex}.detail-row span[data-v-5e6e39b2]:first-child{color:var(--sdv-text-light);flex-shrink:0;margin-right:10px}.cancel-btn[data-v-5e6e39b2]{background:var(--sdv-red);width:100%;color:var(--sdv-white);border:none;border-top:4px solid #e06060;border-left:4px solid #e06060;border-right:4px solid var(--sdv-red-dark);border-bottom:4px solid var(--sdv-red-dark);cursor:pointer;letter-spacing:1px;padding:10px;font-family:VT323,monospace;font-size:20px}.cancel-btn[data-v-5e6e39b2]:hover{filter:brightness(1.1)}.cancel-btn[data-v-5e6e39b2]:active{border-top:4px solid var(--sdv-red-dark);border-left:4px solid var(--sdv-red-dark);border-bottom:4px solid #e06060;border-right:4px solid #e06060}
/*$vite$:1*/ `);

_virtual_monkey_css_side_effects_default(":root{--text:#6b6375;--text-h:#08060d;--bg:#fff;--border:#e5e4e7;--code-bg:#f4f3ec;--accent:#aa3bff;--accent-bg:#aa3bff1a;--accent-border:#aa3bff80;--social-bg:#f4f3ec80;--shadow:#0000001a 0 10px 15px -3px, #0000000d 0 4px 6px -2px;--sans:system-ui, \"Segoe UI\", Roboto, sans-serif;--heading:system-ui, \"Segoe UI\", Roboto, sans-serif;--mono:ui-monospace, Consolas, monospace;font:18px/145% var(--sans);letter-spacing:.18px;--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light dark;color:var(--text);background:var(--bg);font-synthesis:none;text-rendering:optimizelegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){:root{--lightningcss-light: ;--lightningcss-dark:initial}}@media (width<=1024px){:root{font-size:16px}}@media (prefers-color-scheme:dark){:root{--text:#9ca3af;--text-h:#f3f4f6;--bg:#16171d;--border:#2e303a;--code-bg:#1f2028;--accent:#c084fc;--accent-bg:#c084fc26;--accent-border:#c084fc80;--social-bg:#2f303a80;--shadow:#0006 0 10px 15px -3px, #00000040 0 4px 6px -2px}#social .button-icon{filter:invert()brightness(2)}}body{margin:0}h1,h2{font-family:var(--heading);color:var(--text-h);font-weight:500}h1{letter-spacing:-1.68px;margin:32px 0;font-size:56px}@media (width<=1024px){h1{margin:20px 0;font-size:36px}}h2{letter-spacing:-.24px;margin:0 0 8px;font-size:24px;line-height:118%}@media (width<=1024px){h2{font-size:20px}}p{margin:0}code,.counter{font-family:var(--mono);color:var(--text-h);border-radius:4px;display:inline-flex}code{background:var(--code-bg);padding:4px 8px;font-size:15px;line-height:135%}.counter{color:var(--accent);background:var(--accent-bg);border:2px solid #0000;border-radius:5px;margin-bottom:24px;padding:5px 10px;font-size:16px;transition:border-color .3s}.counter:hover{border-color:var(--accent-border)}.counter:focus-visible{outline:2px solid var(--accent);outline-offset:2px}.hero{position:relative}.hero .base,.hero .framework,.hero .vite{margin:0 auto;inset-inline:0}.hero .base{z-index:0;width:170px;position:relative}.hero .framework,.hero .vite{position:absolute}.hero .framework{z-index:1;height:28px;top:34px;transform:perspective(2000px)rotate(300deg)rotateX(44deg)rotateY(39deg)scale(1.4)}.hero .vite{z-index:0;width:auto;height:26px;top:107px;transform:perspective(2000px)rotate(300deg)rotateX(40deg)rotateY(39deg)scale(.8)}#app{text-align:center;border-inline:1px solid var(--border);box-sizing:border-box;flex-direction:column;width:1126px;max-width:100%;min-height:100svh;margin:0 auto;display:flex}#center{flex-direction:column;flex-grow:1;place-content:center;place-items:center;gap:25px;display:flex}@media (width<=1024px){#center{gap:18px;padding:32px 20px 24px}}#next-steps{border-top:1px solid var(--border);text-align:left;display:flex}#next-steps>div{flex:1 1 0;padding:32px}@media (width<=1024px){#next-steps>div{padding:24px 20px}}#next-steps .icon{width:22px;height:22px;margin-bottom:16px}@media (width<=1024px){#next-steps{text-align:center;flex-direction:column}}#docs{border-right:1px solid var(--border)}@media (width<=1024px){#docs{border-right:none;border-bottom:1px solid var(--border)}}#next-steps ul{gap:8px;margin:32px 0 0;padding:0;list-style:none;display:flex}#next-steps ul .logo{height:18px}#next-steps ul a{color:var(--text-h);background:var(--social-bg);border-radius:6px;align-items:center;gap:8px;padding:6px 12px;font-size:16px;text-decoration:none;transition:box-shadow .3s;display:flex}#next-steps ul a:hover{box-shadow:var(--shadow)}#next-steps ul a .button-icon{width:18px;height:18px}@media (width<=1024px){#next-steps ul{flex-wrap:wrap;justify-content:center;margin-top:20px}#next-steps ul li{flex:calc(50% - 8px)}#next-steps ul a{box-sizing:border-box;justify-content:center;width:100%}}#spacer{border-top:1px solid var(--border);height:88px}@media (width<=1024px){#spacer{height:48px}}.ticks{width:100%;position:relative}.ticks:before,.ticks:after{content:\"\";border:5px solid #0000;position:absolute;top:-4.5px}.ticks:before{border-left-color:var(--border);left:0}.ticks:after{border-right-color:var(--border);right:0}");
var BASE_URL = "https://stu.bit.edu.cn/xsfw";
	var CDYY_BASE = `${BASE_URL}/sys/cdyyapp`;
	function gmFetch(url, options = {}) {
		if (typeof GM_xmlhttpRequest === "undefined") {
			console.error("[gmFetch] GM_xmlhttpRequest 未定义！");
			console.log("[gmFetch] 可用的 GM 函数:", Object.keys(window).filter((k) => k.startsWith("GM")));
			console.warn("[gmFetch] 降级使用普通 fetch");
			return fetch(url, {
				...options,
				credentials: "include"
			});
		}
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: options.method || "GET",
				url,
				headers: options.headers || {},
				data: options.body,
				onload: (response) => {
					resolve({
						ok: response.status >= 200 && response.status < 300,
						status: response.status,
						statusText: response.statusText,
						text: () => Promise.resolve(response.responseText),
						json: () => Promise.resolve(JSON.parse(response.responseText))
					});
				},
				onerror: (error) => {
					reject( new Error("Network request failed"));
				}
			});
		});
	}
	async function request(url, options = {}) {
		const defaultOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				"X-Requested-With": "XMLHttpRequest",
				"Referer": "https://stu.bit.edu.cn/xsfw/sys/cdyyapp/*default/index.do",
				"Origin": "https://stu.bit.edu.cn"
			}
		};
		const mergedOptions = {
			...defaultOptions,
			...options,
			headers: {
				...defaultOptions.headers,
				...options.headers || {}
			}
		};
		const response = await gmFetch(url, mergedOptions);
		console.log(`[API] ${mergedOptions.method} ${url} -> ${response.status}`);
		if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		const data = await response.json();
		console.log(`[API] Response:`, data);
		if (data.code !== void 0 && data.code !== "0") throw new Error(data.msg || "请求失败");
		return data;
	}
	function postData(data) {
		return "data=" + encodeURIComponent(JSON.stringify(data));
	}
async function preheat() {
		try {
			const referer = `${CDYY_BASE}/*default/index.do`;
			const origin = "https://stu.bit.edu.cn";
			const appidMatch = (await (await gmFetch(`${CDYY_BASE}/*default/index.do?THEME=indigo&EMAP_LANG=zh`, {
				method: "GET",
				headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
			})).text()).match(/APPID["']\s*[:=]\s*["'](\d{8,})["']/);
			const appid = appidMatch ? appidMatch[1] : "4974886768205231";
			console.log("[预热] APPID:", appid);
			const configResp = await request(`${BASE_URL}/sys/swpubapp/indexmenu/getAppConfig.do?appId=${appid}&appName=cdyyapp`, { method: "POST" });
			console.log("[预热] 应用配置:", configResp);
			let roleId = null;
			const drops = configResp?.HEADER?.dropMenu || [];
			console.log("[预热] dropMenu:", drops);
			if (drops.length > 0) roleId = drops[0].id;
			console.log("[预热] roleId:", roleId);
			if (roleId) {
				await request(`${BASE_URL}/sys/funauthapp/api/changeAppRole/cdyyapp/${roleId}.do`, { method: "POST" });
				await gmFetch(`${BASE_URL}/sys/swpubapp/userinfo/setXgCommonAppRole.do`, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
						"Referer": referer,
						"Origin": origin
					},
					body: `requestParamStr=${encodeURIComponent(JSON.stringify({ ROLEID: roleId }))}`
				});
			} else console.log("[预热] 未找到 roleId，跳过角色切换");
			await gmFetch(`${BASE_URL}/i18n.do?appName=cdyyapp&EMAP_LANG=zh`, {
				method: "GET",
				headers: {
					"Referer": referer,
					"Origin": origin
				}
			});
			console.log("[预热] 完成");
			return true;
		} catch (error) {
			console.error("[预热] 失败:", error);
			throw error;
		}
	}
async function getSiteDetail(cddm) {
		return (await request(`${CDYY_BASE}/modules/CdyyAuditController/getSiteInformation.do`, {
			method: "POST",
			body: postData({ CDDM: cddm })
		})).data;
	}
async function getAvailableTimeSlots(cddm, yyrq) {
		return (await request(`${CDYY_BASE}/modules/CdyyAuditController/getkyysdList.do`, {
			method: "POST",
			body: postData({
				CDDM: cddm,
				YYRQ: yyrq
			})
		})).data || [];
	}
async function getUserInfo() {
		const d = (await request(`${CDYY_BASE}/modules/CdyyApplyController/getUserInfo.do`, {
			method: "POST",
			body: "data={}"
		})).data || {};
		return {
			name: d.XM,
			phone: d.SJH,
			dwdm: d.SZDWDM
		};
	}
async function submitReserve(reserveData) {
		return await request(`${CDYY_BASE}/modules/CdyyApplyController/saveReserveSite.do`, {
			method: "POST",
			body: postData(reserveData)
		});
	}
async function getReserveRecords(pageNumber = 1, pageSize = 10) {
		return (await request(`${CDYY_BASE}/modules/kyycd/cxcdyyjl.do`, {
			method: "POST",
			body: `data=${encodeURIComponent(JSON.stringify({
				pageNumber,
				pageSize
			}))}`
		})).datas?.cxcdyyjl || {
			rows: [],
			totalSize: 0
		};
	}
async function getReserveDetail(wid) {
		return (await request(`${CDYY_BASE}/modules/CdyyAuditController/getReserveInformation.do`, {
			method: "POST",
			body: `data=${encodeURIComponent(JSON.stringify({ WID: wid }))}`
		})).data;
	}
async function cancelReserve(wid) {
		return await request(`${CDYY_BASE}/modules/CdyyApplyController/backSiteApply.do`, {
			method: "POST",
			body: `data=${encodeURIComponent(JSON.stringify({ WID: wid }))}`
		});
	}
async function deleteReserve(wid, sqbm) {
		return await request(`${CDYY_BASE}/modules/CdyyApplyController/delReserveInformation.do`, {
			method: "POST",
			body: `data=${encodeURIComponent(JSON.stringify({
				WID: wid,
				SQBM: sqbm
			}))}`
		});
	}
var STATIC_SITES = [
		{
			CDDM: "0b0419ac-e4e9-8b5e-842d-feb931b85103",
			CDMC: "【精工书院】研讨室1",
			XQDM: "01"
		},
		{
			CDDM: "59f0aa39-0ed9-02e7-2bb6-39a73264400f",
			CDMC: "精工社区影音空间",
			XQDM: "01"
		},
		{
			CDDM: "3e8e4ca2-d412-a5fd-114b-338ad1c1ab5a",
			CDMC: "【精工书院】研讨室2",
			XQDM: "01"
		},
		{
			CDDM: "7ab1fcc8-ead3-2226-997a-37f99736f2c0",
			CDMC: "【精工书院】达观茶室",
			XQDM: "01"
		},
		{
			CDDM: "7b7f6ba0-743b-d86d-e57a-996befb78613",
			CDMC: "精工社区智慧空间",
			XQDM: "01"
		},
		{
			CDDM: "c35e6613-e455-f8a8-ce69-43ffcfa954dc",
			CDMC: "精工社区研讨室2",
			XQDM: "01"
		},
		{
			CDDM: "c3158073-6028-ba2c-68b8-36274b40ccbb",
			CDMC: "【精工书院】影音空间",
			XQDM: "01"
		},
		{
			CDDM: "f45c0743-a368-ffa8-565c-559e67614c57",
			CDMC: "【精工书院】文体空间",
			XQDM: "01"
		},
		{
			CDDM: "cfb35b4c-9cd0-dab4-7932-47f4f1517b92",
			CDMC: "【精工书院】导学空间",
			XQDM: "01"
		},
		{
			CDDM: "948be593-2c6b-df28-bcdf-a7782f40a409",
			CDMC: "【精工书院】科创空间",
			XQDM: "01"
		},
		{
			CDDM: "96cf500e-1803-2808-364d-790e87cee9c3",
			CDMC: "【精工书院】自习区2",
			XQDM: "01"
		},
		{
			CDDM: "512bbfe2-4f3c-4869-b4d9-2f4422d736a7",
			CDMC: "【精工书院】社区科创空间",
			XQDM: "01"
		},
		{
			CDDM: "9685139f-212b-e2f6-25b2-773a489f433c",
			CDMC: "【精工书院】社区导学空间",
			XQDM: "01"
		},
		{
			CDDM: "3117fc74-4548-92cf-f36e-00f9a7027664",
			CDMC: "【精工书院】社区研讨室2",
			XQDM: "01"
		},
		{
			CDDM: "990df375-aec4-b22f-9101-8a8992a4da40",
			CDMC: "【精工书院】自习区1",
			XQDM: "01"
		},
		{
			CDDM: "3308fa51-2541-3d96-720d-0aa0bbc35c2a",
			CDMC: "预约请前往微信小程序【BIT睿信空间】鸿远报告厅",
			XQDM: "02"
		},
		{
			CDDM: "d94c7353-ebe6-0a7d-c2f8-d427e4e8a37b",
			CDMC: "静园C-鸿远报告厅",
			XQDM: "02"
		},
		{
			CDDM: "6c1f9cdd-c2dc-6ed6-bf71-8676fc74fde9",
			CDMC: "【睿信书院】静c-C01 鸿远报告厅",
			XQDM: "02"
		},
		{
			CDDM: "bb681829-dcca-8901-1731-9b874742fd24",
			CDMC: "睿信社区-鸿远报告厅1",
			XQDM: "02"
		},
		{
			CDDM: "c5ba942e-d3ce-8d4d-65b1-4b023f0e0670",
			CDMC: "【睿信书院】静园c-鸿远报告厅",
			XQDM: "02"
		},
		{
			CDDM: "43f004f8-504c-1559-af0a-fbe731ee3a4c",
			CDMC: "【睿信书院】静c-C02 致真党建室",
			XQDM: "02"
		},
		{
			CDDM: "fc46b612-9de8-c6bf-99cd-c18b4fbc1898",
			CDMC: "【睿信书院】静园c-自控会议室",
			XQDM: "02"
		},
		{
			CDDM: "ca49c04f-2a91-575b-31b5-26370368ba86",
			CDMC: "【睿信书院】静c-C03 致诚会议室",
			XQDM: "02"
		},
		{
			CDDM: "aad07024-521e-eac9-3a4a-8c45234e5bfc",
			CDMC: "【睿信书院】静园c-Facetime导学室",
			XQDM: "02"
		},
		{
			CDDM: "4ec67b10-fd5a-26d5-74e7-8e1b8fe10d5e",
			CDMC: "【睿信书院】静园c-1024研讨室",
			XQDM: "02"
		},
		{
			CDDM: "b917a2f2-8d73-9ffa-a40f-c7af76754174",
			CDMC: "【睿信书院】静c-C04 FaceTime导学室",
			XQDM: "02"
		},
		{
			CDDM: "40ecc4ca-1f32-124b-1751-750f2e4c4d30",
			CDMC: "【睿信书院】静c-C05 致理导学室",
			XQDM: "02"
		},
		{
			CDDM: "57f56acd-8fa1-12f4-2046-2f194cb29a11",
			CDMC: "请前往小程序【BIT睿信】预约 ！",
			XQDM: "02"
		},
		{
			CDDM: "b5365738-f210-bb17-14de-a6b8ca89f5f7",
			CDMC: "【睿信书院】静c-RGB研讨室",
			XQDM: "02"
		},
		{
			CDDM: "bdd7a77a-cf93-805c-99ac-ca3847ff5682",
			CDMC: "请前往小程序【BIT睿信】预约 ！！",
			XQDM: "02"
		},
		{
			CDDM: "367093f5-c6de-95b1-25ed-4c7b54e4d25e",
			CDMC: "【睿信书院】静c-C11 创芯空间",
			XQDM: "02"
		},
		{
			CDDM: "36345b5b-6403-0d3e-1802-7b522421f482",
			CDMC: "【睿信书院】静c-C15 悠韵空间",
			XQDM: "02"
		},
		{
			CDDM: "88d5a7e9-5f32-d85a-8d8f-873580746253",
			CDMC: "睿信社区RGB·研讨室",
			XQDM: "02"
		},
		{
			CDDM: "eca84f67-6a9a-cdf7-8b91-8b6c41eee6ac",
			CDMC: "【睿信书院】静c-C16 信息实验室",
			XQDM: "02"
		},
		{
			CDDM: "9cc306c1-328f-bfb1-ddc0-8076cb64fe37",
			CDMC: "睿信社区诚行·文展厅",
			XQDM: "02"
		},
		{
			CDDM: "8f0df708-0d65-550c-28c4-e71d8100638d",
			CDMC: "【睿信书院】-鸿远报告厅",
			XQDM: "02"
		},
		{
			CDDM: "322c537f-2702-2135-997a-777fb2a4b201",
			CDMC: "【睿信书院】-静园c-鸿远报告厅",
			XQDM: "02"
		},
		{
			CDDM: "2878330c-c0bf-a508-b3e5-61de034d215b",
			CDMC: "求是社区D107",
			XQDM: "03"
		},
		{
			CDDM: "ed6525a0-c3db-0455-9425-f0b00c6e973d",
			CDMC: "求是社区D108",
			XQDM: "03"
		},
		{
			CDDM: "f684bcb2-2b9d-e534-548a-c33cfaef38f8",
			CDMC: "求是社区D109",
			XQDM: "03"
		},
		{
			CDDM: "8b7f8d60-c339-4c23-19dd-954c036fb59c",
			CDMC: "求是社区D111",
			XQDM: "03"
		},
		{
			CDDM: "07ec82a3-a3eb-0b5e-38b6-fc0634f37fcc",
			CDMC: "求是社区D113",
			XQDM: "03"
		},
		{
			CDDM: "6d91b9bb-8ea9-0027-74cf-14827d42b965",
			CDMC: "求是社区D114",
			XQDM: "03"
		},
		{
			CDDM: "6c719977-cb7e-338c-64db-75c8215d0c89",
			CDMC: "求是社区D115",
			XQDM: "03"
		},
		{
			CDDM: "894c7b73-7f36-a1d9-6dd3-9a53b85118df",
			CDMC: "求是社区D117",
			XQDM: "03"
		},
		{
			CDDM: "898003d4-dd42-08c7-bc90-c0117da7fa2c",
			CDMC: "求是社区D110",
			XQDM: "03"
		},
		{
			CDDM: "2639377c-d4b1-de5f-4303-8ced5c3f4212",
			CDMC: "求是社区D103",
			XQDM: "03"
		},
		{
			CDDM: "3c4b951a-35f7-f28b-6aa6-49c56c3a1f28",
			CDMC: "求是社区D112",
			XQDM: "03"
		},
		{
			CDDM: "78101223-bcaf-6bf1-3854-fdc437b72211",
			CDMC: "求是社区D104",
			XQDM: "03"
		},
		{
			CDDM: "3fba6d40-9e70-9240-4e3e-d7f0e356466c",
			CDMC: "求是社区D106",
			XQDM: "03"
		},
		{
			CDDM: "a1db1fc4-5a7b-8dbd-1687-931c6d3a80dc",
			CDMC: "明德书院社区-101春·言定【剧理工作室】（Multi-function Room）",
			XQDM: "04"
		},
		{
			CDDM: "615dd8eb-38a3-e1a3-9659-334bf12ffe19",
			CDMC: "明德书院社区-102春·事定（Multi-function Room）",
			XQDM: "04"
		},
		{
			CDDM: "60f48c32-fda2-609a-dd9d-cb4c31fe311b",
			CDMC: "明德书院社区-103春·行定（Counseling Room）",
			XQDM: "04"
		},
		{
			CDDM: "c53988bc-50eb-1cdc-4d8d-36d0e4ce2041",
			CDMC: "明德书院社区-104春·道定（Multi-function Room）",
			XQDM: "04"
		},
		{
			CDDM: "ce6a1d80-b450-aaac-24f9-e19578d68ea2",
			CDMC: "明德书院社区-108夏·心正（Video Room）",
			XQDM: "04"
		},
		{
			CDDM: "b7fda092-e92e-f4b5-b455-25f82caa69d7",
			CDMC: "明德书院社区-109夏·修身（Music Room）",
			XQDM: "04"
		},
		{
			CDDM: "98eb1cd3-8d74-778a-4a53-5198456ba05c",
			CDMC: "明德书院社区-110夏·齐家（DIY Workshop）",
			XQDM: "04"
		},
		{
			CDDM: "7e109478-8e8d-d9ad-c8dd-5dbaa4655f67",
			CDMC: "明德书院社区-111夏·治国（Multi-function Room）",
			XQDM: "04"
		},
		{
			CDDM: "443cd72c-7cc8-d256-e830-17d5b1eaea39",
			CDMC: "明德书院社区-113秋·爱国（Physical TrainingRroom）",
			XQDM: "04"
		},
		{
			CDDM: "2843331f-cf4f-012a-ac0f-02905bebab25",
			CDMC: "明德书院社区-114秋·励志（Party Office）",
			XQDM: "04"
		},
		{
			CDDM: "4f31f136-3c3d-71ca-ac11-7ebd6e32cbef",
			CDMC: "明德书院社区-115秋·求真（Study Room）",
			XQDM: "04"
		},
		{
			CDDM: "9f7ad4c3-fb05-b8c6-515a-f3a3a9e634ba",
			CDMC: "明德书院社区-116秋·力行（Meeting Room）",
			XQDM: "04"
		},
		{
			CDDM: "d6b1c51d-3fc1-f972-7506-dda941118600",
			CDMC: "明德书院社区 102 春·事定",
			XQDM: "04"
		},
		{
			CDDM: "13b0a084-44e0-06a2-e131-28cb9bff674c",
			CDMC: "明德书院社区",
			XQDM: "04"
		},
		{
			CDDM: "77e989a8-34f0-688c-3f49-f59b577fd204",
			CDMC: "汇贤学吧105-5",
			XQDM: "06"
		},
		{
			CDDM: "fcbaf157-0ede-0e19-4096-1b59f3aa40c4",
			CDMC: "汇贤学吧105-4",
			XQDM: "06"
		},
		{
			CDDM: "805e853a-5d4d-2268-6572-2f2986d0639b",
			CDMC: "汇贤学吧105-3",
			XQDM: "06"
		},
		{
			CDDM: "280fbf4b-2e27-1f7b-cd5d-63a7f38b3e0a",
			CDMC: "鹰翔驿站104",
			XQDM: "06"
		},
		{
			CDDM: "b6efbb9f-6f9f-542f-ce86-df085bc420fc",
			CDMC: "创演舞台",
			XQDM: "06"
		},
		{
			CDDM: "f457298d-a43d-bc0b-edf1-66792bb6ee34",
			CDMC: "会议室",
			XQDM: "06"
		},
		{
			CDDM: "61f5d8c9-1030-34aa-7993-f1eea60d78cc",
			CDMC: "鹰翔驿站106",
			XQDM: "06"
		},
		{
			CDDM: "e61a31bf-6977-42e7-8daf-46d82bd700a4",
			CDMC: "光影时空",
			XQDM: "06"
		},
		{
			CDDM: "e66a0cec-ee9d-6cee-6e7f-de6c7832902c",
			CDMC: "汇贤学吧105-1",
			XQDM: "06"
		},
		{
			CDDM: "ffdc1aab-7eb9-0ece-0fef-d68f5614f72e",
			CDMC: "汇贤学吧105-2",
			XQDM: "06"
		},
		{
			CDDM: "5452efb6-45e9-d13e-7567-8ea5d3088e34",
			CDMC: "心理素质拓展场地",
			XQDM: "05"
		},
		{
			CDDM: "ffd14b69-99cb-1752-26b7-ab3c84ada63a",
			CDMC: "交响乐排练室",
			XQDM: "07"
		},
		{
			CDDM: "db400892-26d5-5613-5eb9-dcd88460ffcb",
			CDMC: "钢琴排练室1",
			XQDM: "07"
		},
		{
			CDDM: "80bf9952-cc3b-52b6-6342-9c7168cea00d",
			CDMC: "J07研讨室",
			XQDM: "07"
		},
		{
			CDDM: "9fd45b44-73aa-ce47-eb58-a59a25b861c7",
			CDMC: "D14",
			XQDM: "07"
		},
		{
			CDDM: "6e58a9cf-76be-2d95-442c-44fa0f4a5b9f",
			CDMC: "J05研讨室",
			XQDM: "07"
		},
		{
			CDDM: "1b6bb6be-4bdd-2809-fcf0-2db5b6ffc70f",
			CDMC: "J04研讨室",
			XQDM: "07"
		},
		{
			CDDM: "92102184-8352-c228-5187-97228020ffe4",
			CDMC: "D12",
			XQDM: "07"
		},
		{
			CDDM: "2bce4e90-fe02-7c3d-5581-149ee3050ca1",
			CDMC: "D09",
			XQDM: "07"
		},
		{
			CDDM: "c9d74e22-22a0-dd9c-c6fb-d0c2fbb0ee34",
			CDMC: "D13",
			XQDM: "07"
		},
		{
			CDDM: "c82ba04c-674c-6a3f-8110-659aea2a53b1",
			CDMC: "J06研讨室",
			XQDM: "07"
		},
		{
			CDDM: "3e83995d-c71f-e4bb-b524-9ca07e82218f",
			CDMC: "D18舞蹈排练室",
			XQDM: "07"
		},
		{
			CDDM: "58adc973-2fc4-3dc6-51f6-385ad6f784bd",
			CDMC: "J08研讨室",
			XQDM: "07"
		},
		{
			CDDM: "caa0edb6-0d68-b1ee-bfb6-eac62eb0a4b3",
			CDMC: "D07",
			XQDM: "07"
		},
		{
			CDDM: "31a2d21f-16a2-fa13-c6dd-8c7424139103",
			CDMC: "D08",
			XQDM: "07"
		},
		{
			CDDM: "9f45c62b-c660-dda9-ba32-f1b0b2a5c98a",
			CDMC: "D19综合排练室",
			XQDM: "07"
		},
		{
			CDDM: "07843761-30db-e847-6a1a-7b4c70483a67",
			CDMC: "钢琴排练室2",
			XQDM: "07"
		},
		{
			CDDM: "79319ca7-3ef7-e0b7-b830-57026afae351",
			CDMC: "J03研讨室",
			XQDM: "07"
		},
		{
			CDDM: "613cbde6-433f-ae47-24f9-88155673c1ab",
			CDMC: "D11",
			XQDM: "07"
		},
		{
			CDDM: "d04bfcd3-8f6a-c324-959a-ef1904389687",
			CDMC: "D15",
			XQDM: "07"
		},
		{
			CDDM: "d3056776-18a0-81ff-a0bc-9a969eab22bf",
			CDMC: "D10",
			XQDM: "07"
		},
		{
			CDDM: "e5335577-1e12-4f36-0876-c026be00c6d2",
			CDMC: "体育馆-乒乓球台",
			XQDM: "08"
		},
		{
			CDDM: "3d0352f5-0d2b-cbe5-fc3b-720b48481cad",
			CDMC: "体育馆-乒乓球台3",
			XQDM: "08"
		},
		{
			CDDM: "ee416b47-4640-3160-9448-36d9acf82f61",
			CDMC: "体育馆-健身车",
			XQDM: "08"
		},
		{
			CDDM: "ced23162-a0e9-3c44-189e-8e763954f56f",
			CDMC: "学生活动空间",
			XQDM: "08"
		},
		{
			CDDM: "0cad6888-0306-8bc4-3f6b-b312e2fdc7c7",
			CDMC: "体育馆-篮球场1",
			XQDM: "08"
		},
		{
			CDDM: "b7276cbf-c6fd-52d7-177a-b064110d55ee",
			CDMC: "体育馆-椭圆机",
			XQDM: "08"
		},
		{
			CDDM: "93834582-79b6-2476-ce56-0605318ed3c2",
			CDMC: "多媒体教室-A412",
			XQDM: "08"
		},
		{
			CDDM: "b20082b1-945d-8d2a-1144-5835971b610a",
			CDMC: "学生活动室-409",
			XQDM: "08"
		},
		{
			CDDM: "57980cf2-de5a-cc86-ab60-7d9f5972179d",
			CDMC: "多媒体教室-A402",
			XQDM: "08"
		},
		{
			CDDM: "2d8611e0-a308-0c95-c81f-6676f826e559",
			CDMC: "体育馆-羽毛球场1",
			XQDM: "08"
		},
		{
			CDDM: "4d4b6898-3e1a-9b26-5a51-aa635f80b1bf",
			CDMC: "多媒体教室-A307",
			XQDM: "08"
		},
		{
			CDDM: "02ab5272-8b86-e9a8-c768-43571037a0bb",
			CDMC: "多媒体教室-A301",
			XQDM: "08"
		},
		{
			CDDM: "0a4570da-7a61-5788-5775-9f6b05851688",
			CDMC: "多媒体教室-J002",
			XQDM: "08"
		},
		{
			CDDM: "e0f3e26d-4d62-74ac-83b0-1918cf87685b",
			CDMC: "体育馆-动感单车",
			XQDM: "08"
		},
		{
			CDDM: "0e7995b2-e6b0-f4bd-06a4-d862c779dc6b",
			CDMC: "多媒体教室-A401",
			XQDM: "08"
		},
		{
			CDDM: "fc89eef8-4422-4e34-e267-0bc3f31c930f",
			CDMC: "名师讲堂-J005",
			XQDM: "08"
		},
		{
			CDDM: "9701b60e-1e1a-0102-7a13-11437c4ef451",
			CDMC: "体育馆-乒乓球台6",
			XQDM: "08"
		},
		{
			CDDM: "9fec7e7a-590b-24f1-c6f9-246947c3f90c",
			CDMC: "学生研讨室-405",
			XQDM: "08"
		},
		{
			CDDM: "e83bfa2e-c973-b582-d078-8c059bdba17d",
			CDMC: "乒乓球台1",
			XQDM: "08"
		},
		{
			CDDM: "b092738c-1015-9960-a80b-cf256358e784",
			CDMC: "多媒体教室-A209",
			XQDM: "08"
		},
		{
			CDDM: "0e86020e-72b6-7b34-5f5f-7aa354c86f58",
			CDMC: "体育馆-瑜伽室2",
			XQDM: "08"
		},
		{
			CDDM: "07c5fee6-49c6-9314-c253-6c238449fa4d",
			CDMC: "体育馆-台球桌",
			XQDM: "08"
		},
		{
			CDDM: "69888ac2-7169-48fa-dd76-e70d2db123c4",
			CDMC: "多媒体教室-A201",
			XQDM: "08"
		},
		{
			CDDM: "b6411c5f-9b12-2dca-ed8a-efde49119fb4",
			CDMC: "多媒体教室-A308",
			XQDM: "08"
		},
		{
			CDDM: "fe4977f3-2f71-c3b2-bacf-a2b885437ca7",
			CDMC: "多媒体教室-A202",
			XQDM: "08"
		},
		{
			CDDM: "f7a859af-c932-2f27-9151-1cb1d399af26",
			CDMC: "学生活动室-412",
			XQDM: "08"
		},
		{
			CDDM: "0990ae3e-9a12-e6ac-b2fa-41d6eb38fd69",
			CDMC: "体育馆-乒乓球台2",
			XQDM: "08"
		},
		{
			CDDM: "59d367e8-9480-7348-5889-d340fc17c743",
			CDMC: "智慧教室-A103",
			XQDM: "08"
		},
		{
			CDDM: "c4a19794-8630-07bc-dc75-c8a401422990",
			CDMC: "智慧教室-A302",
			XQDM: "08"
		},
		{
			CDDM: "2b30a153-9261-a0bb-8d5d-7e150c1b3805",
			CDMC: "多媒体教室-A102",
			XQDM: "08"
		},
		{
			CDDM: "1b821819-3452-c206-250d-1ba67abe8478",
			CDMC: "体育馆-乒乓球台5",
			XQDM: "08"
		},
		{
			CDDM: "469352e7-e04f-afd2-efaa-f08aeac59595",
			CDMC: "学生研讨室-406",
			XQDM: "08"
		},
		{
			CDDM: "7a7bfb6d-14be-c3f2-37a1-68232ae65e63",
			CDMC: "学生研讨室-407",
			XQDM: "08"
		},
		{
			CDDM: "1dbdaf6a-ddd1-b8e1-0932-b64ca9d88e7a",
			CDMC: "体育馆-瑜伽室1",
			XQDM: "08"
		},
		{
			CDDM: "9a0ee6cb-c1db-945f-e12a-f9c63fdf9a85",
			CDMC: "多媒体教室-A411",
			XQDM: "08"
		},
		{
			CDDM: "f6664f7c-f8c9-b86b-f792-9e48cc342824",
			CDMC: "多媒体教室-A303",
			XQDM: "08"
		},
		{
			CDDM: "d596cfb4-db1c-b3d2-217a-f9d095baca11",
			CDMC: "智慧教室-A107",
			XQDM: "08"
		},
		{
			CDDM: "c614fadf-1d01-2674-13df-ecaf36f57a97",
			CDMC: "体育馆-综合健身器",
			XQDM: "08"
		},
		{
			CDDM: "117d5bfb-4aae-295d-c45b-b837449b89fa",
			CDMC: "体育馆-羽毛球场2",
			XQDM: "08"
		},
		{
			CDDM: "fe370909-0aaa-ad17-6743-7cf83d83a689",
			CDMC: "体育馆-跑步机",
			XQDM: "08"
		},
		{
			CDDM: "7d3bdc46-b2f5-4951-694e-2c0ea662f170",
			CDMC: "体育馆-羽毛球场3",
			XQDM: "08"
		},
		{
			CDDM: "fdbf5a65-eeff-ef2a-6928-47af6ec5c686",
			CDMC: "体育馆-羽毛球场5",
			XQDM: "08"
		},
		{
			CDDM: "35ef451e-bafe-3d03-1a1d-53f90d9c95fb",
			CDMC: "多媒体教室-A509",
			XQDM: "08"
		},
		{
			CDDM: "2d924455-0c28-8091-43fa-18d6964379db",
			CDMC: "多媒体教室-A309",
			XQDM: "08"
		},
		{
			CDDM: "365dcd39-68da-111c-0a5a-08d8069e9842",
			CDMC: "体育馆-羽毛球场4",
			XQDM: "08"
		},
		{
			CDDM: "e21f53f9-7f5d-51ce-f2da-11a723fe7068",
			CDMC: "体育馆-乒乓球台4",
			XQDM: "08"
		},
		{
			CDDM: "42fbad6b-8d42-d4e1-6670-6073a5912c7e",
			CDMC: "体育馆-登山机",
			XQDM: "08"
		}
	];
	var ALL_TIME_SLOTS = [
		"08:00-08:45",
		"08:50-09:35",
		"09:50-10:35",
		"10:40-11:25",
		"11:30-12:15",
		"12:15-13:20",
		"13:20-14:05",
		"14:10-14:55",
		"15:10-15:55",
		"16:00-16:45",
		"16:50-17:35",
		"17:35-18:30",
		"18:30-19:15",
		"19:20-20:05",
		"20:10-20:55",
		"21:00-22:00"
	];
	var ORGANIZATIONS = [
		{
			id: "01",
			name: "精工书院社区"
		},
		{
			id: "02",
			name: "睿信书院社区"
		},
		{
			id: "03",
			name: "求是书院社区"
		},
		{
			id: "04",
			name: "明德书院社区"
		},
		{
			id: "06",
			name: "特立书院社区"
		},
		{
			id: "05",
			name: "心理健康教育与咨询中心"
		},
		{
			id: "07",
			name: "校团委"
		},
		{
			id: "08",
			name: "唐山研究院"
		}
	];
	var _plugin_vue_export_helper_default = (sfc, props) => {
		const target = sfc.__vccOpts || sfc;
		for (const [key, val] of props) target[key] = val;
		return target;
	};
	var _hoisted_1 = { class: "bit-reserve-container" };
	var _hoisted_2 = {
		key: 0,
		class: "loading"
	};
	var _hoisted_3 = {
		key: 1,
		class: "error"
	};
	var _hoisted_4 = {
		key: 2,
		class: "main-content"
	};
	var _hoisted_5 = { class: "header" };
	var _hoisted_6 = { class: "tabs" };
	var _hoisted_7 = {
		key: 0,
		class: "filters"
	};
	var _hoisted_8 = { class: "filter-item" };
	var _hoisted_9 = ["min", "max"];
	var _hoisted_10 = { class: "filter-item" };
	var _hoisted_11 = ["value"];
	var _hoisted_12 = {
		key: 1,
		class: "sites-container"
	};
	var _hoisted_13 = {
		key: 0,
		class: "empty"
	};
	var _hoisted_14 = {
		key: 1,
		class: "sites-grid"
	};
	var _hoisted_15 = ["onClick"];
	var _hoisted_16 = { class: "site-info" };
	var _hoisted_17 = { class: "badge" };
	var _hoisted_18 = {
		key: 3,
		class: "records-container"
	};
	var _hoisted_19 = {
		key: 0,
		class: "loading-inline"
	};
	var _hoisted_20 = {
		key: 1,
		class: "empty"
	};
	var _hoisted_21 = { key: 2 };
	var _hoisted_22 = ["onClick"];
	var _hoisted_23 = { class: "record-header" };
	var _hoisted_24 = { class: "record-site" };
	var _hoisted_25 = { class: "record-info" };
	var _hoisted_26 = { class: "record-time" };
	var _hoisted_27 = { class: "modal-content" };
	var _hoisted_28 = {
		key: 0,
		class: "detail-loading"
	};
	var _hoisted_29 = {
		key: 1,
		class: "detail-info"
	};
	var _hoisted_30 = { key: 0 };
	var _hoisted_31 = { key: 1 };
	var _hoisted_32 = { key: 2 };
	var _hoisted_33 = {
		key: 3,
		class: "rules"
	};
	var _hoisted_34 = {
		key: 4,
		class: "rules"
	};
	var _hoisted_35 = {
		key: 5,
		class: "time-slots"
	};
	var _hoisted_36 = { class: "slots-grid" };
	var _hoisted_37 = ["disabled"];
	var _hoisted_38 = { class: "modal-content" };
	var _hoisted_39 = { class: "form-group" };
	var _hoisted_40 = ["min", "max"];
	var _hoisted_41 = { class: "form-group" };
	var _hoisted_42 = {
		key: 0,
		style: {
			"color": "#999",
			"font-size": "14px"
		}
	};
	var _hoisted_43 = {
		key: 1,
		class: "slots-check"
	};
	var _hoisted_44 = ["value", "disabled"];
	var _hoisted_45 = { class: "form-group" };
	var _hoisted_46 = { class: "form-group" };
	var _hoisted_47 = { class: "form-group" };
	var _hoisted_48 = { class: "form-group" };
	var _hoisted_49 = { class: "form-actions" };
	var _hoisted_50 = ["disabled"];
	var _hoisted_51 = { class: "modal-content" };
	var _hoisted_52 = {
		key: 0,
		class: "loading-inline"
	};
	var _hoisted_53 = {
		key: 1,
		class: "detail-fields"
	};
	var _hoisted_54 = { class: "detail-row" };
	var _hoisted_55 = { class: "detail-row" };
	var _hoisted_56 = { class: "detail-row" };
	var _hoisted_57 = { class: "detail-row" };
	var _hoisted_58 = { class: "detail-row" };
	var _hoisted_59 = { class: "detail-row" };
	var _hoisted_60 = { class: "detail-row" };
	var _hoisted_61 = { class: "detail-row" };
	var App_default = _plugin_vue_export_helper_default({
		__name: "App",
		setup(__props) {
			const loading = (0, vue.ref)(true);
			const error = (0, vue.ref)(null);
			const selectedDate = (0, vue.ref)(getTodayDate());
			const selectedOrg = (0, vue.ref)("");
			const organizations = (0, vue.ref)(ORGANIZATIONS);
			const allSites = (0, vue.ref)(STATIC_SITES);
			const selectedSiteDetail = (0, vue.ref)(null);
			const detailLoading = (0, vue.ref)(false);
			const canReserveTimes = (0, vue.ref)(null);
			const timeLoading = (0, vue.ref)(false);
			const currentUser = (0, vue.ref)({
				name: "",
				userid: ""
			});
			const showReserveForm = (0, vue.ref)(false);
			const reserveForm = (0, vue.ref)({
				SYSD: "",
				selectedSlots: [],
				SQRXM: "",
				LXDH: "",
				SQCS: "",
				BZ: ""
			});
			const reserveLoading = (0, vue.ref)(false);
			const currentTab = (0, vue.ref)("reserve");
			const records = (0, vue.ref)([]);
			const recordsLoading = (0, vue.ref)(false);
			const selectedRecord = (0, vue.ref)(null);
			const recordDetailLoading = (0, vue.ref)(false);
			async function switchToRecords() {
				currentTab.value = "records";
				recordsLoading.value = true;
				try {
					records.value = (await getReserveRecords()).rows || [];
				} catch (err) {
					alert("获取记录失败: " + err.message);
				} finally {
					recordsLoading.value = false;
				}
			}
			async function openRecordDetail(record) {
				selectedRecord.value = { ...record };
				recordDetailLoading.value = true;
				try {
					const detail = await getReserveDetail(record.WID);
					selectedRecord.value = {
						...record,
						...detail
					};
				} catch (err) {
					alert("获取详情失败: " + err.message);
				} finally {
					recordDetailLoading.value = false;
				}
			}
			async function doCancelReserve(wid) {
				if (!confirm("确认撤回该预约？")) return;
				try {
					await cancelReserve(wid);
					alert("撤回成功");
					selectedRecord.value = null;
					await switchToRecords();
				} catch (err) {
					alert("撤回失败: " + err.message);
				}
			}
			async function doDeleteReserve(wid) {
				if (!confirm("确认删除该草稿？")) return;
				try {
					await deleteReserve(wid, selectedRecord.value.SQBM);
					alert("删除成功");
					selectedRecord.value = null;
					await switchToRecords();
				} catch (err) {
					alert("删除失败: " + err.message);
				}
			}
			function getTodayDate() {
				return ( new Date()).toISOString().split("T")[0];
			}
			function getMaxDate() {
				const now = new Date();
				const isAfterMidnight = now >= new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
				const max = new Date();
				max.setDate(max.getDate() + (isAfterMidnight ? 3 : 2));
				return max.toISOString().split("T")[0];
			}
			const filteredSites = (0, vue.computed)(() => {
				if (!selectedOrg.value) return allSites.value;
				return allSites.value.filter((site) => site.XQDM === selectedOrg.value);
			});
			function getOrgName(xqdm) {
				const org = organizations.value.find((o) => o.id === xqdm);
				return org ? org.name : "未知";
			}
			async function init() {
				try {
					loading.value = true;
					error.value = null;
					await preheat();
					const user = await getUserInfo();
					currentUser.value = user;
					const saved = JSON.parse(localStorage.getItem("bit_reserve_user") || "{}");
					reserveForm.value.SQRXM = saved.SQRXM || user.name;
					reserveForm.value.LXDH = saved.LXDH || user.phone;
					reserveForm.value.SQCS = saved.SQCS || "";
					reserveForm.value.BZ = saved.BZ || "";
					loading.value = false;
				} catch (err) {
					error.value = err.message;
					loading.value = false;
				}
			}
			function saveUserInfo() {
				localStorage.setItem("bit_reserve_user", JSON.stringify({
					SQRXM: reserveForm.value.SQRXM,
					LXDH: reserveForm.value.LXDH,
					SQCS: reserveForm.value.SQCS,
					BZ: reserveForm.value.BZ
				}));
				alert("个人信息已保存");
			}
			async function selectSite(site) {
				detailLoading.value = true;
				selectedSiteDetail.value = {
					CDMC: site.CDMC,
					XQDM: site.XQDM
				};
				try {
					const detail = await getSiteDetail(site.CDDM);
					console.log("[场地详情]", detail);
					selectedSiteDetail.value = detail;
				} catch (err) {
					alert("加载场地详情失败: " + err.message);
					selectedSiteDetail.value = null;
				} finally {
					detailLoading.value = false;
				}
			}
			async function loadCanReserveTime() {
				timeLoading.value = true;
				try {
					const availableSlots = await getAvailableTimeSlots(selectedSiteDetail.value.CDDM, selectedDate.value);
					console.log("[可预约时段]", availableSlots);
					canReserveTimes.value = availableSlots.map((slot) => ({
						KSSJ: slot.SYSD.split("-")[0],
						JSSJ: slot.SYSD.split("-")[1],
						SDDM: slot.SDDM,
						SYSD: slot.SYSD
					}));
				} catch (err) {
					alert("加载时间段失败: " + err.message);
				} finally {
					timeLoading.value = false;
				}
			}
			function closeSiteDetail() {
				selectedSiteDetail.value = null;
				canReserveTimes.value = null;
			}
			async function onReserveDateChange() {
				canReserveTimes.value = null;
				reserveForm.value.selectedSlots = [];
				await loadCanReserveTime();
			}
			function getSlotStatus(sysd) {
				const availableSet = new Set((canReserveTimes.value || []).map((t) => t.SYSD));
				if (selectedDate.value === getTodayDate()) {
					const [h, m] = sysd.split("-")[0].split(":").map(Number);
					const now = new Date();
					if (h < now.getHours() || h === now.getHours() && m <= now.getMinutes()) return "past";
				}
				return availableSet.has(sysd) ? "available" : "occupied";
			}
			async function goToReserve() {
				showReserveForm.value = true;
				canReserveTimes.value = null;
				reserveForm.value.SYSD = "";
				await loadCanReserveTime();
			}
			async function submitReserve$1() {
				if (!reserveForm.value.SQRXM || !reserveForm.value.LXDH || !reserveForm.value.SQCS || !reserveForm.value.selectedSlots.length) {
					alert("请填写姓名、联系电话、申请陈述并选择至少一个时段");
					return;
				}
				reserveLoading.value = true;
				try {
					await submitReserve({
						CDDM: selectedSiteDetail.value.CDDM,
						CDDM_DISPLAY: selectedSiteDetail.value.CDMC,
						YYRQ: selectedDate.value,
						SYSD: reserveForm.value.selectedSlots.join(", "),
						SQRXM: reserveForm.value.SQRXM,
						LXDH: reserveForm.value.LXDH,
						SQCS: reserveForm.value.SQCS,
						BZ: reserveForm.value.BZ,
						DWDM: currentUser.value.dwdm || "107",
						SHZT: "90"
					});
					alert("预约成功！");
					showReserveForm.value = false;
					closeSiteDetail();
				} catch (err) {
					alert("预约失败: " + err.message);
				} finally {
					reserveLoading.value = false;
				}
			}
			(0, vue.onMounted)(() => {
				init();
			});
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_1, [
					loading.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_2, [..._cache[15] || (_cache[15] = [(0, vue.createElementVNode)("div", { class: "spinner" }, null, -1), (0, vue.createElementVNode)("p", null, "正在加载...", -1)])])) : error.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_3, [
						_cache[16] || (_cache[16] = (0, vue.createElementVNode)("h2", null, "⚠️ 加载失败", -1)),
						(0, vue.createElementVNode)("p", null, (0, vue.toDisplayString)(error.value), 1),
						(0, vue.createElementVNode)("button", { onClick: init }, "重试")
					])) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_4, [
						(0, vue.createElementVNode)("header", _hoisted_5, [_cache[17] || (_cache[17] = (0, vue.createElementVNode)("h1", null, "🏫 BIT 研讨室预约", -1)), (0, vue.createElementVNode)("div", _hoisted_6, [(0, vue.createElementVNode)("button", {
							class: (0, vue.normalizeClass)(["tab-btn", currentTab.value === "reserve" ? "active" : ""]),
							onClick: _cache[0] || (_cache[0] = ($event) => currentTab.value = "reserve")
						}, "预约场地", 2), (0, vue.createElementVNode)("button", {
							class: (0, vue.normalizeClass)(["tab-btn", currentTab.value === "records" ? "active" : ""]),
							onClick: switchToRecords
						}, "我的预约", 2)])]),
						currentTab.value === "reserve" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_7, [
							(0, vue.createElementVNode)("div", _hoisted_8, [_cache[18] || (_cache[18] = (0, vue.createElementVNode)("label", null, "预约日期：", -1)), (0, vue.withDirectives)((0, vue.createElementVNode)("input", {
								type: "date",
								"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectedDate.value = $event),
								min: getTodayDate(),
								max: getMaxDate()
							}, null, 8, _hoisted_9), [[vue.vModelText, selectedDate.value]])]),
							(0, vue.createElementVNode)("div", _hoisted_10, [_cache[20] || (_cache[20] = (0, vue.createElementVNode)("label", null, "管理单位：", -1)), (0, vue.withDirectives)((0, vue.createElementVNode)("select", { "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => selectedOrg.value = $event) }, [_cache[19] || (_cache[19] = (0, vue.createElementVNode)("option", { value: "" }, "全部", -1)), ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(organizations.value, (org) => {
								return (0, vue.openBlock)(), (0, vue.createElementBlock)("option", {
									key: org.id,
									value: org.id
								}, (0, vue.toDisplayString)(org.name), 9, _hoisted_11);
							}), 128))], 512), [[vue.vModelSelect, selectedOrg.value]])]),
							(0, vue.createElementVNode)("button", {
								class: "refresh-btn",
								onClick: init
							}, "🔄 刷新")
						])) : (0, vue.createCommentVNode)("", true),
						currentTab.value === "reserve" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_12, [filteredSites.value.length === 0 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_13, [..._cache[21] || (_cache[21] = [(0, vue.createElementVNode)("p", null, "暂无可用场地", -1)])])) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_14, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(filteredSites.value, (site) => {
							return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
								key: site.CDDM,
								class: "site-card",
								onClick: ($event) => selectSite(site)
							}, [(0, vue.createElementVNode)("h3", null, (0, vue.toDisplayString)(site.CDMC), 1), (0, vue.createElementVNode)("div", _hoisted_16, [(0, vue.createElementVNode)("span", _hoisted_17, (0, vue.toDisplayString)(getOrgName(site.XQDM)), 1)])], 8, _hoisted_15);
						}), 128))]))])) : (0, vue.createCommentVNode)("", true)
					])),
					currentTab.value === "records" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_18, [recordsLoading.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_19, "加载中...")) : records.value.length === 0 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_20, [..._cache[22] || (_cache[22] = [(0, vue.createElementVNode)("p", null, "暂无预约记录", -1)])])) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_21, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(records.value, (r) => {
						return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
							key: r.WID,
							class: "record-card",
							onClick: ($event) => openRecordDetail(r)
						}, [
							(0, vue.createElementVNode)("div", _hoisted_23, [(0, vue.createElementVNode)("span", _hoisted_24, (0, vue.toDisplayString)(r.CDDM_DISPLAY), 1), (0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)(["record-status", r.SHZT === "90" ? "pending" : r.SHZT === "1" ? "approved" : "draft"]) }, (0, vue.toDisplayString)(r.SHZT_DISPLAY), 3)]),
							(0, vue.createElementVNode)("div", _hoisted_25, (0, vue.toDisplayString)(r.YYRQ) + " " + (0, vue.toDisplayString)(r.SYSJ), 1),
							(0, vue.createElementVNode)("div", _hoisted_26, "申请时间：" + (0, vue.toDisplayString)(r.SQSJ), 1)
						], 8, _hoisted_22);
					}), 128))]))])) : (0, vue.createCommentVNode)("", true),
					selectedSiteDetail.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 4,
						class: "modal",
						onClick: (0, vue.withModifiers)(closeSiteDetail, ["self"])
					}, [(0, vue.createElementVNode)("div", _hoisted_27, [
						(0, vue.createElementVNode)("button", {
							class: "close-btn",
							onClick: closeSiteDetail
						}, "✕"),
						(0, vue.createElementVNode)("h2", null, (0, vue.toDisplayString)(selectedSiteDetail.value.CDMC), 1),
						detailLoading.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_28, "加载中...")) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_29, [
							(0, vue.createElementVNode)("p", null, [_cache[23] || (_cache[23] = (0, vue.createElementVNode)("strong", null, "状态：", -1)), (0, vue.createTextVNode)((0, vue.toDisplayString)(selectedSiteDetail.value.KFZT_DISPLAY), 1)]),
							selectedSiteDetail.value.DZ ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", _hoisted_30, [_cache[24] || (_cache[24] = (0, vue.createElementVNode)("strong", null, "地址：", -1)), (0, vue.createTextVNode)((0, vue.toDisplayString)(selectedSiteDetail.value.DZ), 1)])) : (0, vue.createCommentVNode)("", true),
							selectedSiteDetail.value.RNRS ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", _hoisted_31, [_cache[25] || (_cache[25] = (0, vue.createElementVNode)("strong", null, "容纳人数：", -1)), (0, vue.createTextVNode)((0, vue.toDisplayString)(selectedSiteDetail.value.RNRS) + "人", 1)])) : (0, vue.createCommentVNode)("", true),
							selectedSiteDetail.value.SBSB && selectedSiteDetail.value.SBSB !== "无" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", _hoisted_32, [_cache[26] || (_cache[26] = (0, vue.createElementVNode)("strong", null, "设备设施：", -1)), (0, vue.createTextVNode)((0, vue.toDisplayString)(selectedSiteDetail.value.SBSB), 1)])) : (0, vue.createCommentVNode)("", true),
							selectedSiteDetail.value.CDJS ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_33, [_cache[27] || (_cache[27] = (0, vue.createElementVNode)("strong", null, "场地介绍：", -1)), (0, vue.createElementVNode)("pre", null, (0, vue.toDisplayString)(selectedSiteDetail.value.CDJS), 1)])) : (0, vue.createCommentVNode)("", true),
							selectedSiteDetail.value.BZ ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_34, [_cache[28] || (_cache[28] = (0, vue.createElementVNode)("strong", null, "预约须知：", -1)), (0, vue.createElementVNode)("pre", null, (0, vue.toDisplayString)(selectedSiteDetail.value.BZ), 1)])) : (0, vue.createCommentVNode)("", true),
							canReserveTimes.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_35, [_cache[29] || (_cache[29] = (0, vue.createElementVNode)("strong", null, "可预约时间段：", -1)), (0, vue.createElementVNode)("div", _hoisted_36, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(canReserveTimes.value, (t) => {
								return (0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
									key: t.KSSJ,
									class: "slot"
								}, (0, vue.toDisplayString)(t.KSSJ) + "~" + (0, vue.toDisplayString)(t.JSSJ), 1);
							}), 128))])])) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
								key: 6,
								class: "load-time-btn",
								onClick: loadCanReserveTime,
								disabled: timeLoading.value
							}, (0, vue.toDisplayString)(timeLoading.value ? "加载中..." : "查看可预约时间段"), 9, _hoisted_37))
						])),
						(0, vue.createElementVNode)("button", {
							class: "reserve-btn",
							onClick: goToReserve
						}, "立即预约")
					])])) : (0, vue.createCommentVNode)("", true),
					showReserveForm.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 5,
						class: "modal",
						onClick: _cache[10] || (_cache[10] = (0, vue.withModifiers)(($event) => showReserveForm.value = false, ["self"]))
					}, [(0, vue.createElementVNode)("div", _hoisted_38, [
						(0, vue.createElementVNode)("button", {
							class: "close-btn",
							onClick: _cache[3] || (_cache[3] = ($event) => showReserveForm.value = false)
						}, "✕"),
						_cache[36] || (_cache[36] = (0, vue.createElementVNode)("h2", null, "填写预约信息", -1)),
						(0, vue.createElementVNode)("div", _hoisted_39, [_cache[30] || (_cache[30] = (0, vue.createElementVNode)("label", null, "预约日期", -1)), (0, vue.withDirectives)((0, vue.createElementVNode)("input", {
							type: "date",
							"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => selectedDate.value = $event),
							min: getTodayDate(),
							max: getMaxDate(),
							onChange: onReserveDateChange
						}, null, 40, _hoisted_40), [[vue.vModelText, selectedDate.value]])]),
						(0, vue.createElementVNode)("div", _hoisted_41, [_cache[31] || (_cache[31] = (0, vue.createElementVNode)("label", null, "时段（可多选）", -1)), timeLoading.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_42, "加载中...")) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_43, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(ALL_TIME_SLOTS), (slot) => {
							return (0, vue.openBlock)(), (0, vue.createElementBlock)("label", {
								key: slot,
								class: (0, vue.normalizeClass)(["slot-check-item", getSlotStatus(slot)])
							}, [(0, vue.withDirectives)((0, vue.createElementVNode)("input", {
								type: "checkbox",
								value: slot,
								"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => reserveForm.value.selectedSlots = $event),
								disabled: getSlotStatus(slot) !== "available"
							}, null, 8, _hoisted_44), [[vue.vModelCheckbox, reserveForm.value.selectedSlots]]), (0, vue.createTextVNode)(" " + (0, vue.toDisplayString)(slot), 1)], 2);
						}), 128))]))]),
						(0, vue.createElementVNode)("div", _hoisted_45, [_cache[32] || (_cache[32] = (0, vue.createElementVNode)("label", null, "申请人姓名", -1)), (0, vue.withDirectives)((0, vue.createElementVNode)("input", {
							"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => reserveForm.value.SQRXM = $event),
							placeholder: "姓名"
						}, null, 512), [[vue.vModelText, reserveForm.value.SQRXM]])]),
						(0, vue.createElementVNode)("div", _hoisted_46, [_cache[33] || (_cache[33] = (0, vue.createElementVNode)("label", null, "联系电话", -1)), (0, vue.withDirectives)((0, vue.createElementVNode)("input", {
							"onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => reserveForm.value.LXDH = $event),
							placeholder: "手机号"
						}, null, 512), [[vue.vModelText, reserveForm.value.LXDH]])]),
						(0, vue.createElementVNode)("div", _hoisted_47, [_cache[34] || (_cache[34] = (0, vue.createElementVNode)("label", null, "申请陈述", -1)), (0, vue.withDirectives)((0, vue.createElementVNode)("textarea", {
							"onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => reserveForm.value.SQCS = $event),
							placeholder: "用途说明（必填）"
						}, null, 512), [[vue.vModelText, reserveForm.value.SQCS]])]),
						(0, vue.createElementVNode)("div", _hoisted_48, [_cache[35] || (_cache[35] = (0, vue.createElementVNode)("label", null, "备注", -1)), (0, vue.withDirectives)((0, vue.createElementVNode)("input", {
							"onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => reserveForm.value.BZ = $event),
							placeholder: "备注（可选）"
						}, null, 512), [[vue.vModelText, reserveForm.value.BZ]])]),
						(0, vue.createElementVNode)("div", _hoisted_49, [(0, vue.createElementVNode)("button", {
							class: "save-info-btn",
							onClick: saveUserInfo
						}, "保存信息"), (0, vue.createElementVNode)("button", {
							class: "reserve-btn",
							onClick: submitReserve$1,
							disabled: reserveLoading.value
						}, (0, vue.toDisplayString)(reserveLoading.value ? "提交中..." : "确认预约"), 9, _hoisted_50)])
					])])) : (0, vue.createCommentVNode)("", true),
					selectedRecord.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 6,
						class: "modal",
						onClick: _cache[14] || (_cache[14] = (0, vue.withModifiers)(($event) => selectedRecord.value = null, ["self"]))
					}, [(0, vue.createElementVNode)("div", _hoisted_51, [
						(0, vue.createElementVNode)("button", {
							class: "close-btn",
							onClick: _cache[11] || (_cache[11] = ($event) => selectedRecord.value = null)
						}, "✕"),
						_cache[45] || (_cache[45] = (0, vue.createElementVNode)("h2", null, "预约详情", -1)),
						recordDetailLoading.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_52, "加载中...")) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_53, [
							(0, vue.createElementVNode)("div", _hoisted_54, [_cache[37] || (_cache[37] = (0, vue.createElementVNode)("span", null, "场地", -1)), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(selectedRecord.value.CDDM_DISPLAY), 1)]),
							(0, vue.createElementVNode)("div", _hoisted_55, [_cache[38] || (_cache[38] = (0, vue.createElementVNode)("span", null, "预约日期", -1)), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(selectedRecord.value.YYRQ), 1)]),
							(0, vue.createElementVNode)("div", _hoisted_56, [_cache[39] || (_cache[39] = (0, vue.createElementVNode)("span", null, "时段", -1)), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(selectedRecord.value.SYSD || selectedRecord.value.SYSJ), 1)]),
							(0, vue.createElementVNode)("div", _hoisted_57, [_cache[40] || (_cache[40] = (0, vue.createElementVNode)("span", null, "申请人", -1)), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(selectedRecord.value.SQRXM), 1)]),
							(0, vue.createElementVNode)("div", _hoisted_58, [_cache[41] || (_cache[41] = (0, vue.createElementVNode)("span", null, "联系电话", -1)), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(selectedRecord.value.LXDH), 1)]),
							(0, vue.createElementVNode)("div", _hoisted_59, [_cache[42] || (_cache[42] = (0, vue.createElementVNode)("span", null, "申请陈述", -1)), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(selectedRecord.value.SQCS), 1)]),
							(0, vue.createElementVNode)("div", _hoisted_60, [_cache[43] || (_cache[43] = (0, vue.createElementVNode)("span", null, "状态", -1)), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(selectedRecord.value.SHZT_DISPLAY), 1)]),
							(0, vue.createElementVNode)("div", _hoisted_61, [_cache[44] || (_cache[44] = (0, vue.createElementVNode)("span", null, "申请时间", -1)), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(selectedRecord.value.SQSJ), 1)])
						])),
						selectedRecord.value.SHZT === "90" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
							key: 2,
							class: "cancel-btn",
							onClick: _cache[12] || (_cache[12] = ($event) => doCancelReserve(selectedRecord.value.WID))
						}, "撤回预约")) : (0, vue.createCommentVNode)("", true),
						selectedRecord.value.SHZT === "0" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
							key: 3,
							class: "cancel-btn",
							onClick: _cache[13] || (_cache[13] = ($event) => doDeleteReserve(selectedRecord.value.WID))
						}, "删除草稿")) : (0, vue.createCommentVNode)("", true)
					])])) : (0, vue.createCommentVNode)("", true)
				]);
			};
		}
	}, [["__scopeId", "data-v-5e6e39b2"]]);
	(function() {
		"use strict";
		const style = document.createElement("style");
		style.textContent = ".app-loading { display: none !important; }";
		document.documentElement.appendChild(style);
		function mountApp() {
			document.body.style.visibility = "hidden";
			document.body.innerHTML = "<div id=\"bit-reserve-app\"></div>";
			document.querySelectorAll("script[src]").forEach((el) => el.remove());
			document.querySelectorAll("link[rel=\"stylesheet\"]").forEach((el) => el.remove());
			(0, vue.createApp)(App_default).mount("#bit-reserve-app");
			document.body.style.visibility = "";
		}
		if (document.body) mountApp();
		else {
			const observer = new MutationObserver(() => {
				if (document.body) {
					observer.disconnect();
					mountApp();
				}
			});
			observer.observe(document.documentElement, { childList: true });
		}
	})();
})(Vue);