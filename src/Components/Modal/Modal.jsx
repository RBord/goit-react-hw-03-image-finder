import React from 'react';
import s from '../Modal/Modal.module.css';


const Modal = ({onClick, fullImg}) => {
    return (
        <div className={s.Overlay} >
            <div className={s.Modal} onClick={onClick}>
                <img src={fullImg} alt="" />
            </div>
        </div>
    )}

export default Modal;