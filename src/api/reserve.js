/**
 * BIT 研讨室预约 API 封装
 */

const BASE_URL = 'https://stu.bit.edu.cn/xsfw'
const CDYY_BASE = `${BASE_URL}/sys/cdyyapp`

// 使用 GM_xmlhttpRequest 代替 fetch（油猴脚本专用）
function gmFetch(url, options = {}) {
  // 检查 GM API 是否可用
  if (typeof GM_xmlhttpRequest === 'undefined') {
    console.error('[gmFetch] GM_xmlhttpRequest 未定义！')
    console.log('[gmFetch] 可用的 GM 函数:', Object.keys(window).filter(k => k.startsWith('GM')))

    // 降级到普通 fetch
    console.warn('[gmFetch] 降级使用普通 fetch')
    return fetch(url, {
      ...options,
      credentials: 'include',
    })
  }

  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: options.method || 'GET',
      url: url,
      headers: options.headers || {},
      data: options.body,
      onload: (response) => {
        resolve({
          ok: response.status >= 200 && response.status < 300,
          status: response.status,
          statusText: response.statusText,
          text: () => Promise.resolve(response.responseText),
          json: () => Promise.resolve(JSON.parse(response.responseText)),
        })
      },
      onerror: (error) => {
        reject(new Error('Network request failed'))
      },
    })
  })
}

// 通用请求函数
async function request(url, options = {}) {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': 'https://stu.bit.edu.cn/xsfw/sys/cdyyapp/*default/index.do',
      'Origin': 'https://stu.bit.edu.cn',
    },
  }

  // 合并 headers
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  }

  const response = await gmFetch(url, mergedOptions)

  console.log(`[API] ${mergedOptions.method} ${url} -> ${response.status}`)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()

  console.log(`[API] Response:`, data)

  // 某些接口直接返回数据对象（没有 code 字段），某些接口返回 {code, data, msg} 格式
  // 如果有 code 字段，则检查是否为 '0'
  if (data.code !== undefined && data.code !== '0') {
    throw new Error(data.msg || '请求失败')
  }

  return data
}

// POST 请求辅助函数
function postData(data) {
  return 'data=' + encodeURIComponent(JSON.stringify(data))
}

/**
 * 预热流程（必需）
 */
export async function preheat() {
  try {
    const referer = `${CDYY_BASE}/*default/index.do`
    const origin = 'https://stu.bit.edu.cn'

    // 1. 访问首页获取 APPID
    const indexUrl = `${CDYY_BASE}/*default/index.do?THEME=indigo&EMAP_LANG=zh`
    const indexResp = await gmFetch(indexUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    })
    const html = await indexResp.text()

    // 解析 APPID
    const appidMatch = html.match(/APPID["']\s*[:=]\s*["'](\d{8,})["']/)
    const appid = appidMatch ? appidMatch[1] : '4974886768205231'

    console.log('[预热] APPID:', appid)

    // 2. 获取应用配置
    const configUrl = `${BASE_URL}/sys/swpubapp/indexmenu/getAppConfig.do?appId=${appid}&appName=cdyyapp`
    const configResp = await request(configUrl, { method: 'POST' })

    console.log('[预热] 应用配置:', configResp)

    // 提取 role_id
    let roleId = null
    const drops = configResp?.HEADER?.dropMenu || []
    console.log('[预热] dropMenu:', drops)

    if (drops.length > 0) {
      roleId = drops[0].id
    }

    console.log('[预热] roleId:', roleId)

    // 3. 切换角色
    if (roleId) {
      await request(`${BASE_URL}/sys/funauthapp/api/changeAppRole/cdyyapp/${roleId}.do`, {
        method: 'POST',
      })

      // 4. 设置通用角色
      await gmFetch(`${BASE_URL}/sys/swpubapp/userinfo/setXgCommonAppRole.do`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Referer': referer,
          'Origin': origin,
        },
        body: `requestParamStr=${encodeURIComponent(JSON.stringify({ ROLEID: roleId }))}`,
      })
    } else {
      console.log('[预热] 未找到 roleId，跳过角色切换')
    }

    // 5. 加载国际化
    await gmFetch(`${BASE_URL}/i18n.do?appName=cdyyapp&EMAP_LANG=zh`, {
      method: 'GET',
      headers: {
        'Referer': referer,
        'Origin': origin,
      }
    })

    console.log('[预热] 完成')
    return true
  } catch (error) {
    console.error('[预热] 失败:', error)
    throw error
  }
}

/**
 * 获取场地详细信息
 * @param {string} cddm - 场地代码
 */
export async function getSiteDetail(cddm) {
  const url = `${CDYY_BASE}/modules/CdyyAuditController/getSiteInformation.do`
  const data = await request(url, {
    method: 'POST',
    body: postData({ CDDM: cddm }),
  })
  return data.data
}

/**
 * 获取场地可预约时段列表（实际可用时段）
 * @param {string} cddm - 场地代码
 * @param {string} yyrq - 预约日期 YYYY-MM-DD
 */
export async function getAvailableTimeSlots(cddm, yyrq) {
  const url = `${CDYY_BASE}/modules/CdyyAuditController/getkyysdList.do`
  const data = await request(url, {
    method: 'POST',
    body: postData({ CDDM: cddm, YYRQ: yyrq }),
  })
  return data.data || []
}

/**
 * 获取当前登录用户信息
 * 返回 { name, phone, dwdm }
 */
export async function getUserInfo() {
  const url = `${CDYY_BASE}/modules/CdyyApplyController/getUserInfo.do`
  const data = await request(url, { method: 'POST', body: 'data={}' })
  const d = data.data || {}
  return { name: d.XM, phone: d.SJH, dwdm: d.SZDWDM }
}

/**
 * 提交预约
 * @param {Object} reserveData
 */
export async function submitReserve(reserveData) {
  const url = `${CDYY_BASE}/modules/CdyyApplyController/saveReserveSite.do`
  const data = await request(url, {
    method: 'POST',
    body: postData(reserveData),
  })
  return data
}

/**
 * 获取预约记录
 * @param {number} pageNumber
 * @param {number} pageSize
 */
export async function getReserveRecords(pageNumber = 1, pageSize = 10) {
  const url = `${CDYY_BASE}/modules/kyycd/cxcdyyjl.do`
  const data = await request(url, {
    method: 'POST',
    body: `data=${encodeURIComponent(JSON.stringify({ pageNumber, pageSize }))}`,
  })
  return data.datas?.cxcdyyjl || { rows: [], totalSize: 0 }
}

/**
 * 获取预约详情
 * @param {string} wid
 */
export async function getReserveDetail(wid) {
  const url = `${CDYY_BASE}/modules/CdyyAuditController/getReserveInformation.do`
  const data = await request(url, {
    method: 'POST',
    body: `data=${encodeURIComponent(JSON.stringify({ WID: wid }))}`,
  })
  return data.data
}

/**
 * 撤回预约
 * @param {string} wid
 */
export async function cancelReserve(wid) {
  const url = `${CDYY_BASE}/modules/CdyyApplyController/backSiteApply.do`
  const data = await request(url, {
    method: 'POST',
    body: `data=${encodeURIComponent(JSON.stringify({ WID: wid }))}`,
  })
  return data
}

/**
 * 删除草稿预约
 * @param {string} wid
 */
export async function deleteReserve(wid, sqbm) {
  const url = `${CDYY_BASE}/modules/CdyyApplyController/delReserveInformation.do`
  const data = await request(url, {
    method: 'POST',
    body: `data=${encodeURIComponent(JSON.stringify({ WID: wid, SQBM: sqbm }))}`,
  })
  return data
}
