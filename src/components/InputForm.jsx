import { useContext } from "react";
import { AppContext } from "@context/AppContext";

const InputForm = ({
  field,
  form: { touched, errors, setFieldValue, isSubmitting },
  type,
  placeholder,
  className
}) => {
  const { setUserCartInfo } = useContext(AppContext);

  // set the value in userCartInfo state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    setUserCartInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <input
        {...field}
        type={type ? type : 'text'}
        placeholder={placeholder}
        className={`px-4 py-2.5 bg-white w-full text-sm border-b-2 focus:border-primary outline-none custom-shadow-sm ${className} ${isSubmitting ? 'opacity-50' : ''}`}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="text-sm text-red-500">{errors[field.name]}</div>
      )}
    </>
  );
};

export default InputForm;
