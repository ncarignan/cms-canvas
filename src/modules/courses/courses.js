import React from 'react';
import PropTypes from 'prop-types';
import filterKeys from '../../lib/filterKeys';
import './courses.css';

import Course from '../../lib/course';
import Student from '../../lib/student';

const API_URL = 'https://canvas-server.herokuapp.com';
// const API_URL = 'http://localhost:3001';


function Roster(props) {
  const { courses, setCourses, setStudents } = props;

  const clickOnCourse = (name) => {
    console.log(name);
    if (name === 'get courses') {
      Course.get(setCourses, `${API_URL}/canvas`);
    }
    
    setCourses(courses.map((course) => {
      course.selected = false;
      if (course.name === name) {
        course.selected = true;
        Student.get(setStudents, `${API_URL}/students/${course.id}`);
        localStorage.setItem('studentCombinations', JSON.stringify([]));
      } 
      return course;
    }));
  };
  return (
      
    <select
      onClick={(e) => { clickOnCourse(e.target.value); }}
      onKeyDown={filterKeys(['enter'], (e) => { clickOnCourse(e.target.value); })}
    >
      <option key="get courses">
        get courses
      </option>
      {courses.map(course => (
        <option key={course.id}>
          {course.name}
        </option>
      ))}
    </select>
  );
}

Roster.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    selected: PropTypes.bool,
  })).isRequired,
  setCourses: PropTypes.func.isRequired,
  setStudents: PropTypes.func.isRequired,
};

PropTypes.shape({
  color: PropTypes.string,
  fontSize: PropTypes.number,
});

export default Roster;
