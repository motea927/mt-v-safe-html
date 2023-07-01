import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import type { Options, BindingObj } from '../../shared'
import { setGlobalOptions, createSafeHtml, createI18nHtml } from '../../index'

beforeEach(() => {
  setGlobalOptions(undefined)
})

const mountWithSafeHtml = (
  htmlString: string | (() => string) | BindingObj,
  globalOptions?: Options
) => {
  const Component = {
    template: `<div v-html="$safeHtml(htmlString)"></div>`
  }

  return shallowMount(Component, {
    data: function () {
      return {
        htmlString
      }
    },
    global: {
      plugins: [[createSafeHtml, globalOptions]]
    }
  })
}

describe('$safeHtml', () => {
  describe('string input', () => {
    it('Render correctly with valid html', () => {
      const htmlString = '<p>this is html</p>'
      const wrapper = mountWithSafeHtml(htmlString)
      expect(wrapper.html()).toContain(htmlString)
    })

    it('Render global default string when not match html', () => {
      const htmlString = '<p>this is html</p></p>'
      const defaultString = 'globalDefaultString'
      const wrapper = mountWithSafeHtml(htmlString, { defaultString })
      expect(wrapper.html()).toContain(defaultString)
    })

    it('Render sanitize result without defaultString when not match html', () => {
      const htmlString = '<p>this is html</p></p>'
      const wrapper = mountWithSafeHtml(htmlString)
      expect(wrapper.html()).toContain('<p>this is html</p>')
    })

    it('sanitize config can work', () => {
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

      const noConfigWrapper = mountWithSafeHtml(htmlString)
      const configWrapper = mountWithSafeHtml(htmlString, {
        sanitizeConfig
      })

      expect(noConfigWrapper.find('a').attributes('target')).toBeFalsy()
      expect(configWrapper.find('a').attributes('target')).toContain('_blank')
    })
  })

  describe('function input', () => {
    it('Render correct result when function return string', () => {
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const htmlString = () => '<p>this is html</p></p>'
      const wrapper = mountWithSafeHtml(htmlString)
      expect(wrapper.html()).toContain('<p>this is html</p>')
    })

    it('Render global default string when function throw new error', () => {
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const htmlString = function gg() {
        throw new Error('fail')
      }
      const defaultString = 'globalDefaultString'
      const wrapper = mountWithSafeHtml(htmlString, { defaultString })
      expect(wrapper.html()).toContain(defaultString)
    })

    it('Render empty content without default string when function throw new error', () => {
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const htmlString = function gg() {
        throw new Error('fail')
      }

      const wrapper = mountWithSafeHtml(htmlString)
      expect(wrapper.html()).toContain('<div></div>')
    })

    it('sanitize config can work', () => {
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

      const noConfigWrapper = mountWithSafeHtml(() => htmlString)
      const configWrapper = mountWithSafeHtml(() => htmlString, {
        sanitizeConfig
      })

      expect(noConfigWrapper.find('a').attributes('target')).toBeFalsy()
      expect(configWrapper.find('a').attributes('target')).toContain('_blank')
    })
  })

  describe('binding obj', () => {
    it('object input can correct render with valid html ', () => {
      const htmlString = '<p>this is html</p>'
      const bindingObj = {
        htmlString
      }
      const wrapper = mountWithSafeHtml(bindingObj)
      expect(wrapper.html()).toContain(htmlString)
    })

    it('object input can render global default string with not match html ', () => {
      const htmlString = '<p>this is html</p></p>'
      const defaultString = 'globalDefaultString'

      const bindingObj = {
        htmlString
      }
      const wrapper = mountWithSafeHtml(bindingObj, { defaultString })
      expect(wrapper.html()).toContain(defaultString)
    })

    it('object input can render components default string with not match html ', () => {
      const htmlString = '<p>this is html</p></p>'
      const globalDefaultString = 'globalDefaultString'
      const componentsDefaultString = 'componentsDefaultString'
      const bindingObj = {
        htmlString,
        defaultString: componentsDefaultString
      }
      const wrapper = mountWithSafeHtml(bindingObj, {
        defaultString: globalDefaultString
      })
      expect(wrapper.html()).toContain(componentsDefaultString)
    })

    it('sanitize config can work', () => {
      const htmlString = `
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/motea927/mt-v-safe-html"
      >
        link
      </a>
    `

      const bindingObj = {
        htmlString
      }

      const sanitizeConfig = { ADD_ATTR: ['target'] }

      const noConfigWrapper = mountWithSafeHtml(bindingObj)
      const configWrapper = mountWithSafeHtml(bindingObj, {
        sanitizeConfig
      })

      expect(noConfigWrapper.find('a').attributes('target')).toBeFalsy()
      expect(configWrapper.find('a').attributes('target')).toContain('_blank')
    })
  })
})

const mountWithI18nHtml = (message: string, globalOptions?: Options) => {
  const Component = {
    template: `<div v-html="$i18nHtml('hello')"></div>`
  }

  return shallowMount(Component, {
    global: {
      plugins: [
        [createI18nHtml, globalOptions],
        [
          createI18n({
            legacy: false,
            locale: 'en',
            fallbackLocale: 'en',
            globalInjection: true,
            messages: {
              en: {
                hello: message
              }
            }
          })
        ]
      ]
    }
  })
}

describe('$i18nHtml', () => {
  it('Render correct when use normal message', () => {
    const message = '<p>i18n message</p>'
    const wrapper = mountWithI18nHtml(message)
    expect(wrapper.html()).toContain(message)
  })

  it('Render default string when use not match message', () => {
    const defaultString = 'globalDefaultString'
    const message = '<p>i18n message</p></p>'
    const wrapper = mountWithI18nHtml(message, { defaultString })
    expect(wrapper.html()).toContain(defaultString)
  })

  it('Render sanitize result when use not match message without defaultString', () => {
    const message = '<p>i18n message</p></p>'
    const wrapper = mountWithI18nHtml(message)
    expect(wrapper.html()).toContain('<p>i18n message</p>')
  })
})
