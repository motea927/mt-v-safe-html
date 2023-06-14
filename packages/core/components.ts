import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import type { BindingObj } from './shared'
import { getDefaultString, sanitizeHtml, getBindingValue } from './shared'
import { isValidate } from './validate'

type Props = BindingObj & {
  /**
   * The element that the component should be rendered as
   *
   * @default 'div'
   */
  as?: object | string
}

export const UseSafeHtml = defineComponent({
  name: 'UseSafeHtml',
  props: {
    htmlString: {
      type: [String, Function] as PropType<Props['htmlString']>,
      required: true
    },
    defaultString: String as PropType<Props['defaultString']>,
    sanitizeConfig: Object as PropType<Props['sanitizeConfig']>,
    as: String as PropType<Props['as']>
  },
  computed: {
    bindingValue(): string {
      return getBindingValue(this.htmlString)
    }
  },
  render() {
    const componentDefaultString = getDefaultString(this.defaultString)
    const hasDefaultString = componentDefaultString !== undefined

    if (hasDefaultString && !isValidate(this.bindingValue)) {
      const sanitizeDefaultResult = sanitizeHtml(
        componentDefaultString,
        this.sanitizeConfig
      )

      return h(this.as || 'div', {
        innerHTML: sanitizeDefaultResult
      })
    }

    const sanitizeResult = sanitizeHtml(this.bindingValue, this.sanitizeConfig)

    return h(this.as || 'div', {
      innerHTML: sanitizeResult
    })
  }
})
