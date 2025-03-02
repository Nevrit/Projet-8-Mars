const userConnected = document.getElementById('userConnected');
const isConnected = localStorage.getItem('connect');
const userName = localStorage.getItem('name');
const userEmail = localStorage.getItem('email');
const createAccount = document.getElementById('createAccount');
const userLogout = document.getElementById('logout');
const connectionBtn = document.getElementById('connectionBtn');

if (isConnected === "true") {
    connectionBtn.style.display = "none";
    userLogout.style.display = "block";
    userConnected.innerHTML = userName;
    createAccount.innerHTML = "";
}

userLogout.addEventListener('click', function() {
    logout(userEmail);
});

function logout(email) {
    const userData = {
        'email': email
    };
    fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error); // Affiche l'erreur si mot de passe incorrect
        } else {
            alert('Bonsoir');
            localStorage.setItem("connect", data.user.connected.toString()); // ✅ Convertir en chaîne
            console.log("Valeur stockée dans localStorage:", localStorage.getItem("connect")); // ✅ Debugging
            window.location.href = "index.html"; // Redirection vers une autre page
        }
    })
    .catch(error => {
        console.error("Erreur :", error);
    });
    alert('Gesteur')
}

console.log(isConnected);
