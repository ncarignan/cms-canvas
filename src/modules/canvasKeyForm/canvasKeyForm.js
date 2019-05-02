import React from 'react';
import './canvasKeyForm.css';

import useForm from '../../hooks/useForm';

const superagent = require('superagent');

function CanvasKeyForm() {
  const _uploadKey = async (inputs) => {
    console.log(inputs);
    await superagent.post('http://localhost:3001/canvas_key')
      .set('x-access-token', localStorage.getItem('token'))
      .send(inputs);
    // TODO: remove form;
    localStorage.setItem('canvas_api_key', inputs.canvas_api_key);
    return null;
  };
  const { inputs, handleInputChange, handleSubmit } = useForm(_uploadKey);
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="canvas_api_key">
        Add your api key here
        <input type="text" name="canvas_api_key" onChange={handleInputChange} value={inputs.name} required />
      </label>
      
        
      <input type="submit" value="add key" />
    </form>
  );
}


export default CanvasKeyForm;
