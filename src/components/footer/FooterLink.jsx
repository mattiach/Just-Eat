const FooterLink = ({ children }) => {
    return (
        <li className="mb-4">
            <span className="hover:underline">
                {children}
            </span>
        </li>
    );
};

export default FooterLink;
