import React, { Component } from 'react'

import _ from 'lodash'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import gridSettings, { margin, gutter } from 'src/styles/gridSettings'
import { mq, colors, globals } from 'src/styles'

import withSizes from 'react-sizes'

// Calculate how many columns the grid has
const numberOfCols = gridSettings => {
	let total = gridSettings.match(/\d+/g).reduce((prev, num) => {
		return prev + +num
	}, 0)

	return (total)
}

// is it wrapped with brackets?
const isColumnDef = d => (
	// /\[[\s]*[\d]+[\s]*\]/g.test(d)
	// Add "m" and "g" characters to test
	/\[[\s]*[\dmg/,/]+[\s]*\]/g.test(d)
)

// get the integer value the def
const parseSize = d => {
	const match = /([\d]+)/g.exec(d)
	const val = _.get(match, 1)
	return val ? parseInt(val, 10) : null
}

// parse a single grid item definition (eg. '1', '[3], etc.)
const parseGridItemDef = d => {
	let size = parseSize(d)
	let isVariableColumn = false
	if (d === '[m]' || d === 'm') {
		let size = margin,
		isVariableColumn = true
	} else if (d === '[g]' || d === 'g') {
		let size = gutter,
		isVariableColumn = true
	}
	return size !== null ? ({
		isColumn: isColumnDef(d),
		size,
		isVariableColumn
	}) : null
}

// parse an entire grid definition (eg. '1 [4] 2 [8] 1')
const parseGridDef = gridDef => {
	const defs = gridDef
		.replace(/[\s]+/g, ' ') // remove extra whitespace
		.replace(/\[[\s]+/g, '[') // remove whitespace inside opening bracket
		.replace(/[\s]+\]/g, ']') // remove whitespace inside closing bracket
		.split(' ')
	return _.map(defs, parseGridItemDef).filter(_.identity)
}

const gridGapToCss = (gap, index) => {
	if (Array.isArray(gap)) {
		return gap[index]
	} else if (gap) {
		return gap
	} else {
		return 'unset'
	}
}

// convert grid def to css attributes for the grid parent
const gridDefToCss = gridDef => {
	const gridData = parseGridDef(gridDef)

	// while iterating, track where the next item should start
	// this is a grid-column-start css value (1 is the start of the grid)
	let colStart = 1

	// while iterating, track how many items in the grid
	let colCount = 1

	const numColumns = _.filter(gridData, ({ isColumn }) => isColumn).length
	console.log(gridData)

	const columnCssDefinitions = _.map(gridData, ({ isColumn, size, isVariableColumn }) => {
		let result = null
		if (isColumn) {
			// use nth-child to define the children styles so the children
			// don't have to
			result = `
				& > :nth-of-type(${ numColumns }n + ${ colCount }) {
					grid-column: ${ colStart } / span ${ isVariableColumn ? 1 : size };
				}
			`
			colCount++
		}

		if (isVariableColumn) {
			colStart ++
		} else {
			colStart += size
		}
		return result
	}).filter(_.identity) // remove any nulls

	const gridWidth = gridData.reduce(
		(acc, { size }) => (acc + size),
		0
	)

	// repeat(${ gridWidth }, minmax(0, 1fr))
	let width = ''

	gridData.forEach((col) => {
		if(col.isVariableColumn) {
			width += col.size + ' '
		} else {
			width += 'repeat(' + col.size + ', minmax(0, 1fr)) '
		}
	})

	return `
		// grid-template-columns: repeat(${ gridWidth }, minmax(0, 1fr));
		grid-template-columns: ${ width };
		${ columnCssDefinitions.join(' ') }
	`
}

const StyledGrid = styled.div`
	display: grid;
	width: 100%;
	direction: ${ ({ gridDirection }) => gridDirection };
	${ ({ vAlign }) => vAlign && `align-items: ${ vAlign === 'bottom' ? 'end' : vAlign };` }
	> * {
		direction: ltr;
	}

	${ props => gridDefToCss(props.small) }
	${ props => ({ 'columnGap': gridGapToCss(props.colGap, 0) }) }
	${ props => ({ 'rowGap': gridGapToCss(props.rowGap, 0) }) }

	${ ({ medium, colGap, rowGap }) => medium && `
		${ mq.largeAndUp } {
			${ gridDefToCss(medium) }
			column-gap: ${ gridGapToCss(colGap, 1) };
			row-gap: ${ gridGapToCss(rowGap, 1) };
		}
	` }

	${ ({ large, colGap, rowGap }) => large && `
		${ mq.largerAndUp } {
			${ gridDefToCss(large) }
			column-gap: ${ gridGapToCss(colGap, 2) };
			row-gap: ${ gridGapToCss(rowGap, 2) };
		}
	` }

	${ ({ extraLarge, colGap, rowGap }) => extraLarge && `
		${ mq.extraExtraLargeAndUp } {
			${ gridDefToCss(extraLarge) }
			column-gap: ${ gridGapToCss(colGap, 2) };
			row-gap: ${ gridGapToCss(rowGap, 2) };
		}
	` }

	${ props => props.showOverlay && `
		position: relative;
	` }
`

const GridOverlay = styled(StyledGrid)`
	height: 10px;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 100%;
	opacity: .5;
	pointer-events: none;
	> div {
		width: 100%;
		height: 100%;
		background: ${ colors.alert };
		opacity: .6;
		&:nth-child(odd) {
			opacity: .4;
		}
	}
`

class Grid extends Component {
	render () {
		const { small, medium, large, extraLarge, colGap, rowGap, showOverlay, children, vAlign, gridDirection, winWidth, className } = this.props

		if (showOverlay) {
			const OverlayColumnsSmall = small ? _.range(numberOfCols(small)).map(() => { return '[1]' }).join(' ') : false
			const OverlayColumnsMedium = medium ? _.range(numberOfCols(medium)).map(() => { return '[1]' }).join(' ') : false
			const OverlayColumnsLarge = large ? _.range(numberOfCols(large)).map(() => { return '[1]' }).join(' ') : false
			const OverlayColumnsExtraLarge = extraLarge ? _.range(numberOfCols(extraLarge)).map(() => { return '[1]' }).join(' ') : false

			return (
				<div style={{ position: 'relative', width: '100%' }}>
					<StyledGrid
						className={className}
						small={small}
						medium={medium}
						large={large}
						extraLarge={extraLarge}
						colGap={colGap}
						rowGap={rowGap}
						vAlign={vAlign}
						gridDirection={gridDirection}
					>
						{children}
					</StyledGrid>
					<GridOverlay
						small={OverlayColumnsSmall}
						medium={OverlayColumnsMedium}
						large={OverlayColumnsLarge}
						extraLarge={OverlayColumnsExtraLarge}
						colGap={colGap}
						rowGap={rowGap}
					>
						{small && winWidth < mq.mediumBreakpoint ? _.range(numberOfCols(small)).map((item, index) => (<div key={'overlay-col-' + index}/>)) : false}
						{medium && winWidth > mq.mediumBreakpoint && winWidth < mq.largeBreakpoint ? _.range(numberOfCols(medium)).map((item, index) => (<div key={'overlay-col-' + index}/>)) : false}
						{large && winWidth > mq.largeBreakpoint && winWidth < mq.extraExtraLargeBreakpoint ? _.range(numberOfCols(large)).map((item, index) => (<div key={'overlay-col-' + index}/>)) : false}
						{extraLarge && winWidth > mq.extraExtraLargeBreakpoint ? _.range(numberOfCols(extraLarge)).map((item, index) => (<div key={'overlay-col-' + index}/>)) : false}
					</GridOverlay>
				</div>
			)
		}

		return (
			<StyledGrid
				className={className}
				small={small}
				medium={medium}
				large={large}
				extraLarge={extraLarge}
				colGap={colGap}
				rowGap={rowGap}
				vAlign={vAlign}
				gridDirection={gridDirection}
			>
				{children}
			</StyledGrid>
		)
	}
}

Grid.propTypes = {
	small: PropTypes.string.isRequired,
	medium: PropTypes.string,
	large: PropTypes.string,
	extraLarge: PropTypes.string,
	showOverlay: PropTypes.bool,
}

let gridDefaults = gridSettings
gridDefaults.gridDirection = 'ltr'

Grid.defaultProps = gridDefaults

const sizesToProps = ({ width, height }) => ({
	winWidth: width,
	winHeight: height
})

// export withSizes(sizesToProps)({
// 	parseGridItemDef,
// 	parseGridDef,
// 	gridDefToCss,
// 	StyledGrid,
// 	Grid as default
// })

export default withSizes(sizesToProps)(Grid)
