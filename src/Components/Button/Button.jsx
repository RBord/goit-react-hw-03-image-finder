import React from 'react';
import s from '../Button/Button.module.css';

const Button = ({onClick}) => {
    return (
        <button className={s.Button} onClick={onClick}>Load More</button>
    )
}

export default Button;