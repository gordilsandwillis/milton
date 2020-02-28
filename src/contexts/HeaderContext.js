import React from 'react';

const initialState = {
  collapsed: false,
  toggleHeader: () => {},
};

export const HeaderContext = React.createContext(initialState);

class HeaderProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  toggleHeader = (collapsed) => {
    if (this.state.collapsed !== collapsed) {
      this.setState((prevState) => ({ collapsed: collapsed }))
    }
  }

  render() {
    const { children } = this.props
    return (
      <HeaderContext.Provider
        value={{
          ...this.state,
          toggleHeader: this.toggleHeader
        }}
      >
        {children}
      </HeaderContext.Provider>
    );
  }
}

export const withHeaderContext = (Component) => {
  return props => (
    <HeaderContext.Consumer>{(context) => (<Component {...props} headerContext={context}/>)}</HeaderContext.Consumer>
  )
}


export default HeaderProvider
