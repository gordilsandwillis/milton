import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors, animations, typography } from 'src/styles'
import { MdArrowForward } from 'react-icons/md'

import { Link as RouterLink } from 'react-router-dom'

const LinkStyles = (linkStyle, setTheme) => `
	font-size: inherit;
	text-decoration: none;
	cursor: pointer;
	${ linkStyle === 'textLink' || linkStyle === 'arrowLink' || linkStyle === 'capsLink' ? `
		position: relative;
		&:after {
			content: '';
			display: block;
			position: absolute;
			top: calc(100% + 2px);
			left: 0;
			width: 100%;
			height: 2px;
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
	${ linkStyle === 'capsLink' && `
		${ typography.h6 }
	` }
`

const StyledLinkElement = styled.a`
	${ ({ linkStyle, setTheme }) => `
		${ LinkStyles(linkStyle, setTheme) }
	` }
`

const StyledLink = styled(RouterLink)`
	${ ({ linkStyle, setTheme }) => `
		${ LinkStyles(linkStyle, setTheme) }
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
		const { to, external, target, children, className, linkStyle, setTheme } = this.props

		if (external) {
			return (
				<StyledLinkElement
					className={className}
					href={to}
					target={target}
					linkStyle={linkStyle}
					setTheme={setTheme}
				>
					{children}
					{linkStyle === 'arrowLink' && (
						<ArrowIcon size={18}/>
					)}
				</StyledLinkElement>
			)
		} else {
			return (
				<StyledLink
					className={className}
					to={to}
					linkStyle={linkStyle}
					setTheme={setTheme}
				>
					{children}
					{linkStyle === 'arrowLink' && (
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
	target: '',
	linkStyle: 'none',
	setTheme: 'currentcolor'
}

export default Link
