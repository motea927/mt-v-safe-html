<template>
  <div>
    <h2>valid test</h2>
    <div v-html="$safeHtml(xssHtmlString)"></div>
    <div v-html="$safeHtml({ htmlString: xssHtmlString })"></div>

    <div v-html="$safeHtml(linkHtmlString)"></div>
    <div v-html="$safeHtml({ htmlString: linkHtmlString })"></div>
    <div
      v-html="
        $safeHtml({
          htmlString: linkHtmlString,
          sanitizeConfig
        })
      "
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const xssHtmlString = ref(`<img src=1 onerror=alert(1)>`)
const linkHtmlString = ref(
  `<a href="http://google.com.tw" target="_blank" rel="noopener noreferrer" style="color: blue;">
    link
  </a>`
)
const sanitizeConfig = { ADD_ATTR: ['target'] }
</script>
