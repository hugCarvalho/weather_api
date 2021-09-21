import {css} from 'styled-components'

type sizesProps = {
  small: 576,
  medium: 768,
  big: 992
}

export const sizes: sizesProps = {
  small: 576,
  medium: 768,
  big: 992 //1024?
}

const Media = Object.keys(sizes).reduce<{ [K: string]: any }>((acc, label) => {
  // console.log("ACC", acc)
  // console.log("LABEL", label)
  acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) => {
    // console.log("LITERALS", literals)
    // console.log("PLACEHOLDERS", placeholders)
    return css`
      @media only screen and (min-width: ${sizes[label]}px) {
        ${css(literals, ...placeholders)};
      }
    `
  }
  console.log("ACC",)
  return acc
}, {} as Record<keyof typeof sizes, (l: TemplateStringsArray, ...p: any[]) => string>)


export {Media}