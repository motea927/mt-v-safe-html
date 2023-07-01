import DOMPurify from 'dompurify'
const { sanitize } = DOMPurify

export const countTags = (str: string): number => {
  const regex = /<[^<>]*[A-Za-z][^<>]*>/g
  const matches = str.match(regex)
  return matches === null ? 0 : matches.length
}

export const isValidate = (
  htmlString: string,
  sanitizeFunc = sanitize
): boolean => {
  const originalTagCounts = countTags(htmlString)
  const sanitizeTagCounts = countTags(sanitizeFunc(htmlString))
  return originalTagCounts === sanitizeTagCounts
}
