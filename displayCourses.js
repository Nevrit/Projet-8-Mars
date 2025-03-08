const displayCourses = localStorage.getItem('connect');
const coursesLink = document.getElementById('coursesLink');

if (displayCourses === 'true') {
    coursesLink.style.display = 'block';
} else {
    coursesLink.style.display = 'none';
}