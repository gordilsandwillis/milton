import React from 'react'
import styled from '@emotion/styled'
import ThemeSelector from 'components/ThemeSelector'
import { util } from 'styles'

const SectionWrapper = styled(ThemeSelector)`
	position: relative;
	z-index: ${ ({ zIndex }) => zIndex };
	${ ({ spacing, prevTheme, nextTheme, setTheme }) => spacing !== 'noPadding' && `
		${ spacing === 'paddedTop' || spacing === 'padded' ? `
			${ setTheme === prevTheme ? `
				${ util.responsiveStyles('padding-top', 91, 51, 33, 26) }
			` : `
				${ util.responsiveStyles('padding-top', 182, 102, 66, 52) }
			` }
		` : `` }
		${ spacing === 'paddedBottom' || spacing === 'padded' ? `
			${ setTheme === nextTheme ? `
				${ util.responsiveStyles('padding-bottom', 91, 51, 33, 26) }
			` : `
				${ util.responsiveStyles('padding-bottom', 182, 102, 66, 52) }
			` }
		` : `` }
	` }
`

const Section = ({
	children,
	setTheme,
	prevTheme,
	nextTheme,
	zIndex,
	buttons,
	sectionid,
	spacing
}) => {

	return (
		<SectionWrapper
			setTheme={setTheme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			zIndex={zIndex}
			spacing={spacing}
		>
			{children}
		</SectionWrapper>
	)
}

Section.defaultProps = {
	setTheme: 'bgColor',
	prevTheme: false,
	nextTheme: false,
	zIndex: 1,
	spacing: 'padded'
}

export default Section
