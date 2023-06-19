<template>
  <div>
    <h1>mt-v-safe-html</h1>
    <NotMatchTest />
    <ValidTest />
    <DataSet />

    <div>
      <h2>i18n</h2>
      <p v-html="$safeHtml(`<p style='color: red;'>123</p>`)"></p>
      <p v-html="$i18nHtml('message')"></p>
      <button @click="handleClickChangeMessage">change message</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import NotMatchTest from './NotMatchTest.vue'
import ValidTest from './ValidTest.vue'
import DataSet from './DataSet.vue'

const { setLocaleMessage } = useI18n()
const handleClickChangeMessage = () => {
  setLocaleMessage('en', {
    message: 'error message @'
  })
}
</script>
