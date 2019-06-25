import React from 'react';
import PropTypes from 'prop-types';
import filterKeys from '../../lib/filterKeys';

import './randomizerButtons.css';

import randomOne from '../../lib/randomOne';
import randomPairs from '../../lib/randomPairs';

function RandomizerButtons(props) {
  const {
    students, setStudents, setPickedStudent, setPickedPairs, 
  } = props;

  const pickStudentCallback = (student) => {
    let i = 0;
    while (i < students.length) {
      if (students[i].name === student.name) {
        students[i] = student;
        setPickedStudent(student);
        break;
      } 
      i += 1;
    }
    setPickedPairs(null);
    setStudents(students);
  };

  const pickPairsCallback = (pairs) => {
    setPickedStudent(null);
    setPickedPairs(pairs);
  };

  return (
    <div className="pairs-and-students-buttons deck">
      <span 
        className="clicker"
        tabIndex="0"
        role="button"
        onClick={() => randomPairs(students, pickPairsCallback)}
        onKeyDown={filterKeys(['enter'], () => randomPairs(students, pickPairsCallback))}
      >
      Pairs
      </span>
      <span 
        className="clicker" 
        tabIndex="0"
        role="button"
        onClick={() => randomOne(students, pickStudentCallback)}
        onKeyDown={filterKeys(['enter'], () => randomOne(students, pickStudentCallback))}

      >
Next!
      </span>
    </div>
  );
}

RandomizerButtons.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  setStudents: PropTypes.func.isRequired,
};


export default RandomizerButtons;
