/*
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
  */

function randomOne(students, callback) {
  const minPicked = students.reduce((a, c) => (a < c.picked ? a : c.picked), students[0].picked);
  console.log(`min picked: ${minPicked}`);
  const filtered = students.filter(c => c.picked === minPicked);
  const student = filtered[Math.floor(Math.random() * filtered.length)];
  student.picked += 1;
  callback(student);
}

export default randomOne;
