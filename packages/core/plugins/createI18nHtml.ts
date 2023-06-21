import type { App } from 'vue'
import { useI18n } from 'vue-i18n'
import { setGlobalOptions, getBindingValue } from '../shared'
import type { Options } from '../shared'
import { generateHtml } from './generateHtml'

const $i18nHtml = generateHtml((binding) => {
  if (!useI18n) {
    console.warn(`[mt-v-safe-html]: can not find vue-i18n`)
    return ''
  }
  const { t } = useI18n()
  const i18nContentKey = getBindingValue(binding)
  return getBindingValue(() => t(i18nContentKey))
})

export const createI18nHtml = {
  install: (app: App, options?: Options) => {
    if (options) {
      setGlobalOptions(options)
    }

    app.config.globalProperties.$i18nHtml = $i18nHtml
  }
}
