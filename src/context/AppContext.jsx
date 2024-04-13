import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

// initial values for the user cart information
const initialValues = {
  nome: '',
  cognome: '',
  email: '',
  telefono: '',
  indirizzo: '',
  città: '',
  paese: '',
  zip: '',
}

const AppProvider = ({ children }) => {
  // state to store the selected cuisine and save it in localStorage
  // get the selected cuisine from localStorage, default to 'pizza' if not found
  const [selectedCuisine, setSelectedCuisine] = useState(() => {
    const cuisineFromLocalStorage = localStorage.getItem("cuisine");
    return cuisineFromLocalStorage || 'pizza';
  });

  // update localStorage when selectedCuisine changes
  useEffect(() => {
    localStorage.setItem("cuisine", selectedCuisine);
  }, [selectedCuisine]);

  // state to store user shopping cart information
  const [userCartInfo, setUserCartInfo] = useState(() => {
    // user cart info from localStorage. Parse the JSON data if available, otherwise use initialValues
    const userCartInfoFromLocalStorage = localStorage.getItem("userCartInfo");
    const parsedCartInfo = userCartInfoFromLocalStorage ? JSON.parse(userCartInfoFromLocalStorage) : null;
    return parsedCartInfo !== null ? parsedCartInfo : initialValues;
  });

  // update localStorage when userCartInfo changes
  useEffect(() => {
    localStorage.setItem("userCartInfo", JSON.stringify(userCartInfo));
  }, [userCartInfo]);

  // credit card info (that will be lost after page refresh..)
  const [creditCardInfo, setCreditCardInfo] = useState({
    holder: userCartInfo && userCartInfo.nome && userCartInfo.cognome ? `${userCartInfo.nome} ${userCartInfo.cognome}` : '',
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
        setCreditCardInfo,
        userCartInfo,
        setUserCartInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
