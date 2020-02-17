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
import Product from 'src/containers/Product';

import { withShopifyContext } from 'src/contexts/ShopifyContext'

const Wrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
`

class PageContent extends Component {
  componentWillMount () {
    let productList = false

    const client = this.props.shopifyContext.shopifyClient

    // Build products query
    // const productsQuery = client.graphQLClient.query((root) => {
    //   root.addConnection('products', {args: {first: 50}}, (product) => {
    //     product.add('id')
    //     product.add('tags')
    //     product.add('description')
    //     product.add('descriptionHtml')
    //     product.add('handle')
    //     product.add('productType')
    //     product.add('title')
    //     product.addConnection('images', {args: {first: 10}}, (image) => {
    //       image.add('id')
    //       image.add('src')
    //     });
    //     product.addConnection('collections', {args: {first: 10}}, (collection) => {
    //       collection.add('id')
    //       collection.add('title')
    //     });
    //   });
    // });

    // Build collections query
    // const collectionsQuery = client.graphQLClient.query((root) => {
    //   root.addConnection('collections', {args: {first: 50}}, (collection) => {
    //     collection.add('id')
    //     collection.add('description')
    //     collection.add('handle')
    //     collection.add('title')
    //     collection.addConnection('products', {args: {first: 10}}, (product) => {
    //       product.add('id')
    //       product.add('title')
    //       product.add('tags')
    //       product.add('handle')
    //       product.add('productType')
    //     });
    //   });
    // });
    
    // Set collections
    client.collection.fetchAllWithProducts().then((collections) => {
      this.props.shopifyContext.updateState('shopifyCollections', collections)
    });
    
    // Set products
    client.product.fetchAll().then((products) => {
      this.props.shopifyContext.updateState('shopifyProducts', products)
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
            <Route exact path="/product/:product/:variant" component={(props) => (<Product {...props} />)} />
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
