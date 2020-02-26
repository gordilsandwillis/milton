import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
// import { Helmet } from "react-helmet";

import Logo, { LogoMark } from 'src/components/Logo'
import LargeLogo from 'src/components/LargeLogo'
import Header from 'src/components/Header'
import ATF from 'src/components/ATF'
import CalloutText from 'src/components/CalloutText'
import CollectionSections from 'src/components/CollectionSections'
import Newsletter from 'src/components/Newsletter'

// import AtfImage from 'src/assets/images/Ethridge-2002100164.jpg'
import AtfImage from 'src/assets/images/Ethridge-2002100114.jpg'
import { util, mq, colors, animations } from 'src/styles'

const numberMap = (num, outMin, outMax) => {
	// return (num - in_min) * (outMax - outMin) / (in_max - in_min) + outMin
	let offset = (num - 0) * (outMax - outMin) / (1 - 0) + outMin
	if (!offset) {
		return 0
	} else {
		if (offset >= outMin) {
			return offset.toPrecision(6)
		} else {
			return outMin.toPrecision(6)
		}
		console.log(offset)
	}
}

const BottomOverlay = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 30%;
	z-index: 1;
	background: linear-gradient(to top, rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 100%);
`

class Home extends Component {
	state = {
		collapseHeader: false
	}

	toggleHeaderCollapse = (collapsed) => {
		if (this.state.collapseHeader !== collapsed) {
			this.setState({ collapseHeader: collapsed })
		}
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
					<Header hasAtf={true} homepage={true} collapsed={this.state.collapseHeader} />
					<ATF
						index={0}
						fullHeight="true"
						image={{
							fluid: {
								aspectRatio: 2,
								src: AtfImage,
								srcSet:'',
								sizes: ''
							}
						}}
						nextTheme="bgColor"
						overlay="0"
						additions={<BottomOverlay/>}
					/>
					<LargeLogo toggleHeaderCollapse={this.toggleHeaderCollapse}/>
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
					<Newsletter/>
				</div>
			</Fragment>
		);
	}
}

export default Home;