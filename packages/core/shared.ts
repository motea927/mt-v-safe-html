import type DOMPurify from 'dompurify'
import { ref } from 'vue'
import { isValidate } from './validate'

type SanitizeConfig = DOMPurify.Config & {
  RETURN_DOM_FRAGMENT?: false | undefined
  RETURN_DOM?: false | undefined
}

export type Options = {
  defaultString?: string
  sanitizeConfig?: SanitizeConfig
}

export type BindingObj = {
  htmlString: string | (() => string)
} & Options

export type BindingI18nObj = Omit<BindingObj, 'htmlString'> & {
  htmlString: string
}

const globalOptions = ref<Options | undefined>()

export function getDefaultString(
  componentDefaultString?: string
): string | undefined {
  return componentDefaultString ?? globalOptions.value?.defaultString
}

export function sanitizeHtml(
  html: string,
  sanitizeConfig: SanitizeConfig,
  sanitizeFun: typeof DOMPurify.sanitize
) {
  const overrideSanitizeConfig =
    globalOptions.value?.sanitizeConfig || sanitizeConfig
  return overrideSanitizeConfig
    ? sanitizeFun(html, overrideSanitizeConfig)
    : sanitizeFun(html)
}

export function setGlobalOptions(options: Options | undefined) {
  globalOptions.value = options
}

export function hasGlobalOptions(): boolean {
  return globalOptions.value !== undefined
}

// Handle default string
export function handleDefaultString(
  bindingValue: string,
  defaultString: string | undefined,
  sanitizeConfig: SanitizeConfig,
  sanitizeFun: typeof DOMPurify.sanitize
) {
  if (defaultString && !isValidate(bindingValue, sanitizeFun)) {
    const sanitizeDefaultResult = sanitizeHtml(
      defaultString,
      sanitizeConfig,
      sanitizeFun
    )
    return sanitizeDefaultResult
  }
  return false
}

// Extract binding value
export function getBindingValue(
  value: string | (() => string) | BindingObj
): string {
  if (typeof value === 'function') {
    try {
      return value()
    } catch {
      return getDefaultString() ?? ''
    }
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value.htmlString === 'function') {
    try {
      return value.htmlString()
    } catch {
      return getDefaultString(value.defaultString) ?? ''
    }
  }

  return value.htmlString
}
