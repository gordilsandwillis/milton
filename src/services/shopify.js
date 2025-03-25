import { createStorefrontApiClient } from "@shopify/storefront-api-client";

// 2022-04

export const shopifyClient = createStorefrontApiClient({
  publicAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  storeDomain: 'milton-textiles.myshopify.com',
  apiVersion: '2025-01'
})

export const imageFragment = `
  altText
  url
  src
  id
`

export const metafieldFragment = `
  id
  namespace
  key
  value
`

export const priceRangeFragment = `
  maxVariantPrice {
    currencyCode
    amount
  }
  minVariantPrice {
    currencyCode
    amount
  }
`

export const variantFragment = `
  id
  title
  sku
  price {
    amount
  }
  availableForSale
  image {
    ${imageFragment}
  }
`

export const productFragment = `
  id
  title
  handle
  productType
  description
  descriptionHtml
  vendor
  priceRange {
    ${priceRangeFragment}
  }
  media(first: 50) {
    edges {
      node {
        id
        ... on MediaImage {
          id
          image {
            ${imageFragment}
          }
        }
      }
    }
  }
  variants(first: 100) {
    edges {
      node {
        ${variantFragment}
      }
    }
  }
  width: metafields(identifiers: {namespace: "specifications", key: "width"}) {
    ${metafieldFragment}
  }
  care: metafields(identifiers: {namespace: "specifications", key: "care"}) {
    ${metafieldFragment}
  }
  content: metafields(identifiers: {namespace: "specifications", key: "content"}) {
    ${metafieldFragment}
  }
  performance: metafields(identifiers: {namespace: "specifications", key: "performance"}) {
    ${metafieldFragment}
  }
  horizontal_repeat: metafields(identifiers: {namespace: "specifications", key: "horizontal_repeat"}) {
    ${metafieldFragment}
  }
  vertical_repeat: metafields(identifiers: {namespace: "specifications", key: "vertical_repeat"}) {
    ${metafieldFragment}
  }
  purchasable: metafields(identifiers: {namespace: "specifications", key: "purchasable"}) {
    ${metafieldFragment}
  }
`

//
export const collectionFragment = `
  id
  handle
  description
  descriptionHtml
  title
  image {
    ${imageFragment}
  }
  products(first: 50) {
    edges {
      node {
        ${productFragment}
      }
    }
  }
  metafields(identifiers: {namespace: "navigation", key: "show_in_shop_men"}) {
    ${metafieldFragment}
  }
`

export const collectionsQuery = `
  query {
    collections(first: 10) {
      edges {
        node {
          ${collectionFragment}
        }
      }
    }
  }
`

//
export const productsQuery = `
  query {
    products(first: 10) {
      edges {
        node {
          ${productFragment}
        }
      }
    }
  }
`

export const shopQuery = `
  query {
    shop {
      name
      description
    }
  }
`