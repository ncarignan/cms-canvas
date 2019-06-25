import React from 'react';
import './canvasKeyForm.css';

import useForm from '../../hooks/useForm';

const superagent = require('superagent');

const API_URL = 'https://canvas-server.herokuapp.com';
// const API_URL = 'http://localhost:3001';

function CanvasKeyForm(props) {
  const { setHasLocalKey } = props;

  const _uploadKey = async (inputs) => {
    console.log(inputs);
    await superagent.post(`${API_URL}/canvas_key`)
      .set('x-access-token', localStorage.getItem('token'))
      .send(inputs);
    // TODO: remove form;
    localStorage.setItem('canvas_api_key', inputs.canvas_api_key);
    setHasLocalKey(true);
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
