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
	tan: '#E6DDC4',
	sage:  '#D3D9CE',
	sea:'#B7C7C4',
	lavender: '#9EA0AD',
	rose: '#C5A6A1',
	peach: '#FED9BC',
	midnight: '#4A434B',
	copper: '#BF7832',
	froly: '#F38373'
}

export const { tan, sage, sea, lavender, rose, peach, midnight, copper, froly}  = reniColors

// Matisse Colors
export const matisseColors = {
	umber: '#504333',
	chambray: '#3A4F85',
	pink: '#D98B87',
	amulet: '#8BAA7D',
	mahogany: '#CD3C45',
	ochre: '#DABC0F',
	orange: '#E69436',
	sand: '#C7C7BA'
}

export const { umber, chambray, pink, amulet, mahogany, ochre, orange, sand } = matisseColors


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
