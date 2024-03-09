import { useEffect, useState } from "react";

// custom hook per controllare la visibilità dell'elemento in base all'altezza 'scrollThreshold' passata
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
