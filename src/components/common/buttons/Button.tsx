import React from 'react';
import Style from "./Button.module.css";
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    varient?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark' | 'link',
}


const Button: React.FC<ButtonProps> = ({
    varient = "primary",
    ...props
}) => {

    const buttonClass = classNames(Style.btn, {
        [Style.primary]: varient === 'primary',
        [Style.secondary]: varient === 'secondary',
        [Style.danger]: varient === 'danger',
        [Style.success]: varient === 'success',
        [Style.warning]: varient === 'warning',
        [Style.info]: varient === 'info',
        [Style.light]: varient === 'light',
        [Style.dark]: varient === 'dark',
        [Style.link]: varient === 'link',
    });

    return (
        <button
            {...props}
            className={buttonClass}
        >
            {props.children}
        </button>
    )
}

export default Button