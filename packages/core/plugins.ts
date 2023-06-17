import type { App } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Options, BindingObj } from './shared'
import {
  setGlobalOptions,
  getBindingValue,
  getDefaultString,
  handleDefaultString,
  sanitizeHtml
} from './shared'

const generateHtml =
  (getContentText: (binding: string | BindingObj) => string) =>
  (binding: string | BindingObj): string => {
    if (!binding) return ''

    const contentText = getContentText(binding)
    const defaultString =
      typeof binding === 'string'
        ? getDefaultString()
        : getDefaultString(binding.defaultString)
    const sanitizeConfig =
      typeof binding === 'string' ? undefined : binding.sanitizeConfig

    const defaultStringResult = handleDefaultString(
      contentText,
      defaultString,
      sanitizeConfig
    )

    if (defaultStringResult !== false) {
      return defaultStringResult
    }

    const sanitizeResult = sanitizeHtml(contentText, sanitizeConfig)

    return sanitizeResult
  }

export const $safeHtml = generateHtml(getBindingValue)

export const $i18nHtml = generateHtml((binding) => {
  if (!useI18n) {
    console.warn(`[mt-v-safe-html]: can not find vue-i18n`)
    return ''
  }
  const { t } = useI18n()
  const i18nContentKey = getBindingValue(binding)
  return getBindingValue(() => t(i18nContentKey))
})

export const createSafeHtml = {
  install: (app: App, options?: Options) => {
    if (options) {
      setGlobalOptions(options)
    }

    app.config.globalProperties.$safeHtml = $safeHtml
  }
}

export const createI18nHtml = {
  install: (app: App, options?: Options) => {
    if (options) {
      setGlobalOptions(options)
    }

    app.config.globalProperties.$i18nHtml = $i18nHtml
  }
}
