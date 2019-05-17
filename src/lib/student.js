const superagent = require('superagent');

// TODO: import from helper module

class Student {
  constructor(student = {}) {
    this.name = student.studentName || student.name;
    this.projects = student.projects || [];
    this.collaborations = student.collaborations || {};
    this.picked = student.picked || 0;
    this.weight = student.weight || 1;
    this.unavailabe = student.unavailable || false;
    this.availableToPair = student.availableToPair || true;
    this.availableToWhiteBoard = student.availableToWhiteBoard || true;
    this.present = student.present || true;
    this.id = student.id;
  }
}

const _getStudentsFromLS = (handler) => {
  return JSON.parse(localStorage.getItem('students')) 
    ? handler(JSON.parse(localStorage.getItem('students'))) 
    : handler([]);
};

const _getStudentsFromAPI = (handler, destination) => {
  console.log(destination);
  // .set('Authorization', `Bearer ${process.env.CANVAS_API_URL}`)
  superagent.get(destination)
    .set('x-access-token', localStorage.getItem('token')) // TODO: save access token, require login
    .then((result) => {
      const students = result.body.map(student => new Student(student));
      localStorage.setItem('students', JSON.stringify(students));
      console.log('from api new students', students);
      return handler(students);
    })
    .catch(console.error);
};


Student.get = (handler, destination) => {
  if (destination === 'LS') {
    return _getStudentsFromLS(handler);
  }
  return _getStudentsFromAPI(handler, destination);
};


export default Student;
