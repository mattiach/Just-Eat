import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

// routing
import { Link, useNavigate } from 'react-router-dom';

// icons
import { FaShoppingCart } from 'react-icons/fa';

// components
import Logo from '@components/Logo';
import NavbarItem from '@components/navbar/NavbarItem';
import HamburgerButton from '@components/navbar/HamburgerButton';
import SelectLanguage from '@components/SelectLanguage';

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLessThan640 = useMediaQuery({ query: "(max-width: 640px)" });

  const navigateFunction = (value) => {
    navigate(value);
  }

  // function to calculate the total number of items in all carts
  const calculateTotalItems = () => {
    let totalItems = 0;
    // iterate over each cart
    cart.forEach((cartItem) => {
      // iterate over each product in the current cart and add the quantity to the total
      cartItem.products.forEach((product) => {
        totalItems += product.quantity;
      });
    });
    return totalItems;
  };

  // calculate the total number of items in all carts
  const totalItems = calculateTotalItems();

  return (
    <>
      <nav className="bg-white dark:bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded select-none">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center cursor-pointer" onClick={() => navigateFunction('/')}>
            <Logo />
            <h1 className="self-center pt-1 text-2xl font-extrabold whitespace-nowrap text-primary">
              JustEat
            </h1>
          </div>
          <div className="flex md:order-2">
            <span className='hidden sm:inline relative top-1.5 right-1'>
              <SelectLanguage />
            </span>
            <div className='px-5 py-2.5 sm:flex gap-2 cursor-pointer' onClick={() => navigateFunction('/cart')}>
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
                <Link to={'/orders'}>
                  {t('components.navbar.orders')}
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link to={'/work-with-us'}>
                  {t('components.navbar.becomeARider')}
                </Link>
              </NavbarItem>
              {
                isLessThan640 ?
                  <>
                    <NavbarItem className={"sm:hidden"}>
                      <Link to={'/cart'}>
                        {t('components.navbar.cart')}
                      </Link>
                    </NavbarItem>
                    <NavbarItem className={"sm:hidden flex justify-start"}>
                      <SelectLanguage />
                    </NavbarItem>
                  </> : null
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar