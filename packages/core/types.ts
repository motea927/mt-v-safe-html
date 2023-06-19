import type { BindingObj, BindingI18nObj } from './shared'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $i18nHtml: (binding: string | BindingI18nObj) => string
    $safeHtml: (binding: string | BindingObj) => string
  }
}
