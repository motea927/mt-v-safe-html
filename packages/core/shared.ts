import DOMPurify from 'dompurify'
import type { Config } from 'dompurify'
import { ref } from 'vue'
import { isValidate } from './validate'

type SanitizeConfig = Config & {
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

const globalOptions = ref<Options | undefined>()

export function getDefaultString(
  componentDefaultString?: string
): string | undefined {
  return componentDefaultString ?? globalOptions.value?.defaultString
}

const { sanitize } = DOMPurify
export function sanitizeHtml(html: string, sanitizeConfig?: SanitizeConfig) {
  const overrideSanitizeConfig =
    globalOptions.value?.sanitizeConfig || sanitizeConfig
  return overrideSanitizeConfig
    ? sanitize(html, overrideSanitizeConfig)
    : sanitize(html)
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
  sanitizeConfig?: Options['sanitizeConfig']
) {
  if (defaultString && !isValidate(bindingValue)) {
    const sanitizeDefaultResult = sanitizeHtml(defaultString, sanitizeConfig)
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
