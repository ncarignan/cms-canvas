import React from 'react';
import PropTypes from 'prop-types';
import './courses.css';

import Course from '../../lib/course';
import Student from '../../lib/student';


function Roster(props) {
  const { courses, setCourses, setStudents } = props;

  const clickOnCourse = (name) => {
    console.log(name);
    if (name === 'get courses') {
      Course.get(setCourses, 'http://localhost:3001/canvas');
    }
    
    setCourses(courses.map((course) => {
      course.selected = false;
      if (course.name === name) {
        course.selected = true;
        Student.get(setStudents, `http://localhost:3001/students/${course.id}`);
      } 
      return course;
    }));
  };
  return (
      
    <select
      onClick={(e) => { clickOnCourse(e.target.value); }}
      onKeyDown={(e) => { clickOnCourse(e.target.value); }}
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
