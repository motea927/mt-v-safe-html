import type { App } from 'vue'
import DOMPurify from 'dompurify'
import { setGlobalOptions, getBindingValue } from '../shared'
import type { Options } from '../shared'
import { generateHtml } from './generateHtml'

const $safeHtml = generateHtml(getBindingValue, DOMPurify.sanitize)
export const createSafeHtml = {
  install: (app: App, options?: Options) => {
    if (options) {
      setGlobalOptions(options)
    }

    app.config.globalProperties.$safeHtml = $safeHtml
  }
}
