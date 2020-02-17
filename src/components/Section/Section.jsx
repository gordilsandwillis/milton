import React from 'react'
import styled from '@emotion/styled'
import ThemeSelector from 'src/components/ThemeSelector'
import { util } from 'src/styles'

const SectionWrapper = styled(ThemeSelector)`
	position: relative;
	z-index: ${ ({ zIndex }) => zIndex };
	${ ({ padded, prevTheme, nextTheme, setTheme }) => padded !== false && `
		${ padded !== 'bottom' && `
			${ setTheme === prevTheme ? `
				${ util.responsiveStyles('padding-top', 90, 75, 65, 50) }
			` : `
				${ util.responsiveStyles('padding-top', 180, 150, 130, 100) }
			` }
		` }
		${ padded !== 'top' && `
			${ setTheme === nextTheme ? `
				${ util.responsiveStyles('padding-bottom', 90, 75, 65, 50) }
			` : `
				${ util.responsiveStyles('padding-bottom', 180, 150, 130, 100) }
			` }
		` }
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
	padded
}) => {

	return (
		<SectionWrapper
			setTheme={setTheme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			zIndex={zIndex}
			padded={padded}
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
