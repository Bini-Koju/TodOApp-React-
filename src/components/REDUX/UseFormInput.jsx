import { useState } from "react";


function UseFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function reset() {
    setValue(initialValue);
  }

  return {
    value,
    onChange: handleChange,
    reset,
  };
}

export default UseFormInput;
