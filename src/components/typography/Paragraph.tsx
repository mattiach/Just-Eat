import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const paragraphVariants = cva("leading-6 tracking-wide", {
  variants: {
    size: {
      default: "text-lg sm:text-xl",
    },
    textColor: {
      default: "text-black",
      primary: "text-primary",
    },
  },
});

interface ParagraphProps
  extends React.ComponentPropsWithoutRef<"p">,
    VariantProps<typeof paragraphVariants> {
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className,
  size = "default",
  textColor = "default",
  ...props
}) => {
  return (
    <p
      className={cn(paragraphVariants({ size, textColor }), className)}
      {...props}
    >
      {children}
    </p>
  );
};

export default Paragraph;
