import { Product } from '@commerce/types'
import getAllProducts/* , { ProductEdge } */ from '../../../product/get-all-products'
import type { ProductsHandlers } from '../products'
import getSearchVariables from '@framework/utils/get-search-variables'

const SORT: { [key: string]: string | undefined } = {
  latest: 'id',
  trending: 'total_sold',
  price: 'price',
}

const LIMIT = 12

// Return current cart info
const getProducts: ProductsHandlers['getProducts'] = async ({
  res,
  body: { search, category, brand, sort },
  config,
}) => {
// Use a dummy base as we only care about the relative path


let variables:object = Object.assign({},getSearchVariables({
  brandId:brand,
  search,
  categoryId:category,
  sort
}),
  { first: LIMIT })


/*
const url = new URL('/v3/catalog/products', 'http://a')
url.searchParams.set('is_visible', 'true')
  if (search)
    variables.query = `product_type:${search} OR title:${search} OR tag:${search}`
  if (search) url.searchParams.set('keyword', search)

  if (category && Number.isInteger(Number(category)))
    url.searchParams.set('categories:in', category)

  if (brand && Number.isInteger(Number(brand)))
    url.searchParams.set('brand_id', brand)

  if (sort) {
    const [_sort, direction] = sort.split('-')
    const sortValue = SORT[_sort]

    if (sortValue && direction) {
      url.searchParams.set('sort', sortValue)
      url.searchParams.set('direction', direction)
    }
  }

  // We only want the id of each product
  url.searchParams.set('include_fields', 'id')
 */
  /* const { data } = await config.fetch<{ data: { id: number }[] }>(
    getAllProducts,
    variables: {
      checkoutId: cookies[SHOPIFY_CHECKOUT_ID_COOKIE],
      customerAccessToken: cookies[SHOPIFY_CUSTOMER_TOKEN_COOKIE],
    },

  ) */
/*   const { data } = await config.fetch<{ data: { id: number }[] }>(
    url.pathname + url.search
  ) */

  //const data = await getAllProducts()



  // We want the GraphQL version of each product
  console.log(variables)
  const graphqlData = await getAllProducts({
    variables: variables,
    config,
  })
  const entityIds = graphqlData.products.map((p) => p.id)
  const found = entityIds.length > 0
  // Put the products in an object that we can use to get them by id
  const productsById = graphqlData.products.reduce<{
    [k: string]: Product
  }>((prods, p) => {
    prods[p.id as string || "undefined"] = p
    return prods
  }, {})


  const products: Product[] = found ? [] : graphqlData.products

  // Populate the products array with the graphql products, in the order
  // assigned by the list of entity ids
  entityIds.forEach((id) => {
    const product = productsById[id]
    if (product) products.push(product)
  })

  res.status(200).json({ data: { products, found } })
}

export default getProducts
