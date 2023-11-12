import { useState } from 'react';

// routing
import { Link, useNavigate } from 'react-router-dom';

// icons
import { FaShoppingCart } from 'react-icons/fa';

// components
import Logo from '../logo/Logo';
import NavbarItem from './NavbarItem';
import HamburgerButton from './HamburgerButton';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const navigateFunction = () => {
        navigate('/');
    }

    return (
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <div className="flex items-center cursor-pointer" onClick={() => navigateFunction()}>
                        <Logo />
                        <h1 className="self-center text-2xl font-extrabold whitespace-nowrap pt-1 text-primary">
                            JustEat
                        </h1>
                    </div>
                    <div className="flex md:order-2">
                        <div className='px-5 py-2.5'>
                            <FaShoppingCart fill='#fe7e00' size={23} />
                        </div>
                        <HamburgerButton onClick={() => setOpen(!open)} />
                    </div>
                    <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${open ? 'block' : 'hidden'}`}>
                        <ul className="flex flex-col p-4 pt-5 mt-4 border border-gray-200 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                            <NavbarItem>
                                <Link to={'/'}>
                                    Home
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link to={'/ordini'}>
                                    Ordini
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link to={'/diventa-un-rider'}>
                                    Diventa un rider
                                </Link>
                            </NavbarItem>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar