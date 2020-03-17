import React, { Fragment } from 'react';

import Header from 'src/components/Header'
import Section from 'src/components/Section'
import Grid from 'src/components/Grid'
import ContactForm from 'src/components/ContactForm'
import SEO from "src/components/SEO"

const Contact = () => (
	<Fragment>
		<SEO title="Contact" />
		<div>
			<Header hasAtf={false}/>
			<Section>
				<Grid small="1 [12] 1" medium="3 [8] 3" large="4 [6] 4">
					<div>
						<h6>We would love to hear from you and collaborate on any projects you may have.</h6>
						<ContactForm />
					</div>
				</Grid>
			</Section>
		</div>
	</Fragment>
)

export default Contact
