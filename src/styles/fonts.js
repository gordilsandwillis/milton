import MaterialIconsWoff from '../assets/fonts/icons/material-icons-regular.woff'
import MaterialIconsWoff2 from '../assets/fonts/icons/material-icons-regular.woff2'

import TradeGothicWoff from '../assets/fonts/trade-gothic/trade-gothic-bold-extended.woff'
import TradeGothicWoff2 from '../assets/fonts/trade-gothic/trade-gothic-bold-extended.woff2'

import PortraitWoff from '../assets/fonts/portrait/portrait-text-web-regular.woff'
import PortraitWoff2 from '../assets/fonts/portrait/portrait-text-web-regular.woff2'

import PortraitBoldWoff from '../assets/fonts/portrait/portrait-web-bold.woff'
import PortraitBoldWoff2 from '../assets/fonts/portrait/portrait-web-bold.woff2'

import PortraitItalicWoff from '../assets/fonts/portrait/portrait-text-web-regular-italic.woff'
import PortraitItalicWoff2 from '../assets/fonts/portrait/portrait-text-web-regular-italic.woff2'

import PortraitBoldItalicWoff from '../assets/fonts/portrait/portrait-bold-italic.woff'
import PortraitBoldItalicWoff2 from '../assets/fonts/portrait/portrait-bold-italic.woff2'

export const fontFace = (fontName, woff, woff2, fontWeight = 'normal', fontStyle = 'normal') => `
	@font-face {
		font-family: '${ fontName }';
		src:  url('${ woff }') format('woff'),
					url('${ woff2 }') format('woff2');
		font-weight: ${ fontWeight };
		font-style: ${ fontStyle };
	}
`
export const MaterialIcons = 'Material Icons'
export const MaterialIconsFont = fontFace(MaterialIcons, MaterialIconsWoff, MaterialIconsWoff2)

export const TradeGothic = 'Trade Gothic'
export const TradeGothicFont = fontFace(TradeGothic, TradeGothicWoff, TradeGothicWoff2)

export const Portrait = 'Portrait'
export const PortraitFont = fontFace(Portrait, PortraitWoff, PortraitWoff2)

export const PortraitItalic = 'Portrait'
export const PortraitItalicFont = fontFace(PortraitItalic, PortraitItalicWoff, PortraitItalicWoff2, 'normal', 'italic')

export const PortraitBold = 'Portrait'
export const PortraitBoldFont = fontFace(PortraitBold, PortraitBoldWoff, PortraitBoldWoff2, 'bold')

export const PortraitBoldItalic = 'Portrait'
export const PortraitBoldItalicFont = fontFace(PortraitBoldItalic, PortraitBoldItalicWoff, PortraitBoldItalicWoff2, 'bold', 'italic')
