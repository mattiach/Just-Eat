import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const titleVariants = cva(
  "mx-2 sm:mx-0 my-4 font-extrabold leading-none tracking-wide",
  {
    variants: {
      size: {
        default: "text-2xl md:text-4xl lg:text-4xl",
        small: "text-xl md:text-3xl lg:text-3xl",
      },
      color: {
        primary: "text-primary",
        secondary: "text-secondary",
      },
      tag: {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        h5: "h5",
        h6: "h6",
      },
    },
    defaultVariants: {
      size: "default",
      color: "primary",
      tag: "h1",
    },
  }
);

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  color?: "primary" | "secondary";
  size?: "default" | "small";
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Title: React.FC<TitleProps> = ({
  children,
  className,
  size = "default",
  color = "primary",
  tag = "h1",
  ...props
}) => {
  const Tag = tag;

  return (
    <Tag
      className={cn(titleVariants({ color, size, tag }), className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Title;
