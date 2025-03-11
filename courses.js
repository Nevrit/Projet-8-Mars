document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("https://bdd-mongo-vercel-nine.vercel.app/api/courses");
    const courses = await response.json();

    const coursesContainer = document.querySelector(".row.gy-5");
    coursesContainer.innerHTML = ""; // Clear existing content

    const decodeHtml = (html) => {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    };

    courses.forEach((course) => {
      const decodedLink = decodeHtml(course.link);
      const courseCard = `
        <div class="col-12 col-md-12 col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  ${decodedLink}
                </div>
                <div class="col">
                  <h5 class="card-title">${course.title}</h5>
                  <p class="card-text">${course.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      coursesContainer.insertAdjacentHTML("beforeend", courseCard);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des cours :", error);
  }
});
