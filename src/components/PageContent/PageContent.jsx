import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Route, Switch, withRouter } from 'react-router-dom'

import { shopifyClient as client, collectionsQuery, productsQuery } from 'src/services/shopify'
import { withShopifyContext } from 'src/contexts/ShopifyContext'

import Home from 'src/containers/Home'
import Collections from 'src/containers/Collections'
import Collection from 'src/containers/Collection'
import About from 'src/containers/About'
import Contact from 'src/containers/Contact'
import Product from 'src/containers/Product'

import PageTransition from 'src/components/PageTransition'
import Footer from 'src/components/Footer'
import InquireModal from 'src/components/InquireModal'

const Wrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
`

class PageContent extends Component {
  componentDidMount () {

    // Set collections
    client.graphQLClient.send(collectionsQuery).then(({model, data}) => {
      console.log('collections:', model.collections)
      this.props.shopifyContext.updateState('shopifyCollections', model.collections)
    });

    // Set products
    client.graphQLClient.send(productsQuery).then(({model, data}) => {
      // console.log('products:', model.products)
      this.props.shopifyContext.updateState('shopifyProducts', model.products)
    });

    // Old queries for testing
    // client.collection.fetchAllWithProducts().then((collections) => {
    //   console.log('collections:',collections)
    // });

    // client.product.fetchAll().then((products) => {
    //   console.log('products:', products)
    // });

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
            <Route exact path="/product/:product/:variant" component={(props) => (<Product {...props} />)} />
            <Route exact path="/about" render={(props) => (<About {...props} />)} />
            <Route exact path="/contact" render={(props) => (<Contact {...props} />)} />
          </Switch>
          <Footer/>
          <InquireModal/>
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
