import React from 'react'
import { rgba } from 'polished'
import { Transition } from 'react-transition-group'
import styled from '@emotion/styled'
import Button from '../Button'
import MaterialIcon from '../MaterialIcon'
import { colors, util } from '../../styles'

const timeout = 500

const Panel = styled.div`
	position: fixed;
	z-index: 7;
	right: 0;
	top: 0;
	bottom: 0;
	overflow: auto;
	background: ${colors.bgColor};

	${({ sizes }) => util.responsiveStyles('width', ...sizes)}

	max-width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	transition: transform ${timeout}ms cubic-bezier(0.44, 0.24, 0.16, 1);
	${({ transitionStatus }) => (transitionStatus === 'entered'
		? `
    transform: none;
  `
		: `
  	transform: translate3d(100%, 0, 0);
  `)}
`

const Overlay = styled.div`
	position: fixed;
	z-index: 6;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: ${rgba(colors.black, 0.1)};
	transition: opacity ${timeout}ms ease-in-out;
	${({ transitionStatus }) => (transitionStatus === 'entered'
		? `
    opacity: 1;
  `
		: `
  	opacity: 0;
  `)}
`

const PanelHeader = styled.div`
	display: flex;
	${util.responsiveStyles('padding', 60, 50, 46, 24)}
	${util.responsiveStyles('padding-bottom', 50, 40, 36, 20)}
	flex-shrink: 0;
	width: 100%;
	justify-content: flex-end;
	align-items: flex-start;
	h4,
	> div {
		flex-grow: 1;
		margin: 0;
	}
	.close-button {
		flex-grow: 0;
		flex-shrink: 0;
		margin-right: -12px;
		&:hover {
			transform: rotate(180deg);
		}
	}
`

const PanelContent = styled.div`
	flex-grow: 1;
	flex-shrink: 1;
	height: 100%;
	width: 100%;
	position: relative;
	> .padded {
		${util.responsiveStyles('padding-left', 60, 50, 46, 24)}
		${util.responsiveStyles('padding-right', 60, 50, 46, 24)}
		${util.responsiveStyles('padding-bottom', 60, 50, 46, 24)}
	}
`

const Drawer = ({
	children,
	className,
	title,
	sizes,
	drawerOpen,
	toggleDrawer
}) => {
	return (
		<>
			<Transition
				in={drawerOpen}
				unmountOnExit
				appear={false}
				timeout={{
					enter: 0,
					exit: timeout,
				}}
			>
				{(status) => (
					<>
						<Panel sizes={sizes} className={className} transitionStatus={status}>
							<PanelHeader>
								<Button
									className="close-button"
									title="Close Drawer"
									icon={<MaterialIcon size="24px">close</MaterialIcon>}
									shape="circle"
									onClick={() => toggleDrawer(false)}
									size="small"
									setTheme="transparentWhite"
								/>
							</PanelHeader>
							<PanelContent>{children}</PanelContent>
						</Panel>
						<Overlay transitionStatus={status} onClick={toggleDrawer} />
					</>
				)}
			</Transition>
		</>
	)
}

Drawer.defaultProps = {
	sizes: [600, 500, 400, 400],
}

export default Drawer
