import { useEffect, useState } from "react";

const UseScrollToShowElement = (scrollThreshold) => {
  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setShowElement(true);
      } else {
        setShowElement(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollThreshold]);

  return showElement;
};

export default UseScrollToShowElement;
