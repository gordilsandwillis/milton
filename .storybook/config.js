import _ from 'lodash'
import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react';
import { Global } from '@emotion/core'
import globalCss from '../src/styles/globalStyles'
import theme from './theme';
import {
  withKnobs,
} from '@storybook/addon-knobs'

addParameters({
  options: {
    theme: theme,
  },
})

addDecorator(story => (
  <div>
    <Global
      styles={[globalCss]}
    />

    {story()}
  </div>
))

addDecorator(withKnobs)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))

  _.sortBy(req.keys(), [
    // Sort by file name (ignore path)
    filename => _.last(filename.split('/'))
  ]).forEach(filename => req(filename))
}

// https://www.gatsbyjs.org/docs/visual-testing-with-storybook/#setting-up-your-environment
// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => { },
  hovering: () => { },
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}
configure(loadStories, module)
