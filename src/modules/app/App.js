import React, { useState, useEffect } from 'react';
import './App.css';

// Modules
import Roster from '../roster/roster';
import Courses from '../courses/courses';
import PickedStudent from '../pickedStudent/pickedStudent';
import PickedPairs from '../pickedPairs/pickedPairs';
import Login from '../login/login';

import CanvasKeyForm from '../canvasKeyForm/canvasKeyForm';
import RandomizerButtons from '../randomizerButtons/randomizerButtons';

// Lib
import Course from '../../lib/course';
import Student from '../../lib/student';

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [pickedPairs, setPickedPairs] = useState(null);
  const [pickedStudent, setPickedStudent] = useState(null);

  useEffect(() => {
    Course.get(setCourses, 'LS');
    Student.get(setStudents, 'LS');
  }, []);

  return (
    <div className="App">
      <header className="center-text"> 
        <h1>Classroom Manager</h1>
      </header>
      <main>
        <div>
          <Courses courses={courses} setCourses={setCourses} setStudents={setStudents} />
          <Roster students={students} setStudents={setStudents} />
        </div>
        <div>
          <RandomizerButtons
            students={students}
            setStudents={setStudents}
            setPickedStudent={setPickedStudent} 
            setPickedPairs={setPickedPairs} 
          />
          {!localStorage.getItem('token') && <Login />}
          {!localStorage.getItem('canvas_api_key') && <CanvasKeyForm />}
          {pickedStudent && (
          <PickedStudent
            pickedStudent={pickedStudent}
            setPickedStudent={setPickedStudent} 
          />
          )}
          {pickedPairs && (
          <PickedPairs pickedPairs={pickedPairs} />
          )}
        </div>
        <div />
      </main>
      <footer />
    </div>
  );
}

export default App;
