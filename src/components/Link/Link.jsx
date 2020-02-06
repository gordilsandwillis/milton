import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors, animations, typography } from 'src/styles'
import { MdArrowForward } from 'react-icons/md'

import { Link as RouterLink } from 'react-router-dom'

const LinkStyles = (linkType, setTheme) => `
	font-size: inherit;
	text-decoration: none;
	cursor: pointer;
	${ linkType === 'textLink' || linkType === 'arrowLink' || linkType === 'capsLink' ? `
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
	${ linkType === 'capsLink' && `
		${ typography.h6 }
	` }
`

const StyledLinkElement = styled.a`
	${ ({ linkType, setTheme }) => `
		${ LinkStyles(linkType, setTheme) }
	` }
`

const StyledLink = styled(RouterLink)`
	${ ({ linkType, setTheme }) => `
		${ LinkStyles(linkType, setTheme) }
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
		const { to, external, target, children, className, linkType, setTheme } = this.props

		if (external) {
			return (
				<StyledLinkElement
					className={className}
					href={to}
					linkType={linkType}
					setTheme={setTheme}
					target="_blank"
					rel="noopener noreferrer"
				>
					{children}
					{linkType === 'arrowLink' && (
						<ArrowIcon size={18}/>
					)}
				</StyledLinkElement>
			)
		} else {
			return (
				<StyledLink
					className={className}
					to={to}
					linkType={linkType}
					setTheme={setTheme}
				>
					{children}
					{linkType === 'arrowLink' && (
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
	linkType: 'none',
	setTheme: 'currentcolor'
}

export default Link
