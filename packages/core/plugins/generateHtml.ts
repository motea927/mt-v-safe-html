import type DOMPurify from 'dompurify'
import type { BindingObj, BindingI18nObj } from '../shared'
import { getDefaultString, handleDefaultString, sanitizeHtml } from '../shared'

export const generateHtml =
  (
    getContentText: (binding: string | BindingObj | BindingI18nObj) => string,
    sanitizeFun: typeof DOMPurify.sanitize
  ) =>
  (binding: string | BindingObj): string => {
    if (!binding) return ''
    const contentText = getContentText(binding)
    const defaultString =
      typeof binding === 'string'
        ? getDefaultString()
        : getDefaultString(binding.defaultString)
    const sanitizeConfig =
      typeof binding === 'string' ? undefined : binding.sanitizeConfig
    const defaultStringResult = handleDefaultString(
      contentText,
      defaultString,
      sanitizeConfig ?? {},
      sanitizeFun
    )
    if (defaultStringResult !== false) {
      return defaultStringResult
    }
    const sanitizeResult = sanitizeHtml(
      contentText,
      sanitizeConfig ?? {},
      sanitizeFun
    )
    return sanitizeResult
  }
