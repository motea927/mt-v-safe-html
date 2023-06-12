import type { Directive } from 'vue'
import type { BindingObj, Options } from './shared'
import {
  getDefaultString,
  sanitizeHtml,
  hasGlobalOptions,
  setGlobalOptions,
  handleDefaultString,
  getBindingValue
} from './shared'

export type SafeHtmlDirective = Directive<
  HTMLElement,
  string | (() => string) | BindingObj
>

export const vSafeHtml: SafeHtmlDirective = (el, binding) => {
  if (!binding.value) return

  const bindingValue = getBindingValue(binding.value)
  const defaultString =
    typeof binding.value === 'string' || typeof binding.value === 'function'
      ? getDefaultString()
      : getDefaultString(binding.value.defaultString)
  const sanitizeConfig =
    typeof binding.value === 'string' || typeof binding.value === 'function'
      ? undefined
      : binding.value.sanitizeConfig

  if (handleDefaultString(el, bindingValue, defaultString, sanitizeConfig)) {
    return
  }

  const sanitizeResult = sanitizeHtml(bindingValue, sanitizeConfig)
  el.innerHTML = sanitizeResult
}

export const createDirective = (options?: Options) => {
  if (!hasGlobalOptions() && options) {
    setGlobalOptions(options)
  }
  return vSafeHtml
}
