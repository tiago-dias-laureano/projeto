const Input = ({ label, zodName, type, placeholder, register }) => (
  <>
    <label htmlFor={label} className="label">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="input"
      {...register(zodName)}
    />
  </>
);

export default Input;
