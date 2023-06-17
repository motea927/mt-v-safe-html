import type { $i18nHtml } from './plugins'

declare module 'vue' {
  interface ComponentCustomProperties {
    $i18nHtml: typeof $i18nHtml
  }
}
