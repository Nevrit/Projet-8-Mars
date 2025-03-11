import { updateUI } from './abus.js'; // ✅ Importe la fonction updateUI

document.addEventListener("DOMContentLoaded", function () {

    window.onload = updateUI; // ✅ Assure que l'UI est mise à jour au chargement

    const submitBtn = document.getElementById('submitBtn');

    // Vérifie si on est sur la page où submitBtn existe (connection.html)
    if (submitBtn) {

        submitBtn.addEventListener("click", function(event) {
            event.preventDefault();
            const email = document.getElementById("emailConnexion").value;
            const password = document.getElementById("passwordConnexion").value;
            console.log(`Email : ${email} -- password : ${password}`);
            login(email, password);
        });

        function login(email, password) {
            const userData = { 'email': email, 'password': password };
            fetch("https://bdd-mongo-vercel-nine.vercel.app/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error); // Affiche l'erreur si mot de passe incorrect
                } else {
                    localStorage.setItem("name", data.user.name);
                    localStorage.setItem("email", data.user.email);
                    localStorage.setItem("connect", data.user.connected ? "true" : "false");  // ✅ Forcer en string
                    console.log("Valeur stockée dans localStorage:", localStorage.getItem("isConnected")); // ✅ Debugging
                    alert(`Connexion réussie !`);
                    window.location.href = "courses.html"; // Redirection vers une autre page
                }
            })
            .catch(error => {
                console.error("Erreur :", error);
            });
        }
        
    }
});
