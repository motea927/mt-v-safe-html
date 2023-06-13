import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createDirective } from '../directive'
import { setGlobalOptions } from '../shared'
import type { Options } from '../shared'

const mountGlobalElement = (htmlString: string, globalOptions?: Options) => {
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
  it('Basic Global directive can work', () => {
    const htmlString = `<p>this is html</p>`
    const wrapper = mountGlobalElement(htmlString)
    expect(wrapper.html()).toContain(htmlString)
  })

  it('Global default string can work', () => {
    const notMatchHtmlString = '<div>something</div></div>'
    const matchHtmlString = '<div>something</div>'
    const defaultString = 'not match error'
    const errorWrapper = mountGlobalElement(notMatchHtmlString, {
      defaultString
    })
    const correctWrapper = mountGlobalElement(matchHtmlString, {
      defaultString
    })

    expect(errorWrapper.html()).toContain(defaultString)
    expect(correctWrapper.html()).toContain(matchHtmlString)
  })

  it('Global sanitize config can work', () => {
    const htmlString = `
    <a
      rel="noopener noreferrer"
      target="_blank"
      href="https://github.com/motea927/mt-v-safe-html"
    >
      link
    </a>
  `

    const noConfigWrapper = mountGlobalElement(htmlString)

    const sanitizeConfig = { ADD_ATTR: ['target'] }
    const configWrapper = mountGlobalElement(htmlString, {
      sanitizeConfig
    })

    expect(noConfigWrapper.find('a').attributes('target')).toBeFalsy()
    expect(configWrapper.find('a').attributes('target')).toContain('_blank')
  })
})
