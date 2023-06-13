import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createDirective } from '../directive'
import { setGlobalOptions } from '../shared'
import type { Options, BindingObj } from '../shared'

const mountGlobalElement = (
  htmlString: string | (() => string) | BindingObj,
  globalOptions?: Options
) => {
  const Component = {
    template: '<div v-safe-html="htmlString"></div>'
  }
  const wrapper = shallowMount(Component, {
    data: function () {
      return {
        htmlString
      }
    },
    global: {
      directives: {
        'safe-html': createDirective(globalOptions)
      }
    }
  })
  return wrapper
}

beforeEach(() => {
  setGlobalOptions(undefined)
})

describe('Global directive', () => {
  describe('Basic Global directive htmlString can work', () => {
    const htmlString = `<p>this is html</p>`

    it('pure string params', () => {
      const wrapper = mountGlobalElement(htmlString)
      expect(wrapper.html()).toContain(htmlString)
    })

    it('function string params', () => {
      const wrapper = mountGlobalElement(() => htmlString)
      expect(wrapper.html()).toContain(htmlString)
    })

    it('obj params', () => {
      const wrapper = mountGlobalElement({ htmlString })
      expect(wrapper.html()).toContain(htmlString)
    })
  })

  describe('Global default string can work', () => {
    const notMatchHtmlString = '<div>something</div></div>'
    const matchHtmlString = '<div>something</div>'
    const defaultString = 'not match error'

    it('pure string params', () => {
      const errorWrapper = mountGlobalElement(notMatchHtmlString, {
        defaultString
      })
      const correctWrapper = mountGlobalElement(matchHtmlString, {
        defaultString
      })

      expect(errorWrapper.html()).toContain(defaultString)
      expect(correctWrapper.html()).toContain(matchHtmlString)
    })

    it('function string params', () => {
      const errorWrapper = mountGlobalElement(() => notMatchHtmlString, {
        defaultString
      })
      const correctWrapper = mountGlobalElement(() => matchHtmlString, {
        defaultString
      })

      expect(errorWrapper.html()).toContain(defaultString)
      expect(correctWrapper.html()).toContain(matchHtmlString)
    })

    it('obj params', () => {
      const errorWrapper = mountGlobalElement(
        { htmlString: notMatchHtmlString },
        {
          defaultString
        }
      )
      const correctWrapper = mountGlobalElement(
        { htmlString: matchHtmlString },
        {
          defaultString
        }
      )

      expect(errorWrapper.html()).toContain(defaultString)
      expect(correctWrapper.html()).toContain(matchHtmlString)
    })
  })

  describe('Global sanitize config can work', () => {
    const htmlString = `
    <a
      rel="noopener noreferrer"
      target="_blank"
      href="https://github.com/motea927/mt-v-safe-html"
    >
      link
    </a>
  `
    const sanitizeConfig = { ADD_ATTR: ['target'] }

    it('pure string params', () => {
      const noConfigWrapper = mountGlobalElement(htmlString)

      const configWrapper = mountGlobalElement(htmlString, {
        sanitizeConfig
      })

      expect(noConfigWrapper.find('a').attributes('target')).toBeFalsy()
      expect(configWrapper.find('a').attributes('target')).toContain('_blank')
    })

    it('function string params', () => {
      const noConfigWrapper = mountGlobalElement(() => htmlString)

      const configWrapper = mountGlobalElement(htmlString, {
        sanitizeConfig
      })

      expect(noConfigWrapper.find('a').attributes('target')).toBeFalsy()
      expect(configWrapper.find('a').attributes('target')).toContain('_blank')
    })

    it('obj params', () => {
      const noConfigWrapper = mountGlobalElement(() => htmlString)

      const configWrapper = mountGlobalElement(
        { htmlString },
        {
          sanitizeConfig
        }
      )

      expect(noConfigWrapper.find('a').attributes('target')).toBeFalsy()
      expect(configWrapper.find('a').attributes('target')).toContain('_blank')
    })
  })
})
