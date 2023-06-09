import type { Directive } from 'vue'
import DOMPurify from 'dompurify'
import { isValidate } from './validate'

type SanitizeConfig = DOMPurify.Config & {
  RETURN_DOM_FRAGMENT?: false | undefined
  RETURN_DOM?: false | undefined
}

type Options = {
  defaultString?: string
  sanitizeConfig?: SanitizeConfig
}

type BindingObj = {
  htmlString: string
} & Options

export type SafeHtmlDirective = Directive<HTMLElement, string | BindingObj>

const { sanitize } = DOMPurify
let globalOptions: Options | undefined

function checkIsBindingObj(obj: string | BindingObj): obj is BindingObj {
  return typeof obj !== 'string'
}

function sanitizeHtml(html: string, sanitizeConfig?: SanitizeConfig) {
  return sanitizeConfig ? sanitize(html, sanitizeConfig) : sanitize(html)
}

function getDefaultString(componentDefaultString?: string): string | undefined {
  return componentDefaultString ?? globalOptions?.defaultString
}

export const vSafeHtml: SafeHtmlDirective = (el, binding) => {
  if (!binding.value) return

  const isBindingObj = checkIsBindingObj(binding.value)

  // string
  if (!isBindingObj) {
    const bindingValue = binding.value as string
    const defaultString = getDefaultString()
    const hasDefaultString = defaultString !== undefined

    if (hasDefaultString && !isValidate(bindingValue)) {
      const sanitizeDefaultResult = sanitizeHtml(
        defaultString,
        globalOptions?.sanitizeConfig
      )

      el.innerHTML = sanitizeDefaultResult
      return
    }

    const sanitizeResult = sanitizeHtml(
      bindingValue,
      globalOptions?.sanitizeConfig
    )

    el.innerHTML = sanitizeResult
    return
  }

  // obj
  const bindingObj = binding.value as BindingObj
  const componentDefaultString = getDefaultString(bindingObj.defaultString)

  const hasDefaultString = componentDefaultString !== undefined

  const sanitizeConfig =
    bindingObj.sanitizeConfig || globalOptions?.sanitizeConfig

  if (hasDefaultString && !isValidate(bindingObj.htmlString)) {
    const sanitizeDefaultResult = sanitizeHtml(
      componentDefaultString,
      sanitizeConfig
    )

    el.innerHTML = sanitizeDefaultResult
    return
  }

  const sanitizeResult = sanitizeHtml(bindingObj.htmlString, sanitizeConfig)

  el.innerHTML = sanitizeResult
}

export const setGlobalOptions = (options: Options) => {
  globalOptions = options
}

export const createDirective = (options?: Options) => {
  if (!globalOptions && options) {
    setGlobalOptions(options)
  }
  return vSafeHtml
}
