const InputForm = ({
  field,
  form: { touched, errors },
  type,
  placeholder,
  className
}) => {

  // set the value in localStorage
  const setLSInputValue = (value) => {
    localStorage.setItem(field.name, value);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    field.onChange(event);
    setLSInputValue(value);
  };

  return (
    <>
      <input
        {...field}
        type={type ? type : 'text'}
        placeholder={placeholder}
        className={`px-4 py-3.5 bg-white w-full text-sm border-b-2 focus:border-primary outline-none custom-shadow-sm ${className}`}
        onChange={handleChange}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="text-red-500 text-sm">{errors[field.name]}</div>
      )}
    </>
  );
};

export default InputForm;
