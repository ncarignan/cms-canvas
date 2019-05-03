import React, { useState, useEffect } from 'react';
import './App.css';

// Modules
import Roster from '../roster/roster';
import Courses from '../courses/courses';
import Login from '../login/login';
import CanvasKeyForm from '../canvasKeyForm/canvasKeyForm';
import RandomizerButtons from '../randomizerButtons/randomizerButtons';

// Lib
import Course from '../../lib/course';

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    Course.get(setCourses, 'LS');
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
          <RandomizerButtons />
          {!localStorage.getItem('token') && <Login />}
          {!localStorage.getItem('canvas_api_key') && <CanvasKeyForm />}
        </div>
        <div />
      </main>
      <footer />
    </div>
  );
}

export default App;
