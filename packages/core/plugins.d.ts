import type { $i18nHtml, $safeHtml } from './plugins'

declare module 'vue' {
  interface ComponentCustomProperties {
    $i18nHtml: typeof $i18nHtml
    $safeHtml: typeof $safeHtml
  }
}
