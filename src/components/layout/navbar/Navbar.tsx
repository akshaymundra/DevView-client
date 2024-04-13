import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Style from './Navbar.module.css'
import NavLink from './navlink/NavLink'
import Button from '@/components/common/buttons/Button'

const links = [
    {
        path: "/",
        name: "Home"
    },
    {
        path: "/about-us",
        name: "About",
    }
]

const Navbar = () => {

    const location = useLocation();
    const active = location.pathname

    return (
        <nav className={` ${Style.navbar} flex items-center font-semibold justify-between px-4 py-2 w-full bg-indigo-600 text-white`}>
            <div className='flex gap-8 items-center'>
                <span className='text-2xl text-white font-bold'>
                    DevView
                </span>
            </div>
            <div className='flex gap-4 items-center'>
                {links?.map((link, index) => (
                    <NavLink
                        key={index}
                        path={link.path}
                        name={link.name}
                        active={active}
                        activeClass={Style.active_navlink}
                        className={Style.navlink}
                    />
                ))}
                <Link to={'/request-interview'}>
                    <Button
                        roundedPill
                        className='border border-white'
                        style={{ paddingBlock: '2px' }}
                    >
                        Request Interview
                    </Button>
                </Link>

                <div className={`border border-white rounded-full w-8 h-8 flex justify-center items-center`}>
                    A
                </div>
            </div>
        </nav>
    )
}

export default Navbar