const NavbarItem = ({ children, className }) => {
    return (
        <li className={`block py-2 pl-5 pr-4 md:mx-2 text-gray-800 rounded links-mobile-menu md:hover:bg-transparent hover:text-primary md:p-0 text-lg font-medium ${className}`}>
            {children}
        </li >
    );
};

export default NavbarItem