import React, { Component, Fragment } from 'react';

import Header from 'src/components/Header'
import ATF from 'src/components/ATF'
import CalloutText from 'src/components/CalloutText'
import FiftyFifty from 'src/components/FiftyFifty'

import PlaceholderNewsletterImage from 'src/assets/images/Ethridge-2002100163.jpg'

// import { Helmet } from "react-helmet";

const designerText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tubulum fuisse, qua illum Lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tubulum fuisse. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Tubulum fuisse, qua illum Lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tubulum fuisse.
`

class About extends Component {

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
					<Header hasAtf={false}/>
					<CalloutText
						prevTheme={false}
						nextTheme="bgColor"
						theme="bgColor"
						alignment="center"
						headline="Finely woven textiles inspired by the history and vibrance of fine art."
						headlineSize="h3"
					/>
					<ATF
						image={{
							fluid: {
								aspectRatio: 2,
								src: PlaceholderNewsletterImage
							}
						}}
					/>
					<FiftyFifty
						key="designer"
						prevTheme="bgColor"
						nextTheme="white"
						theme="bgColor"
						eyebrow="Head Designer & Founder"
						headline="Vera Neykov"
						headlineSize="h3"
						alignment="left"
						text={designerText}
						image={null}
						imagePosition="left"
					/>
				</div>
			</Fragment>
		);
	}
}

export default About;