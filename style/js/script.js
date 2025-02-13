document.addEventListener("DOMContentLoaded", function () {
    const circles = document.querySelectorAll(".progress-circle");

    circles.forEach(circle => {
        let percentage = circle.getAttribute("data-percentage");
        let degrees = (percentage / 100) * 360;
        circle.style.background = `conic-gradient(#ff3d7f ${degrees}deg, #ffffff ${degrees}deg)`;
    });

    const rows = document.querySelectorAll(".row");

    function checkVisibility() {
        rows.forEach(row => {
            const elements = row.querySelectorAll("div");
            elements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight * 0.85) {
                    el.classList.add("visible");
                }
            });
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Vérifier la visibilité au chargement


});
