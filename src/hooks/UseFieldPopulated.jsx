import { useState, useEffect } from "react";

// custom hook per controllare se i campi dell'oggetto sono popolati
const useFieldsPopulated = (fields) => {
  const [fieldsPopulated, setFieldsPopulated] = useState(false);

  // funzione per controllare se i campi sono popolati
  const checkFields = () => {
    const arePopulated = Object.values(fields).every((value) => value);
    setFieldsPopulated(arePopulated);
  };

  // controllo sui campi ad ogni aggiornamento 
  useEffect(() => {
    checkFields();
  }, [fields]);

  return fieldsPopulated;
};

export default useFieldsPopulated;
