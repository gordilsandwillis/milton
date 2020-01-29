import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import globalStyles from 'src/styles/globalStyles'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import './reset.css'

import Home from 'src/containers/Home';
import Collections from 'src/containers/Collections';
import About from 'src/containers/About';
import Contact from 'src/containers/Contact';

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
    <PageWrapper>
      <PageContent>
        <Router>
          <Route exact path="/" render={(props) => (<Home  {...props} />)} />
          <Route exact path="/collections" render={(props) => (<Collections  {...props} />)} />
          <Route exact path="/about" render={(props) => (<About  {...props} />)} />
          <Route exact path="/contact" render={(props) => (<Contact  {...props} />)} />
        </Router>
      </PageContent>
      <Footer/>
    </PageWrapper>
  </Fragment>
);

export default Routes;