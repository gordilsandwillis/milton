import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import globalStyles from 'src/styles/globalStyles'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import './reset.css'

import Home from 'src/containers/Home';

const PageWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

const PageContent = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
`

const Routes = ({ match }) => (
  <Fragment>
    <Global
      styles={css`${ globalStyles }`}
    />
    <Router>
      <PageWrapper>
        <Header hasAtf={false}/>
        <PageContent>
          <Route exact path="/" render={(props) => (<Home  {...props} />)} />
        </PageContent>
        <Footer/>
      </PageWrapper>
    </Router>
  </Fragment>
);

export default Routes;