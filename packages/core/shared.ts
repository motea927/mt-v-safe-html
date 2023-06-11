import DOMPurify from 'dompurify'
import type { Config } from 'dompurify'

type SanitizeConfig = Config & {
  RETURN_DOM_FRAGMENT?: false | undefined
  RETURN_DOM?: false | undefined
}

export type Options = {
  defaultString?: string
  sanitizeConfig?: SanitizeConfig
}

export type BindingObj = {
  htmlString: string
} & Options

let globalOptions: Options | undefined

export function getDefaultString(
  componentDefaultString?: string
): string | undefined {
  return componentDefaultString ?? globalOptions?.defaultString
}

const { sanitize } = DOMPurify
export function sanitizeHtml(html: string, sanitizeConfig?: SanitizeConfig) {
  const mergedSanitizeConfig = globalOptions?.sanitizeConfig || sanitizeConfig
  return mergedSanitizeConfig
    ? sanitize(html, mergedSanitizeConfig)
    : sanitize(html)
}

export function checkIsBindingObj(obj: string | BindingObj): obj is BindingObj {
  return typeof obj !== 'string'
}

export function setGlobalOptions(options: Options) {
  globalOptions = options
}

export function hasGlobalOptions(): boolean {
  return globalOptions !== undefined
}
