<template>
  <div>
    <ClientOnly>
      <div
        v-html="
          $safeHtml(`<p style='color:red;'>client default string</p></p>`)
        "
      />

      <div v-html="$safeHtml(`<p style='color:red;'>client</p>`)" />
    </ClientOnly>
    <div v-html="$safeHtml(objHtml)" />

    <div v-html="$safeHtml(`<p style='color:red;'>client</p>`)" />
    Nuxt module playground!
  </div>
</template>

<script setup lang="ts">
const objHtml = ref({
  htmlString: `<p style='color:red;'>client default string</p></p>`,
  defaultString: '12345'
})
setTimeout(() => {
  objHtml.value.defaultString = 'settimeout'
}, 2000)
</script>
