import React, { Fragment } from 'react';

import Header from 'src/components/Header'
import Section from 'src/components/Section'
import ScrollEntrance from 'src/components/ScrollEntrance'
import Grid from 'src/components/Grid'
import ContactForm from 'src/components/ContactForm'
import SEO from "src/components/SEO"

const Contact = () => (
	<Fragment>
		<SEO title="Contact" />
		<div style={{ textAlign: 'center' }}>
			<Header hasAtf={false}/>
			<Section prevTheme="bgColor" setTheme="bgColor">
				<Grid small="1 [12] 1" medium="3 [8] 3" large="4 [6] 4">
					<ScrollEntrance>
						<div>
							<p className="large" style={{ textAlign: 'center', maxWidth: '22em', marginLeft: 'auto', marginRight: 'auto'}}>We would love to hear from you and collaborate on any projects you may have.</p>
						</div>
						<div>
							<ContactForm subject="Milton — Contact Page" />
						</div>
					</ScrollEntrance>
				</Grid>
			</Section>
		</div>
	</Fragment>
)

export default Contact
