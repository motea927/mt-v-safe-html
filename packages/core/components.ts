import { defineComponent, h } from 'vue'
import type { BindingObj } from './shared'
import { getDefaultString, sanitizeHtml } from './shared'
import { isValidate } from './validate'

type Props = BindingObj & {
  /**
   * The element that the component should be rendered as
   *
   * @default 'div'
   */
  as?: object | string
}

export const UseSafeHtml = defineComponent<Props>({
  name: 'UseSafeHtml',
  props: [
    'htmlString',
    'defaultString',
    'sanitizeConfig',
    'as'
  ] as unknown as undefined,

  render() {
    const componentDefaultString = getDefaultString(this.defaultString)
    const hasDefaultString = componentDefaultString !== undefined

    if (hasDefaultString && !isValidate(this.htmlString)) {
      const sanitizeDefaultResult = sanitizeHtml(
        componentDefaultString,
        this.sanitizeConfig
      )

      return h(this.as || 'div', {
        innerHTML: sanitizeDefaultResult
      })
    }

    const sanitizeResult = sanitizeHtml(this.htmlString, this.sanitizeConfig)

    return h(this.as || 'div', {
      innerHTML: sanitizeResult
    })
  }
})
