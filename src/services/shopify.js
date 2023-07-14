import Client from 'shopify-buy/index.unoptimized.umd';

// 2022-04

export const shopifyClient = Client.buildClient({
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  domain: 'milton-textiles.myshopify.com',
  apiVersion: '2022-10'
})

console.log(shopifyClient)

export const MetafieldFragment = (metafield) => {
  metafield.add('id')
  metafield.add('namespace')
  metafield.add('key')
  metafield.add('value')
}

export const ImageFrament = (image) => {
  image.add('id')
  image.add('src')
  image.add('altText')
}

export const CollectionFragment = (collection) => {
	collection.add('id')
	collection.add('handle')
	collection.add('description')
	collection.add('descriptionHtml')
	collection.add('title')
  collection.add('image', ImageFrament)
  collection.addConnection('products', {args: {first: 50}}, ProductFragment)
  // collection.addConnection('metafields', {args: {first: 5, namespace: 'collection_metafield'}}, MetafieldFragment)
}

export const ProductVariantFragment = (variant) => {
  variant.add('id')
  variant.add('title')
  variant.add('sku')
  // TODO Fix this
  // variant.add('price')
  variant.add('availableForSale')
  variant.add('image', ImageFrament)
}

export const ProductFragment = (product) => {
  product.add('id')
  product.add('title')
  product.add('handle')
  product.add('productType')
  product.add('description')
  product.add('descriptionHtml')
  product.add('vendor')
  product.add('availableForSale')

  product.addConnection('images', {args: {first: 50}}, ImageFrament)
  // TODO Fix this
  // product.addConnection('metafields', {args: {first: 10, namespace: 'specifications'}}, MetafieldFragment)
  product.addConnection('variants', {args: {first: 10}}, ProductVariantFragment)
}

export const ShopFragment = (shop) => {
  shop.add('name')
  shop.add('description')
}

export const shopQuery = shopifyClient.graphQLClient.query((root) => {
  root.add('shop', ShopFragment)
})

export const collectionsQuery = shopifyClient.graphQLClient.query((root) => {
	root.addConnection('collections', {args: {first: 10}}, CollectionFragment)
})

export const productsQuery = shopifyClient.graphQLClient.query((root) => {
  root.addConnection('products', {args: {first: 50}}, ProductFragment);
})


