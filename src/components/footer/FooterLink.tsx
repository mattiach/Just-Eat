interface FooterLinkProps {
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ children }) => {
  return (
    <li className="mb-4 text-balance">
      <span className="hover:underline">{children}</span>
    </li>
  );
};

export default FooterLink;
