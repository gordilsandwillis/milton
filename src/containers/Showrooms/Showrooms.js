import React, { Fragment } from "react";
import styled from "@emotion/styled";

import Header from "components/Header";
import Section from "components/Section";
import ScrollEntrance from "components/ScrollEntrance";
import Grid from "components/Grid";
import CalloutText from "components/CalloutText";

import SEO from "components/SEO";

import { util, typography, mq, colors } from "styles";
import Link from "components/Link";

const Address = styled.address`
	${util.responsiveStyles("margin-bottom", 91, 51, 33, 26)}
	margin: 0 !important;
	${mq.mediumAndBelow} {
		border-top: 1px solid ${colors.hrColor};
		padding: 35px 0 0;
	}
	p.address-text {
		margin: 0;
		${ typography.bodySmall }
		em {
			margin-bottom: 7px;
			display: inline-block;
			vertical-align: top;
		}
	}
`

const Links = styled.div`
	margin-top: 20px;
`

const Title = styled.h6`
	${ typography.h6 }
	margin: 0;
	&:after {
		display: block;
		margin: 14px auto;
		content: '';
		width: 50px;
		height: 1px;
		background: currentcolor;
	}
`

const showrooms = [
	{
		title: 'Temple Studio',
		address: '51 East 12th Street',
		address2: '4th floor',
		city: 'New York',
		state: 'NY',
		zip: '10003',
		links: [
			{ text: 'hello@templestudiony.com', to: 'mailto:hello@templestudiony.com' },
			{ text: 'www.templestudiony.com', to: 'http://www.templestudiony.com', external: true, target: '_blank' },
			{ text: '917.985.8151', to: 'tel:19179858151' }
		]
	},
	{
		title: 'The Lot Showroom',
		text: 'Southeast: AL, GA, MS, NC, KY, SC, TN, FL',
		links: [
			{ text: 'bforrister@thelotshowroom.com', to: 'mailto:bforrister@thelotshowroom.com' },
			{ text: 'www.thelotshowroom.com', to: 'http://www.thelotshowroom.com', external: true, target: '_blank' },
			{ text: '828.361.3500', to: 'tel:18283613500' }
		]
	},
	{
		title: 'Evars Collective',
		address: '1600 El Camino Real',
		address2: 'Suite B',
		city: 'San Carlos',
		state: 'CA',
		zip: '94070',
		links: [
			{ text: 'concierge@evarscollective.com', to: 'mailto:concierge@evarscollective.com' },
			{ text: 'www.evarscollective.com', to: 'https://www.evarscollective.com', external: true, target: '_blank' },
			{ text: '650.585.2330', to: 'tel:16505852330' }
		]
	},
	{
		title: 'Kilkenny Collections',
		text: 'Pennsylvania, Delaware, and South New Jersey',
		address: '24 Louella Court',
		address2: 'Suite 240',
		city: 'Wayne',
		state: 'PA',
		zip: '19087',
		links: [
			{ text: 'kristen@kilkennycollections.com', to: 'mailto:kristen@kilkennycollections.com' },
			{ text: 'www.kilkennycollections.com', to: 'https://www.kilkennycollections.com', external: true, target: '_blank' },
			{ text: '484.581.7946', to: 'tel:14845817946' }
		]
	},
	{
		eyebrow: 'Available at:',
		title: 'Chairloom',
		city: 'Narberth',
		state: 'PA',
		zip: '19072',
		links: [
			{ text: 'chairloom@gmail.com', to: 'mailto:chairloom@gmail.com' },
			{ text: 'www.chairloom.com', to: 'https://www.chairloom.com', external: true, target: '_blank' },
			{ text: '914.484.5498', to: 'tel:19144845498' }
		]
	},
	{
		title: 'Wells Abbott Showroom — Dallas',
		text: 'Dallas Design Center',
		address: '1025 N Stemmons Fwy',
		address2: 'Suite 749',
		city: 'Dallas',
		state: 'TX',
		zip: '75207',
		links: [
			{ text: 'info@wellsabbott.com', to: 'mailto:info@wellsabbott.com' },
			{ text: 'www.wellsabbott.com', to: 'https://www.wellsabbott.com', external: true, target: '_blank' },
			{ text: '214.239.8722', to: 'tel:12142398722' }
		]
	},
	{
		title: 'Wells Abbott Showroom — Houston',
		text: 'Decorative Center of Houston',
		address: '5120 Woodway Dr',
		address2: 'Suite 3010',
		city: 'Houston',
		state: 'TX',
		zip: '77056',
		links: [
			{ text: 'info@wellsabbott.com', to: 'mailto:info@wellsabbott.com' },
			{ text: 'www.wellsabbott.com', to: 'https://www.wellsabbott.com', external: true, target: '_blank' },
			{ text: '214.526.8200', to: 'tel:12145268200' }
		]
	},
	{
		title: 'Wells Abbott Showroom — Chicago',
		text: 'theMART',
		address: '222 Merchandise Mart Plaza',
		address2: 'Suite 6-142',
		city: 'Chicago',
		state: 'IL',
		zip: '60654',
		links: [
			{ text: 'info@wellsabbott.com', to: 'mailto:info@wellsabbott.com' },
			{ text: 'www.wellsabbott.com', to: 'https://www.wellsabbott.com', external: true, target: '_blank' },
			{ text: '312.809.5115', to: 'tel:13128095115' }
		]
	},
	{
		title: 'Eye on Design and Antiques',
		text: 'International',
		address: '12 Church Street',
		city: 'Tetbury GL8 8JG',
		state: 'United Kingdom',
		links: [
			{ text: 'hello@eyeondesignandantiques.com', to: 'mailto:hello@eyeondesignandantiques.com' },
			{ text: 'www.eyeondesignandantiques.com', to: 'https://www.eyeondesignandantiques.com', external: true, target: '_blank' },
			{ text: '44.0.1666.846403', to: 'tel:4401666846403' }
		]
	}
]

const Showrooms = (props) => {
	return (
		<Fragment>
			<SEO title="Showrooms" />
			<div style={{ textAlign: "center" }}>
				<Header hasAtf={false} />
				<CalloutText
					prevTheme={false}
					nextTheme="white"
					theme="bgColor"
					alignment="center"
					headline="Showroows"
					headlineSize="h1"
					headlineElement="h1"
					text={
						<p className='medium'>
							Please contact us at{" "}
							<a href="mailto:info@miltontextiles.com">
								info@miltontextiles.com
							</a>{" "}
							if we are not at a showroom near you.
						</p>
					}
				/>

				<Section setTheme="white" isFirstSection prevTheme='bgColor' nextTheme={false}>
					<Grid
						as={ScrollEntrance}
						small="1 [12] 1"
						medium="1 [6] [6] 1"
						large="1 [3] [3] [3] 1"
						colGap="30px"
						rowGap={['40px', '70px', '100px']}
					>
						{showrooms.map((showroom, index) => {
							return (
								<Address key={'item-' + index}>
									{showroom.eyebrow && (<p className="address-text"><em>{showroom.eyebrow}</em></p>)}
									<Title as="p">{showroom.title}</Title>
									<p className="address-text">
										{showroom.text && <>{showroom.text}<br/></>}
										{showroom.address && <>{showroom.address}<br/></>}
										{showroom.address2 && <>{showroom.address2}<br/></>}
										{showroom.city && showroom.state && (
											<>{showroom.city && showroom.city}, {showroom.state && showroom.state} {showroom.zip && showroom.zip}<br/></>
										)}
										<Links>
										{showroom.links.map((link, linkIndex) => {
											return (
												<div>
													<Link
														to={link.to}
														key={'item-' + index + '-link-' + linkIndex}
														target={link?.target}
														external={link?.external}
													>{link.text}</Link>
												</div>
											)
										})}
										</Links>
									</p>
								</Address>
							)
						})}
					</Grid>
				</Section>
			</div>
		</Fragment>
	);
};

export default Showrooms;
