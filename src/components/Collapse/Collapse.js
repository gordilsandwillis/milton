import React from 'react'
import styled from '@emotion/styled'
import { colors, animations } from 'src/styles'
import { MdAdd } from 'react-icons/md'
import Button from 'src/components/Button'

const verticalPadding = 20

const InnerWrapper = styled.div`
  ${ ({ index }) => !index && `border-top: 1px solid ${ colors.hrColor };` }
  border-bottom: 1px solid ${ colors.hrColor };
  width: 100%;
  text-align: left;
`

const CollapseHeader = styled(Button)`
	padding: 0 !important;
	background: transparent;
	color: inherit;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	min-width: 0;
	width: 100%;
	text-align: left;
	&:hover {
		
	}
`

const Title = styled.div`
	flex-grow: 1;
`

const IconWrap = styled.div`
	flex-grow: 0;
	flex-shrink: 0;
	flex-shrink: 0;
	flex-grow: 0;
`

const DetailsContainer = styled.div`
  &.open {
    height: ${ ({ scrollHeight }) => scrollHeight }px;
  }
  overflow: hidden;
  height: 0px;
  transition: height ${ animations.mediumSpeed } ease-in-out;
`

const DetailsContent = styled.div`
  max-width: 800px;
	text-align: left;
  padding-bottom: ${ verticalPadding + 'px' };
`

const Icon = styled(MdAdd)`
  transform: rotate(${ ({ open }) => (open ? '45deg' : '0deg') });
  transition: transform ${ animations.mediumSpeed } ease-in-out;  
`

class Collapse extends React.Component {
	constructor (props) {
		super(props)
		this.state = { open: false }
		this.ItemContent = React.createRef()
	}

	componentDidMount () {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', this.updateDetailsHeight)
		}
	}

	componentWillUnmount () {
		window.removeEventListener('scroll', this.updateDetailsHeight)
	}

  toggleOpen = () => {
		if (typeof window !== 'undefined') {
			this.updateDetailsHeight()
			this.setState((prevState) => ({ open: !prevState.open }))
		}
  }

  updateDetailsHeight = () => {
		const { scrollHeight } = this.ItemContent.current
		this.setState({ scrollHeight })
  }

  render () {
		const { children, title, index } = this.props
		const { open, scrollHeight } = this.state
		return (
			<InnerWrapper index={index}>
				<CollapseHeader onClick={this.toggleOpen}>
					<Title>{title}</Title>
					<IconWrap>
						<Icon open={open} size={24} />
					</IconWrap>
				</CollapseHeader>
				<DetailsContainer ref={this.ItemContent} className={open ? 'open' : ''} open={open} scrollHeight={scrollHeight}>
					<DetailsContent>
						{children}
					</DetailsContent>
				</DetailsContainer>
			</InnerWrapper>
		)
	}
}

Collapse.defaultProps = {
	index: null
}

export default Collapse;