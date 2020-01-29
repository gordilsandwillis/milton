import React from 'react'
import styled from '@emotion/styled'
import ThemeSelector from 'src/components/ThemeSelector'
import Button from 'src/components/Button'
import ConditionalRender from 'src/components/ConditionalRender'
import { util } from 'src/styles'

const SectionWrapper = styled(ThemeSelector)`
	position: relative;
	z-index: ${ ({ zIndex }) => zIndex };
	${ ({ padded, prevTheme, nextTheme, setTheme }) => padded !== false && `
		${ setTheme === prevTheme ? `
			${ util.responsiveStyles('padding-top', 135, 85, 70, 50) }
		` : `
			${ util.responsiveStyles('padding-top', 270, 170, 140, 100) }
		` }
		${ setTheme === nextTheme ? `
			${ util.responsiveStyles('padding-bottom', 135, 85, 70, 50) }
		` : `
			${ util.responsiveStyles('padding-bottom', 270, 170, 140, 100) }
		` }
	` }
`

const Section = ({ children, setTheme, prevTheme, nextTheme, zIndex, buttons, sectionid }) => {

	let buttonColors = {
		textColor: 'bgColor',
		black: 'bgColor',
		mainColor: 'bgColor',
		bgColor: 'default'
	}

	return (
		<SectionWrapper
			setTheme={setTheme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			zIndex={zIndex}
		>
			{children}
		</SectionWrapper>
	)
}

Section.defaultProps = {
	setTheme: 'bgColor',
	prevTheme: false,
	nextTheme: false,
	zIndex: 1
}

export default Section
