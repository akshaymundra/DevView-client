import { Link } from 'react-router-dom'

const sidbarLinks = [
    {
        name: 'Request Interview',
        path: '/request-interview'
    },
    {
        name: 'Profile',
        path: '/profile'
    },
    {
        name: 'Previous Interviews',
        path: '/previous-interviews'
    },
]


const Sidebar = () => {
    return (
        <div className='flex flex-col rounded-md'>
            {sidbarLinks.map((link, index) => (
                <Link key={index} to={link.path} className='p-2 hover:bg-gray-100 rounded-md'>{link.name}</Link>
            ))}
        </div>
    )
}

export default Sidebar