import React, { Fragment, Component } from 'react'
import styled from '@emotion/styled'
import { Route, Switch, withRouter } from 'react-router-dom';
import PageTransition from 'src/components/PageTransition'

import Footer from 'src/components/Footer'

import Home from 'src/containers/Home';
import Collections from 'src/containers/Collections';
import Collection from 'src/containers/Collection';
import About from 'src/containers/About';
import Contact from 'src/containers/Contact';

import { withShopifyContext } from 'src/contexts/ShopifyContext'

const Wrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
`

class PageContent extends Component {
  componentDidMount () {
    const client = this.props.shopifyContext.shopifyClient
    client.collection.fetchAllWithProducts().then((collections) => {
      this.props.shopifyContext.updateState('shopifyCollections', collections)
    });
  }
  render () {
    if (!this.props.shopifyContext.shopifyCollections) {
      return false
    }

    const { location } = this.props
    return (
      <Wrapper>
        <PageTransition location={location}>
          <Switch location={location}>
            <Route exact path="/" render={(props) => (<Home {...props} />)} />
            <Route exact path="/collections" render={(props) => (<Collections {...props} />)} />
            <Route exact path="/collections/:id" component={(props) => (<Collection {...props} />)} />
            <Route exact path="/about" render={(props) => (<About {...props} />)} />
            <Route exact path="/contact" render={(props) => (<Contact {...props} />)} />
          </Switch>
          <Footer/>
        </PageTransition>
      </Wrapper>
    )
  }
}

// const PageContent = ({ location }) => {
//   return (
//     <Wrapper>
//       <PageTransition location={location}>
//         <Switch location={location}>
//           <Route exact path="/" render={(props) => (<Home {...props} />)} />
//           <Route exact path="/collections" render={(props) => (<Collections {...props} />)} />
//           <Route exact path="/collections/:id" render={(props) => (<Collection {...props} />)} />
//           <Route exact path="/about" render={(props) => (<About {...props} />)} />
//           <Route exact path="/contact" render={(props) => (<Contact {...props} />)} />
//         </Switch>
//       </PageTransition>
//     </Wrapper>
//   )
// }

export default withShopifyContext(withRouter(PageContent));
