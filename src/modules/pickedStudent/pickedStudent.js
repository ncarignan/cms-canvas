import React from 'react';
import './pickedStudent.css';

function PickedStudent(props) {
  const { pickedStudent } = props;
  return (
    <h2>{pickedStudent.name}</h2>
  );
}


export default PickedStudent;
