import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'

import { LogoMark } from 'src/components/Logo'
import LargeLogo from 'src/components/LargeLogo'
import Header from 'src/components/Header'
import ATF from 'src/components/ATF'
import CalloutText from 'src/components/CalloutText'
import CollectionSections from 'src/components/CollectionSections'
import Newsletter from 'src/components/Newsletter'
import SEO from 'src/components/SEO'

import AtfImage from 'src/assets/images/home-atf.jpg'

const BottomOverlay = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 40%;
	z-index: 1;
	background: linear-gradient(to top, rgba(0,0,0,.3) 0%, rgba(0,0,0,0) 100%);
`

class Home extends Component {
	state = {
		collapseHeader: false
	}

	render() {
		return (
			<Fragment>
				<SEO title="Home" />
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
					<LargeLogo />
					<CalloutText
						prevTheme={false}
						nextTheme="bgColor"
						theme="bgColor"
						alignment="center"
						headline="Art in Living, Living in Art."
						headlineSize="h4"
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