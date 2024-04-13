import React from 'react';
import Style from "./Button.module.css";
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    varient?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark' | 'link',
    startIcon?: React.ReactNode,
    className?: string,
    roundedPill?: boolean,
    iconButton?: boolean,
    roundedFull?: boolean,
}


const Button: React.FC<ButtonProps> = ({
    varient = "primary",
    startIcon,
    className,
    roundedPill,
    iconButton = false,
    roundedFull = false,
    ...props
}) => {

    const buttonClass = classNames(Style.base_btn, Style.btn, {
        [Style.primary]: varient === 'primary',
        [Style.secondary]: varient === 'secondary',
        [Style.danger]: varient === 'danger',
        [Style.success]: varient === 'success',
        [Style.warning]: varient === 'warning',
        [Style.info]: varient === 'info',
        [Style.light]: varient === 'light',
        [Style.dark]: varient === 'dark',
        [Style.link]: varient === 'link',

        [Style.rounded_pill]: roundedPill,
        [Style.rounded_full]: roundedFull,
        [Style.icon_button]: iconButton,

    });

    return (
        <button
            {...props}
            className={`${buttonClass} ${className}`}
        >
            {startIcon}
            {props.children}
        </button>
    )
}

export default Button