import * as mq from './mediaQueries'
import { rgba } from 'polished'
import * as colors from './colors'
import { responsiveStyles } from './util'

import './fonts'

// Place global Typography in this file
export const primaryFont = `Portrait, -apple-system, serif`
export const secondaryFont = `Trade Gothic, -apple-system, serif`

export const bodyLarge = `
	${ responsiveStyles('font-size', 24, 22, 20, 18) }
	line-height: 1.5em;
	font-family: ${ primaryFont };
	letter-spacing: -.01em;
	text-transform: none;
	font-weight: normal;
`
export const bodyMedium = `
	${ responsiveStyles('font-size', 20, 18, 18, 16) }
	line-height: 1.5em;
	font-family: ${ primaryFont };
	letter-spacing: -.01em;
	text-transform: none;
	font-weight: normal;
`
export const body = `
	${ responsiveStyles('font-size', 20, 16, 16, 14) }
	line-height: 1.6em;
	font-family: ${ primaryFont };
	letter-spacing: -.01em;
	text-transform: none;
	font-weight: normal;
`
export const bodySmall = `
	${ responsiveStyles('font-size', 18, 14, 14, 14) }
	line-height: 1.6em;
	font-family: ${ primaryFont };
	letter-spacing: -.01em;
	text-transform: none;
	font-weight: normal;
`

export const h1 = `
	${ responsiveStyles('font-size', 80, 70, 50, 40) }
	line-height: 1.25em;
	font-family: ${ secondaryFont };
	font-weight: normal;
	letter-spacing: .015em;
	text-transform: uppercase;
`

export const h2 = `
	${ responsiveStyles('font-size', 60, 44, 36, 30) }
	line-height: 1.25em;
	font-family: ${ secondaryFont };
	font-weight: normal;
	letter-spacing: .015em;
	text-transform: uppercase;
`

export const h3 = `
	${ responsiveStyles('font-size', 52, 36, 30, 24) }
	line-height: 1.25em;
	font-family: ${ secondaryFont };
	font-weight: normal;
	letter-spacing: .015em;
	text-transform: uppercase;
`

export const h4 = `
	${ responsiveStyles('font-size', 36, 30, 26, 20) }
	line-height: 1.25em;
	font-family: ${ secondaryFont };
	font-weight: normal;
	letter-spacing: .015em;
	text-transform: uppercase;
`

export const h5 = `
	${ responsiveStyles('font-size', 30, 24, 20, 16) }
	font-family: ${ secondaryFont };
	font-weight: normal;
	line-height: 1.25em;
	letter-spacing: .015em;
	text-transform: uppercase;
`
export const h6 = `
	${ responsiveStyles('font-size', 16, 14, 14, 13) }
	font-family: ${ secondaryFont };
	font-weight: normal;
	line-height: 1.25em;
	letter-spacing: .05em;
	text-transform: uppercase;
`

export const blockquote = `
	${ bodyLarge }
	font-style: italic;
`

export const eyebrow = `
	${ bodyMedium }
	font-style: italic;
	letter-spacing: .05em;
`

export const buttonStyle = `
	${ h6 }
	${ responsiveStyles('font-size', 14, 14, 14, 13) }
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
		}
	}
`
