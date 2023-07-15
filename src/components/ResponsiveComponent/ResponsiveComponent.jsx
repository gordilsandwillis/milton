import React, { Fragment } from 'react'
import withSizes from 'react-sizes'
import { mediaQueries } from 'styles'

const widthToRenderer = (winWidth, small, medium, large) => {
	if (large && winWidth > mediaQueries.largeBreakpoint) {
		return large
	}

	if (medium && winWidth > mediaQueries.mediumBreakpoint) {
		return medium
	}

	return small || medium || large
}

const ResponsiveComponent = ({ winWidth, small, medium, large }) => (
	<Fragment>
		{widthToRenderer(
			winWidth,
			small,
			medium,
			large
		)}
	</Fragment>
)

const sizesToProps = ({ width, height }) => ({
	winWidth: width
})

export default withSizes(sizesToProps)(ResponsiveComponent)
