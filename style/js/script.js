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


/* SECTION 1 */
    
document.querySelectorAll('.img-container').forEach(item => {
    let overlay = item.querySelector('.overlay');

    // Création de l'élément texte pour chaque image
    let textOverlay = document.createElement('div');
    textOverlay.textContent = overlay.getAttribute('data-text'); // Récupère le texte spécifique à chaque image
    textOverlay.style.color = 'white'; // Couleur du texte
    textOverlay.style.fontSize = '20px'; // Taille du texte
    textOverlay.style.fontWeight = 'bold'; // Style du texte
    textOverlay.style.position = 'absolute'; // Pour le placer au centre
    textOverlay.style.top = '50%'; // Centrage vertical
    textOverlay.style.left = '50%'; // Centrage horizontal
    textOverlay.style.transform = 'translate(-50%, -50%)'; // Centrer parfaitement
    textOverlay.style.opacity = 0; // Rendre le texte invisible au départ
    textOverlay.style.transition = 'opacity 0.3s ease'; // Transition douce

    overlay.appendChild(textOverlay); // Ajout du texte à l'overlay

    // Survol de l'image
    item.addEventListener('mouseover', () => {
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-50'); // Assombrit l'image au survol
        textOverlay.style.opacity = 1; // Affiche le texte
    });

    // Sortie du survol
    item.addEventListener('mouseout', () => {
        overlay.classList.remove('opacity-50');
        overlay.classList.add('opacity-0'); // Supprime l'effet
        textOverlay.style.opacity = 0; // Masque le texte
    });
});

/* FIN SECTION 1 */



