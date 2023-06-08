import type { Directive } from 'vue'

import { validate } from './validate'

type SafeHtmlDirective = Directive<HTMLElement, string>

export const vSafeHtml: SafeHtmlDirective = (el, binding) => {
  if (!binding.value) return
  el.innerHTML = binding.value
}
