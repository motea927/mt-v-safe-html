import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { Options } from 'mt-v-safe-html'
import { defu } from 'defu'

export default defineNuxtModule<Options>({
  meta: {
    name: 'mt-v-safe-html',
    configKey: 'mtVSafeHtml'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.mtVSafeHtml = defu(
      nuxt.options.runtimeConfig.public.mtVSafeHtml,
      options
    )
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`

    addPlugin(resolver.resolve('./runtime/plugin.client'))
    addPlugin(resolver.resolve('./runtime/plugin.server'))
  }
})
