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

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
}

function generateRandomPairs(students) {
  const shuffledStudents = shuffleArray(students);
  const combinations = [];
  const first = shuffledStudents.slice(0, shuffledStudents.length / 2);
  const second = shuffledStudents.slice(shuffledStudents.length / 2);

  for (let i = 0; i < shuffledStudents.length - 1; i++) {
    const pairs = [];
    let oddOneOut;
    if (second.length > first.length) {
      oddOneOut = second.shift();
    }
    for (let j = 0; j < first.length; j++) {
      pairs.push([first[j], second[j]]);
    }
    if (oddOneOut) {
      pairs[pairs.length - 1].push(oddOneOut);
      second.unshift(oddOneOut);
    }
    const pivot = first.shift();
    first.unshift(second.shift());
    first.unshift(pivot);
    second.push(first.pop());
    combinations.push(pairs);
  }
  console.log(combinations);
  localStorage.setItem('studentCombinations', JSON.stringify(combinations));
}

function randomPairs(students, callback) {
  if (!localStorage.getItem('studentCombinations') || !JSON.parse(localStorage.getItem('studentCombinations')).length) {
    generateRandomPairs(students);
  }
  const combinations = JSON.parse(localStorage.getItem('studentCombinations'));
  const index = Math.floor(Math.random() * combinations.length);
  callback(combinations[index]);
}

export default randomPairs;
