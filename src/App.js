import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import globalStyles from 'src/styles/globalStyles'
import PageContent from 'src/components/PageContent'
import ScrollListener from 'src/components/ScrollListener'
import ShopifyProvider from 'src/contexts/ShopifyContext'
import ModalProvider from 'src/contexts/ModalContext'
import HeaderProvider from 'src/contexts/HeaderContext'
import { ParallaxProvider } from 'react-scroll-parallax'
import './reset.css'

const PageWrapper = styled.div`
	min-height: 100%;
	display: flex;
	flex-direction: column;
`

const Routes = ({ match, location }) => {
	return (
		<ScrollListener>
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
		</ScrollListener>
	)
}

export default Routes;