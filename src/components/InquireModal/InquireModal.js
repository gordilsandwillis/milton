import React, { Component } from 'react'
import Modal from 'react-modal'
import styled from '@emotion/styled'
import { rgba } from 'polished'
import { MdClose } from 'react-icons/md'

import { withModalContext } from 'contexts/ModalContext'

import Button from 'components/Button'
import ContactForm from 'components/ContactForm'
import Grid from 'components/Grid'

import { colors, util, mq } from 'styles'

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

const ModalEyebrow = styled.h6`
	text-align: center;
	margin: 0;
`

const ModalHeader = styled.h4`
	text-align: center;
	margin: 0;
`

const customStyles = (hasImage) => {
	let maxWidth = '600px'
	if (hasImage) {
		maxWidth = '1000px'
	}
	const styles = {
		background: 'red',
		content: {
			position: 'relative',
			background: colors.bgColor,
			maxWidth: maxWidth,
			width: '100%',
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
			padding: '7%',
			overflow: 'auto',
			background: rgba(colors.lightGrey, .8),
			zIndex: 600,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
	}
	return styles
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


const Image = styled.div`
	${ mq.largeAndUp } {
		background: #ccc;
		height: 100%;
		position: relative;
		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}
	}
`

class InquireModal extends Component {

	render() {
		const { modalContext } = this.props
		const { modalIsOpen, closeModal, modalData } = modalContext
		const { title, buttonLabel } = modalData
		const { currentProduct, currentVariant, currentCollection } = modalData

		let buttonText = buttonLabel

		return (
			<Modal
				style={customStyles(currentVariant)}
				isOpen={modalIsOpen}
				closeTimeoutMS={500}
			>
				<Grid
					small="[12]"
					medium={currentVariant ? "[6] [6]" : "[1]"}
					vAlign="center"
				>
					{currentVariant && (
						<Image>
							<img src={currentVariant.image.src} alt='' />
						</Image>
					)}
					<InnerWrapper>
						{currentCollection && (
							<ModalEyebrow>{`${currentCollection && currentCollection.title} • ${currentVariant && currentVariant.title}`}</ModalEyebrow>
						)}
						<ModalHeader>{title || 'Inquire'}</ModalHeader>
							<ContactForm
								buttonLabel={buttonText}
								currentVariant={currentVariant}
								currentProduct={currentProduct}
								currentCollection={currentCollection}
								onSuccess={closeModal}
								subject="Milton — Inquiry"
							/>
						<CloseButton onClick={closeModal} shape="circle" setTheme="transparent"><MdClose size={24}/></CloseButton>
					</InnerWrapper>
				</Grid>
			</Modal>
		);
	}
}


export default withModalContext(InquireModal)

