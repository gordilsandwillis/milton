import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'styles'

const ThemeWrapper = styled.div`
	transition: background-color 1s ease-in-out, color 1s ease-in-out;
	${ ({ 'data-theme': setTheme }) => setTheme && `
		background-color: ${ colors[setTheme] };
	` }
	${ ({ 'data-theme': setTheme }) =>
		setTheme === 'midnight' ||
		setTheme === 'copper' ||
		setTheme === 'froly' ||
		setTheme === 'umber' ||
		setTheme === 'chambray' ||
		setTheme === 'umber' ||
		setTheme === 'mahogany' ||
		setTheme === 'starryNight' ||
		setTheme === 'mainColor' ||
		setTheme === 'black' ||
		setTheme === 'red' ||
		setTheme === 'green' ||
		setTheme === 'amulet' ||
		setTheme === 'orange' ||
		setTheme === 'alert' ? `
		color: ${ colors.bgColor };
		h1, h2, h3, h4, h5, h6 {
			color: ${ colors.bgColor };
		}
		p {
			a {
				&:hover {
					color: ${ colors.white };
				}
			}
		}
	` : `` }
`

const ThemeSelector = ({ className, setTheme, ...rest }) => (
	<ThemeWrapper
		data-theme={setTheme}
		className={className}
		{...rest}
	/>
)

export default ThemeSelector
