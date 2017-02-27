/* Task Description */
/* 
 * Create a module for a Telerik Academy course
 * The course has a title and presentations
 * Each presentation also has a title
 * There is a homework for each presentation
 * There is a set of students listed for the course
 * Each student has firstname, lastname and an ID
 * IDs must be unique integer numbers which are at least 1
 * Each student can submit a homework for each presentation in the course
 ----------------------------------------------
 * Create method init
 * Accepts a string - course title
 * Accepts an array of strings - presentation titles
 * Throws if there is an invalid title
 * Titles do not start or end with spaces
 * Titles do not have consecutive spaces
 * Titles have at least one character
 * Throws if there are no presentations
 ------------------------------------------------
 * Create method addStudent which lists a student for the course
 * Accepts a string in the format 'Firstname Lastname'
 * Throws if any of the names are not valid
 * Names start with an upper case letter
 * All other symbols in the name (if any) are lowercase letters
 * Generates a unique student ID and returns it
 ----------------------------------------------------
 * Create method getAllStudents that returns an array of students in the format:
 * {firstname: 'string', lastname: 'string', id: StudentID}
 ---------------------------------------------------
 * Create method submitHomework
 * Accepts studentID and homeworkID
 * homeworkID 1 is for the first presentation
 * homeworkID 2 is for the second one
 * ...
 * Throws if any of the IDs are invalid
 -----------------------------------------------
 * Create method pushExamResults
 * Accepts an array of items in the format {StudentID: ..., Score: ...}
 * StudentIDs which are not listed get 0 points
 * Throw if there is an invalid StudentID
 * Throw if same StudentID is given more than once ( he tried to cheat (: )
 * Throw if Score is not a number
 ----------------------------------------------------
 * Create method getTopStudents which returns an array of the top 10 performing students
 * Array must be sorted from best to worst
 * If there are less than 10, return them all
 * The final score that is used to calculate the top performing students is done as follows:
 * 75% of the exam result
 * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
 */

function solve() {
  var Course = (function() {
    function init(title, presentations) {
      validateTitle(title);
      validatePresentation(presentations);

      this.courseTitle = title;
      this.coursePresentation = presentations;
      this.uniqueId = 0;
      this.courseStudents = [];
      this.studentHomeworks = {};
      this.examResults = [];

      return this;
    }

    function addStudent(name) {
      var student = {};
      studentNames = name.split(' ');
      if (studentNames.length !== 2) {
        throw 'Error';
      }
      validateStudentNames(studentNames[0]);
      student.firstname = studentNames[0];
      validateStudentNames(studentNames[1])
      student.lastname = studentNames[1];
      student.id = ++this.uniqueId;

      this.courseStudents.push(student);
      return this.uniqueId;
    }

    function getAllStudents() {
      return this.courseStudents.slice(0);
    }

    function submitHomework(studentID, homeworkID) {
      let isStudentIDValid = studentID > 0 && studentID <= this.courseStudents.length && studentID % 1 === 0; // <- Is a whole number
      let isHomeworkIDValid = homeworkID > 0 && homeworkID <= this.coursePresentations.length;

      if (!isStudentIDValid || !isHomeworkIDValid) {
        throw new Error('Wrong ID provided! Try again!');
      }

      if (!this.studentHomeworks[studentID]) {
        this.studentHomeworks[studentID] = 0;
      }

      this.studentHomeworks[studentID] += 1;
    }

    function pushExamResults(results) {
      for (let student of results) {
        let isStudentIDValid = student.StudentID > 0 && student.StudentID <= this.courseStudents.length;
        let isScoreValid = student.score && typeof student.score === 'number';

        if (!isStudentIDValid) {
          throw new Error('Invalid student ID in exam results');
        }

        if (!isScoreValid) {
          throw new Error('Student exam score is not valid!');
        }
      }

      if (hasDuplicateStudentID(results)) {
        throw new Error('Someone is trying to cheat!');
      }
      this.examResults = results;
    }

    function getTopStudents() {}

    //Healper function

    function validateTitle(title) {
      if (title.match(/^\s|\s$/)) {
        throw 'Error';
      }
      if (title.match(/\s\s/)) {
        throw 'Error';
      }
      if (title.length < 1) {
        throw 'Error';
      }
    }

    function validatePresentation(presentations) {
      if (!presentations) {
        throw 'Error';
      } else if (presentations.length === 0) {
        throw 'Error';
      }
      presentations.forEach(title => validateTitle(title));

    }

    function validateStudentNames(str) {
      if (!str.match(/^[A-Z][a-z]+/)) {
        throw 'Error';
      }
    }

    function hasDuplicateStudentID(results) {
      results = results.sort((a, b) => a.StudentID - b.StudentID);

      for (var i = 0; i < results.length - 1; i += 1) {
        if (results[i].StudentID === results[i + 1].StudentID) {
          return true;
        }
      }

      return false;
    }

    return {
      init: init,
      addStudent: addStudent,
      getAllStudents: getAllStudents,
      submitHomework: submitHomework,
      pushExamResults: pushExamResults,
      getTopStudents: getTopStudents
    }
  }());
  return Course;
}

module.exports = solve;

Course = solve();
var course = Course.init('OOP', ['JS', 'C#']);
var id = course.addStudent('Descriptioneco Karadjov');
var id1 = course.addStudent('Ivan Kostov');
console.log(course.getAllStudents());