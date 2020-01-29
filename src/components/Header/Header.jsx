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
	${ util.responsiveStyles('margin-right', 60, 40, 32, 20) }
	${ !scrolled && `
		&:after {
			background: currentcolor;
		}
	` }
	${ active && `
		&:after {
			transform: none;
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
	transition: padding ${ animations.mediumSpeed } ease-in-out;
	${ ({ scrolled }) => scrolled ? `
		padding-top: 18px;
		padding-bottom: 14px;
		${ util.responsiveStyles('padding-top', 30, 30, 24, 15) }
		${ util.responsiveStyles('padding-bottom', 30, 30, 24, 15) }
	` : `
		${ util.responsiveStyles('padding-top', 50, 40, 30, 15) }
		${ util.responsiveStyles('padding-bottom', 50, 40, 30, 15) }
	` };
`

const HeaderContent = styled(Grid)`
`

const LogoCol = styled.div`
	text-align: center;
	a {
		display: inline-block;
		vertical-align: top;
		max-width: 100%;
	}
	svg {
		max-width: 100%;
		height: auto;
		display: inline-block;
		vertical-align: top;
		transition: color ${ animations.mediumSpeed } ease-in-out, width ${ animations.mediumSpeed } ease-in-out;
		${ ({ scrolled, hasAtf }) => scrolled ? `
			color: ${ colors.textColor };
			width: 160px;
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
							small="1 [4] [4] [4] 1"
							medium="1 [9] [8] [9] 1"
							vAlign="center"
						>
							<div>
								<NavLinks>
									<NavLink linkStyle="capsLink" setTheme="textColor" scrolled={scrolled} hasAtf={hasAtf} to="/collections" active={pathname === '/collections'}>
										<ResponsiveComponent small="Shop" medium="Collections"/>
									</NavLink>
								</NavLinks>
							</div>
							<LogoCol scrolled={scrolled} hasAtf={hasAtf}>
								<Link to="/" style="none">
									<Logo />
								</Link>
							</LogoCol>
							<div>
									<ResponsiveComponent
										small={
											<NavLinks linkStyle="capsLink" setTheme="textColor" alignment="right">
												<NavLink scrolled={scrolled} hasAtf={hasAtf} to="/about" active={pathname === '/about'}>Info</NavLink>
											</NavLinks>
										}
										medium={
											<NavLinks alignment="right">
												<NavLink linkStyle="capsLink" setTheme="textColor" scrolled={scrolled} hasAtf={hasAtf} to="/about" active={pathname === '/about'}>About</NavLink>
												<NavLink linkStyle="capsLink" setTheme="textColor" scrolled={scrolled} hasAtf={hasAtf} to="/contact" active={pathname === '/contact'}>Contact</NavLink>
											</NavLinks>
										}
									/>
							</div>
						</HeaderContent>
					</HeaderContainer>
				</Wrapper>

				{!hasAtf && <HeaderPlaceholder />}

			</Fragment>
		)
	}
}

Header.defaultProps = {
	hasAtf: false
}

export default Header
