import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  // set the selected cuisine selection and save it in localStorage
  const [selectedCuisine, setSelectedCuisine] = useState(() => {
    const cuisineFromLocalStorage = localStorage.getItem("cuisine");
    return cuisineFromLocalStorage || 'pizza';
  });

  useEffect(() => {
    localStorage.setItem("cuisine", selectedCuisine);
  }, [selectedCuisine]);

  const [creditCardInfo, setCreditCardInfo] = useState({
    holder: '',
    cardNumber: 0,
    expirationDate: '',
    cvc: 0
  })

  return (
    <AppContext.Provider
      value={{
        selectedCuisine,
        setSelectedCuisine,
        creditCardInfo,
        setCreditCardInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
