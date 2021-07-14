import React from 'react';
import s from '../Modal/Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }
    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClick();
        }
    }
    handleOverlayClick = e => {
        if (e.target === e.currentTarget) {
            this.props.onClick();
        }
    }
    render() {
        return createPortal(
            <div className={s.Overlay} onClick={this.handleOverlayClick} >
                <div className={s.Modal} onClick={this.props.onClick}>
                    <img src={this.props.fullImg} alt="" />
                </div>
            </div>,
            modalRoot,
        )
    }
}

export default Modal;