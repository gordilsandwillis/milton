import { rgba } from 'polished'
import * as colors from './colors'
import { responsiveStyles } from './util'

import './fonts'

// Place global Typography in this file
export const primaryFont = `Domaine Sans, -apple-system, serif`
export const secondaryFont = `Domaine Narrow, -apple-system, serif`

export const bodyLarge = `
	${ responsiveStyles('font-size', 22, 20, 19, 18) }
	line-height: 1.6em;
	font-family: ${ primaryFont };
	letter-spacing: -.01em;
	text-transform: none;
	font-weight: normal;
`
export const bodyMedium = `
	${ responsiveStyles('font-size', 20, 18, 17, 16) }
	line-height: 1.75em;
	font-family: ${ primaryFont };
	letter-spacing: -.01em;
	text-transform: none;
	font-weight: normal;
`
export const body = `
	${ responsiveStyles('font-size', 16, 15, 14, 14) }
	line-height: 1.75em;
	font-family: ${ primaryFont };
	letter-spacing: -.01em;
	text-transform: none;
	font-weight: normal;
`
export const bodySmall = `
	${ responsiveStyles('font-size', 16, 14, 14, 14) }
	line-height: 1.75em;
	font-family: ${ primaryFont };
	letter-spacing: -.01em;
	text-transform: none;
	font-weight: normal;
`

export const h1 = `
	${ responsiveStyles('font-size', 70, 66, 54, 48) }
	line-height: 1.333em;
	font-family: ${ primaryFont };
	font-weight: 300;
	letter-spacing: .015em;
	text-transform: none;
`

export const h2 = `
	${ responsiveStyles('font-size', 72, 66, 58, 52) }
	line-height: 1.2em;
	font-family: ${ secondaryFont };
	font-weight: 300;
	letter-spacing: 0;
	text-transform: none;
`

export const h3 = `
	${ responsiveStyles('font-size', 50, 40, 32, 27) }
	line-height: 1.5em;
	font-family: ${ primaryFont };
	font-weight: 300;
	letter-spacing: 0;
	text-transform: none;
`

export const h4 = `
	${ responsiveStyles('font-size', 32, 26, 23, 20) }
	line-height: 1.6em;
	font-family: ${ primaryFont };
	font-weight: normal;
	letter-spacing: .1em;
	text-transform: uppercase;
`

export const h5 = `
	${ responsiveStyles('font-size', 24, 20, 19, 18) }
	font-family: ${ primaryFont };
	font-weight: 600;
	line-height: 1.5em;
	letter-spacing: 0;
	text-transform: none;
`
export const h6 = `
	${ responsiveStyles('font-size', 13, 12, 11, 10) }
	font-family: ${ primaryFont };
	font-weight: 600;
	line-height: 1.6em;
	letter-spacing: .1em;
	text-transform: uppercase;
`

export const blockquote = `
	${ h3 }
	${ responsiveStyles('font-size', 32, 26, 23, 20) }
`

export const eyebrow = `
	${ h6 }
`

export const buttonStyle = `
	${ h6 }
	line-height: 1em;
`

export const smallCaps = `
	${ h6 }
	${ responsiveStyles('font-size', 12, 11, 10, 10) }
	line-height: 1em;
`

export const storyNotes = `
	max-width: 750px;
	p {
		code {
			background: ${ rgba(colors.textColor, 0.1) };
			color: ${ colors.textColor };
			border-radius: 3px;
			padding: .05em .35em .15em;
			font-style: normal;
			vertical-align: top;
		}
	}
`
