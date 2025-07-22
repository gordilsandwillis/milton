/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { shopifyClient as client } from 'services/shopify'

//import { gql } from 'graphql-request'
//import queryShopify from '../graphql/helpers/queryShopify'
//import CHECKOUT_FRAGMENT from '../graphql/fragments/shopify/checkoutFragment'
import { set, get } from 'utils/local-storage'

const CheckoutContext = React.createContext()

const initialState = {
	checkout: null,
	checkoutUrl: null,
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

	componentDidUpdate(prevProps, prevState) {
		if (!prevState?.checkout || (prevState?.checkout?.totalPrice?.amount !== this.state?.checkout?.totalPrice?.amount)) {
			this.getCheckoutUrl()
		}
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

	getCheckoutUrl = async () => {
		const cartItems = this.state.checkout.lineItems.map((line) => ({
			variantId: line.variant.id,
			quantity: line.quantity,
		}))

    const checkout = await client.checkout.create()

		const lineItemsToAdd = cartItems.map(item => ({
			variantId: item.variantId,
			quantity: item.quantity,
			customAttributes: item.customAttributes || [],
			...(item.sellingPlanId && { sellingPlanId: item.sellingPlanId })
		}))

		const updatedCheckout = await client.checkout.addLineItems(checkout.id, cartItems)

		console.log(updatedCheckout)
		this.setState({ checkoutUrl: updatedCheckout.webUrl })

		return updatedCheckout.webUrl
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
		const lineItemsUpdate = lineItems.map(({id, quantity}) => ({id, quantity}))
		const checkout = await client.checkout.updateLineItems(checkoutId, lineItemsUpdate)
		if (checkout) this.setState({ checkout })
	}

	emptyLineItems = () => {
		this.updateLineItems({ lineItems: [] })
	}

	addLineItem = async ({ variantId, quantity = 1, toggleCart = true }) => {
		this.setState({ loading: true })
		if (toggleCart) this.toggleCart(true)
		const lineItems = this.getLineItems()
		const lineItem = lineItems.find((lineItem) => lineItem.variant.id === variantId)
		if (lineItem) {
			await this.updateQuantity({ id: lineItem.id, quantity: lineItem.quantity + 1 })
		} else {
			const checkoutId = await this.getCheckoutId()
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


