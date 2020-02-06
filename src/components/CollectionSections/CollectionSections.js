import React, { Component, Fragment } from 'react';
import Header from 'src/components/Header'
import ATF from 'src/components/ATF'
import CalloutText from 'src/components/CalloutText'
import FiftyFifty from 'src/components/FiftyFifty'
import { LogoMark } from 'src/components/Logo'
import ThumbnailReni from 'src/assets/images/collection-reni.png'
import ThumbnailMatisse from 'src/assets/images/collection-matisse.png'
import PlaceholderAtfImage from 'src/assets/images/placeholder-atf.jpg'
import PlaceholderNewsletterImage from 'src/assets/images/placeholder-newsletter.jpg'
import { withShopifyContext } from 'src/contexts/ShopifyContext'

// import { Helmet } from "react-helmet";

const Thumbnails = {
	Reni: ThumbnailReni,
	Matisse: ThumbnailMatisse,
}

class CollectionSections extends Component {
	state = {
		collections: this.props.shopifyContext.shopifyCollections
	}

	render() {
		const { collections } = this.state

		if (!collections) {
			return false
		}

		return collections.map((collection, index) => {
			if (collection.products.length > 0) {
				return (
					<FiftyFifty
						key={collection.id}
						prevTheme="bgColor"
						nextTheme="white"
						theme="bgColor"
						eyebrow="Collection"
						headline={collection.title}
						headlineSize="h2"
						alignment="center"
						text={collection.description}
						buttons={[{ linkType: 'button', label: 'Explore Collection', to: '/collections/' + collection.handle }]}
						image={{
							fluid: {
								aspectRatio: 1.158,
								src: Thumbnails[collection.title]
							}
						}}
						imagePosition={index % 2 ? 'left' : 'right'}
					/>
				)
			}
		})

	}
}

export default withShopifyContext(CollectionSections);