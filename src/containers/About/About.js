import React, { Component, Fragment } from 'react';

import Header from 'src/components/Header'
import SEO from 'src/components/SEO'
import CalloutText from 'src/components/CalloutText'
import FiftyFifty from 'src/components/FiftyFifty'
import Newsletter from 'src/components/Newsletter'

import PlaceholderDesignerImage from 'src/assets/images/about-designer.png'
import EthosImage from 'src/assets/images/about-ethos.jpg'
import ValuesImage from 'src/assets/images/about-values.jpg'

import { withModalContext } from 'src/contexts/ModalContext'

class About extends Component {

	handleInquireClick = (event) => {
		const { modalContext } = this.props
		modalContext.toggleModal({title: 'Contact Us', buttonLabel: 'Send'})
	}

	render() {
		return (
			<Fragment>
				<SEO title="About" />
				<div>
					<Header hasAtf={false}/>
					<CalloutText
						prevTheme={false}
						nextTheme="bgColor"
						theme="bgColor"
						alignment="center"
						headline="Each collection originates with a carefully selected painting from the history of art."
						headlineSize="h3"
					/>
					<FiftyFifty
						key="ethos"
						prevTheme="bgColor"
						nextTheme="bgColor"
						theme="bgColor"
						eyebrow="Ethos"
						headline="Historic yet Timeless"
						headlineSize="h3"
						alignment="left"
						image={{
							fluid: {
								aspectRatio: 1,
								src: EthosImage,
								srcSet: '',
								sizes: ''
							}
						}}
						textSize="bodySmall"
						text={(
							<div>
								<p>Milton Textiles was created with the idea of translating the spirit of art history and painting into contemporary and joyful color palettes, which are applied to a diverse collection of high-quality fabrics.</p>
								<p>The collections of Milton Textiles are created to offer clients the option to choose one or all of the fabrics within each collection. The company’s unique bold colors and lively patterns when layered together create interior environments that are maximalist yet refined and exuberant yet comforting.</p>
								<p>These signature fabrics are available for both residential and contract projects.</p>
							</div>
						)}
						imagePosition="right"
					/>
					<FiftyFifty
						key="values"
						prevTheme="bgColor"
						nextTheme="bgColor"
						theme="bgColor"
						eyebrow="Values"
						headline="Committed to ensuring quality and craft"
						headlineSize="h3"
						alignment="left"
						image={{
							fluid: {
								aspectRatio: 1,
								src: ValuesImage,
								srcSet: '',
								sizes: ''
							}
						}}
						textSize="bodySmall"
						text={(
							<div>
								<p>Our textiles are proudly made at historic mills in the United States. Our products are sourced locally and created in collaboration with responsible domestic manufacturers.</p>
								<p>Milton Textiles also specializes in restoring and upholstering select antique furniture, renewing well-crafted pieces that might otherwise be overlooked. We value small business owners and employ talented artisans to restore and upholstervintage furniture.</p>
							</div>
						)}
						imagePosition="left"
					/>
					<FiftyFifty
						key="designer"
						prevTheme="bgColor"
						nextTheme="white"
						theme="bgColor"
						eyebrow="About the Founder"
						headline="Vera Neykov"
						headlineSize="h3"
						alignment="left"
						textSize="bodySmall"
						text={<div>
							<p>Vera Neykov was born in Sofia, Bulgaria in 1986 and moved to Los Angeles, California in 1990. The daughter of artists, Vera grew up surrounded by creativity and was encouraged to explore, discover and learn about art and design.</p>
							<p>As a young girl she accompanied her mother, who was then an assistant couturiere, to fabric stores where she was instructed to touch each fabric and decide which she liked best. This early, hands-on education instilled in her a deep appreciation for high-quality textile design. Since then, she has devoted herself to understanding every step of its process and history.</p>
							<p>Neykov studied Art History at Parsons School of Design. For the next 10 years she worked with galleries in Los Angeles and New York including Marlborough, L & M Arts and Rivington Arms. During this time she curated and helped produce exhibitions with artists and most recently worked as a studio manager for artist, Rob Pruitt.</p>
						</div>}
						image={{
							fluid: {
								aspectRatio: 619/786,
								src: PlaceholderDesignerImage,
								srcSet: '',
								sizes: ''
							}
						}}
						imagePosition="right"
					/>
					<CalloutText
						prevTheme={false}
						nextTheme="bgColor"
						theme="white"
						alignment="center"
						eyebrow="Get In Touch"
						headline="We are always interested in collaborating with designers and companies on projects."
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

export default withModalContext(About)
