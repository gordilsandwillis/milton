import { lighten, darken, rgba } from 'polished'

export const black = '#000'
export const white = '#fff'

// Site Specific Colors
export const yellow = '#EBCF55'
export const red = '#E15D54'
export const green = '#646C43'
export const offWhite = '#F4F3EE'
export const starryNight = '#100B08'

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

// Color Variations
export const mainColorDarken = darken(0.07, mainColor)
export const mainColorLighten = lighten(0.07, mainColor)
