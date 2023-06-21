import type { BindingObj, BindingI18nObj } from './shared'

export { setGlobalOptions } from './shared'
export { createI18nHtml, createSafeHtml } from './plugins'

export {}
declare module 'vue' {
  export interface ComponentCustomProperties {
    $i18nHtml: (binding: string | BindingI18nObj) => string
    $safeHtml: (binding: string | BindingObj) => string
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $i18nHtml: (binding: string | BindingI18nObj) => string
    $safeHtml: (binding: string | BindingObj) => string
  }
}
