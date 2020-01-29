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

// import { Helmet } from "react-helmet";

class Collections extends Component {

	render() {
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
					
					<FiftyFifty
						prevTheme="bgColor"
						nextTheme="bgColor"
						theme="bgColor"
						eyebrow="Collection"
						headline="Reni"
						headlineSize="h2"
						alignment="center"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tubulum fuisse, qua illum Lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tubulum fuisse."
						buttons={[{ style: 'button', label: 'Explore Collection', to: '/collections/reni' }]}
						image={{ image: ThumbnailReni }}
					/>
					<FiftyFifty
						prevTheme="bgColor"
						nextTheme="white"
						theme="bgColor"
						eyebrow="Collection"
						headline="Matisse"
						headlineSize="h2"
						alignment="center"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tubulum fuisse, qua illum Lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tubulum fuisse."
						buttons={[{ style: 'button', label: 'Explore Collection', to: '/collections/reni' }]}
						image={{ image: ThumbnailMatisse }}
						imagePosition="right"
					/>
					<CalloutText
						prevTheme="bgColor"
						nextTheme={false}
						theme="white"
						alignment="center"
						headline="Finely woven textiles inspired by the history and vibrance of fine art."
						headlineSize="h3"
						buttons={[{ style: 'capsLink', label: 'Learn More', to: '/about' }]}
						icon={<LogoMark/>}
					/>
				</div>
			</Fragment>
		);
	}
}

export default Collections;