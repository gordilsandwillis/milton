import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'

import ShopifyProvider from 'contexts/ShopifyContext'
import ModalProvider from 'contexts/ModalContext'
import HeaderProvider from 'contexts/HeaderContext'
import CheckoutProvider from 'contexts/CheckoutContext'

import PageContent from 'components/PageContent'
import ScrollListener from 'components/ScrollListener'

import globalStyles from 'styles/globalStyles'

import 'intersection-observer'
import './reset.css'

const PageWrapper = styled.div`
	min-height: 100%;
	display: flex;
	flex-direction: column;
`

const Routes = ({ match, location }) => {
	return (
		<ScrollListener>
			<CheckoutProvider>
				<HeaderProvider>
					<ParallaxProvider>
						<ShopifyProvider>
							<ModalProvider>
								<Fragment>
									<Global
										styles={css`${ globalStyles }`}
									/>
									<PageWrapper>
										<Router>
											<PageContent/>
										</Router>
									</PageWrapper>
								</Fragment>
							</ModalProvider>
						</ShopifyProvider>
					</ParallaxProvider>
				</HeaderProvider>
			</CheckoutProvider>
		</ScrollListener>
	)
}

export default Routes;