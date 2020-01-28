import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import { rgba } from 'polished'
import Link from 'src/components/Link'
import Logo from 'src/components/Logo'
// import Button from 'src/components/Button'
import Grid from 'src/components/Grid'
import ResponsiveComponent from 'src/components/ResponsiveComponent'
// import ConditionalRender from 'src/components/ConditionalRender'
import MaterialIcon from 'src/components/MaterialIcon'
import { colors, typography, animations, mq, util } from 'src/styles'

// const Logo = styled.div``

const NavLinkStyle = (scrolled, active) => `
	display: block;
	position: relative;
	${ typography.h6 }
	${ util.responsiveStyles('margin-right', 60, 40, 32, 20) }
	padding: 10px 0;
	&:after {
		position: absolute;
		content: '';
		display: block;
		height: 2px;
		background: ${ colors.yellow };
		left: 0;
		right: 0;
		bottom: 5px;
		transform: translate3d(0, 8px, 0);
		opacity: 0;
		transition: opacity ${ animations.mediumSpeed } ease-in-out, transform ${ animations.mediumSpeed } ease-in-out, background ${ animations.mediumSpeed } ease-in-out;
	}
	&:hover {
		&:after {
			transform: none;
			opacity: 1;
		}
	}
	${ active && `
		&:hover {
			&:after {
				background: ${ colors.yellow };
			}
		}
		&:after {
			transform: none;
			opacity: 1;
		}
	` }
`

const NavLink = styled(Link)`
	${ props => NavLinkStyle(props.scrolled, props.active) }
`

const NavTrigger = styled.a`
	${ props => NavLinkStyle(props.scrolled, props.active) }
`

const Wrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 4;
	transition: background ${ animations.mediumSpeed } ease-in-out;
	svg {
		* {
			fill: currentcolor;
		}
	}
	${ ({ scrolled, hasAtf }) => scrolled ? `
		background: ${ colors.white };
		color: ${ colors.textColor };
	` : `
		background: transparent;
		${ !hasAtf ? `
			color: ${ colors.textColor };
		` : `
			color: ${ colors.bgColor };
		` }
	` }
`

const HeaderContainer = styled.div`
	position: relative;
	z-index: 2;
	transition: padding ${ animations.mediumSpeed } ease-in-out, box-shadow ${ animations.mediumSpeed } ease-in-out;
	${ ({ scrolled }) => scrolled ? `
		padding-top: 18px;
		padding-bottom: 14px;
		${ util.responsiveStyles('padding-top', 25, 18, 18, 15) }
		${ util.responsiveStyles('padding-bottom', 25, 18, 18, 15) }
		box-shadow: 0 -10px 40px ${ rgba(colors.textColor, 0.15) }
	` : `
		${ util.responsiveStyles('padding-top', 50, 40, 30, 10) }
		${ util.responsiveStyles('padding-bottom', 50, 40, 30, 10) }
	` };
`

const HeaderContent = styled(Grid)`
`

const LogoCol = styled.div`
	text-align: center;
	a {
		display: inline-block;
		vertical-align: top;
	}
	svg {
		${ util.responsiveStyles('width', 180, 190, 170, 160) }
		height: auto;
		display: inline-block;
		vertical-align: top;
		transition: color ${ animations.mediumSpeed } ease-in-out, width ${ animations.mediumSpeed } ease-in-out;
		${ ({ scrolled, hasAtf }) => scrolled ? `
			color: ${ colors.textColor };
			${ util.responsiveStyles('width', 180, 190, 170, 160) }
		` : `
			${ !hasAtf ? `
				color: ${ colors.textColor };
			` : `
				color: ${ colors.bgColor };
			` }
		` }
	}
`

const NavLinks = styled.div`
	align-items: center;
	display: flex;
	width: 100%;
	justify-content: ${ ({ alignment }) => alignment === 'right' ? 'flex-end' : 'flex-start' };
	a:last-of-type {
		margin-right: 0;
	}
	button {
		${ util.responsiveStyles('margin-left', 60, 40, 32, 20) }
		${ mq.mediumAndBelow } {
			display: none;
			border: 2px solid red;
		}
	}
	${ ({ mediumHide }) => mediumHide && `
		${ mq.mediumAndBelow } {
			display: none;
		}
	` }
	${ ({ smallHide }) => smallHide && `
		${ mq.mediumAndBelow } {
			display: none;
			border: 2px solid red;
		}
	` }
`

const MenuIcon = styled.div`
	display: none;
	padding: 5px 10px;
	margin-left: -10px;
	cursor: pointer;
	span {
		display: block;
	}
	${ mq.mediumAndBelow } {
		display: inline-block;
	}
`

const HeaderPlaceholder = styled.div`
	background: transparent;
	width: 100%;
	${ util.responsiveStyles('height', 140, 95, 80, 80) }
`

class Header extends Component {
	state = {
		scrolled: false,
		navList: false,
		drawerOpen: false
	}

	componentDidMount () {
		this.handleScroll()
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount () {
		window.removeEventListener('scroll', this.handleScroll)
	}

	toggleDrawer = id => {
		this.setState({ navList: id, drawerOpen: id })
	}

	closeDrawer = () => {
		this.setState({ drawerOpen: false })
		setTimeout(() => {
			this.toggleDrawer(false)
		}, 600) // timeout needs to match the navigation drawer exit speed
	}

	handleScroll = event => {
		let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
		if (scrollTop > 10) {
			if (!this.state.scrolled) {
				this.setState({ scrolled: true })
			}
		} else {
			if (this.state.scrolled) {
				this.setState({ scrolled: false })
			}
		}
	}

	render () {
		const {
			location,
			hasAtf,
			headerNavigation,
			headerDrawerBottomLinks,
			headerLinks,
			headerButtons
		} = this.props
		const { scrolled, navList, drawerOpen } = this.state

		let pathname = '/'
		if (location) {
			pathname = location.pathname
		}

		return (
			<Fragment>
				<Wrapper scrolled={scrolled} hasAtf={hasAtf}>
					<HeaderContainer scrolled={scrolled} hasAtf={hasAtf}>
						<HeaderContent
							small="1 [5] [2] [5] 1"
							medium="1 [5] [2] [5] 1"
							large="1 [9] [8] [9] 1"
							vAlign="center"
						>
							<div>
								<MenuIcon onClick={() => this.toggleDrawer(headerNavigation[0].id)}>
									<MaterialIcon size="36px">menu</MaterialIcon>
								</MenuIcon>
								<NavLinks mediumHide>
									{headerNavigation && headerNavigation.map(({ id, displayTitle }, index) => (
										<NavTrigger key={index + '_' + id + 'header'} scrolled={scrolled} hasAtf={hasAtf} onClick={() => this.toggleDrawer(id)}>{displayTitle}</NavTrigger>
									))}
								</NavLinks>
							</div>
							<LogoCol scrolled={scrolled} hasAtf={hasAtf}>
								<Link to="/" style="none">
									<Logo />
								</Link>
							</LogoCol>
							<div>
								<NavLinks alignment="right">
									{headerLinks && headerLinks.map(({ to, label, id }, index) => (
										<NavLink key={index + '_' + id + 'nested-header'} scrolled={scrolled} hasAtf={hasAtf} to={to} active={pathname === to}>{label}</NavLink>
									))}
									{/*}
									{headerButtons && headerButtons.map(({ to, label, id, theme, alternateLabelSmall, alternateLabelMedium }, index) => (
										<Button key={id + index} size="small" setTheme={theme}>
											<ResponsiveComponent
												small={alternateLabelSmall || label}
												medium={alternateLabelMedium || label}
												large={label}
											/>
										</Button>
									))}
									*/}
								</NavLinks>
							</div>
						</HeaderContent>
					</HeaderContainer>
				</Wrapper>

				{/*<ConditionalRender condition={!hasAtf}>
					<HeaderPlaceholder />
				</ConditionalRender>*/}

			</Fragment>
		)
	}
}

Header.defaultProps = {
	hasAtf: true
}

export default Header
