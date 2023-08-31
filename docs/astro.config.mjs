import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'mt-v-safe-html',
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon.ico'
          }
        }
      ],

      social: {
        github: 'https://github.com/motea927/mt-v-safe-html'
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Get started', link: '/guides/getting-started/' }
          ]
        },
        {
          label: 'Documentation',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'createSafeHtml',
              link: '/documentation/create-safe-html/'
            },
            {
              label: '$safeHtml',
              link: '/documentation/safe-html/'
            },
            {
              label: 'setGlobalOptions',
              link: '/documentation/set-global-options/'
            }
          ]
        }
      ]
    })
  ],

  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: { service: { entrypoint: 'astro/assets/services/sharp' } }
})
