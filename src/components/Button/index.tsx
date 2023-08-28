import React from 'react';
import styles from './Button.module.scss';

interface Props {
    children?: React.ReactNode,
    type?: 'button' | 'submit' | 'reset' | undefined,
    className?: string,
    onClick?: () => void,
}

const Button = ({children, type = 'button', className, onClick} : Props) => {
    return (
        <button onClick={onClick} type={type} className={className ? className : styles.button}>
            {children}
        </button>
    );
}


export default Button;