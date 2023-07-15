import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors, animations, typography } from 'styles'
import { MdArrowForward } from 'react-icons/md'

import { Link as RouterLink } from 'react-router-dom'

const LinkStyles = (type, setTheme) => `
	font-size: inherit;
	text-decoration: none;
	cursor: pointer;
	${ type === 'textLink' || type === 'arrowLink' || type === 'capsLink' || type === 'underlinedLink' ? `
		position: relative;
		display: inline-block;
		line-height: 1.3em;
		&:after {
			content: '';
			display: block;
			position: absolute;
			top: 100%;
			left: 0;
			width: calc(100% - 2px);
			height: 1px;
			background: ${ colors[setTheme] };
			transform: scaleX(0);
			transform-origin: right center;
			transition: transform ${ animations.mediumSpeed } ease-in-out, background ${ animations.mediumSpeed } ease-in-out;
		}
		&:hover {
			&:after {
				transform-origin: left center;
				transform: scaleX(1);
			}
		}
	` : `` }
	${ type === 'underlinedLink' ? `
		${ typography.h6 }
		&:before {
			content: '';
			display: block;
			position: absolute;
			top: 100%;
			left: 0;
			width: calc(100% - 2px);
			height: 1px;
			background: ${ colors[setTheme] };
			opacity: .2;
		}
	` : `` }
	${ type === 'capsLink' ? `
		${ typography.h6 }
	` : `` }
`

const StyledLinkElement = styled.a`
	${ ({ type, theme }) => `
		${ LinkStyles(type, theme) }
	` }
`

const StyledTextElement = styled.span`
	${ ({ type, theme }) => `
		${ LinkStyles(type, theme) }
	` }
`

const StyledLink = styled(RouterLink)`
	${ ({ type, theme }) => `
		${ LinkStyles(type, theme) }
	` }
`

const ArrowIcon = styled(MdArrowForward)`
	display: inline-block;
	vertical-align: middle;
	margin-left: .3em;
	margin-top: -4px;
`

class Link extends Component {
	render () {
		const {
			to,
			external,
			target,
			children,
			className,
			type,
			setTheme,
			onClick,
			label
		} = this.props

		if (!children && !label) {
			console.warn('Link does not have an accessible name', children, label)
		}

		if (onClick) {
			return (
				<StyledTextElement
					className={className}
					type={type}
					theme={setTheme}
					onClick={onClick}
					aria-label={children && typeof children === 'string' ? children : label}
				>
					{children}
					{type === 'arrowLink' && (
						<ArrowIcon size={18}/>
					)}
				</StyledTextElement>
			)

		} else if (external) {
			return (
				<StyledLinkElement
					className={className}
					href={to}
					type={type}
					theme={setTheme}
					target={target}
					rel="noopener noreferrer"
					aria-label={children && typeof children === 'string' ? children : label}
				>
					{children}
					{type === 'arrowLink' && (
						<ArrowIcon size={18}/>
					)}
				</StyledLinkElement>
			)
		} else {
			return (
				<StyledLink
					className={className}
					to={to}
					type={type}
					theme={setTheme}
					aria-label={children && typeof children === 'string' ? children : label}
				>
					{children}
					{type === 'arrowLink' && (
						<ArrowIcon size={18}/>
					)}
				</StyledLink>
			)
		}
	}
}

Link.defaultProps = {
	to: '#',
	external: false,
	type: 'none',
	setTheme: 'currentcolor',
	target: '_blank'
}

export default Link
