import { lighten, darken, rgba } from 'polished'

export const black = '#000'
export const white = '#fff'

// Site Specific Colors
export const yellow = '#EBCF55'
export const red = '#E15D54'
export const green = '#646C43'
export const offWhite = '#F4F3EE'
export const starryNight = '#100B08'
export const grey = '#C7C7BA'

// Reni Colors
export const reniColors = {
	tan: '#E4DBBE',
	lavender: '#9FA1AD',
	copper: '#BF7832',
	sea:'#B7C8C5',
	froly: '#F48472',
	midnight: '#4A434A',
	rose: '#C5A7A1'
}


export const { tan, sea, lavender, rose, midnight, copper, froly}  = reniColors

// Matisse Colors
export const matisseColors = {
	umber: '#504232',
	chambray: '#3B4E85',
	pink: '#D98C87',
	amulet: '#8CAB7D',
	rasberry: '#CE3D44',
	ochre: '#DCBD0E',
	sand: '#C7C7BB'
}

export const { umber, chambray, pink, amulet, rasberry, ochre, sand } = matisseColors

// Basic Colors
export const transparent = 'transparent'
export const currentcolor = 'currentcolor'
export const bgColor = offWhite
export const mainColor = starryNight
export const alert = red
export const notify = yellow
export const success = green
export const textColor = starryNight
export const lightTextColor = rgba(textColor, 0.5)
export const lightGrey = '#E9E7DE'
export const hrColor = rgba(textColor, 0.1)
export const modalOverlay = rgba(offWhite, 0.6)
// Color Variations
export const mainColorDarken = darken(0.07, mainColor)
export const mainColorLighten = lighten(0.07, mainColor)
