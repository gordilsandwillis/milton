/* eslint-disable react/prop-types */
/* eslint-disable import/namespace */

import React from 'react'
import styled from '@emotion/styled'
import { colors, typography, animations } from '../../styles'
import Link from '../Link'

const StyledLink = styled.div`
	${({ textStyle = 'buttonStyle' }) => typography[textStyle]}
	line-height: 1em;
	position: relative;
	display: inline-block;
	&:after {
		content: '';
		display: block;
		position: absolute;
		top: 135%;
		left: 0;
		width: 100%;
		height: 1px;
		background: ${({ theme }) => (theme ? colors[theme] : 'currentcolor')};
		transform: scaleX(0);
		transform-origin: right center;
		transition: transform ${animations.mediumSpeed} ease-in-out;
		// display: none;
		${({ underlined }) => underlined
			&& `
			transition-delay: .5s;
		`}
	}
	${({ underlined, theme }) => underlined
		&& `
		&:before {
			content: '';
			display: block;
			position: absolute;
			top: 135%;
			left: 0;
			width: 100%;
			height: 1px;
			background: ${theme ? colors[theme] : 'currentcolor'};
			transform: scaleX(1);
			transform-origin: left center;
			transition: transform ${animations.mediumSpeed} ease-in-out;
		}
	`}
	&:hover {
		&:after {
			transform-origin: left center;
			transform: scaleX(1);
		}
		${({ underlined }) => underlined
			&& `
			&:before {
				transform-origin: right center;
				transform: scaleX(0);
				transition-delay: .2s;
			}
		`}
	}
`

const TextLink = ({
	to, external, target, loading, error, success, disabled, onClick, theme, className, children, title, underlined, textStyle
}) => (
	<StyledLink
		className={`textLink ${className}`}
		to={to}
		onClick={onClick}
		target={target}
		external={external}
		loading={loading}
		error={error}
		success={success}
		disabled={disabled}
		theme={theme}
		title={title}
		underlined={underlined}
		textStyle={textStyle}
		as={onClick ? 'a' : Link}
	>
		{children}
	</StyledLink>
)

TextLink.defaultProps = {
	theme: 'currentcolor',
}

export default TextLink
