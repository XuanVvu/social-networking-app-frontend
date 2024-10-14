import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

function loadLocaleMessages() {
  const locales = import.meta.glob('./locales/*.json', { eager: true })
  const messages: { [key: string]: any } = {}

  for (const path in locales) {
    const matched = path.match(/([A-Za-z0-9-_]+)\.json$/i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = (locales[path] as any).default
    }
  }
  return messages
}

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'vi',
  fallbackFormat: 'en',
  messages: loadLocaleMessages()
})
