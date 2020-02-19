import MaterialIconsWoff from '../assets/fonts/icons/material-icons-regular.woff'
import MaterialIconsWoff2 from '../assets/fonts/icons/material-icons-regular.woff2'

import DomaineSansWoff from '../assets/fonts/domaine/DomaineSansText-Regular.woff'
import DomaineSansWoff2 from '../assets/fonts/domaine/DomaineSansText-Regular.woff2'

import DomaineSansMediumWoff from '../assets/fonts/domaine/DomaineSansText-Medium.woff'
import DomaineSansMediumWoff2 from '../assets/fonts/domaine/DomaineSansText-Medium.woff2'

import DomaineSansItalicWoff from '../assets/fonts/domaine/DomaineSans-Italic.woff'
import DomaineSansItalicWoff2 from '../assets/fonts/domaine/DomaineSans-Italic.woff2'

import DomaineSansBoldWoff from '../assets/fonts/domaine/DomaineSansText-Bold.woff'
import DomaineSansBoldWoff2 from '../assets/fonts/domaine/DomaineSansText-Bold.woff2'

import DomaineSansLightWoff from '../assets/fonts/domaine/DomaineSansText-Light.woff'
import DomaineSansLightWoff2 from '../assets/fonts/domaine/DomaineSansText-Light.woff2'

import DomaineDisplayNarrowRegularWoff from '../assets/fonts/domaine/DomaineDisplayNarrow-Regular.woff'
import DomaineDisplayNarrowRegularWoff2 from '../assets/fonts/domaine/DomaineDisplayNarrow-Regular.woff2'

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

export const DomaineSans = 'Domaine Sans'
export const DomaineSansFont = fontFace(DomaineSans, DomaineSansWoff, DomaineSansWoff2)
export const DomaineSansMediumFont = fontFace(DomaineSans, DomaineSansMediumWoff, DomaineSansMediumWoff2, 600)
export const DomaineSansItalicFont = fontFace(DomaineSans, DomaineSansItalicWoff, DomaineSansItalicWoff2, 'normal', 'italic')
export const DomaineSansBoldFont = fontFace(DomaineSans, DomaineSansBoldWoff, DomaineSansBoldWoff2, 700)
export const DomaineSansLightFont = fontFace(DomaineSans, DomaineSansLightWoff, DomaineSansLightWoff2, 300)

export const DomaineNarrow = 'Domaine Narrow'
export const DomaineNarrowFont = fontFace(DomaineNarrow, DomaineDisplayNarrowRegularWoff, DomaineDisplayNarrowRegularWoff2)
