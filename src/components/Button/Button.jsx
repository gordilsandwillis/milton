import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import { lighten, rgba } from 'polished'

import * as util from 'src/styles/util'
import { colors, typography, animations } from 'src/styles'
import MaterialIcon from 'src/components/MaterialIcon'

import Link from 'src/components/Link'

const buttonSizes = {
	tiny: '36px',
	small: '48px',
	medium: '60px',
	large: '72px',
}

const getState = (loading, error, success, disabled) => {
	let buttonState = ''
	if (error) {
		buttonState = 'error'
	} else if (loading) {
		buttonState = 'loading'
	} else if (success) {
		buttonState = 'success'
	} else if (disabled) {
		buttonState = 'disabled'
	}

	return buttonState
}

const setButtonTheme = theme => `
	${ theme === 'default' ? `
		background: ${ colors.textColor };
	` : `
		background: ${ colors[theme] };
	` }
	${ theme === 'white' || theme === 'bgColor' ? `
		color: ${ colors.textColor };
	` : `
		color: ${ colors.bgColor };
	` }
	&:hover {
		background: ${ lighten(0.07, colors[theme]) };
		border-color: ${ lighten(0.07, colors[theme]) };
		${ theme === 'white' || theme === 'bgColor' ? `
			color: ${ colors.green };
		` : `
			color: ${ colors.bgColor };
		` }
	}
`

const DisabledButtonStyles = () => `
	&[disabled],
	&:disabled {
		opacity: .4;
		background: ${ colors.textColor };
		color: ${ rgba(colors.bgColor, 0.6) };
		cursor: not-allowed;
	}
`

const ButtonStyles = (state, shape, size, theme) => (`
	appearance: none;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	-webkit-touch-callout: none;
	outline: none;
	display: inline-block;
	vertical-align: middle;
	border: none;
	height: ${ buttonSizes.medium };
	padding-top: 0;
	padding-bottom: 2px; // offset text if necessary
	padding-left: calc(${ buttonSizes.medium } * .4);
	padding-right: calc(${ buttonSizes.medium } * .4);
	cursor: pointer;
	text-transform: none;
	letter-spacing: 0;
	border-radius: 0;
	${ util.responsiveStyles('font-size', 20, 16, 15, 13) }
	text-align: center;
	box-shadow: none;
	${ typography.buttonStyle }
	${ util.fontSmoothing }
	transition: background ${ animations.mediumSpeed } ease-in-out,
							color ${ animations.mediumSpeed } ease-in-out,
							border ${ animations.mediumSpeed } ease-in-out,
							box-shadow ${ animations.mediumSpeed } ease-in-out,
							transform ${ animations.mediumSpeed } ease-in-out,
							opacity ${ animations.mediumSpeed } ease-in-out;
	// Button States
	${ state === 'loading' ? `cursor: wait;` : `` }
	${ state === 'error' || state === 'success' ? `cursor: default;` : `` }

	${ size ? `
		padding-left: calc(${ buttonSizes[size] } * .4);
		padding-right: calc(${ buttonSizes[size] } * .4);
		height: ${ buttonSizes[size] };
		min-width: calc(${ buttonSizes[size] } * 2);
	` : `
		min-width: calc(${ buttonSizes.medium } * 2);
	` }

	${ setButtonTheme(theme) }
	${ state === 'disabled' ? `${ DisabledButtonStyles() }` : `` }

	${ shape && `
		${ shape.includes('circle') || shape.includes('square') ? `
			padding-top: 0;
			padding-bottom: 0;
			padding-left: 0;
			padding-right: 0;
			${ size ? `
				width: ${ buttonSizes[size] };
				min-width: ${ buttonSizes[size] };
			` : `
				width: ${ buttonSizes.medium };
				min-width: ${ buttonSizes.medium };
			` }
		` : `` }
	` }

	${ shape && shape.includes('circle') ? `border-radius: 50%;` : `` }

`)

const ButtonContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	svg {
		* {
			fill: currentcolor;
		}
	}
`

const StyledButtonLink = styled(Link)`
	${ ({ loading, error, success, disabled, shape, size, theme }) => ButtonStyles(getState(loading, error, success, disabled), shape, size, theme) }
`

const StyledButtonElement = styled.button`
	${ ({ loading, error, success, disabled, shape, size, theme }) => ButtonStyles(getState(loading, error, success, disabled), shape, size, theme) }
`

class Button extends Component {
	renderIcon = icon => {
		let renderedIcon = false
		if (typeof icon === 'string') {
			renderedIcon = <MaterialIcon size={this.props.size === 'tiny' && '18px'}>{icon}</MaterialIcon>
		} else {
			renderedIcon = icon
		}
		return renderedIcon
	}

	renderButtonContent = () => {
		const { loading, error, success, children, icon, iconPosition } = this.props
		if (loading) {
			return <ButtonContent>
				...
			</ButtonContent>
		} else if (error) {
			return <ButtonContent>
				big ole error
			</ButtonContent>
		} else if (success) {
			return <ButtonContent>
				yes!
			</ButtonContent>
		} else {
			return <ButtonContent>
				{icon && iconPosition !== 'right' ? this.renderIcon(icon) : false}
				{children}
				{icon && iconPosition === 'right' ? this.renderIcon(icon) : false}
			</ButtonContent>
		}
	}

	render () {
		const {
			to,
			external,
			target,
			icon,
			iconPosition,
			loading,
			error,
			success,
			disabled,
			onClick,
			setTheme,
			className,
			shape,
			size
		} = this.props

		if (to) {
			return (
				<StyledButtonLink
					className={'button ' + className}
					to={to}
					target={target}
					external={external}
					icon={icon}
					iconPosition={iconPosition}
					loading={loading}
					error={error}
					success={success}
					disabled={disabled}
					onClick={onClick}
					theme={setTheme}
					shape={shape}
					size={size}
				>
					{this.renderButtonContent()}
				</StyledButtonLink>
			)
		} else {
			return (
				<StyledButtonElement
					className={'button ' + className}
					icon={icon}
					iconPosition={iconPosition}
					loading={loading}
					error={error}
					success={success}
					disabled={disabled}
					onClick={onClick}
					theme={setTheme}
					shape={shape}
					size={size}
				>
					{this.renderButtonContent()}
				</StyledButtonElement>
			)
		}
	}
}

Button.defaultProps = {
	setTheme: 'textColor'
}

export default Button
