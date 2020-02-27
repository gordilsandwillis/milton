import React, { Component } from 'react'
import Modal from 'react-modal'
import styled from '@emotion/styled'
import { rgba } from 'polished'

import { withModalContext } from 'src/contexts/ModalContext'
import { MdClose } from 'react-icons/md'
import { colors, typography, util } from 'src/styles'
import Input from 'src/components/Input'
import Button from 'src/components/Button'

Modal.setAppElement('#root')

const CloseButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  color: ${ colors.textColor };
  opacity: .3;
  cursor: pointer;
  &:hover {
    color: ${ colors.textColor };
    opacity: 1;
  }
`

const ModalHeader = styled.h4`
  text-align: center;
  margin: 0;
`

const ErrorMessage = styled.p`
  text-align: center;
  color: ${ colors.alert };
  ${ typography.bodySmall }
  font-weight: 600;
  max-width: 21em;
  margin: 0 auto 8px;
  ${ util.responsiveStyles('margin-top', 30, 20, 20, 16) }
`

const SubmitButton = styled(Button)`
  min-width: 200px;
  margin: 0 auto 0;
  display: block;
  ${ util.responsiveStyles('margin-top', 50, 45, 40, 20) }
`

const UnderlinedInput = styled(Input)`
  display: ${ ({ hidden }) => hidden ? 'none' : 'block' };
  margin-top: 10px;
  input {
    border-left: none;
    border-right: none;
    border-top: none;
    padding-left: 0;
    padding-right: 0;
    background: transparent;
    border-color: ${ colors.hrColor };
    padding-top: 18px;
    &:hover,
    &:focus {
      background: transparent;
      border-color: ${ colors.textColor };
    }
  }
  label {
    padding: 18px 0 0 0;
    margin: 0;
    left: 0;
    ${ typography.h6 }
    &.focused {
      color: ${ colors.lightTextColor };
      transform: translate3d(0, -16px, 0) scale(.75);
    }
  }
`

const customStyles = {
  background: 'red',
  content: {
    position: 'relative',
    background: colors.bgColor,
    maxWidth: '100%',
    width: 600,
    right: 'auto',
    bottom: 'auto',
    padding: 0,
    top: 'auto',
    left: 'auto',
    border: 'none',
    borderRadius: '0',
    border: '14px solid white',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  overlay: {
    padding: '5%',
    overflow: 'auto',
    background: rgba(colors.lightGrey, .8),
    zIndex: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
};

const InnerWrapper = styled.div`
  z-index: 200;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  max-width: 640px;
  ${ util.responsiveStyles('padding', 50, 45, 40, 20) }
`;

class InquireModal extends Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: '',
      product: '',
      collection: '',
      sku: '',
      name: '',
      company: '',
      email: '',
      phone: '',
      message: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //const { email, name, phone, company } = this.state
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json")
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        this.setState({ status: "SUCCESS" })
        setTimeout(() => {
          this.setState({
            status: '',
            product: '',
            collection: '',
            sku: '',
            name: '',
            company: '',
            email: '',
            phone: '',
            message: ''
          })
          form.reset()
          this.props.modalContext.toggleModal()
        }, 1000)
      } else {
        this.setState({ status: "ERROR" })
      }
    };
    xhr.send(data);
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

	render() {
    const { status, product, collection, sku, name, company, phone, email, message } = this.state
 		const { modalContext } = this.props
 		const { toggleModal, modalIsOpen, closeModal, modalData } = modalContext
    const { title, buttonLabel } = modalData
    const { currentProduct, currentVariant, currentCollection } = modalData

    const valid = name && company && email && phone && message
    let buttonText = buttonLabel

    if (status === 'SUCCESS') {
      buttonText = 'Thank you'
    } else if (status === 'ERROR') {
      buttonText = 'Oh No!'
    }

    // console.log('modalContext ', modalContext)

    return (
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        closeTimeoutMS={500}
      >
        <InnerWrapper>
          <ModalHeader>{title || 'Inquire'}</ModalHeader>
          <form 
            onSubmit={this.submitForm}
            action="https://formspree.io/xwkbldwy"
            method="POST"
          >

            <UnderlinedInput
              hidden={true}
              onChange={this.handleInput}
              size="small"
              label="Product"
              type="text"
              name="product"
              id="product"
              value={(currentVariant && currentProduct) && currentVariant.title + ' | ' + currentProduct.title}
            />

            <UnderlinedInput
              hidden={true}
              onChange={this.handleInput}
              size="small"
              label="Collection"
              type="text"
              name="collection"
              id="collection"
              value={currentCollection && currentCollection.title}
            />

            <UnderlinedInput
              hidden={true}
              onChange={this.handleInput}
              size="small"
              label="SKU"
              type="text"
              name="sku"
              id="sku"
              value={currentVariant && currentVariant.sku}
            />

            <UnderlinedInput
              onChange={this.handleInput}
              size="small"
              label="Name"
              type="text"
              name="name"
              value={name}
              id="name"/>

            <UnderlinedInput
              onChange={this.handleInput}
              size="small"
              label="Company"
              type="text"
              name="company"
              value={company}
              id="company"/>

            <UnderlinedInput
              onChange={this.handleInput}
              size="small"
              label="Email"
              type="text"
              name="email"
              value={email}
              id="email"/>
 
            <UnderlinedInput
              onChange={this.handleInput}
              size="small"
              label="Phone"
              type="text"
              name="phone"
              value={phone}
              id="phone"/>

            <UnderlinedInput
              onChange={this.handleInput}
              size="small"
              label="Message"
              type="textarea"
              name="message"
              value={message}
              id="message"/>

            <SubmitButton type="submit" disabled={!valid}>{buttonText || 'Send Inquiry'}</SubmitButton>

            {status === 'ERROR' && (<ErrorMessage>Something went wrong. Please make sure all fields are filled out and try again.</ErrorMessage>)}

          </form>

        	<CloseButton onClick={closeModal} shape="circle" setTheme="transparent"><MdClose size={24}/></CloseButton>
        </InnerWrapper>
      </Modal>
		);
	}
}


export default withModalContext(InquireModal)

