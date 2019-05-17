import React from 'react';
import PropTypes from 'prop-types';
import './roster.css';

function Roster(props) {
  const { students, setStudents } = props;

  const clickOnStudent = (id) => {
    console.log(id);
    console.log('sup');
    setStudents(students.map((student) => {
      if (student.id === id) {
        console.log('match');
        student.present = !student.present;
      } 
      return student;
    }));
  };
  return (
    <ul>
      {students.map(student => (
        <React.Fragment key={`${student.id}c`}>
          <div className={student.present ? 'button play' : 'button paused'}>{student.name}</div>
          <span onClick={() => { clickOnStudent(student.id); }} onKeyDown={() => { clickOnStudent(student.id); }} tabIndex={0} role="button" />
        </React.Fragment>
      ))}
    </ul>
  );
}

Roster.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    present: PropTypes.bool,
    id: PropTypes.number,
  })).isRequired,
  setStudents: PropTypes.func.isRequired,
};

PropTypes.shape({
  color: PropTypes.string,
  fontSize: PropTypes.number,
});

export default Roster;
