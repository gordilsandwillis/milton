import React, { Component } from 'react'
import styled from '@emotion/styled'
import Button from 'src/components/Button'
import Grid from 'src/components/Grid'
import UnderlinedInput from 'src/components/Input/UnderlinedInput'
import { validateEmail } from 'src/utils/validations'

import { colors, typography, util } from 'src/styles'

const ErrorMessage = styled.p`
  text-align: center;
  color: ${ colors.alert };
  ${ typography.bodySmall }
  font-weight: 600;
  max-width: 21em;
  margin: 0 auto 8px;
  ${ util.responsiveStyles('margin-top', 30, 20, 20, 16) }
`

const SubmitButton = styled(Button)`
  min-width: 150px;
  display: inline-block;
  vertical-align: top;
  ${ util.responsiveStyles('margin-top', 50, 45, 40, 20) }
`

const Form = styled.form`
  width: 100%;
`

class ContactForm extends Component {
	constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: '',
      product: '',
      collection: '',
      sku: '',
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
      message: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
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
            status: '',
            product: '',
            collection: '',
            sku: '',
            firstName: '',
            lastName: '',
            company: '',
            email: '',
            phone: '',
            message: ''
          })
          form.reset()
        }, 1000)
        if (this.props.onSuccess) {
        	setTimeout(() => {
        		this.props.onSuccess()
        	}, 900)
        }
      } else {
        this.setState({ status: "ERROR" })
      }
    };
    xhr.send(data);
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

	render () {
		const { status, firstName, lastName, company, phone, email, message } = this.state
		const { buttonLabel='Send' , currentVariant, currentProduct, currentCollection, subject } = this.props
		const valid = firstName && lastName && email && validateEmail(email) && message

		let buttonText = buttonLabel
		if (status === 'SUCCESS') {
			buttonText = 'Thank You'
		}

		return (
			<Form
        onSubmit={this.submitForm}
        action="https://formspree.io/xwkbldwy"
        method="POST"
      >

        {subject && <input type="hidden" name="_subject" value={subject} />}

        <UnderlinedInput
          hidden={true}
          onChange={this.handleInput}
          size="small"
          label="Product"
          type="text"
          name="product"
          id="product"
          value={(currentVariant && currentProduct) && currentVariant.title + ' | ' + currentProduct.title}
          disabled={!(currentVariant && currentProduct)}
        />

        <UnderlinedInput
          hidden={true}
          onChange={this.handleInput}
          size="small"
          label="Collection"
          type="text"
          name="collection"
          id="collection"
          value={currentCollection && currentCollection.title}
          disabled={!(currentCollection && currentCollection.title)}
        />

        <UnderlinedInput
          hidden={true}
          onChange={this.handleInput}
          size="small"
          label="SKU"
          type="text"
          name="sku"
          id="sku"
          value={currentVariant && currentVariant.sku}
          disabled={!(currentVariant && currentVariant.sku)}
        />

        <Grid small="[1]" medium="[1] [1]" colGap="30px">
          <div>
            <UnderlinedInput
              onChange={this.handleInput}
              size="small"
              label="First Name"
              type="text"
              name="firstName"
              value={firstName}
              id="firstName"/>
          </div>

          <div>
            <UnderlinedInput
              onChange={this.handleInput}
              size="small"
              label="Last Name"
              type="text"
              name="lastName"
              value={lastName}
              id="lastName"/>
          </div>
        </Grid>

        <UnderlinedInput
          onChange={this.handleInput}
          size="small"
          label="Company"
          type="text"
          name="company"
          value={company}
          id="company"/>

        <Grid small="[1]" medium="[1] [1]" colGap="30px">
          <div>
            <UnderlinedInput
              onChange={this.handleInput}
              size="small"
              label="Email"
              type="text"
              name="email"
              value={email}
              id="email"/>
          </div>
          <div>
            <UnderlinedInput
              onChange={this.handleInput}
              size="small"
              label="Phone"
              type="text"
              name="phone"
              value={phone}
              id="phone"/>
          </div>
        </Grid>

        <UnderlinedInput
          onChange={this.handleInput}
          size="small"
          label="Message"
          type="textarea"
          name="message"
          value={message}
          id="message"/>

        <SubmitButton type="submit" disabled={!valid}>{buttonText}</SubmitButton>

        {status === 'ERROR' && (<ErrorMessage>Something went wrong. Please make sure all fields are filled out and try again.</ErrorMessage>)}

      </Form>
		)
	}
}

export default ContactForm
