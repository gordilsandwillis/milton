import React, { Component, Fragment } from 'react';
import Header from 'src/components/Header'
import ATF from 'src/components/ATF'
import CalloutText from 'src/components/CalloutText'
import Grid from 'src/components/Grid'
import Section from 'src/components/Section'
import Image from 'src/components/GatsbyImage'
import ThumbnailReni from 'src/assets/images/collection-reni.png'
import ThumbnailMatisse from 'src/assets/images/collection-matisse.png'
import PlaceholderAtfImage from 'src/assets/images/placeholder-atf.jpg'
import PlaceholderNewsletterImage from 'src/assets/images/placeholder-newsletter.jpg'
import { withShopifyContext } from 'src/contexts/ShopifyContext'
import ProductThumb from 'src/components/ProductThumb'

// import { Helmet } from "react-helmet";

class Collection extends Component {
	state = {
		collections: this.props.shopifyContext.shopifyCollections
	}

	render() {
		const { collections } = this.state

		const collectionHandle = this.props.match.params.id

		let filteredCollections = collections.filter( i => collectionHandle.includes( i.handle ) )
		let collection = filteredCollections[0]
		let collectionProducts = collection.products

		console.log(collectionProducts)

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
				<div>
					<Header hasAtf={hasAtf}/>
					
					{hasAtf ? (
						<ATF
							index={0}
							headline={collection.title}
							headlineSize="h2"
							text={collection.description}
							overlay={.3}
							image={{
								fluid: {
									src: collection.image.src
								}
							}}
						/>
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
									{collectionProducts.map((product, index) => {
										product = product
										return (
											product.variants.map((variant, index) => (
												<ProductThumb product={product} />
											))
										)
									}
									)}
								</Grid>
							</div>
						</Grid>
					</Section>
					<CalloutText
						prevTheme="bgColor"
						nextTheme={false}
						theme="white"
						alignment="center"
						headline="Finely woven textiles inspired by the history and vibrance of fine art."
						headlineSize="h3"
						buttons={[{ linkType: 'capsLink', label: 'Learn More', to: '/about' }]}
					/>
				</div>
			</Fragment>
		);
	}
}

export default withShopifyContext(Collection);