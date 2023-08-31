---
title: $safeHtml
description: create-safe-html
---

Sometimes, we need to update globalOptions, we provide `setGlobalOptions` to override and update options.

## Type

```ts
type Options = {
  defaultString?: string
  sanitizeConfig?: SanitizeConfig
}
```

## Usage

```vue
<template>
  <div v-html="$safeHtml(inValidHtmlString)"></div>
  <button @click="handleClickChange">change options</button>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { setGlobalOptions } from 'mt-v-safe-html'

  const inValidHtmlString = ref(`
    <div></div>invalid div</div>
`)

  const handleClickChange = () => {
    setGlobalOptions({ defaultString: 'new default string' })
  }
</script>
```
