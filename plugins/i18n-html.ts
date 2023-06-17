import type { App } from 'vue'

export const i18nHtml = {
  install: (app: App, options) => {
    app.config.globalProperties.$translate = (key: string) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return `${key} plugin`
    }
  }
}
