interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dynamicProps?: { [key: string]: string };
  openFunction: () => void;
}

const Hamburger: React.FC<ButtonProps> = ({ dynamicProps, openFunction }) => {
  return (
    <>
      <button
        data-collapse-toggle="navbar-cta"
        className="inline-flex items-center p-2 text-sm text-gray-600 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="navbar-cta"
        aria-expanded="false"
        onClick={openFunction}
        {...dynamicProps}
      >
        <span className="sr-only">Open menù</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </>
  );
};

export default Hamburger;
