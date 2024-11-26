import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import vi from './locales/vi.json'

const messages = { en, vi }

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'vi',
  fallbackFormat: 'en',
  messages: messages
})
