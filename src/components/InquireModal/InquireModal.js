import React, { Component } from 'react'
import Modal from 'react-modal'
import styled from '@emotion/styled'

import { withModalContext } from 'src/contexts/ModalContext'

import { colors } from 'src/styles'

Modal.setAppElement('#root')

const customStyles = {
  content: {
    background: colors.white,
    maxWidth: 600,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
  },
  overlay: {
    background: colors.modalOverlay,
    zIndex: 600,
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
  padding: 50px;
`;

class InquireModal extends Component {

	state = {
		email: '',
		name: '',
		phone: '',
		company: ''
	}

  handleSubmit = (event) => {
    event.preventDefault();
    //const { email, name, phone, company } = this.state

  }

	render() {
 		const { modalContext } = this.props
 		const { toggleModal, modalIsOpen, modalData } = modalContext
    const { currentProduct, currentVariant, currentCollection } = modalData

    return (
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        closeTimeoutMS={300}
      >
        <InnerWrapper>
        <p>Product: {currentCollection && currentCollection.handle}</p>
        <p>Collection: {currentProduct && currentProduct.handle}</p>
        <p>Varient: {currentVariant && currentVariant.id}</p>
      	<p onClick={toggleModal}>Close</p>
        </InnerWrapper>
      </Modal>
		);
	}
}


export default withModalContext(InquireModal)

