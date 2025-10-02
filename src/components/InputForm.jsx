function InputForm({ error, value, onChange, placeholder = "", name }) {
  return (
    <div>
      <input
        className={`bg-gray-200 w-full py-2 px-4 rounded-full ${
          error ? "outline-1 outline-red-500" : "outline-0"
        } `}
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
export default InputForm;
