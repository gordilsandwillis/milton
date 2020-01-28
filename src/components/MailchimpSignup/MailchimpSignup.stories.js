import React from 'react'
import { storiesOf } from '@storybook/react'
import MailchimpSignup from './MailchimpSignup'

const stories = storiesOf(`Components/MailchimpSignup`, module)
stories.add(`Default`, () => (
  <MailchimpSignup />
))
