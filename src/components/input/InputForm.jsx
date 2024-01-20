const InputForm = ({ label, placeholder, type, className, onChange }) => {
  return (
    <>
      <label className={`form-control w-full ${className}`} >
        <div className="label">
          <span className="label-text">
            {label}
          </span>
        </div>
        <input
          type={type}
          name={label}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full border-slate-300 border-2 focus:border-primary ring-0 p-2 rounded-md focus:outline-none"
        />
      </label>
    </>
  )
}
export default InputForm;
