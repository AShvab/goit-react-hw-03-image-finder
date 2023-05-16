import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  }

  render() {
    return createPortal(
      <div  onClick={this.handleBackdropClick}>
        <Modal>{this.props.children} </Modal>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
  }
  
  export default Modal;