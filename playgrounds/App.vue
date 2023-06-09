<template>
  <div>
    <h1>v-safe-html</h1>
    <div>
      <h2>invalid test</h2>
      <div v-safe-html="inValidHtmlString"></div>
      <div v-safe-html="{ htmlString: inValidHtmlString }"></div>
      <div
        v-safe-html="{
          htmlString: inValidHtmlString,
          defaultString: 'components default string'
        }"
      ></div>
    </div>

    <div>
      <h2>valid test</h2>
      <div v-safe-html="validHtmlString"></div>
      <div v-safe-html="{ htmlString: validHtmlString }"></div>

      <div v-safe-html="linkHtmlString"></div>
      <div v-safe-html="{ htmlString: linkHtmlString }"></div>
      <div
        v-safe-html="{
          htmlString: linkHtmlString,
          sanitizeConfig
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inValidHtmlString = ref(`<div> invalid</div></div>`)
const validHtmlString = ref(`<div> valid alert('valid');</div>`)
const linkHtmlString = ref(
  `<a href="http://google.com.tw" target="_blank" rel="noopener noreferrer">
    link
  </a>`
)
const sanitizeConfig = { ADD_ATTR: ['target'] }
console.log('release test')
</script>
