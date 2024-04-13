import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavlinkProps {
    path: string,
    name: string,
    active: string,
    activeClass: string,
    className: string,
}

const NavLink: React.FC<NavlinkProps> = ({
    path,
    name,
    active,
    activeClass,
    className,
}) => {

    return (
        <Link
            to={path}
            className={`${className} ${path == active ? activeClass : ''}`}
        >
            {name}
        </Link>
    )
}

export default NavLink