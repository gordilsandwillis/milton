import React, { Component } from 'react'
import styled from '@emotion/styled'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import UnderlinedInput from 'src/components/Input/UnderlinedInput'
import { validateEmail } from 'src/utils/validations'

import { colors, typography, util } from 'src/styles'

const StyledForm = styled.form`
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  ${ util.responsiveStyles('margin-top', 42, 36, 28, 24) }
  max-width: 600px;
`

const StyledInput = styled(Input)`
  color: ${ colors.bgColor };
  position: relative;
  z-index: 1;
  label {
    color: ${ colors.bgColor };
  }
  input.input {
    background: transparent;
    border-color: ${ colors.bgColor };
    color: ${ colors.bgColor };
    &:hover,
    &:focus {
      background: transparent;
      border-color: ${ colors.bgColor };
    }
  }
`

const SubmitButton = styled(Button)`
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`

class NewsletterForm extends Component {
	constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      email: ''
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
            email: ''
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
		const { status, name, company, phone, email, message } = this.state
		const { buttonLabel='Send' , currentVariant, currentProduct, currentCollection } = this.props
		const valid = email && validateEmail(email)

		let buttonText = 'arrow_forward'
		if (status === 'SUCCESS') {
			buttonText = 'check'
		}

		return (
			<StyledForm
        onSubmit={this.submitForm}
        action="https://formspree.io/xwkbldwy"
        method="POST"
      >

        <input type="hidden" name="_subject" value="Newsletter Signup" />

        {/*<input type="hidden" name="_cc" value="matt@gordilsandwillis.com" />*/}
        
        <StyledInput
          onChange={this.handleInput}
          setTheme="transparent"
          size="large"
          label={status === 'SUCCESS' ? 'Thank you' : 'Enter email'}
          type="email"
          name="email"
          value={email}
          id="email"/>

        <SubmitButton
          shape="square"
          setTheme="transparent"
          size="large"
          type="submit"
          icon={buttonText}
          disabled={!valid}
        />

      </StyledForm>
		)
	}
}

export default NewsletterForm
