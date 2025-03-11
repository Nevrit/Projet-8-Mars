const userConnected = document.getElementById('userConnected');
const createAccount = document.getElementById('createAccount');
const userLogout = document.getElementById('logout');
const connectionBtn = document.getElementById('connectionBtn');

export function updateUI() {
    let isConnected = localStorage.getItem('connect') === "true"; // ✅ Converti en booléen
    const userName = localStorage.getItem('name') || "Utilisateur";
    

    if (isConnected) {
        if (connectionBtn) connectionBtn.style.display = "none";
        if (userLogout) userLogout.style.display = "block";
        if (userConnected) userConnected.innerHTML = userName;
        if (createAccount) createAccount.innerHTML = "";
    } else {
        if (connectionBtn) connectionBtn.style.display = "block";
        if (userLogout) userLogout.style.display = "none";
        if (userConnected) userConnected.innerHTML = "";
        if (createAccount) createAccount.innerHTML = "Créer un compte";
    }
    console.log("isConnected :", isConnected);
    
}

window.onload = updateUI; // ✅ Assure que l'UI est mise à jour au chargement

if (userLogout) {
    userLogout.addEventListener('click', function(event) {
        event.defaultPrevented;
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            logout(userEmail);
        }
    });
}

function logout(email) {
    const userData = { 'email': email };

    fetch("https://bdd-mongo-vercel-nine.vercel.app/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Réponse de l'API logout :", data); // ✅ Vérifie la réponse
        alert("Réponse de l'API logout :", data)
        if (data.error) {
            console.error("Erreur de déconnexion :", data.error);
        } else {
            alert("Réponse de l'API logout :", data)
            localStorage.setItem("connect", data.user.isConnected); // ✅ Force la conversion en chaîne
            window.location.href = "index.html"; // ✅ La redirection rechargera la page, donc pas besoin de updateUI()
        }
    })
    .catch(error => {
        console.error("Erreur de déconnexion :", error);
    });
}
// ✅ Code de déconnexion fonctionnel

export default updateUI; // ✅ Exporte la fonction pour les tests
// ✅ Code de déconnexion fonctionnel