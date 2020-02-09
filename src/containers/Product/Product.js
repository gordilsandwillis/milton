import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled'
import Header from 'src/components/Header'
import ATF from 'src/components/ATF'
import CalloutText from 'src/components/CalloutText'
import Grid from 'src/components/Grid'
import Section from 'src/components/Section'
import Button from 'src/components/Button'
import Image from 'src/components/GatsbyImage'
import PlaceholderNewsletterImage from 'src/assets/images/placeholder-newsletter.jpg'
import { withShopifyContext } from 'src/contexts/ShopifyContext'
import ProductThumb from 'src/components/ProductThumb'
import { colors, util, mq } from 'src/styles'

// import { Helmet } from "react-helmet";

const ImgArea = styled.div`
	${ util.responsiveStyles('padding-top', 150, 135, 100, 60) }
	${ util.responsiveStyles('padding-bottom', 150, 135, 100, 60) }
	background: ${ colors.white };
`

const TextArea = styled.div`
	${ util.responsiveStyles('padding-top', 150, 135, 100, 60) }
	${ util.responsiveStyles('padding-bottom', 150, 135, 100, 60) }
`

const ProductImage = styled(Image)`
	background: ${ colors.bgColor };
`

class Product extends Component {
	state = {
		products: this.props.shopifyContext.shopifyProducts
	}

	render() {
		const { products } = this.state

		const productHandle = this.props.match.params.id

		console.log(products)

		let filteredProducts = products.filter( i => productHandle.includes( i.handle ) )
		let product = filteredProducts[0]

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
					<Header placeholder={false}/>
					<Grid small="[1]" large="[6] [6]" vAlign="center">
						<ImgArea>
							<Grid small="1 [12] 1" large="1 [4] 1">
								<ProductImage
									image={{
										fluid: {
											aspectRatio: 1,
											src: product.image.src
										}
									}} 
									alt={product.title}
								/>
							</Grid>
						</ImgArea>
						<TextArea>
							<Grid small="1 [12] 1" large="1 [4] 1">
								<div>
									<h6>{product.variants[0].title}</h6>
									<h2>{product.title}</h2>
									<div dangerouslySetInnerHTML={{__html: product.descriptionHtml}}/>
									<Button>Inquire</Button>
								</div>
							</Grid>
						</TextArea>
					</Grid>
				</div>
			</Fragment>
		);
	}
}

export default withShopifyContext(Product);