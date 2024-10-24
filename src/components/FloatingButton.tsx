import { BsArrowUpCircle } from "react-icons/bs";
import { scrollToTopFunction } from "@/functions/common";
import useScrollToShowElement from "@/hooks/UseScollToShowButton";

interface FloatingButtonProps {
  scrollThreshold?: number;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  scrollThreshold = 250,
}) => {
  const showButton = useScrollToShowElement({ scrollThreshold });

  return (
    <div
      className={`fixed bottom-8 select-none right-4 lg:bottom-16 lg:right-8 z-10 opacity-70 hover:opacity-80 ${
        showButton ? "" : "hidden"
      }`}
    >
      <button
        className="p-3 font-bold text-white rounded-full bg-primary hover:bg-secondary focus:outline-none focus:shadow-outline fading-in-animation"
        onClick={scrollToTopFunction}
      >
        <BsArrowUpCircle size={24} />
      </button>
    </div>
  );
};

export default FloatingButton;
