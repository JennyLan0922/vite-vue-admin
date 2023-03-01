import {
  themeColor as themeColorInterface,
  drawerSetting,
  waterMarkType,
} from '@/utils/interface'
// 主题颜色
const themeColor: themeColorInterface = {
  primary: '#AD49FF',
  success: '#67c23a',
  info: '#909399',
  warning: '#e6a23c',
  danger: '#f56c6c',
}

const Tcolors: { [s: string]: string } = JSON.parse(
  window.localStorage.getItem('themeColors') || '{}'
)
const Lcolors: { [s: string]: string } = JSON.parse(
  window.localStorage.getItem('themeLightColors') || '{}'
)
Object.keys(Tcolors).forEach((item: string) => {
  document.documentElement.style.setProperty(item, Tcolors[item])
  const last = item.lastIndexOf('-')
  themeColor[item.substr(last + 1)] = Tcolors[item]

  if (item.substr(last + 1) === 'primary') {
    import('@/store/index').then(({ default: store }) => {
      store.commit('setThemeColor', { key: 'primary', val: themeColor.primary })
    })
  }
})

// 设置颜色
Object.keys(Lcolors).forEach((item: string) => {
  document.documentElement.style.setProperty(item, Lcolors[item])
})

const locale: string = window.localStorage.getItem('locale') || 'zh-CN'
const settings: drawerSetting = JSON.parse(
  window.localStorage.getItem('settings') || '{}'
)
const waterMark: waterMarkType = JSON.parse(
  window.localStorage.getItem('waterMark') || '{}'
)

export type defaultDataType = {
  name: string
  themeColor: themeColorInterface
  iconfont: string
  tabsName: string
  cardShadow: string
  locale: string
  localeSelect: { value: string; label: string }[]
  waterMark: waterMarkType
  settings: drawerSetting
}

export default {
  name: 'Vite-Vue-Admin',
  themeColor,
  // icon图标类型
  iconfont: 'viteIcon',
  // tagView 显示的属性值 [name,title]
  tabsName: 'title',
  // 卡片阴影
  cardShadow: 'hover',
  // 默认语言
  locale,
  localeSelect: [
    {
      value: 'zh-CN',
      label: '中文（简）',
    },
    {
      value: 'zh-TW',
      label: '中文（繁）',
    },
    {
      value: 'en-US',
      label: 'English',
    },
  ],
  // 全局水印
  waterMark: Object.assign(
    {
      switch: 0,
      text: 'Peng_Xiao_Shuai',
      ratio: 0,
      color: '#ddd',
      deg: -20,
      size: 25,
    },
    waterMark
  ),
  settings: Object.assign(
    {
      // layout配置
      fixed: 0,
      isLogo: 1,
      isTagsView: 1,
      defaultMenu: 1,
      leftMargin: 240,
      grayMode: 0,
    },
    settings
  ),
}
