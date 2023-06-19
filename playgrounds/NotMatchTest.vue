<template>
  <div>
    <h2>invalid test</h2>
    <div v-html="$safeHtml(inValidHtmlString)"></div>
    <div v-html="$safeHtml({ htmlString: inValidHtmlString })"></div>
    <div
      v-html="
        $safeHtml({
          htmlString: inValidHtmlString,
          defaultString: componentsDefaultString
        })
      "
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inValidHtmlString = ref(`<div> invalid</div></div>`)
const componentsDefaultString = 'components default string'
</script>
