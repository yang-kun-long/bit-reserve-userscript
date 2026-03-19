<template>
  <div class="bit-reserve-container">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>正在加载...</p>
    </div>

    <!-- 错误提示 -->
    <div v-else-if="error" class="error">
      <h2>⚠️ 加载失败</h2>
      <p>{{ error }}</p>
      <button @click="init">重试</button>
    </div>

    <!-- 主界面 -->
    <div v-else class="main-content">
      <header class="header">
        <h1>🏫 BIT 研讨室预约</h1>
        <div class="tabs">
          <button :class="['tab-btn', currentTab === 'reserve' ? 'active' : '']" @click="currentTab = 'reserve'">预约场地</button>
          <button :class="['tab-btn', currentTab === 'records' ? 'active' : '']" @click="switchToRecords">我的预约</button>
        </div>
      </header>

      <!-- 筛选区域 -->
      <div v-if="currentTab === 'reserve'" class="filters">
        <div class="filter-item">
          <label>预约日期：</label>
          <input type="date" v-model="selectedDate" :min="getTodayDate()" :max="getMaxDate()" />
        </div>

        <div class="filter-item">
          <label>管理单位：</label>
          <select v-model="selectedOrg">
            <option value="">全部</option>
            <option v-for="org in organizations" :key="org.id" :value="org.id">
              {{ org.name }}
            </option>
          </select>
        </div>

        <button class="refresh-btn" @click="init">🔄 刷新</button>
      </div>

      <!-- 场地列表 -->
      <div v-if="currentTab === 'reserve'" class="sites-container">
        <div v-if="filteredSites.length === 0" class="empty">
          <p>暂无可用场地</p>
        </div>

        <div v-else class="sites-grid">
          <div
            v-for="site in filteredSites"
            :key="site.CDDM"
            class="site-card"
            @click="selectSite(site)"
          >
            <h3>{{ site.CDMC }}</h3>
            <div class="site-info">
              <span class="badge">{{ getOrgName(site.XQDM) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 我的预约记录 -->
    <div v-if="currentTab === 'records'" class="records-container">
      <div v-if="recordsLoading" class="loading-inline">加载中...</div>
      <div v-else-if="records.length === 0" class="empty"><p>暂无预约记录</p></div>
      <div v-else>
        <div v-for="r in records" :key="r.WID" class="record-card" @click="openRecordDetail(r)">
          <div class="record-header">
            <span class="record-site">{{ r.CDDM_DISPLAY }}</span>
            <span :class="['record-status', r.SHZT === '90' ? 'pending' : r.SHZT === '1' ? 'approved' : 'draft']">
              {{ r.SHZT_DISPLAY }}
            </span>
          </div>
          <div class="record-info">{{ r.YYRQ }} {{ r.SYSJ }}</div>
          <div class="record-time">申请时间：{{ r.SQSJ }}</div>
        </div>
      </div>
    </div>

    <!-- 场地详情弹窗 -->
    <div v-if="selectedSiteDetail" class="modal" @click.self="closeSiteDetail">
      <div class="modal-content">
        <button class="close-btn" @click="closeSiteDetail">✕</button>
        <h2>{{ selectedSiteDetail.CDMC }}</h2>
        <div v-if="detailLoading" class="detail-loading">加载中...</div>
        <div v-else class="detail-info">
          <p><strong>状态：</strong>{{ selectedSiteDetail.KFZT_DISPLAY }}</p>
          <p v-if="selectedSiteDetail.DZ"><strong>地址：</strong>{{ selectedSiteDetail.DZ }}</p>
          <p v-if="selectedSiteDetail.RNRS"><strong>容纳人数：</strong>{{ selectedSiteDetail.RNRS }}人</p>
          <p v-if="selectedSiteDetail.SBSB && selectedSiteDetail.SBSB !== '无'"><strong>设备设施：</strong>{{ selectedSiteDetail.SBSB }}</p>
          <div v-if="selectedSiteDetail.CDJS" class="rules">
            <strong>场地介绍：</strong>
            <pre>{{ selectedSiteDetail.CDJS }}</pre>
          </div>
          <div v-if="selectedSiteDetail.BZ" class="rules">
            <strong>预约须知：</strong>
            <pre>{{ selectedSiteDetail.BZ }}</pre>
          </div>
          <div v-if="canReserveTimes" class="time-slots">
            <strong>可预约时间段：</strong>
            <div class="slots-grid">
              <span v-for="t in canReserveTimes" :key="t.KSSJ" class="slot">{{ t.KSSJ }}~{{ t.JSSJ }}</span>
            </div>
          </div>
          <button v-else class="load-time-btn" @click="loadCanReserveTime" :disabled="timeLoading">
            {{ timeLoading ? '加载中...' : '查看可预约时间段' }}
          </button>
        </div>
        <button class="reserve-btn" @click="goToReserve">立即预约</button>
      </div>
    </div>

    <!-- 预约表单弹窗 -->
    <div v-if="showReserveForm" class="modal" @click.self="showReserveForm = false">
      <div class="modal-content">
        <button class="close-btn" @click="showReserveForm = false">✕</button>
        <h2>填写预约信息</h2>
        <div class="form-group">
          <label>预约日期</label>
          <input type="date" v-model="selectedDate" :min="getTodayDate()" :max="getMaxDate()" @change="onReserveDateChange" />
        </div>
        <div class="form-group">
          <label>时段（可多选）</label>
          <div v-if="timeLoading" style="color:#999;font-size:14px">加载中...</div>
          <div v-else class="slots-check">
            <label v-for="slot in ALL_TIME_SLOTS" :key="slot"
              :class="['slot-check-item', getSlotStatus(slot)]">
              <input type="checkbox" :value="slot" v-model="reserveForm.selectedSlots"
                :disabled="getSlotStatus(slot) !== 'available'" />
              {{ slot }}
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>申请人姓名</label>
          <input v-model="reserveForm.SQRXM" placeholder="姓名" />
        </div>
        <div class="form-group">
          <label>联系电话</label>
          <input v-model="reserveForm.LXDH" placeholder="手机号" />
        </div>
        <div class="form-group">
          <label>申请陈述</label>
          <textarea v-model="reserveForm.SQCS" placeholder="用途说明（必填）"></textarea>
        </div>
        <div class="form-group">
          <label>备注</label>
          <input v-model="reserveForm.BZ" placeholder="备注（可选）" />
        </div>
        <div class="form-actions">
          <button class="save-info-btn" @click="saveUserInfo">保存信息</button>
          <button class="reserve-btn" @click="submitReserve" :disabled="reserveLoading">
            {{ reserveLoading ? '提交中...' : '确认预约' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 预约详情弹窗 -->
    <div v-if="selectedRecord" class="modal" @click.self="selectedRecord = null">
      <div class="modal-content">
        <button class="close-btn" @click="selectedRecord = null">✕</button>
        <h2>预约详情</h2>
        <div v-if="recordDetailLoading" class="loading-inline">加载中...</div>
        <div v-else class="detail-fields">
          <div class="detail-row"><span>场地</span><span>{{ selectedRecord.CDDM_DISPLAY }}</span></div>
          <div class="detail-row"><span>预约日期</span><span>{{ selectedRecord.YYRQ }}</span></div>
          <div class="detail-row"><span>时段</span><span>{{ selectedRecord.SYSD || selectedRecord.SYSJ }}</span></div>
          <div class="detail-row"><span>申请人</span><span>{{ selectedRecord.SQRXM }}</span></div>
          <div class="detail-row"><span>联系电话</span><span>{{ selectedRecord.LXDH }}</span></div>
          <div class="detail-row"><span>申请陈述</span><span>{{ selectedRecord.SQCS }}</span></div>
          <div class="detail-row"><span>状态</span><span>{{ selectedRecord.SHZT_DISPLAY }}</span></div>
          <div class="detail-row"><span>申请时间</span><span>{{ selectedRecord.SQSJ }}</span></div>
        </div>
        <button v-if="selectedRecord.SHZT === '90'" class="cancel-btn" @click="doCancelReserve(selectedRecord.WID)">撤回预约</button>
        <button v-if="selectedRecord.SHZT === '0'" class="cancel-btn" @click="doDeleteReserve(selectedRecord.WID)">删除草稿</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import * as api from './api/reserve.js'
import { STATIC_SITES, ORGANIZATIONS, ALL_TIME_SLOTS } from './data/sites.js'

const loading = ref(true)
const error = ref(null)

// 筛选条件
const selectedDate = ref(getTodayDate())
const selectedOrg = ref('')
const organizations = ref(ORGANIZATIONS)

// 使用静态场地数据
const allSites = ref(STATIC_SITES)

// 场地详情
const selectedSiteDetail = ref(null)
const detailLoading = ref(false)
const canReserveTimes = ref(null)
const timeLoading = ref(false)

// 用户信息
const currentUser = ref({ name: '', userid: '' })

// 预约表单
const showReserveForm = ref(false)
const reserveForm = ref({ SYSD: '', selectedSlots: [], SQRXM: '', LXDH: '', SQCS: '', BZ: '' })
const reserveLoading = ref(false)

// tab
const currentTab = ref('reserve')

// 预约记录
const records = ref([])
const recordsLoading = ref(false)
const selectedRecord = ref(null)
const recordDetailLoading = ref(false)

async function switchToRecords() {
  currentTab.value = 'records'
  recordsLoading.value = true
  try {
    const result = await api.getReserveRecords()
    records.value = result.rows || []
  } catch (err) {
    alert('获取记录失败: ' + err.message)
  } finally {
    recordsLoading.value = false
  }
}

async function openRecordDetail(record) {
  selectedRecord.value = { ...record }
  recordDetailLoading.value = true
  try {
    const detail = await api.getReserveDetail(record.WID)
    selectedRecord.value = { ...record, ...detail }
  } catch (err) {
    alert('获取详情失败: ' + err.message)
  } finally {
    recordDetailLoading.value = false
  }
}

async function doCancelReserve(wid) {
  if (!confirm('确认撤回该预约？')) return
  try {
    await api.cancelReserve(wid)
    alert('撤回成功')
    selectedRecord.value = null
    await switchToRecords()
  } catch (err) {
    alert('撤回失败: ' + err.message)
  }
}

async function doDeleteReserve(wid) {
  if (!confirm('确认删除该草稿？')) return
  try {
    await api.deleteReserve(wid, selectedRecord.value.SQBM)
    alert('删除成功')
    selectedRecord.value = null
    await switchToRecords()
  } catch (err) {
    alert('删除失败: ' + err.message)
  }
}

// 获取今天日期
function getTodayDate() {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

function getMaxDate() {
  const now = new Date()
  // 今晚12点（即明天凌晨0点）后才能预约3天后，否则只能预约2天后
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  const isAfterMidnight = now >= tomorrow
  const max = new Date()
  max.setDate(max.getDate() + (isAfterMidnight ? 3 : 2))
  return max.toISOString().split('T')[0]
}

// 根据筛选条件过滤场地
const filteredSites = computed(() => {
  if (!selectedOrg.value) {
    return allSites.value
  }
  return allSites.value.filter(site => site.XQDM === selectedOrg.value)
})

// 获取管理单位名称
function getOrgName(xqdm) {
  const org = organizations.value.find(o => o.id === xqdm)
  return org ? org.name : '未知'
}

// 初始化
async function init() {
  try {
    loading.value = true
    error.value = null
    await api.preheat()
    const user = await api.getUserInfo()
    currentUser.value = user
    const saved = JSON.parse(localStorage.getItem('bit_reserve_user') || '{}')
    reserveForm.value.SQRXM = saved.SQRXM || user.name
    reserveForm.value.LXDH = saved.LXDH || user.phone
    reserveForm.value.SQCS = saved.SQCS || ''
    reserveForm.value.BZ = saved.BZ || ''
    loading.value = false
  } catch (err) {
    error.value = err.message
    loading.value = false
  }
}

function saveUserInfo() {
  localStorage.setItem('bit_reserve_user', JSON.stringify({
    SQRXM: reserveForm.value.SQRXM,
    LXDH: reserveForm.value.LXDH,
    SQCS: reserveForm.value.SQCS,
    BZ: reserveForm.value.BZ,
  }))
  alert('个人信息已保存')
}

// 选择场地查看详情
async function selectSite(site) {
  detailLoading.value = true
  selectedSiteDetail.value = { CDMC: site.CDMC, XQDM: site.XQDM }
  try {
    const detail = await api.getSiteDetail(site.CDDM)
    console.log('[场地详情]', detail)
    selectedSiteDetail.value = detail
  } catch (err) {
    alert('加载场地详情失败: ' + err.message)
    selectedSiteDetail.value = null
  } finally {
    detailLoading.value = false
  }
}

// 加载可预约时间段
async function loadCanReserveTime() {
  timeLoading.value = true
  try {
    // 使用正确的接口获取实际可用时段
    const availableSlots = await api.getAvailableTimeSlots(
      selectedSiteDetail.value.CDDM,
      selectedDate.value
    )
    console.log('[可预约时段]', availableSlots)

    // 直接使用返回的时段列表
    canReserveTimes.value = availableSlots.map(slot => ({
      KSSJ: slot.SYSD.split('-')[0],
      JSSJ: slot.SYSD.split('-')[1],
      SDDM: slot.SDDM,
      SYSD: slot.SYSD,
    }))
  } catch (err) {
    alert('加载时间段失败: ' + err.message)
  } finally {
    timeLoading.value = false
  }
}

// 关闭详情弹窗
function closeSiteDetail() {
  selectedSiteDetail.value = null
  canReserveTimes.value = null
}

// 预约表单里切换日期时重新加载时段
async function onReserveDateChange() {
  canReserveTimes.value = null
  reserveForm.value.selectedSlots = []
  await loadCanReserveTime()
}

// 计算时段状态: 'available' | 'occupied' | 'past'
function getSlotStatus(sysd) {
  const availableSet = new Set((canReserveTimes.value || []).map(t => t.SYSD))
  // 判断是否已过时（仅今天）
  if (selectedDate.value === getTodayDate()) {
    const endTime = sysd.split('-')[0] // 取开始时间
    const [h, m] = endTime.split(':').map(Number)
    const now = new Date()
    if (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes())) {
      return 'past'
    }
  }
  return availableSet.has(sysd) ? 'available' : 'occupied'
}

// 前往预约
async function goToReserve() {
  showReserveForm.value = true
  canReserveTimes.value = null
  reserveForm.value.SYSD = ''
  await loadCanReserveTime()
}

// 提交预约
async function submitReserve() {
  if (!reserveForm.value.SQRXM || !reserveForm.value.LXDH || !reserveForm.value.SQCS || !reserveForm.value.selectedSlots.length) {
    alert('请填写姓名、联系电话、申请陈述并选择至少一个时段')
    return
  }
  reserveLoading.value = true
  try {
    const result = await api.submitReserve({
      CDDM: selectedSiteDetail.value.CDDM,
      CDDM_DISPLAY: selectedSiteDetail.value.CDMC,
      YYRQ: selectedDate.value,
      SYSD: reserveForm.value.selectedSlots.join(', '),
      SQRXM: reserveForm.value.SQRXM,
      LXDH: reserveForm.value.LXDH,
      SQCS: reserveForm.value.SQCS,
      BZ: reserveForm.value.BZ,
      DWDM: currentUser.value.dwdm || '107',
      SHZT: '90',
    })
    alert('预约成功！')
    showReserveForm.value = false
    closeSiteDetail()
  } catch (err) {
    alert('预约失败: ' + err.message)
  } finally {
    reserveLoading.value = false
  }
}

onMounted(() => {
  init()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323:wght@400&display=swap');

/* ===== 星露谷物语像素风主题 ===== */

/* CSS 变量 + 容器样式 */
.bit-reserve-container {
  --sdv-bg: #2d1b00;
  --sdv-bg2: #3d2800;
  --sdv-paper: #f5e6c8;
  --sdv-paper2: #edddb0;
  --sdv-border: #6b4c2a;
  --sdv-border-dark: #3d2800;
  --sdv-green: #4a7c3f;
  --sdv-green-dark: #2d5a27;
  --sdv-green-light: #6aab5e;
  --sdv-orange: #c8702a;
  --sdv-orange-dark: #a05520;
  --sdv-yellow: #e8c84a;
  --sdv-red: #c83030;
  --sdv-red-dark: #a02020;
  --sdv-text: #2d1b00;
  --sdv-text-light: #6b4c2a;
  --sdv-white: #fff8f0;
  --sdv-shadow: #1a0d00;
  --sdv-pixel: 4px;
  min-height: 100vh;
  background-color: var(--sdv-bg);
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(0,0,0,0.15) 31px, rgba(0,0,0,0.15) 32px),
    repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(0,0,0,0.08) 31px, rgba(0,0,0,0.08) 32px);
  padding: 20px;
  font-family: 'VT323', 'Press Start 2P', monospace;
}

.loading,
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  color: var(--sdv-paper);
  font-family: 'VT323', monospace;
  font-size: 22px;
}

/* 像素风加载动画（方块闪烁）*/
.spinner {
  width: 48px;
  height: 48px;
  background: var(--sdv-yellow);
  box-shadow:
    4px 0 0 var(--sdv-orange),
    0 4px 0 var(--sdv-green),
    -4px 0 0 var(--sdv-orange-dark),
    0 -4px 0 var(--sdv-green-dark);
  animation: pixel-spin 0.8s steps(4) infinite;
}

@keyframes pixel-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error button {
  margin-top: 20px;
  padding: 10px 30px;
  background: var(--sdv-orange);
  color: var(--sdv-white);
  border: none;
  border-top: 4px solid var(--sdv-yellow);
  border-left: 4px solid var(--sdv-yellow);
  border-right: 4px solid var(--sdv-orange-dark);
  border-bottom: 4px solid var(--sdv-orange-dark);
  cursor: pointer;
  font-family: 'VT323', monospace;
  font-size: 20px;
  letter-spacing: 1px;
  transition: filter 0.1s;
}
.error button:hover {
  filter: brightness(1.15);
}
.error button:active {
  border-top: 4px solid var(--sdv-orange-dark);
  border-left: 4px solid var(--sdv-orange-dark);
  border-right: 4px solid var(--sdv-yellow);
  border-bottom: 4px solid var(--sdv-yellow);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  color: var(--sdv-paper);
  margin-bottom: 24px;
}

.header h1 {
  font-family: 'Press Start 2P', monospace;
  font-size: 1.4em;
  margin: 0;
  color: var(--sdv-yellow);
  text-shadow:
    2px 2px 0 var(--sdv-shadow),
    -1px -1px 0 var(--sdv-border-dark);
  letter-spacing: 2px;
  line-height: 1.6;
}

.subtitle {
  opacity: 0.85;
  margin-top: 10px;
  font-family: 'VT323', monospace;
  font-size: 20px;
  color: var(--sdv-paper2);
}

.filters {
  display: flex;
  gap: 15px;
  align-items: center;
  background: var(--sdv-paper);
  padding: 16px 20px;
  border-top: 4px solid var(--sdv-paper2);
  border-left: 4px solid var(--sdv-paper2);
  border-right: 4px solid var(--sdv-border);
  border-bottom: 4px solid var(--sdv-border);
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-item label {
  font-family: 'VT323', monospace;
  font-size: 20px;
  color: var(--sdv-text);
  font-weight: bold;
}

.filter-item input,
.filter-item select {
  padding: 6px 10px;
  border-top: 3px solid var(--sdv-border-dark);
  border-left: 3px solid var(--sdv-border-dark);
  border-right: 3px solid var(--sdv-paper2);
  border-bottom: 3px solid var(--sdv-paper2);
  background: var(--sdv-white);
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--sdv-text);
  outline: none;
}

.refresh-btn {
  padding: 8px 20px;
  background: var(--sdv-green);
  color: var(--sdv-white);
  border: none;
  border-top: 3px solid var(--sdv-green-light);
  border-left: 3px solid var(--sdv-green-light);
  border-right: 3px solid var(--sdv-green-dark);
  border-bottom: 3px solid var(--sdv-green-dark);
  cursor: pointer;
  font-family: 'VT323', monospace;
  font-size: 20px;
  margin-left: auto;
  letter-spacing: 1px;
}

.refresh-btn:hover {
  filter: brightness(1.15);
}

.refresh-btn:active {
  border-top: 3px solid var(--sdv-green-dark);
  border-left: 3px solid var(--sdv-green-dark);
  border-right: 3px solid var(--sdv-green-light);
  border-bottom: 3px solid var(--sdv-green-light);
}

.sites-container {
  background: var(--sdv-paper);
  padding: 16px;
  border-top: 4px solid var(--sdv-paper2);
  border-left: 4px solid var(--sdv-paper2);
  border-right: 4px solid var(--sdv-border);
  border-bottom: 4px solid var(--sdv-border);
  min-height: 400px;
}

.empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--sdv-text-light);
  font-family: 'VT323', monospace;
  font-size: 22px;
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.site-card {
  background: var(--sdv-white);
  border-top: 4px solid var(--sdv-paper2);
  border-left: 4px solid var(--sdv-paper2);
  border-right: 4px solid var(--sdv-border);
  border-bottom: 4px solid var(--sdv-border);
  padding: 14px;
  cursor: pointer;
  transition: filter 0.1s;
}

.site-card:hover {
  filter: brightness(0.95);
  border-top: 4px solid var(--sdv-border);
  border-left: 4px solid var(--sdv-border);
  border-right: 4px solid var(--sdv-paper2);
  border-bottom: 4px solid var(--sdv-paper2);
}

.site-card h3 {
  margin: 0 0 8px 0;
  font-family: 'VT323', monospace;
  font-size: 22px;
  color: var(--sdv-text);
}

.site-info {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.badge {
  padding: 2px 8px;
  font-family: 'VT323', monospace;
  font-size: 16px;
  background: var(--sdv-paper2);
  color: var(--sdv-text);
  border: 2px solid var(--sdv-border);
}

.badge.open {
  background: var(--sdv-green);
  color: var(--sdv-white);
  border-color: var(--sdv-green-dark);
}

.badge.closed {
  background: var(--sdv-red);
  color: var(--sdv-white);
  border-color: var(--sdv-red-dark);
}

.week-status {
  display: flex;
  gap: 4px;
}

.day-status {
  flex: 1;
  padding: 4px;
  text-align: center;
  font-family: 'VT323', monospace;
  font-size: 14px;
}

.day-status.locked {
  background: var(--sdv-paper2);
  color: var(--sdv-text-light);
}

.day-status.available {
  background: var(--sdv-green);
  color: var(--sdv-white);
}

.day-status.occupied {
  background: var(--sdv-orange);
  color: var(--sdv-white);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  color: var(--sdv-paper);
  font-family: 'VT323', monospace;
  font-size: 20px;
}

.pagination button {
  padding: 6px 18px;
  background: var(--sdv-paper);
  color: var(--sdv-text);
  border: none;
  border-top: 3px solid var(--sdv-paper2);
  border-left: 3px solid var(--sdv-paper2);
  border-right: 3px solid var(--sdv-border);
  border-bottom: 3px solid var(--sdv-border);
  cursor: pointer;
  font-family: 'VT323', monospace;
  font-size: 18px;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 13, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--sdv-paper);
  padding: 24px;
  border-top: 6px solid var(--sdv-paper2);
  border-left: 6px solid var(--sdv-paper2);
  border-right: 6px solid var(--sdv-border-dark);
  border-bottom: 6px solid var(--sdv-border-dark);
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  font-family: 'VT323', monospace;
}

.modal-content h2 {
  font-family: 'VT323', monospace;
  font-size: 26px;
  color: var(--sdv-text);
  margin: 0 0 16px 0;
  padding-right: 30px;
  border-bottom: 3px solid var(--sdv-border);
  padding-bottom: 8px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--sdv-red);
  border: none;
  border-top: 3px solid #e06060;
  border-left: 3px solid #e06060;
  border-right: 3px solid var(--sdv-red-dark);
  border-bottom: 3px solid var(--sdv-red-dark);
  font-size: 16px;
  cursor: pointer;
  color: var(--sdv-white);
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'VT323', monospace;
}

.close-btn:active {
  border-top: 3px solid var(--sdv-red-dark);
  border-left: 3px solid var(--sdv-red-dark);
  border-right: 3px solid #e06060;
  border-bottom: 3px solid #e06060;
}

.detail-info p {
  margin: 8px 0;
  font-size: 18px;
  color: var(--sdv-text);
}

.rules {
  margin-top: 12px;
}

.rules pre {
  white-space: pre-wrap;
  background: var(--sdv-paper2);
  padding: 10px;
  border-left: 4px solid var(--sdv-border);
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: var(--sdv-text);
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  align-items: stretch;
}

.save-info-btn {
  flex: 0 0 auto;
  padding: 10px 16px;
  background: var(--sdv-paper2);
  color: var(--sdv-text);
  border: none;
  border-top: 3px solid var(--sdv-white);
  border-left: 3px solid var(--sdv-white);
  border-right: 3px solid var(--sdv-border);
  border-bottom: 3px solid var(--sdv-border);
  font-family: 'VT323', monospace;
  font-size: 18px;
  cursor: pointer;
  white-space: nowrap;
}

.save-info-btn:hover {
  filter: brightness(0.95);
}

.reserve-btn {
  flex: 1;
  width: auto;
  padding: 10px 12px;
  background: var(--sdv-green);
  color: var(--sdv-white);
  border: none;
  border-top: 4px solid var(--sdv-green-light);
  border-left: 4px solid var(--sdv-green-light);
  border-right: 4px solid var(--sdv-green-dark);
  border-bottom: 4px solid var(--sdv-green-dark);
  cursor: pointer;
  font-family: 'VT323', monospace;
  font-size: 22px;
  margin-top: 0;
  letter-spacing: 2px;
}

.reserve-btn:hover {
  filter: brightness(1.1);
}

.reserve-btn:active {
  border-top: 4px solid var(--sdv-green-dark);
  border-left: 4px solid var(--sdv-green-dark);
  border-right: 4px solid var(--sdv-green-light);
  border-bottom: 4px solid var(--sdv-green-light);
}

.reserve-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.load-time-btn {
  width: 100%;
  padding: 8px;
  margin-top: 12px;
  background: var(--sdv-paper2);
  border: none;
  border-top: 3px solid var(--sdv-white);
  border-left: 3px solid var(--sdv-white);
  border-right: 3px solid var(--sdv-border);
  border-bottom: 3px solid var(--sdv-border);
  cursor: pointer;
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--sdv-text);
}

.load-time-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.time-slots {
  margin-top: 12px;
  font-size: 18px;
}

.slots-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.slot {
  padding: 4px 10px;
  background: var(--sdv-green);
  color: var(--sdv-white);
  border: 2px solid var(--sdv-green-dark);
  font-family: 'VT323', monospace;
  font-size: 16px;
}

.detail-loading {
  text-align: center;
  padding: 30px;
  color: var(--sdv-text-light);
  font-family: 'VT323', monospace;
  font-size: 20px;
}

.form-group {
  margin-bottom: 14px;
}

.form-group label {
  display: block;
  font-family: 'VT323', monospace;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
  color: var(--sdv-text);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 7px 10px;
  border: none;
  border-top: 3px solid var(--sdv-border-dark);
  border-left: 3px solid var(--sdv-border-dark);
  border-right: 3px solid var(--sdv-paper2);
  border-bottom: 3px solid var(--sdv-paper2);
  background: var(--sdv-white);
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--sdv-text);
  box-sizing: border-box;
  outline: none;
}

.form-group textarea {
  height: 80px;
  resize: vertical;
}

.slots-check {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.slot-check-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  font-family: 'VT323', monospace;
  font-size: 17px;
  cursor: pointer;
  border: 2px solid transparent;
}

.slot-check-item.available {
  background: var(--sdv-green);
  color: var(--sdv-white);
  border-color: var(--sdv-green-dark);
  font-weight: bold;
}

.slot-check-item.occupied {
  background: #f5e0e0;
  color: var(--sdv-red-dark);
  border-color: var(--sdv-red);
  cursor: not-allowed;
}

.slot-check-item.past {
  background: var(--sdv-paper2);
  color: var(--sdv-text-light);
  border-color: var(--sdv-border);
  cursor: not-allowed;
  opacity: 0.6;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  justify-content: center;
}

.tab-btn {
  padding: 8px 20px;
  background: var(--sdv-bg2);
  color: var(--sdv-paper2);
  border: none;
  border-top: 3px solid var(--sdv-border);
  border-left: 3px solid var(--sdv-border);
  border-right: 3px solid var(--sdv-border-dark);
  border-bottom: 3px solid var(--sdv-border-dark);
  cursor: pointer;
  font-family: 'VT323', monospace;
  font-size: 20px;
  letter-spacing: 1px;
  transition: filter 0.1s;
}

.tab-btn:hover {
  filter: brightness(1.2);
}

.tab-btn.active {
  background: var(--sdv-green);
  color: var(--sdv-white);
  border-top: 3px solid var(--sdv-green-light);
  border-left: 3px solid var(--sdv-green-light);
  border-right: 3px solid var(--sdv-green-dark);
  border-bottom: 3px solid var(--sdv-green-dark);
}

.records-container {
  padding: 10px 0;
}

.record-card {
  background: var(--sdv-paper);
  border-top: 4px solid var(--sdv-paper2);
  border-left: 4px solid var(--sdv-paper2);
  border-right: 4px solid var(--sdv-border);
  border-bottom: 4px solid var(--sdv-border);
  padding: 12px 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: filter 0.1s;
}

.record-card:hover {
  filter: brightness(0.96);
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.record-site {
  font-family: 'VT323', monospace;
  font-size: 20px;
  font-weight: bold;
  color: var(--sdv-text);
}

.record-status {
  font-family: 'VT323', monospace;
  font-size: 16px;
  padding: 2px 8px;
  border: 2px solid transparent;
}

.record-status.pending {
  background: #fff3cd;
  color: #7a5200;
  border-color: var(--sdv-orange);
}

.record-status.approved {
  background: var(--sdv-paper2);
  color: var(--sdv-green-dark);
  border-color: var(--sdv-green);
}

.record-status.draft {
  background: var(--sdv-paper2);
  color: var(--sdv-text-light);
  border-color: var(--sdv-border);
}

.record-info {
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--sdv-text);
}

.record-time {
  font-family: 'VT323', monospace;
  font-size: 15px;
  color: var(--sdv-text-light);
  margin-top: 4px;
}

.loading-inline {
  text-align: center;
  padding: 20px;
  color: var(--sdv-paper);
  font-family: 'VT323', monospace;
  font-size: 22px;
}

.detail-fields {
  margin-bottom: 15px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 2px solid var(--sdv-paper2);
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--sdv-text);
}

.detail-row span:first-child {
  color: var(--sdv-text-light);
  flex-shrink: 0;
  margin-right: 10px;
}

.cancel-btn {
  width: 100%;
  padding: 10px;
  background: var(--sdv-red);
  color: var(--sdv-white);
  border: none;
  border-top: 4px solid #e06060;
  border-left: 4px solid #e06060;
  border-right: 4px solid var(--sdv-red-dark);
  border-bottom: 4px solid var(--sdv-red-dark);
  font-family: 'VT323', monospace;
  font-size: 20px;
  cursor: pointer;
  letter-spacing: 1px;
}

.cancel-btn:hover {
  filter: brightness(1.1);
}

.cancel-btn:active {
  border-top: 4px solid var(--sdv-red-dark);
  border-left: 4px solid var(--sdv-red-dark);
  border-right: 4px solid #e06060;
  border-bottom: 4px solid #e06060;
}

</style>
