import React from 'react'
// import Client from 'shopify-buy'
import Client from 'shopify-buy/index.unoptimized.umd';

const shopifyClient = Client.buildClient({
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  domain: 'milton-textiles.myshopify.com'
});

export const ShopifyContext = React.createContext(shopifyClient)

class ShopifyProvider extends React.Component {
	state = {
		shopifyClient: shopifyClient,
		shopifyCollections: false,
		shopifyProducts: false
	}

	updateState = (key, value) => {
		this.setState({[key]:value})
	}

	render () {
		const { updateState } = this

		return (
			<ShopifyContext.Provider value={{ ...this.state, updateState }}>{this.props.children}</ShopifyContext.Provider>
		)
	}
}

export const withShopifyContext = (Component) => {
	return props => (
		<ShopifyContext.Consumer>{(context) => (<Component {...props} shopifyContext={context}/>)}</ShopifyContext.Consumer>
	)
}


// (
// )

export default ShopifyProvider