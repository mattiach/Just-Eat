interface FooterTCProps {
  children: React.ReactNode;
}

const FooterTitleSection: React.FC<FooterTCProps> = ({ children }) => {
  return (
    <>
      <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase">
        {children}
      </h2>
    </>
  );
};

export default FooterTitleSection;
