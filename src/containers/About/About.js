import React, { Component, Fragment } from 'react';
// import { Helmet } from "react-helmet";

import Header from 'src/components/Header'
import ATF from 'src/components/ATF'
import CalloutText from 'src/components/CalloutText'
import FiftyFifty from 'src/components/FiftyFifty'
import Newsletter from 'src/components/Newsletter'

import PlaceholderAboutImage from 'src/assets/images/Ethridge-2002100163.jpg'
import PlaceholderDesignerImage from 'src/assets/images/about-designer.png'
import PlaceholderEthosImage from 'src/assets/images/about-ethos.png'

import { withModalContext } from 'src/contexts/ModalContext'

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tubulum fuisse, qua illum Lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tubulum fuisse. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Tubulum fuisse, qua illum Lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tubulum fuisse.
`

class About extends Component {

	handleInquireClick = (event) => {
		const { modalContext } = this.props
		modalContext.toggleModal({title: 'Contact Us', buttonLabel: 'Send'})
	}

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
						nextTheme={false}
						theme="bgColor"
						alignment="center"
						headline="Finely woven textiles inspired by the history and vibrance of fine art."
						headlineSize="h3"
					/>
					<ATF
						image={{
							fluid: {
								aspectRatio: 2,
								src: PlaceholderAboutImage,
								srcSet: '',
								sizes: ''
							}
						}}
					/>
					<FiftyFifty
						key="designer"
						prevTheme={false}
						nextTheme="bgColor"
						theme="bgColor"
						eyebrow="Head Designer & Founder"
						headline="Vera Neykov"
						headlineSize="h3"
						alignment="left"
						text={loremIpsum}
						image={{
							fluid: {
								aspectRatio: 619/786,
								src: PlaceholderDesignerImage,
								srcSet: '',
								sizes: ''
							}
						}}
						imagePosition="left"
					/>
					<FiftyFifty
						key="ethos"
						prevTheme="bgColor"
						nextTheme="white"
						theme="bgColor"
						eyebrow="Ethos"
						headline="Whenever creating a new pattern we always look to the great artists of the past."
						headlineSize="h3"
						alignment="left"
						image={{
							fluid: {
								aspectRatio: 1,
								src: PlaceholderEthosImage,
								srcSet: '',
								sizes: ''
							}
						}}
						text={loremIpsum}
						imagePosition="hangRight"
					/>
					<CalloutText
						prevTheme={false}
						nextTheme="bgColor"
						theme="white"
						alignment="center"
						eyebrow="Get In Touch"
						headline="Contact us for inquiries or collaborations."
						headlineSize="h3"
						buttons={[
							{
								linkType: 'button',
								label: 'Contact',
								onClick: this.handleInquireClick,
								size: 'large'
							}
						]}
					/>
					<Newsletter />
				</div>
			</Fragment>
		);
	}
}

export default withModalContext(About);