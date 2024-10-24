import { useEffect, useState } from "react";

interface UseScrollToShowElementProps {
  scrollThreshold: number;
}

const useScrollToShowElement = ({
  scrollThreshold,
}: UseScrollToShowElementProps): boolean => {
  const [showElement, setShowElement] = useState<boolean>(false);

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

export default useScrollToShowElement;
