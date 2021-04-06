import type { Product } from '@commerce/types'

export type SelectedOptions = {
  size: string | null
  color: string | null
}

export function getVariant(product: Product, opts2: SelectedOptions) {
  const opts = {};
  // exclude opts with null and undefined value
  Object.entries(opts2).forEach( ([key,value]) => {
    if(value !== undefined && value !== null){
      opts[key] = value
    }
  })
  // if no opts defined return undefined
  if(Object.entries(opts).length==0) return undefined;
  const variant = product.variants.find((variant) => {
    const vari = Object.entries(opts).every(([key, value]) => {
      const opts = variant.options.find((option) => {
        if (
          option.__typename === 'MultipleChoiceOption' &&
          option.displayName.toLowerCase() === key.toLowerCase()
        ) {
          return option.values.find((v) => v.label.toLowerCase() === value)
        }
      })

      return opts;
    })
    return vari
  })
  return variant
}
