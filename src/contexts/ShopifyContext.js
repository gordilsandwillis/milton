import React from 'react'

import { shopifyClient } from 'services/shopify'

export const ShopifyContext = React.createContext({ shopifyClient })

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

export default ShopifyProvider
