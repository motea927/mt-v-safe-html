# mt-v-safe-html

A lightweight, flexible, and robust XSS sanitizer's Vue directive based on [DOMPurify](https://github.com/cure53/DOMPurify).

> **Warning**: The library is under development. Recommend not to use.

## 💪 Motivation
For any commercial projects, we often had to provide html configuration (maybe from API) for customers, but there is a worry our customer may use error syntax or unintentionally copy xss syntax from the Internet.

This had some miserable experiences.
- `<div>something</div></div>` -> Nuxt render mismatching, layout broken and hard to debug.
- `please contact example@example.com` -> From remote API to i18n, not use [Literal interpolation
](https://vue-i18n.intlify.dev/guide/essentials/syntax.html#literal-interpolation), application crash.

So, why not to use a robust mechanism? Just set a default string, when we have seen default string, it represent our v-html has some error.

```ts
// main.ts
import { createApp } from 'vue'
import { createDirective } from 'mt-v-safe-html'
import App from './App.vue'

createApp(App)
  .directive(
    'safe-html',
    createDirective({ defaultString: 'Please update your text'})
  )
  .mount('#app')
```

```vue
<template>
  <div v-safe-html="'<div>something</div></div>'"></div>
  <div v-safe-html="() => $t('contact-us')">
  </div>
</template>
```
> **Note**: i18n crash only occur in production.

## 🚀 Features

- ⚡ **Lightweight**: The bundle size is less than 9kb when gzipped.
- 🔌 **Flexible**: Supports global configuration and allows for overriding in individual components.
- 👍 **Robust**: Provides support for a default string. If the sanitized tag does not match the original HTML, you can choose to display the default string or the result from DOMPurify.
- 🦾 **Type Strong**: Written in TypeScript for improved code safety and predictability.

## 🏎 Usage

Refer to [documentations](https://mt-v-safe-html.morty.tw) for more details.

### global directive

todo

### import on demand

todo

## 📦 Install

```bash
pnpm add mt-v-safe-html
yarn add mt-v-safe-html
npm install mt-v-safe-html
```
