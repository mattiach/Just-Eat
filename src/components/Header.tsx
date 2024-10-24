import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headerVariants = cva(
  "p-12 text-center relative overflow-hidden bg-no-repeat bg-center bg-cover",
  {
    variants: {
      bgHeight: {
        default: "jumbotron-justeat",
        small: "jumbotron-justeat-orders",
      },
      bgColor: {
        default: "bg-white",
        opaque: "bg-black bg-opacity-50",
        rider:
          "bg-cover bg-no-repeat shadow border-b md:border-b-2 border-primary shadow-primary",
      },
    },
    defaultVariants: {
      bgHeight: "default",
      bgColor: "default",
    },
  }
);

interface HeaderProps extends React.HTMLProps<HTMLDivElement> {
  bgSRC: string;
  bgColor?: "default" | "opaque" | "rider";
  bgHeight?: "default" | "small";
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  bgSRC,
  bgColor = "default",
  bgHeight = "default",
  children,
  ...divProps
}) => {
  return (
    <header>
      <div
        {...divProps}
        className={cn(headerVariants({ bgColor, bgHeight }))}
        style={{
          backgroundImage: `url(${bgSRC})`,
          backgroundSize: "cover",
          backgroundPosition: bgColor === "rider" ? "center 0%" : "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed">
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;
