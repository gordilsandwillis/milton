import React, { Fragment, Component } from 'react';
import ReactGA from 'react-ga'
import Header from 'src/components/Header'
import Section from 'src/components/Section'
import ScrollEntrance from 'src/components/ScrollEntrance'
import Grid from 'src/components/Grid'
import ContactForm from 'src/components/ContactForm'
import SEO from "src/components/SEO"

class Contact extends Component {
	componentDidMount () {
		if (process.env.NODE_ENV === 'production') {
	    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING);
			ReactGA.pageview(window.location.pathname + window.location.search);
		}
  }
  
	render () {
		return (
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
	}
}

export default Contact
