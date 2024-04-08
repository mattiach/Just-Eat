import { BsArrowUpCircle } from "react-icons/bs";
import { useMediaQuery } from 'react-responsive';
import { scrollToTopFunction } from "@functions/scrollToTopFunction";
import UseScrollToShowButton from "@hooks/UseScollToShowButton";

const FloatingButton = ({ scrollThreshold, isVisibleOnDesktop, className }) => {
  const showButton = UseScrollToShowButton(scrollThreshold ? scrollThreshold : 250);
  const isNotDesktopView = useMediaQuery({ query: '(max-width: 992px)' });

  // calculate button visibility: in desktop view if declared in 'props', otherwise in mobile/tablet view.
  const isButtonVisible = showButton && (isVisibleOnDesktop ? true : isNotDesktopView);

  return (
    <div className={`fixed bottom-8 select-none right-2.5 lg:bottom-16 lg:right-8 z-10 opacity-70 hover:opacity-80 ${isButtonVisible ? null : 'hidden'} ${className}`}>
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
