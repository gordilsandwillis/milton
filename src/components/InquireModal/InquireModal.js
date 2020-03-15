import React, { Component } from 'react'
import Modal from 'react-modal'
import styled from '@emotion/styled'
import { rgba } from 'polished'

import { withModalContext } from 'src/contexts/ModalContext'
import { MdClose } from 'react-icons/md'
import { colors, typography, util } from 'src/styles'
import UnderlinedInput from 'src/components/Input/UnderlinedInput'
import Button from 'src/components/Button'
import ContactForm from 'src/components/ContactForm'

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
  text-align: center;
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
        }, 1000)
        setTimeout(() => {
          this.props.modalContext.closeModal()
        }, 500)
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
    const { status, name, company, phone, email, message } = this.state
 		const { modalContext } = this.props
 		const { modalIsOpen, closeModal, modalData } = modalContext
    const { title, buttonLabel } = modalData
    const { currentProduct, currentVariant, currentCollection } = modalData

    const valid = name && company && email && phone && message
    let buttonText = buttonLabel

    // console.log('modalContext ', modalContext)

    return (
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        closeTimeoutMS={500}
      >
        <InnerWrapper>
          <ModalHeader>{title || 'Inquire'}</ModalHeader>

          <ContactForm
            buttonLabel={buttonText}
            currentVariant={currentVariant}
            currentProduct={currentProduct}
            currentCollection={currentCollection}
            onSuccess={closeModal}
          />

        	<CloseButton onClick={closeModal} shape="circle" setTheme="transparent"><MdClose size={24}/></CloseButton>
        </InnerWrapper>
      </Modal>
		);
	}
}


export default withModalContext(InquireModal)

