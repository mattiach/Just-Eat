import { useState } from 'react';
import { useSelector } from 'react-redux';

// routing
import { Link, useNavigate } from 'react-router-dom';

// icons
import { FaShoppingCart } from 'react-icons/fa';

// components
import Logo from '../Logo';
import NavbarItem from './NavbarItem';
import HamburgerButton from './HamburgerButton';

const Navbar = () => {
    const cart = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const navigateFunction = (value) => {
        navigate(value);
    }

    // Funzione per calcolare il numero totale di elementi in tutti i carrelli
    const calculateTotalItems = () => {
        let totalItems = 0;
        // Itera su ogni carrello
        cart.forEach((cartItem) => {
            // Itera su ogni prodotto nel carrello corrente e aggiungi la quantità al totale
            cartItem.products.forEach((product) => {
                totalItems += product.quantity;
            });
        });
        return totalItems;
    };

    // Calcola il numero totale di elementi in tutti i carrelli
    const totalItems = calculateTotalItems();

    return (
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded select-none">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <div className="flex items-center cursor-pointer" onClick={() => navigateFunction('/')}>
                        <Logo />
                        <h1 className="self-center pt-1 text-2xl font-extrabold whitespace-nowrap text-primary">
                            JustEat
                        </h1>
                    </div>
                    <div className="flex md:order-2">
                        <div className='px-5 py-2.5 sm:flex gap-2 cursor-pointer' onClick={() => navigateFunction('/carrello')}>
                            <FaShoppingCart fill='#fe7e00' size={23} />
                            <span className='hidden sm:inline w-4 text-center'>
                                <span className={`${totalItems > 0 ? "" : "invisible"}`}>
                                    {totalItems}
                                </span>
                            </span>
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
                            <NavbarItem className={"sm:hidden"}>
                                <Link to={'/carrello'}>
                                    Carrello
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