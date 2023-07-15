import React, { Component, Fragment } from 'react';
import ReactGA from 'react-ga'
import { withShopifyContext } from 'contexts/ShopifyContext'

import Header from 'components/Header'
import CalloutText from 'components/CalloutText'
import { LogoMark } from 'components/Logo'
import CollectionSections from 'components/CollectionSections'
import Furnishings from 'components/Furnishings'
import SEO from 'components/SEO'

class Collections extends Component {
	state = {
		products: false
	}

	componentDidMount () {
		this.setState({ products: this.props.shopifyContext.shopifyProducts })

		if (process.env.NODE_ENV === 'production') {
	    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING);
			ReactGA.pageview(window.location.pathname + window.location.search);
		}
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