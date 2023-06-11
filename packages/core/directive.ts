import type { Directive } from 'vue'
import { isValidate } from './validate'
import type { BindingObj, Options } from './shared'
import {
  checkIsBindingObj,
  getDefaultString,
  sanitizeHtml,
  hasGlobalOptions,
  setGlobalOptions
} from './shared'

export type SafeHtmlDirective = Directive<HTMLElement, string | BindingObj>

export const vSafeHtml: SafeHtmlDirective = (el, binding) => {
  if (!binding.value) return

  const isBindingObj = checkIsBindingObj(binding.value)

  // string
  if (!isBindingObj) {
    const bindingValue = binding.value as string
    const defaultString = getDefaultString()
    const hasDefaultString = defaultString !== undefined

    if (hasDefaultString && !isValidate(bindingValue)) {
      const sanitizeDefaultResult = sanitizeHtml(defaultString)

      el.innerHTML = sanitizeDefaultResult
      return
    }

    const sanitizeResult = sanitizeHtml(bindingValue)

    el.innerHTML = sanitizeResult
    return
  }

  // obj
  const bindingObj = binding.value as BindingObj
  const componentDefaultString = getDefaultString(bindingObj.defaultString)

  const hasDefaultString = componentDefaultString !== undefined

  if (hasDefaultString && !isValidate(bindingObj.htmlString)) {
    const sanitizeDefaultResult = sanitizeHtml(
      componentDefaultString,
      bindingObj.sanitizeConfig
    )

    el.innerHTML = sanitizeDefaultResult
    return
  }

  const sanitizeResult = sanitizeHtml(
    bindingObj.htmlString,
    bindingObj.sanitizeConfig
  )

  el.innerHTML = sanitizeResult
}

export const createDirective = (options?: Options) => {
  if (!hasGlobalOptions() && options) {
    setGlobalOptions(options)
  }
  return vSafeHtml
}
