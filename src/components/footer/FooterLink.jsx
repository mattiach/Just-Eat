const FooterLink = ({ children }) => {
    return (
        <>
            <li className="mb-4">
                <a href="#" className="hover:underline">
                    {children}
                </a>
            </li>
        </>
    )
}

export default FooterLink