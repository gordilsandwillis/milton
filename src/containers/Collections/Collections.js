import React, { Component, Fragment } from 'react';
import Header from 'src/components/Header'
import CalloutText from 'src/components/CalloutText'
import { LogoMark } from 'src/components/Logo'
import CollectionSections from 'src/components/CollectionSections'
import Furnishings from 'src/components/Furnishings'
import { withShopifyContext } from 'src/contexts/ShopifyContext'
// import { Helmet } from "react-helmet";

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
				{/*<Helmet>
	        <meta charSet="utf-8" />
	        <title>{PageTitle + ' | ' + Tagline}</title>
	        <meta property="og:locale" content="en_US" />
			    <meta property="og:type" content="website" />
			    <meta property="og:title" content={PageTitle + ' | ' + Tagline} />
			    <meta property="og:description" content={PageDescription} />
			    <meta property="og:url" content={URL} />
			    <meta property="og:site_name" content={PageTitle} />
			    <meta property="og:image" content={shareImage} />
			    <meta property="og:image:secure_url" content={URL} />
			    <meta property="og:image:width" content="1200" />
			    <meta property="og:image:height" content="800" />
			    <meta name="twitter:card" content="summary_large_image" />
			    <meta name="twitter:description" content={PageDescription} />
			    <meta name="twitter:title" content={PageTitle + ' | ' + Tagline} />
			    <meta name="twitter:image" content={shareImage} />
		    </Helmet>*/}
				<div>
					<Header/>
					<CollectionSections/>
					<Furnishings products={furnitureProducts} />
					<CalloutText
						prevTheme="bgColor"
						nextTheme={false}
						theme="white"
						alignment="center"
						headline="Finely woven textiles inspired by the history and vibrance of fine art."
						headlineSize="h3"
						buttons={[{ linkType: 'capsLink', label: 'Learn More', to: '/about' }]}
						icon={<LogoMark/>}
					/>
				</div>
			</Fragment>
		);
	}
}

export default withShopifyContext(Collections);