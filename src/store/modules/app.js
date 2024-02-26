import Cookies from 'js-cookie'
import { localStorageUtil } from "@/utils/storage-util";

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  lang: Cookies.get('lang') || 'zh',
  theme: Cookies.get('theme') || 'theme-boldDark',
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  SET_LANGUAGE: (state, lang) => {
    state.lang = lang
    Cookies.set('lang', lang)
  },
  SET_THEME: (state, theme) => {
    state.theme = theme
    Cookies.set('theme', theme)
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  setLanguage({ commit }, lang) {
    commit('SET_LANGUAGE', lang)
  },
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
