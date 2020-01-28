import React, { Component } from 'react'
import styled from '@emotion/styled'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import MaterialIcon from 'src/components/MaterialIcon'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

const McUrl = '//gordilsandwillis.us18.list-manage.com/subscribe/post?u=59f368fb0e0e947c191b3b89d&amp;id=265fbc6b5b'

const FormWrapper = styled.div`
	display: flex;
	width: 100%;
`

// a basic form
const CustomForm = ({ status, message, onValidated, inputClassName, inputPlaceholder }) => {
	let email
	const submit = () =>
		email &&
		email.value.indexOf('@') > -1 &&
		onValidated({
			EMAIL: email.value,
		})

	let buttonStatus = status

	const renderIcon = buttonStatus => {
		let icon = <MaterialIcon>arrow_forward</MaterialIcon>
		if (buttonStatus === 'sending') {
			// icon = <Loader />
			icon = <MaterialIcon>more</MaterialIcon>
		} else if (buttonStatus === 'success') {
			icon = <MaterialIcon>check</MaterialIcon>
		} else if (buttonStatus === 'error') {
			icon = <MaterialIcon>close</MaterialIcon>
		} else {
			icon = <MaterialIcon>arrow_forward</MaterialIcon>
		}
		return icon
	}

	return (

		<FormWrapper>
			<div style={{ flexGrow: 1, flexShrink: 0 }}>
				<Input
					size="small"
					ref={node => (email = node)}
					type="email"
					placeholder={inputPlaceholder || 'Email'}
				/>
			</div>
			<div style={{ flexGrow: 0, flexShrink: 0 }}>
				<Button onClick={submit} shape="simple square" setTheme="mainColor" size="small">
					<div>
						{renderIcon(status)}
					</div>
				</Button>
			</div>
		</FormWrapper>
	)
}

class MailchimpSignup extends Component {
	render () {
		return (
			<MailchimpSubscribe
				url={McUrl}
				render={({ subscribe, status, message }) => (
					<CustomForm
						status={status}
						message={message}
						onValidated={formData => subscribe(formData)}
						inputClassName={this.props.inputClassName}
						inputPlaceholder={this.props.placeholder}
					/>
				)}
			/>
		)
	}
}

export default MailchimpSignup
