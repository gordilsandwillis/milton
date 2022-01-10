/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */

import React from 'react'
import styled from '@emotion/styled'
import { IoMdClose } from 'react-icons/io'

import { colors, animations, mq, util, typography } from 'src/styles'

import Grid from 'src/components/Grid'
import Button from 'src/components/Button'
import ScrollEntrance from 'src/components/ScrollEntrance'

import LineItem from 'src/components/LineItem'

import { withCheckoutContext } from 'src/contexts/CheckoutContext'

const CartSection = styled.div`
	${({ padBottom }) => padBottom !== false
		&& `
		${util.responsiveStyles('padding-bottom', 60, 60, 40, 30)}
	`}
	${({ padTop }) => padTop
		&& `
		${util.responsiveStyles('padding-top', 60, 60, 40, 30)}
	`}
`

const ShadedWrapper = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	z-index: 11;
	display: flex;
	align-items: stretch;
	justify-content: flex-end;
	width: 100%;
	height: 100%;
	overflow-y: hidden;
	color: ${colors.textColor};
	${({ isOpen }) => (!isOpen
		? `
    pointer-events: none;
  `
		: '')}
`

const Panel = styled(Grid)`
	height: 100%;
	max-height: 100%;
	max-width: 100%;
	overflow-y: hidden;
	position: fixed;
	overflow: auto;
	transition: transform ${animations.slowSpeed} cubic-bezier(0.44, 0.24, 0.16, 1);
	${({ isOpen }) => (isOpen
		? `
    transform: none;
  `
		: `
    transform: translate3d(100%, 0, 0);
    pointer-events: none;
  `)}
`

const Overlay = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: ${colors.textColor};
	transition: opacity ${animations.slowSpeed} cubic-bezier(0.44, 0.24, 0.16, 1);
	${({ isOpen }) => (isOpen
		? `
    opacity: .3;
    ${mq.mediumAndBelow} {
      opacity: .6;
    }
  `
		: `
    opacity: 0;
  `)}
`

const FullDivExit = styled.div`
	height: 100%;
	width: 100%;
	background: transparent;
	cursor: pointer;
	${mq.mediumAndBelow} {
		display: none;
	}
`

const InnerWrapper = styled.div`
	height: 100%;
	width: 100%;
	background: ${colors.white};
`
const GridFullHeight = styled(Grid)`
	height: 100%;
`

const CloseButton = styled(Button)`
	cursor: pointer;
	${util.responsiveStyles('padding-top', 27, 17, 15, 15)}
	display: flex;
	justify-content: center;
	align-items: flex-start;
	min-width: unset;
	${util.responsiveStyles('margin-right', -17, -15, -12, -12)}
	.icon {
		margin-left: 0;
		margin: auto;
	}
`

const FooterSection = styled(CartSection)`
	align-self: flex-end;
	border-top: 1px solid ${colors.hrColor};
	padding-top: 16px;
`

const CartHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	h6 {
		margin: 0;
		padding-right: 1em;
	}
`

const CartSummary = styled.div`
	display: flex;
	align-items: space-between;
	justify-contnet: center;
	${typography.h6}
	padding: 1.5em 0 1.75em;
`

const Cart = ({ cartOpen, checkoutContext = {} }) => {
	const {
		loading,
		checkout,
		updateQuantity,
		removeLineItem,
		toggleCart,
	} = checkoutContext

	if (!checkout) {
		return null
	}

	const { lineItems } = checkout
	const checkoutUrl = checkout?.webUrl
	const ready = checkout?.ready

	console.log('component', lineItems)

	const subtotalPrice = checkout?.subtotalPrice
	const currencyCode = checkout?.subtotalPriceV2?.currencyCode
	const subtotal = currencyCode && currencyCode === 'USD' ? `$${subtotalPrice}` : `${subtotalPrice} ${currencyCode}`

	const checkoutDisabled = loading || !checkout || !checkoutUrl || !(lineItems?.length > 0)
	return (
		<ShadedWrapper isOpen={cartOpen}>
			<Overlay onClick={() => toggleCart(false)} isOpen={cartOpen} />
			<Panel
				isOpen={cartOpen}
				small="[1]"
				medium="[5] [9]"
				large="[1] [1]"
				extraLarge="[2] [1]"
				colGap="0"
				rowGap="0"
			>
				<FullDivExit onClick={() => toggleCart(false)} />
				<InnerWrapper>
					<GridFullHeight
						vAlign="top"
						small="1 [12] 1"
						medium="1 [12] 1"
						large="1 [12] 1"
					>
						{lineItems && lineItems.length > 0 ? (
							<>
								<CartSection setTheme="default" prevTheme="default" nextTheme="default" padTop>
									<CartHeader>
										<h6>Your Cart</h6>
										<CloseButton
											onClick={() => toggleCart(false)}
											shape="circle"
											size="small"
											setTheme="white"
											title="Close cart"
											icon={<IoMdClose size={26} />}
										/>
									</CartHeader>
									{lineItems
										&& lineItems.map((item) => (
											<LineItem
												key={item.id}
												loading={loading}
												updateQuantity={updateQuantity}
												removeLineItem={removeLineItem}
												item={item}
											/>
										))}
								</CartSection>
								<FooterSection setTheme="default" prevTheme="default" nextTheme="default" padTop={false}>
									<CartSummary style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
										<div>Subtotal</div>
										<div>{subtotal}</div>
									</CartSummary>
									<Button
										disabled={!!checkoutDisabled}
										to={!checkoutDisabled ? checkoutUrl : undefined}
										external={true}
										shape="block"
									>
										Checkout
									</Button>
								</FooterSection>
							</>
						) : (
							<>
								<CartSection padTop padBottom={false}>
									<CartHeader>
										<h6>{' '}</h6>
										<CloseButton
											onClick={() => toggleCart(false)}
											shape="circle"
											size="small"
											setTheme="white"
											title="Close cart"
											icon={<IoMdClose size={26} />}
										/>
									</CartHeader>
								</CartSection>
								<CartSection style={{ textAlign: 'center' }}>
									<ScrollEntrance>
										<div>
											<h3 style={{ margin: '0 0 .6em 0', color: colors.lightTextColor }}>Your cart is empty</h3>
										</div>
										<div>
											<Button onClick={() => toggleCart(false)}>Continue Exploring</Button>
										</div>
									</ScrollEntrance>
								</CartSection>
							</>
						)}
					</GridFullHeight>
				</InnerWrapper>
			</Panel>
		</ShadedWrapper>
	)
}

export default withCheckoutContext(Cart)
