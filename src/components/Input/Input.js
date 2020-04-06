import React, { Component } from 'react'
import styled from '@emotion/styled'

import { darken, rgba } from 'polished'
import { colors, typography, animations, util } from 'src/styles'
import ConditionalRender from 'src/components/ConditionalRender'
import MaterialIcon from 'src/components/MaterialIcon'

const isEmoji = string => {
	var ranges = [
		'(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
	];
	if (string.match(ranges.join('|'))) {
		return true;
	} else {
		return false;
	}
}

const inputVars = {
	tiny: '36px',
	small: '48px',
	medium: '50px',
	large: '60px',
	borderWidth: '1px',
	backgroundColor: 'transparent',
	borderRadius: '0px',
	hPadding: '1em'
}

const themes = {
		lightGrey: {
			color: colors.textColor,
			accent: colors.mainColor,
			background: colors.lightGrey
		},
		white: {
			color: colors.textColor,
			accent: colors.mainColor,
			background: colors.white
		},
		bgColor: {
			color: colors.bgColor,
			accent: colors.mainColor,
			background: colors.textColor
		},
		transparent: {
			color: colors.textColor,
			accent: colors.mainColor,
			background: colors.transparent
		},
		textColor: {
			color: colors.textColor,
			accent: colors.lightGreen,
			background: colors.bgColor
		}
	}

const setInputTheme = theme => {
	return `
		color: ${ themes[theme]['color'] };
		input {
			background: ${ themes[theme]['background'] };
			border-color: ${ colors[theme] };
			caret-color: ${ themes[theme]['color'] };
			color: ${ themes[theme]['color'] };
			&:hover, &:active, &:focus {
				background: ${ darken(0.05, themes[theme]['background']) };
				border-color: ${ themes[theme]['accent'] };
			}
			&:-internal-autofill-selected,
			&:-webkit-autofill {
				background: ${ darken(0.05, themes[theme]['background']) } !important;
				background-color: ${ darken(0.05, themes[theme]['background']) } !important;
				color: ${ themes[theme]['color'] } !important;
			}
			::placeholder {
				color: ${ rgba(themes[theme]['color'], 0.5) };
			}
		}
	`
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

const InputWrap = styled.div`
	position: relative;
	display: inline-block;
	width: 100%;
	${ typography.bodySmall }
	${ ({ theme }) => {
		console.log(setInputTheme(theme))
		return setInputTheme(theme)
	} }
`

const InputStyles = (state, size, icon, iconPosition, theme, label) => (`
  appearance: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-touch-callout: none;
  outline: none;
  display: inline-block;
  width: 100%;
  vertical-align: middle;
  background: ${ inputVars.backgroundColor };
  border: ${ inputVars.borderWidth } solid;
  height: ${ inputVars.medium };
  line-height: 1em;
  text-transform: none;
  letter-spacing: 0;
  border-radius: ${ inputVars.borderRadius };
  color: inherit;
  font-style: inherit;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
  text-align: left;
  box-shadow: none;
  padding: 2px ${ inputVars.hPadding } 0;
  ${ icon ? `
		padding-${ iconPosition }: ${ inputVars.medium };
		${ size === 'tiny' ? `
			${ util.responsiveStyles('font-size', 16, 14, 13, 13) }
			padding-${ iconPosition }: ${ inputVars.tiny };
		` : `` }
		${ size === 'small' ? `
			padding-${ iconPosition }: ${ inputVars.small };
		` : `` }
		${ size === 'large' ? `
			padding-${ iconPosition }: ${ inputVars.medium };
		` : `` }
	` : `` }
  padding-bottom: 1px;
  ${ util.fontSmoothing }
  transition: background ${ animations.mediumSpeed } ease-in-out,
              color ${ animations.mediumSpeed } ease-in-out,
              border ${ animations.mediumSpeed } ease-in-out,
              box-shadow ${ animations.mediumSpeed } ease-in-out,
              transform ${ animations.mediumSpeed } ease-in-out,
              opacity ${ animations.mediumSpeed } ease-in-out;
	// Input States
	::placeholder {
		color: ${ colors.lightTextColor };
	}
	${ state === 'disabled' ? `cursor: not-allowed;` : `` }
	${ state === 'loading' ? `cursor: wait;` : `` }
	${ state === 'error' ? `
		border-color: ${ colors.alert };
	` : `` }

	${ size === 'tiny' ? `
		height: ${ inputVars.tiny };
		${ util.responsiveStyles('font-size', 16, 14, 13, 13) }
	` : `` }
	${ size === 'small' ? `
		height: ${ inputVars.small };
	` : `` }
	${ size === 'large' ? `
		height: ${ inputVars.large };
	` : `` }

	${ label ? `${ util.responsiveStyles('padding-top', 18, 16, 16, 14) }` : `` }

`)

const StyledInput = styled.input`
	${ ({
		loading,
		error,
		success,
		disabled,
		size,
		icon,
		iconPosition,
		label,
		theme,
		style,
	}) => InputStyles(getState(loading, error, success, disabled), size, icon, iconPosition, theme, label) }
`

const InputIcon = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	pointer-events: none;
	overflow: hidden;
	${ ({ emojiIcon }) => emojiIcon && `
		padding-top: .3em;
		font-size: 18px;
		line-height: 1em;
	` }
	${ ({ iconPosition }) => iconPosition }: ${ inputVars.borderWidth };
	width: ${ inputVars.medium };
	height: ${ inputVars.medium };
	${ ({ size }) => size === 'tiny' ? `
		width: ${ inputVars.tiny };
		height: ${ inputVars.tiny };
	` : `` }
	${ ({ size }) => size === 'small' ? `
		width: ${ inputVars.small };
		height: ${ inputVars.small };
	` : `` }
	${ ({ size }) => size === 'large' ? `
		width: ${ inputVars.medium };
		height: ${ inputVars.large };
	` : `` }
	span, svg {
		display: block;
	}
`

const InputLabel = styled.label`
	position: absolute;
	font-style: inherit;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
	top: 0;
	left: ${ inputVars.borderWidth };
	height: 100%;
	display: flex;
	align-items: center;
	pointer-events: none;
	margin: 0 ${ inputVars.hPadding };
	color: ${ ({ error }) => error ? `${ colors.alert }` : `inherit` };
	transition: transform ${ animations.mediumSpeed } ease-in-out, color ${ animations.mediumSpeed } ease-in-out;
	transform-origin: 0% 50%;
	${ props => props.placeholder || props.value || props.focused ? `
		transform: translate3d(0, -10px, 0) scale(.75);
	` : `` }
	${ props => props.focused ? `
		// color: ${ colors.mainColor };
	` : `` }
	${ ({ icon, iconPosition, size }) => icon ? `
		margin-${ iconPosition }: ${ inputVars.medium };
		${ size === 'tiny' ? `
			height: ${ inputVars.tiny };
			${ util.responsiveStyles('font-size', 16, 14, 13, 13) }
			margin-${ iconPosition }: ${ inputVars.tiny };
		` : `` }
		${ size === 'small' ? `
			height: ${ inputVars.small };
			margin-${ iconPosition }: ${ inputVars.small };
		` : `` }
		${ size === 'large' ? `
			height: ${ inputVars.large };
			margin-${ iconPosition }: ${ inputVars.large };
		` : `` }
	` : `` }
`

class Input extends Component {
	state = {
		focused: false,
		hasValue: false
	}

	renderIcon = (icon, size, iconPosition, theme) => {
		let renderedIcon = false
		let isEmojiIcon = isEmoji(icon)
		if (isEmojiIcon) {
			renderedIcon = <InputIcon size={size} iconPosition={iconPosition} theme={theme} emojiIcon>{icon}</InputIcon>
		} else if (typeof icon === 'string') {
			renderedIcon = <InputIcon size={size} iconPosition={iconPosition} theme={theme}><MaterialIcon size={this.props.size === 'tiny' && '18px'}>{icon}</MaterialIcon></InputIcon>
		} else {
			renderedIcon = <InputIcon size={size} iconPosition={iconPosition} theme={theme}>{icon}</InputIcon>
		}
		return renderedIcon
	}

	setFocus = status => {
		this.setState({ focused: status })
	}

	render () {
		const {
			value,
			type,
			icon,
			iconPosition,
			loading,
			error,
			success,
			disabled,
			onClick,
			onChange,
			setTheme,
			className,
			shape,
			size,
			placeholder,
			label,
			spellcheck,
			name
		} = this.props

		const { focused, hasValue } = this.state

		console.log(setTheme)

		return (
			<InputWrap className={className} theme={setTheme}>
				<StyledInput
					className="input"
					type={type}
					placeholder={placeholder}
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
					onFocus={() => this.setFocus(true)}
					onBlur={() => this.setFocus(false)} // needs work
					onChange={onChange}
					value={value}
					label={label}
					name={name}
					spellCheck={spellcheck}
				/>
				<ConditionalRender condition={label}>
					<InputLabel
						icon={icon}
						iconPosition={iconPosition}
						size={size}
						error={error}
						theme={setTheme}
						value={value}
						htmlFor={name}
						focused={focused}
						className={placeholder || value || hasValue || focused ? 'focused' : 'unfocused' /* to select from styled component */}
						placeholder={placeholder}
					>
						{label}
					</InputLabel>
				</ConditionalRender>
				{icon && (
					this.renderIcon(icon, size, iconPosition, setTheme)
				)}
			</InputWrap>
		)
	}
}

Input.defaultProps = {
	type: 'text',
	iconPosition: 'left',
	setTheme: 'lightGrey',
	spellcheck: false,
	onChange: () => {}
}

export default Input
