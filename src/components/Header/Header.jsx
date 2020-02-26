import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import { rgba } from 'polished'
import styled from '@emotion/styled'
import Link from 'src/components/Link'
import Logo from 'src/components/Logo'
import Grid from 'src/components/Grid'
import ResponsiveComponent from 'src/components/ResponsiveComponent'
import ScrollListener from 'src/components/ScrollListener'
import { colors, animations, mq, util } from 'src/styles'

const NavLinkStyle = (scrolled, active) => `
	display: block;
	position: relative;
	${ util.responsiveStyles('margin-right', 60, 40, 32, 20) }
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
	render () {
		const {
			location,
			hasAtf,
			placeholder,
			homepage,
			collapsed
		} = this.props

		let pathname = '/'
		if (location) {
			pathname = location.pathname
		}

		return (
			<Fragment>
				<ScrollListener.Consumer>
		      {({ scrolledToTop, scrollY }) => {
		      	let scrolled = !scrolledToTop
		      	if (homepage) {
		      		scrolled = collapsed
		      	}
		      	return (
							<Wrapper scrolled={scrolled} hasAtf={hasAtf}>
								<HeaderContainer scrolled={scrolled} hasAtf={hasAtf}>
									<HeaderContent
										small="1 [3] [6] [3] 1"
										medium="1 [9] [8] [9] 1"
										vAlign="center"
									>
										<div>
											<NavLinks>
												<NavLink type="capsLink" scrolled={scrolled} hasAtf={hasAtf} to="/collections" active={pathname === '/collections'}>
													<ResponsiveComponent small="Shop" medium="Collections"/>
												</NavLink>
											</NavLinks>
										</div>
										<LogoCol scrolled={scrolled} hasAtf={hasAtf} homepage={homepage}>
											<Link to="/">
												<Logo />
											</Link>
										</LogoCol>
										<div>
												<ResponsiveComponent
													small={
														<NavLinks type="capsLink" alignment="right">
															<NavLink type="capsLink" scrolled={scrolled} hasAtf={hasAtf} to="/about" active={pathname === '/about'}>Info</NavLink>
														</NavLinks>
													}
													medium={
														<NavLinks alignment="right">
															<NavLink type="capsLink" scrolled={scrolled} hasAtf={hasAtf} to="/about" active={pathname === '/about'}>About</NavLink>
															<NavLink type="capsLink" scrolled={scrolled} hasAtf={hasAtf} to="/contact" active={pathname === '/contact'}>Contact</NavLink>
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

			</Fragment>
		)
	}
}

Header.defaultProps = {
	hasAtf: false,
	placeholder: true
}

export default withRouter(Header)
