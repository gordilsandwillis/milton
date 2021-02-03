import React, { Fragment } from 'react';
import ReactGA from 'react-ga'
import styled from '@emotion/styled'

import Header from 'src/components/Header'
import Section from 'src/components/Section'
import ScrollEntrance from 'src/components/ScrollEntrance'
import Grid from 'src/components/Grid'
import CalloutText from 'src/components/CalloutText'

import SEO from "src/components/SEO"

import { util } from 'src/styles'

const Address = styled.address`
	${ util.responsiveStyles('margin-bottom', 91, 51, 33, 26) }
`

const Showrooms = (props) => {
  return (
    <Fragment>
    	<SEO title="Showrooms" />
				<div style={{ textAlign: 'center' }}>
					<Header hasAtf={false}/>
					<Section prevTheme="bgColor" setTheme="bgColor">
						<CalloutText
							prevTheme={false}
							nextTheme="bgColor"
							theme="bgColor"
							alignment="center"
							headline="SHOWROOMS"
							headlineSize="h3"
							text={<p>Please contact us at <a href="mailto:info@miltontextiles.com">info@miltontextiles.com</a> if we are not at a showroom near you.</p>}
						/>
						<Grid
							small="[12]"
							medium="3 [8] 3"
							large="4 [6] 4"
						>
							<ScrollEntrance>
								<div>
									<Address>
										<h6>Temple Studio</h6>
										<p>
										51 East 12th Street, 4th floor <br />
										New York, New York 10003<br />
										<a href="mailto:info@templestudiony.com">info@templestudiony.com</a>
										<br />
										<a target="_blank" href="http://www.templestudiony.com">www.templestudiony.com</a>
										<br />
										<a href="tel:+1-917-985-8151">917.985.8151</a>
										</p>
									</Address>
								</div>
								<div>
									<Address>
										<h6>The Lot Showroom</h6>
										<p>
										Southeast : AL, GA, MS, NC, KY, SC, TN, FL <br />
										<a href="mailto:bforrister@thelotshowroom.com">bforrister@thelotshowroom.com </a>
										<br />
										<a target="_blank" href="http://www.thelotshowroom.com">www.thelotshowroom.com</a>
										<br />
										<a href="tel:+1-828-361-3500">828.361.3500</a>
										</p>
									</Address>
								</div>
								<div>
									<Address>
										<h6>Evars Collective</h6>
										<p>
										1600 El Camino Real, Suite B<br />
										San Carlos, California 94070<br />
										<a href="mailto:info@evarscollective.com">info@evarscollective.com</a>
										<br />
										<a target="_blank" href="https://www.evarscollective.com">www.evarscollective.com</a>
										</p>
									</Address>
								</div>
								<div>
									<Address>
										<p>Available at:</p>
										<h6>Chairloom</h6>
										<p>
										Narberth, PA <br />
										New York, New York 10003<br />
										<a href="mailto:chairloom@gmail.com">chairloom@gmail.com</a>
										<br />
										<a target="_blank" href="https://www.chairloom.com">www.chairloom.com</a>
										<br />
										<a href="tel:+1-914-484-5498">914.484.5498</a>
										</p>
									</Address>
								</div>
							</ScrollEntrance>
						</Grid>
					</Section>
				</div>


    </Fragment>
  )
}

export default Showrooms;