import { createContext, useState, useEffect } from "react";
import { supportedLanguages } from "@settings/supportedLanguages";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('');

  // get the user's preferred language from the browser
  useEffect(() => {
    const detectedLanguage = navigator.language.substring(0, 2);
    if (!supportedLanguages.includes(detectedLanguage)) {
      setLanguage('en');
      return;
    }
    setLanguage(detectedLanguage);
    i18n.changeLanguage(detectedLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  });

  const [orderNumber, setOrderNumber] = useState(0);

  return (
    <AppContext.Provider
      value={{
        selectedCuisine,
        setSelectedCuisine,
        creditCardInfo,
        setCreditCardInfo,
        userCartInfo,
        setUserCartInfo,
        orderNumber,
        setOrderNumber,
        language,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
