import { cn } from "@/lib/utils";

interface NavItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ children, className, ...rest }) => {
  return (
    <li
      className={cn(
        `block py-2 pl-5 pr-4 md:mx-2 text-gray-800 rounded links-mobile-menu md:hover:bg-transparent hover:text-primary md:p-0 text-lg font-medium ${className}`
      )}
      {...rest}
    >
      {children}
    </li>
  );
};

export default NavItem;
