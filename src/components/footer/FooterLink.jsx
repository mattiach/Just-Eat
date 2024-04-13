const FooterLink = ({ children }) => {
    const handleClick = (event) => {
        event.preventDefault();
    };

    return (
        <li className="mb-4">
            <a href="#" className="hover:underline" onClick={(event) => handleClick(event)}>
                {children}
            </a>
        </li>
    );
};

export default FooterLink;
