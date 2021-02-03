import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Route, Switch, withRouter } from 'react-router-dom'

import { shopifyClient as client, collectionsQuery, productsQuery, shopQuery } from 'src/services/shopify'
import { withShopifyContext } from 'src/contexts/ShopifyContext'

import Home from 'src/containers/Home'
import Collections from 'src/containers/Collections'
import Collection from 'src/containers/Collection'
import About from 'src/containers/About'
import Contact from 'src/containers/Contact'
import Product from 'src/containers/Product'
import Showrooms from 'src/containers/Showrooms'

import PageTransition from 'src/components/PageTransition'
import Footer from 'src/components/Footer'
import InquireModal from 'src/components/InquireModal'
import FacebookPixel from 'src/components/FacebookPixel'

const Wrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
`

class PageContent extends Component {
  componentDidMount () {
    console.log(" ╔╗╔╗╦ ╦ \n ║╦╠╦║║║ Designed & built by\n ║║║║║║║ https://gordilsandwillis.com\n ╚╝╚╝╚╩╝ ");
    client.graphQLClient.send(collectionsQuery).then(({model, data}) => {
      this.props.shopifyContext.updateState('shopifyCollections', model.collections)
    });

    client.graphQLClient.send(productsQuery).then(({model, data}) => {
      this.props.shopifyContext.updateState('shopifyProducts', model.products)
    });

    client.graphQLClient.send(shopQuery).then(({model, data}) => {
      this.props.shopifyContext.updateState('shop', model.shop)
    });
  }

  render () {
    if (!this.props.shopifyContext.shop || !this.props.shopifyContext.shopifyCollections || !this.props.shopifyContext.shopifyProducts) {
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
            <Route exact path="/showrooms" render={(props) => (<Showrooms {...props} />)} />
          </Switch>
          <Footer location={location} />
          <InquireModal/>
          <FacebookPixel location={location} />
        </PageTransition>
      </Wrapper>
    )
  }
}

export default withShopifyContext(withRouter(PageContent));
