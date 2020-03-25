import React, { Component, Fragment } from 'react';

import { withShopifyContext } from 'src/contexts/ShopifyContext'

import Header from 'src/components/Header'
import CalloutText from 'src/components/CalloutText'
import { LogoMark } from 'src/components/Logo'
import CollectionSections from 'src/components/CollectionSections'
import Furnishings from 'src/components/Furnishings'
import SEO from 'src/components/SEO'

class Collections extends Component {
	state = {
		products: false
	}

	componentDidMount () {
		this.setState({ products: this.props.shopifyContext.shopifyProducts })
	}

	render() {
		const { products } = this.state

		if (!products) {
			return false
		}

		const furnitureProducts = this.state.products.filter(({ productType }) => productType === 'Furniture')
		return (
			<Fragment>
				<SEO title="Collections" />
				<div>
					<Header/>
					<CollectionSections furnitureProducts={furnitureProducts}/>
					<Furnishings products={furnitureProducts} prevTheme="bgColor" />
					<CalloutText
						prevTheme="bgColor"
						nextTheme={false}
						theme="white"
						alignment="center"
						headline="Finely woven textiles inspired by the history and vibrance of fine art."
						headlineSize="h3"
						buttons={[{ linkType: 'underlinedLink', label: 'Learn More', to: '/about' }]}
						icon={<LogoMark/>}
					/>
				</div>
			</Fragment>
		);
	}
}

export default withShopifyContext(Collections);