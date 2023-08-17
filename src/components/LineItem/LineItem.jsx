/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react'
import styled from '@emotion/styled'
import { MdAdd, MdRemove } from 'react-icons/md'
import Button from 'components/Button'
import TextLink from 'components/TextLink'
import { toPrice } from 'utils/format'
import { typography, colors, util } from 'styles'

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 14px 0;
`

const RemoveLink = styled(TextLink)`
	color: ${colors.lightTextColor};
	padding-top: 0.1em;
	margin-left: 1.5em;
	&:hover {
		color: ${colors.alert};
	}
`

const ImageCol = styled.div`
	flex-grow: 0;
	flex-shrink: 0;
	${util.responsiveStyles('width', 160, 130, 100, 85)}
	${util.responsiveStyles('width', 160, 130, 100, 85)}
	${util.responsiveStyles('margin-right', 22, 18, 14, 14)}
`

const InfoCol = styled.div`
	flex-grow: 1;
	display: flex;
	align-items: baseline;
`

const InfoWrapper = styled.div`
	flex-grow: 1;

`

const Title = styled.div`
	display: flex;
  flex-direction: row;
  justify-content: space-between;
	h6 {
		margin-top: 0;
		margin-bottom: 0.75em;
		max-width: 25em;
		${typography.smallCaps}
	}
`

const Price = styled.span`
	${typography.smallCaps}
	color: ${colors.lightTextColor}
`

const QtyInput = styled.div`
	display: flex;
	align-items: center;
	> div {
		width: 2.25em;
		${typography.smallCaps}
		padding-top: 0.2em;
		text-align: center;
	}
`

const ItemActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-top: 6px;
	margin-top: -1em;
`

const SubTitle = styled.h6`
	margin-bottom: 0;
	color: ${colors.lightTextColor}

`

const LineItem = ({
	item, loading, updateQuantity, removeLineItem
}) => {
	const {
		title,
		quantity,
		id,
		variant: {
			id: variantId,
			image,
			priceV2,
			price,
			title: variantTitle
		},
	} = item

	const USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	})

	const { currencyCode } = priceV2
	const priceString = currencyCode && currencyCode === 'USD' ? `${USDollar.format(price?.amount)}` : `${price?.amount} ${currencyCode}`

	return (
		<Wrapper>
			<ImageCol>{image?.src && <img src={image?.src} width="100%" alt={title} />}</ImageCol>
			<InfoCol>
				<InfoWrapper>
					<Title>
						<div>
						<h6>{title}</h6>
						<SubTitle>{variantTitle}</SubTitle>
						</div>
						<Price>{priceString}</Price>
					</Title>
					<ItemActions>
						<QtyInput>
							<Button
								shape="circle"
								size="tiny"
								setTheme="white"
								disabled={loading}
								onClick={() => updateQuantity({ id, quantity: quantity - 1 })}
								icon="remove"
							/>
							<div>{quantity}</div>
							<Button
								shape="circle"
								size="tiny"
								setTheme="white"
								disabled={loading}
								onClick={() => updateQuantity({ id, quantity: quantity + 1 })}
								icon="add"
							/>
						</QtyInput>
						<RemoveLink
							onClick={() => removeLineItem({ id })}
							textStyle="tinyCaps"
						>
							Remove
						</RemoveLink>
					</ItemActions>
				</InfoWrapper>

			</InfoCol>
		</Wrapper>
	)
}

export default LineItem
