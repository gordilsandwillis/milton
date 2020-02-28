import React, { Component, Fragment } from 'react';
import Header from 'src/components/Header'
import styled from '@emotion/styled'
import Button from 'src/components/Button'
// import CalloutText from 'src/components/CalloutText'
import FiftyFifty from 'src/components/FiftyFifty'
import ContactImage from 'src/assets/images/Ethridge-2002100163.jpg'
import ContactForm from 'src/components/ContactForm'
import { colors, typography, util } from 'src/styles'

// import { Helmet } from "react-helmet";

const SubmitButton = styled(Button)`
	${ util.responsiveStyles('margin-top', 30, 20, 20, 16) }
`

const ErrorMessage = styled.p`
  text-align: center;
  color: ${ colors.alert };
  ${ typography.bodySmall }
  font-weight: 600;
  max-width: 21em;
  margin: 0 auto 8px;
  ${ util.responsiveStyles('margin-top', 30, 20, 20, 16) }
`

class Contact extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //const { email, name, phone, company } = this.state
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json")
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        this.setState({ status: "SUCCESS" })
        setTimeout(() => {
          this.setState({
            name: '',
            company: '',
            email: '',
            phone: '',
            message: ''
          })
          form.reset()
        }, 1000)
        setTimeout(() => {
          this.props.modalContext.closeModal()
        }, 500)
      } else {
        this.setState({ status: "ERROR" })
      }
    };
    xhr.send(data);
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

	render() {
		const { name, company, email, phone, message } = this.state

		const valid = true

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

					<FiftyFifty
						prevTheme="bgColor"
						setTheme="bgColor"
						index={0}
						headline="Contact Us"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tubulum fuisse, qua illum Lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
						image={{
							fluid: {
								aspectRatio: 1,
								src: ContactImage,
								srcSet: '',
								sizes: ''
							}
						}}
						overlay={false}
					>
						<div>
							<ContactForm />
						</div>
					</FiftyFifty>


				</div>
			</Fragment>
		);
	}
}

export default Contact;