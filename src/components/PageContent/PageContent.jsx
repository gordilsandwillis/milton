import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Route, Switch, withRouter } from 'react-router-dom'

import { shopifyClient as client, collectionsQuery, productsQuery, shopQuery } from 'services/shopify'
import { withShopifyContext } from 'contexts/ShopifyContext'

import Home from 'containers/Home'
import Collections from 'containers/Collections'
import Collection from 'containers/Collection'
import About from 'containers/About'
import Contact from 'containers/Contact'
import Product from 'containers/Product'
import Showrooms from 'containers/Showrooms'
import Shop from 'containers/Shop'
import Textiles from 'containers/Textiles'

import PageTransition from 'components/PageTransition'
import Footer from 'components/Footer'
import InquireModal from 'components/InquireModal'
import FacebookPixel from 'components/FacebookPixel'

const Wrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
`

class PageContent extends Component {
  componentDidMount () {
    console.log(" ╔╗╔╗╦ ╦ \n ║╦╠╦║║║ Designed & built by\n ║║║║║║║ https://gordilsandwillis.com\n ╚╝╚╝╚╩╝ ");
    client.request(collectionsQuery)
      .then(res => {
        this.props.shopifyContext.updateState('shopifyCollections', res?.data?.collections?.edges)
      })

    client.request(productsQuery)
      .then(res => {
        this.props.shopifyContext.updateState('shopifyProducts', res?.data?.products?.edges)
      })

    client.request(shopQuery)
      .then(res => {
        this.props.shopifyContext.updateState('shop', res?.data?.shop)
      })
  }

  render () {

    console.log(this.props)

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
            <Route exact path="/textiles" render={(props) => (<Textiles {...props} />)} />
            <Route exact path="/shop" render={(props) => (<Shop {...props} />)} />
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
