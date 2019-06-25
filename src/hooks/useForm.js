import { useState } from 'react';

function useForm(handleSubmitCallback) {
  const [inputs, setInputs] = useState({});

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    handleSubmitCallback(inputs);
  };

  const handleInputChange = (e) => {
    /* If you want to access the event properties in an asynchronous way,
     you should call event.persist() on the event, 
     which will remove the synthetic event from the pool 
     and allow references to the event to be retained by user code.
     */
    e.persist(); 
    // TODO: check next line
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
}

export default useForm;
