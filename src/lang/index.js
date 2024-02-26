import Vue from "vue";
import VueI18n from "vue-i18n";
import en from './lang-en'
import zh from './lang-zh'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import Cookies from "js-cookie";

Vue.use(VueI18n)

const messages = {
  en: {
    ...en,
    ...enLocale
  },
  zh: {
    ...zh,
    ...zhLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('lang') || 'zh',
  messages,
  silentTranslationWarn: true
})
export default i18n
