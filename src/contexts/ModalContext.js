import React from 'react';

const initialState = {
  modalIsOpen: false,
  modalData : {},
  toggleModal: () => {},
};

export const ModalContext = React.createContext(initialState);

class ModalProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  toggleModal = (modalData = {}) => {
    this.setState((prevState) => ({ modalIsOpen: !prevState.modalIsOpen, modalData }))
  }

  render() {
    const { children } = this.props
    return (
      <ModalContext.Provider
        value={{
          ...this.state,
          toggleModal: this.toggleModal,
        }}
      >
        {children}
      </ModalContext.Provider>
    );
  }
}

export const withModalContext = (Component) => {
  return props => (
    <ModalContext.Consumer>{(context) => (<Component {...props} modalContext={context}/>)}</ModalContext.Consumer>
  )
}


export default ModalProvider
