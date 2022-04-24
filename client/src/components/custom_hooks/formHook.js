import { useState } from "react";

function useFormFields(initialState) {

  //* {userid, password}
  const [fields, setValues] = useState(initialState);

  const toggleInput = (event) => {
    // console.log(event.target.name);
    //* I think this is basically saying set each
    //* element as the new updated one
    setValues({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  return [fields, toggleInput];
}

export default useFormFields;