---
title: $safeHtml
description: $safeHtml
---

`$safeHtml` received various input, you can input `string`, object, even string function, if function throw an error, will render global default string or `''`.

## string input

Basic usage, often use to check original tag is matched sanitized's tag and prevent xss.

```vue
<template>
  <!-- Render result: <div><img src="1"></div> -->
  <div v-html="$safeHtml(xssHtmlString)"></div>

  <!-- Render result have two possibilities -->
  <!-- 1. has global default string: <div>global string</div>  -->
  <!-- 2. DOMPurify's sanitize result: <div><div></div>invalid div</div> -->
  <div v-html="$safeHtml(inValidHtmlString)"></div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const xssHtmlString = ref(`
    <img src=1 onerror=alert(1)>
`)

  const inValidHtmlString = ref(`
    <div></div>invalid div</div>
`)
</script>
```

## object input

Sometimes we want to overwrite the configuration only within this component, we can use the object input.

```vue
<template>
  <!-- 
    Render result: 
    <div>this default string only work on this component</div> 
  -->
  <div
    v-html="
      $safeHtml({
        htmlString: '<div></div>invalid</div>',
        defaultString: 'this default string only work on this component'
      })
    "
  ></div>
</template>

<script setup lang="ts"></script>
```

### object type

```ts
export type Options = {
  defaultString?: string
  sanitizeConfig?: SanitizeConfig
}

export type BindingObj = {
  htmlString: string | (() => string)
} & Options
```

## functional input

If our string function may throw an error, we can use function input.

```vue
<template>
  <div v-html="$safeHtml(() => $t('some'))"></div>
</template>
```
