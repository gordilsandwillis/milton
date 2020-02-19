import React, { Component, Fragment } from 'react';
import Header from 'src/components/Header'
import ATF from 'src/components/ATF'
import CalloutText from 'src/components/CalloutText'
import FiftyFifty from 'src/components/FiftyFifty'
import { LogoMark } from 'src/components/Logo'
import ThumbnailReni from 'src/assets/images/collection-reni.png'
import ThumbnailMatisse from 'src/assets/images/collection-matisse.png'
import PlaceholderAtfImage from 'src/assets/images/Ethridge-2002100165.jpg'
import PlaceholderNewsletterImage from 'src/assets/images/Ethridge-2002100163.jpg'
import CollectionSections from 'src/components/CollectionSections'
// import { Helmet } from "react-helmet";

class Home extends Component {

	render() {
		return (
			<Fragment>
				<Helmet>
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
		    </Helmet>
				<div>
					<Header hasAtf={true} />
					<ATF
						index={0}
						fullHeight="true"
						image={{
							fluid: {
								aspectRatio: 2,
								src: PlaceholderAtfImage
							}
						}}
						nextTheme="bgColor"
						overlay="0"
					/>
					<CalloutText
						prevTheme={false}
						nextTheme="bgColor"
						theme="bgColor"
						alignment="center"
						headline="Finely woven textiles inspired by the history and vibrance of fine art."
						headlineSize="h3"
						buttons={[{ linkType: 'capsLink', label: 'Learn More', to: '/about' }]}
						icon={<LogoMark/>}
					/>
					<CollectionSections/>
					<ATF
						image={{
							fluid: {
								aspectRatio: 2,
								src: PlaceholderNewsletterImage
							}
						}}
					/>
				</div>
			</Fragment>
		);
	}
}

export default Home;