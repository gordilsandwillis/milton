/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { shopifyClient as client } from 'src/services/shopify'

//import { gql } from 'graphql-request'
//import queryShopify from '../graphql/helpers/queryShopify'
//import CHECKOUT_FRAGMENT from '../graphql/fragments/shopify/checkoutFragment'
import { set, get } from 'src/utils/local-storage'

const CheckoutContext = React.createContext()

const initialState = {
	checkout: null,
	loading: true,
	cartOpen: false,
}

class CheckoutProvider extends React.Component {
	constructor(props) {
		super(props)
		this.state = initialState
	}

	componentDidMount() {
		this.initializeCheckout()
	}

	toggleCart = (cartOpen) => this.setState({ cartOpen })

	initializeCheckout = async () => {
		let checkout;
		const checkoutId = await this.getCheckoutId()
		if (checkoutId) {
			checkout = await this.getCheckout(checkoutId)
		} else {
			checkout = await this.createCheckout()
		}
		if (checkout?.completedAt || !checkout) {
			checkout = await this.createCheckout()
		}
		set('shopify-checkout-id', checkout?.id)
		this.setState({ checkout, loading: false })
	}

	createCheckout = async () => {
		const { checkout } = client;
		return await checkout.create()
	}

	getCheckout = async (checkoutId) => {
		const { checkout } = client;
		return await checkout.fetch(checkoutId);
	}

	getCheckoutId = async () => {
		const { checkout } = this.state
		let checkoutId = checkout?.id
		if (!checkoutId) {
			checkoutId = await get('shopify-checkout-id')
		}
		return checkoutId
	}

	getLineItems = () => {
		const { checkout } = this.state
		return checkout ? Array.from(checkout?.lineItems) : []
	}

	updateLineItems = async ({ lineItems }) => {
		const checkoutId = await this.getCheckoutId()
		console.log('lineItems', lineItems)
		console.log('checkoutId', checkoutId)
		console.log(client)
		const lineItemsUpdate = lineItems.map(({id, quantity}) => ({id, quantity}))
		const checkout = await client.checkout.updateLineItems(checkoutId, lineItemsUpdate)
		console.log(checkout)
		if (checkout) this.setState({ checkout })
	}

	emptyLineItems = () => {
		this.updateLineItems({ lineItems: [] })
	}

	addLineItem = async ({ variantId, quantity = 1, toggleCart = true }) => {
		console.log('addLineItem')
		this.setState({ loading: true })
		if (toggleCart) this.toggleCart(true)
		const lineItems = this.getLineItems()
		console.log('lineItems', lineItems)
		const lineItem = lineItems.find((lineItem) => lineItem.variant.id === variantId)
		console.log(lineItem)
		if (lineItem) {
			console.log('lineItemIndex is greater than 0')

			await this.updateQuantity({ id: lineItem.id, quantity: lineItem.quantity + 1 })
		} else {
			const checkoutId = await this.getCheckoutId()
			console.log('adding line item')
			console.log(variantId)
			console.log(quantity)
			console.log(checkoutId)

			const checkout = await client.checkout.addLineItems(checkoutId, { variantId, quantity })
			if (checkout) this.setState({ checkout })
		}
		this.setState({ loading: false })
	}

	updateQuantity = async ({ id, quantity }) => {
		if (!quantity) {
			this.removeLineItem({ id })
		} else {
			this.setState({ loading: true })
			const lineItems = this.getLineItems()
			const lineItemsUpdate = lineItems.map((lineItem) => {
				if (lineItem.id === id) {
					return { id, quantity }
				} else {
					return lineItem
				}
			})
			await this.updateLineItems({ lineItems: lineItemsUpdate })
			this.setState({ loading: false })
		}
	}

	removeLineItem = async ({ id }) => {
		this.setState({ loading: true })
		const checkoutId = await this.getCheckoutId()
		const checkout = await client.checkout.removeLineItems(checkoutId, [id])
		if (checkout) this.setState({ checkout })
		this.setState({ loading: false })
	}

	render() {
		const { children } = this.props
		return (
			<CheckoutContext.Provider
				value={{
					...this.state,
					addLineItem: this.addLineItem,
					updateQuantity: this.updateQuantity,
					removeLineItem: this.removeLineItem,
					decrementLineItem: this.decrementLineItem,
					toggleCart: this.toggleCart,
					emptyLineItems: this.emptyLineItems,
					getLineItems: this.getLineItems
				}}
			>
				{children}
			</CheckoutContext.Provider>
		)
	}
}

export default CheckoutProvider

export const withCheckoutContext = (Component) => {
	return (props) => (
		<CheckoutContext.Consumer>{(context) => (<Component {...props} checkoutContext={context} />)}</CheckoutContext.Consumer>
	)

}


