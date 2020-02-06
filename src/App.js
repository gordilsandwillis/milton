import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import globalStyles from 'src/styles/globalStyles'
import PageContent from 'src/components/PageContent'
import ShopifyProvider from 'src/contexts/ShopifyContext'

import './reset.css'

const PageWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

const Routes = ({ match, location }) => {
  return (
    <ShopifyProvider>
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
    </ShopifyProvider>
  )
}

export default Routes;