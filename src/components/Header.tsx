import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Image from "next/image";

const headerVariants = cva(
  "p-12 text-center relative overflow-hidden",
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
          "shadow-sm border-b md:border-b-2 border-primary shadow-primary",
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
      >
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={bgSRC}
            alt="Header background"
            fill
            priority
            className={cn(
              "object-cover",
              bgColor === "rider" ? "object-[center_0%]" : "object-center"
            )}
          />
        </div>
        <div className="absolute right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed z-10">
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;
