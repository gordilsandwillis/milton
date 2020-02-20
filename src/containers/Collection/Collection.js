import React, { Component, Fragment } from 'react';
// import { Helmet } from "react-helmet";

import Header from 'src/components/Header'
import ATF from 'src/components/ATF'
import CalloutText from 'src/components/CalloutText'
import Grid from 'src/components/Grid'
import Section from 'src/components/Section'
import { withShopifyContext } from 'src/contexts/ShopifyContext'
import ProductThumb from 'src/components/ProductThumb'
import Furnishings from 'src/components/Furnishings';

import PlaceholderNewsletterImage from 'src/assets/images/Ethridge-2002100163.jpg'


class Collection extends Component {
	state = {
		collections: this.props.shopifyContext.shopifyCollections
	}

	render() {
		const { collections } = this.state
		const collectionHandle = this.props.match.params.id
		const collection = collections.find(({handle}) => handle === collectionHandle)
		const collectionIndex = collections.findIndex(({handle}) => handle === collectionHandle)
		const nextIndex = (collectionIndex + 1) % collections.length
		const nextCollection = collections[nextIndex]
		const collectionProducts = collection.products
		const hasAtf = collection.image && collection.image.src

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

					<Header hasAtf={hasAtf}/>

					{hasAtf ? (
						<div>
							<ATF
								index={0}
								image={{
									fluid: {
										aspectRatio: 2,
										src: collection.image.src,
										srcSet: '',
										sizes: ''
									}
								}}
							/>
							<CalloutText
								nextTheme="bgColor"
								theme="bgColor"
								alignment="center"
								headline={collection.title}
								text={collection.description}
								headlineSize="h2"
							/>
						</div>
					) : (
						<CalloutText
							prevTheme="bgColor"
							nextTheme="bgColor"
							theme="bgColor"
							alignment="center"
							headline={collection.title}
							text={collection.description}
							headlineSize="h2"
						/>
					)}

					<Section
						prevTheme="bgColor"
						setTheme="bgColor"
						nextTheme="white"
						padded={hasAtf ? true : 'bottom'}
					>
						<Grid
							small="1 [12] 1"
						>
							<div>
								<Grid
									small="[1] [1]"
									medium="[1] [1] [1]"
									large="[1] [1] [1] [1]"
									larger="[1] [1] [1] [1] [1]"
									colGap={['3.6vw', '24px', '30px']}
									rowGap={['50px', '70px', '80px']}
								>
									{collectionProducts.map((product, index) => (
										product.variants.map((variant, index) => (
											<ProductThumb key={variant.id} product={product} variant={variant} />
										))
									))}
								</Grid>
							</div>
						</Grid>
					</Section>

				<Furnishings />
				<ATF
					eyebrow="Next Collection"
					headline={nextCollection.title}
					headlineSize="h3"
					text={nextCollection.description}
					image={{
						fluid: {
							aspectRatio: 2,
							src: nextCollection.image.src,
							srcSet: '',
							sizes: ''
						}
					}}
					buttons={[{
						linkType: 'button',
						label: 'Explore Collection',
						to: `/collections/${nextCollection.handle}`
					}]}
				/>
			</Fragment>
		);
	}
}

export default withShopifyContext(Collection);