<template>
  <div>
    <h2>data set</h2>
    <div v-html="$safeHtml(dataSetHtmlString)"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dataSetHtmlString = ref(`
  <div data-test="{"1":1}">dataset</div>
`)
</script>
