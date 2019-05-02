const superagent = require('superagent');

// TODO: import from helper module

class Course {
  constructor(course = {}) {
    this.name = course.courseName || course.name;
    this.id = course.id;
    this.students = [];
    this.selected = false;
  }
}

const _getCoursesFromLS = (handler) => {
  return JSON.parse(localStorage.getItem('courses')) 
    ? handler(JSON.parse(localStorage.getItem('courses'))) 
    : handler([]);
};

const _getCoursesFromAPI = (handler, destination) => {
  console.log(destination);
  return superagent.post(destination)
    .send({
      requests: [{
        target: 'https://canvas.instructure.com/api/v1/courses',
        queries: [],
      }], 
    })
    .set('x-access-token', localStorage.getItem('token')) // TODO: save access token, require login
    .then((result) => {
      console.log('got courses from api');
      const courses = result.body.map(course => new Course(course));
      localStorage.setItem('courses', JSON.stringify(courses));
      console.log('from api new courses', courses);
      return handler(courses);
    })
    .catch(console.error);
};


Course.get = (handler, destination) => {
  if (destination === 'LS') {
    return _getCoursesFromLS(handler);
  }
  return _getCoursesFromAPI(handler, destination);
};


export default Course;
