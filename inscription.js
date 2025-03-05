document.addEventListener("DOMContentLoaded", () => {
  const submitInscription = document.getElementById("submitInscription");
  if (submitInscription) {
    submitInscription.addEventListener("click", getValueOnForm);
  } else {
    console.error("Le bouton d'inscription n'a pas été trouvé !");
  }
});

async function getValueOnForm(event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    showError("Les mots de passe ne correspondent pas.");
    return;
  }

  if (!await checkUser(email)) {
    await inscription(nom, email, password);
  }
}

async function inscription(nom, email, password) {
  const user = { nom, email, password };

  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      alert("Inscription réussie !");
      window.location = "abus.html";
      return; // Stopper l'exécution après la redirection
    } else {
      const errorData = await response.json();
      showError(`Erreur : ${errorData.error}`);
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    showError("Erreur lors de l'inscription. Veuillez réessayer plus tard.");
  }
}

async function checkUser(email) {
  try {
    const response = await fetch("http://localhost:5000/api/users/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return true;
    } else {
      const errorData = await response.json();
      showError(`Erreur : ${errorData.error}`);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'utilisateur :", error);
    showError("Erreur lors de la vérification de l'utilisateur.");
    return false;
  }
}

function showError(message) {
  const errorMsg = document.getElementById("errorMessage");
  if (errorMsg) {
    errorMsg.textContent = message;
    errorMsg.style.color = "red";
  } else {
    alert(message);
  }
}
