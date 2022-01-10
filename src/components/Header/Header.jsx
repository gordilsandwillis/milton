import React, { useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import { rgba } from 'polished'
import styled from '@emotion/styled'
import Link from 'src/components/Link'
import Logo from 'src/components/Logo'
import Grid from 'src/components/Grid'
import Button from 'src/components/Button'
import ResponsiveComponent from 'src/components/ResponsiveComponent'
import ScrollListener from 'src/components/ScrollListener'
import Cart from 'src/components/Cart'
import Drawer from 'src/components/Drawer'

import { colors, animations, mq, util } from 'src/styles'

import { withHeaderContext } from 'src/contexts/HeaderContext'
import { withCheckoutContext } from 'src/contexts/CheckoutContext'

const NavLinkStyle = (scrolled, active) => `
	display: block;
	position: relative;
	${ util.responsiveStyles('margin-right', 40, 32, 20, 12) }
	${ active && `
		&:after {
			transform: none;
		}
	` }
`

const NavLink = styled(Link)`
	${ props => NavLinkStyle(props.scrolled, props.active) }
`


const Wrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 4;
	transition: background ${ animations.mediumSpeed } ease-in-out, box-shadow ${ animations.mediumSpeed } ease-in-out;
	svg {
		* {
			fill: currentcolor;
		}
	}
	${ ({ scrolled, hasAtf }) => scrolled ? `
		background: ${ colors.white };
		color: ${ colors.textColor };
		box-shadow: 0 2px 0px ${ rgba(colors.textColor, .03) };
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
		padding: 20px 0;
		${ mq.extraLargeAndBelow } {
			padding: 20px 0;
		}
		${ mq.largerAndBelow } {
			padding: 18px 0;
		}
		${ mq.mediumAndBelow } {
			padding: 18px 0;
		}
	` : `
		padding: 50px 0;
		${ mq.extraLargeAndBelow } {
			padding: 40px 0;
		}
		${ mq.largerAndBelow } {
			padding: 30px 0;
		}
		${ mq.mediumAndBelow } {
			padding: 30px 0;
		}
	` };
`

const HeaderContent = styled(Grid)`
`

const LogoCol = styled.div`
	text-align: center;
	${ mq.mediumAndBelow } {
		text-align: left;
	}

	a {
		display: inline-block;
		vertical-align: top;
		max-width: 100%;
	}
	svg {
		height: auto;
		vertical-align: top;
		display: inline-block;
		${ ({ homepage }) => homepage ? `opacity: 0; pointer-events: none;` : `` }
		transition: color ${ animations.mediumSpeed } ease-in-out, max-width ${ animations.mediumSpeed } ease-in-out;
		${ ({ scrolled, hasAtf, homepage }) => scrolled ? `
			color: ${ colors.textColor };
			max-width: 160px;
			${ mq.extraLargeAndBelow } {
				max-width: 140px;
			}
			${ mq.largerAndBelow } {
				max-width: 120px;
			}
			${ mq.mediumAndBelow } {
				max-width: 100px;
			}
		` : `
			max-width: 230px;
			${ mq.extraLargeAndBelow } {
				max-width: 190px;
			}
			${ mq.largerAndBelow } {
				max-width: 150px;
			}
			${ mq.mediumAndBelow } {
				max-width: 130px;
			}

			${ !hasAtf ? `
				color: ${ colors.textColor };
			` : `
				color: ${ colors.bgColor };
			` }
		` }
	}
`

const Menu = () => (
	<svg width="24px" height="14px" viewBox="0 0 24 14">
	    <rect fill="#100B08" x="0" y="0" width="24" height="3"></rect>
	    <rect fill="#100B08" x="0" y="10" width="24" height="3"></rect>
	</svg>
)

const NavLinks = styled.div`
	align-items: center;
	display: flex;
	width: 100%;
	justify-content: ${ ({ alignment }) => alignment === 'right' ? 'flex-end' : 'flex-start' };
	&:last-child {
		margin-right: 0;
	}
	button {
		${ util.responsiveStyles('margin-left', 40, 32, 6, 0) }
	}
	${ ({ mediumHide }) => mediumHide && `
		${ mq.mediumAndBelow } {
			display: none;
		}
	` }
	${ ({ smallHide }) => smallHide && `
		${ mq.mediumAndBelow } {
			display: none;
		}
	` }
`

const DrawerNavLinks = styled(NavLinks)`
	flex-direction: column;
	height: 100%;
  justify-content: center;
	${util.responsiveStyles('padding-bottom', 60, 50, 46, 24)}

  a {
		${ util.responsiveStyles('margin-bottom', 40, 32, 20, 12) }
  }
`

const HeaderPlaceholder = styled.div`
	background: transparent;
	width: 100%;
	${ util.responsiveStyles('height', 140, 95, 80, 80) }
`

const CartButton = styled(Button)`
	width: auto;
	white-space: nowrap;
	height: 25px;
`

const MenuButton = styled(Button)`
	width: auto;
	white-space: nowrap;
	height: 25px;
`

const Header = ({
	location,
	hasAtf,
	placeholder,
	homepage,
	headerContext,
	checkoutContext
}) => {

	let pathname = '/'
	if (location) {
		pathname = location.pathname
	}

	const [drawerOpen, toggleDrawer] = useState(false)

	const { cartOpen, toggleCart, getLineItems } = checkoutContext

	const lineItems = getLineItems()

	return (
		<Fragment>
			<ScrollListener.Consumer>
	      {({ scrolledToTop }) => {
	      	let scrolled = !scrolledToTop
	      	if (homepage) {
	      		scrolled = headerContext.collapsed
	      	}
	      	return (
						<Wrapper scrolled={scrolled} hasAtf={hasAtf}>
							<HeaderContainer scrolled={scrolled} hasAtf={hasAtf}>
								<HeaderContent
									small="1 [6] [6] 1"
									medium="10 [8] [9] 1"
									large="1 [9] [8] [9] 1"
									vAlign="center"
								>

									<ResponsiveComponent
										medium={<span />}
										large={
											<div>
												<NavLinks mediumHide={true}>
													<NavLink
														type="capsLink"
														scrolled={scrolled}
														hasAtf={hasAtf}
														to="/collections"
														active={pathname === '/collections'}
													>
														Collections
													</NavLink>
													<NavLink
														type="capsLink"
														scrolled={scrolled}
														hasAtf={hasAtf}
														to="/textiles"
														active={pathname === '/textiles'}
													>
														Textiles
													</NavLink>
													<NavLink
														type="capsLink"
														scrolled={scrolled}
														hasAtf={hasAtf}
														to="/shop"
														active={pathname === '/shop'}
													>
														Shop
													</NavLink>
												</NavLinks>
											</div>
										}
									/>

									<LogoCol scrolled={scrolled} hasAtf={hasAtf} homepage={homepage}>
										<Link to="/">
											<Logo />
										</Link>
									</LogoCol>
									<div>
											<ResponsiveComponent
												medium={
													<NavLinks type="capsLink" alignment="right">
														{pathname !== '/' && (
															<CartButton
																onClick={() => toggleCart(!cartOpen)}
																title="Toggle Cart"
																size="small"
																shape="square"
																setTheme={hasAtf && !scrolled ? "transparent" : "transparentWhite"}
															>
																Cart
																{' '}
																{lineItems && lineItems.length > 0 && `(${lineItems.length})`}
															</CartButton>
														)}
														<MenuButton
															shape="square"
															setTheme={hasAtf && !scrolled ? "transparent" : "transparentWhite"}
															onClick={() => toggleDrawer(!drawerOpen)}
														>
															<Menu />
														</MenuButton>
													</NavLinks>
												}
												large={
													<NavLinks alignment="right">
														<NavLink
															type="capsLink"
															scrolled={scrolled}
															hasAtf={hasAtf}
															to="/about"
															active={pathname === '/about'}
														>
															About
														</NavLink>
														<NavLink
															type="capsLink"
															scrolled={scrolled}
															hasAtf={hasAtf}
															to="/contact"
															active={pathname === '/contact'}
														>
															Contact
														</NavLink>
														<NavLink
															type="capsLink"
															scrolled={scrolled}
															hasAtf={hasAtf}
															to="/showrooms"
															active={pathname === '/showrooms'}
														>
															Showrooms
														</NavLink>
														<NavLink
															type="capsLink"
															as="button"
															scrolled={scrolled}
															hasAtf={hasAtf}
															onClick={() => toggleCart(!cartOpen)}
															title="Toggle Cart"
															size="small"
															setTheme="transparent"
														>
															Cart
															{' '}
															{lineItems && lineItems.length > 0 && `(${lineItems.length})`}
														</NavLink>
													</NavLinks>
												}
											/>
									</div>
								</HeaderContent>
							</HeaderContainer>
						</Wrapper>
					)
				}}
    	</ScrollListener.Consumer>

			{!hasAtf && placeholder && <HeaderPlaceholder />}

			<Cart cartOpen={cartOpen} toggleCart={toggleCart} />
			<Drawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}>
				<DrawerNavLinks alignment="center">
						<NavLink
							type="capsLink"

							hasAtf={hasAtf}
							to="/collections"
							active={pathname === '/collections'}
						>
							Collections
						</NavLink>
						<NavLink
							type="capsLink"

							hasAtf={hasAtf}
							to="/textiles"
							active={pathname === '/textiles'}
						>
							Textiles
						</NavLink>
						<NavLink
							type="capsLink"

							hasAtf={hasAtf}
							to="/shop"
							active={pathname === '/shop'}
						>
							Shop
						</NavLink>
						<NavLink
							type="capsLink"
							hasAtf={hasAtf}
							to="/about"
							active={pathname === '/about'}
						>
							About
						</NavLink>
						<NavLink
							type="capsLink"

							hasAtf={hasAtf}
							to="/contact"
							active={pathname === '/contact'}
						>
							Contact
						</NavLink>
						<NavLink
							type="capsLink"

							hasAtf={hasAtf}
							to="/showrooms"
							active={pathname === '/showrooms'}
						>
							Showrooms
						</NavLink>
						<NavLink
							type="capsLink"
							as="button"

							hasAtf={hasAtf}
							onClick={() => {
								toggleDrawer(!drawerOpen)
								toggleCart(!cartOpen)
							}}
							title="Toggle Cart"
							size="small"
							setTheme="transparent"
						>
							Cart
							{' '}
							{lineItems && lineItems.length > 0 && `(${lineItems.length})`}
						</NavLink>
					</DrawerNavLinks>
			</Drawer>
		</Fragment>
	)
}


Header.defaultProps = {
	hasAtf: false,
	placeholder: true
}

export default withCheckoutContext(withHeaderContext(withRouter(Header)))
