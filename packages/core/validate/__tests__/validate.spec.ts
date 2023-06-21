import { describe, expect, test } from 'vitest'
import { isValidate, countTags } from '../'

describe('validate.ts', () => {
  test.each([
    {
      htmlString: `<>`,
      expectCount: 0
    },
    {
      htmlString: `<<<<<`,
      expectCount: 0
    },
    {
      htmlString: `<img>`,
      expectCount: 1
    },
    {
      htmlString: `<img />`,
      expectCount: 1
    },
    {
      htmlString: `<div></div>`,
      expectCount: 2
    },
    {
      htmlString: `<div>123</div>`,
      expectCount: 2
    },
    {
      htmlString: `<div>    <123>    </div>`,
      expectCount: 2
    },
    {
      htmlString: `<div>    <br /> <br>    </div>`,
      expectCount: 4
    },
    {
      htmlString: `<section class="gggg" style="color: red;"> <div><img /> <<>> </div> </section>`,
      expectCount: 5
    }
  ])(
    'countTags return correct count, $htmlString -> $expectCount',
    ({ htmlString, expectCount }) => {
      expect(countTags(htmlString)).toBe(expectCount)
    }
  )

  test.each([
    `<div></div>`,
    `<section> 123 </section>`,
    `<section> <div> << </div> </section>`
  ])('normal pairs tag, %s', (htmlString) => {
    expect(isValidate(htmlString)).toBe(true)
  })

  test.each([
    `<div></div></div>`,
    `<div>123  </div></div>`,
    `<div><br /> <br></div></div>`
  ])('invalid tag, %s', (htmlString) => {
    expect(isValidate(htmlString)).toBe(false)
  })
})
