function InputField({ value, setItem }) {
  return (
    <input
      type="text"
      placeholder="Enter the name"
      value={value}
      onChange={(e) => setItem(e.target.value)}
    />
  );
}

export default InputField;
