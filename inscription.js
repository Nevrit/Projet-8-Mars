const submitInscription = document.getElementById("submitInscription");
const errorMessage = document.getElementById("errorMessage");

if (!submitInscription) {
  console.error("Bouton de soumission introuvable !");
}

submitInscription.addEventListener("click", async function (event) {
  console.log("Bouton cliqué");
  event.preventDefault();

  // Récupération des valeurs
  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Logs de débogage
  console.log("Valeurs récupérées:", {
    nom,
    prenom,
    email,
    passwordLength: password.length,
    confirmPasswordLength: confirmPassword.length,
  });

  // Vérifications initiales
  if (password !== confirmPassword) {
    console.error("Mots de passe non concordants");
    errorMessage.innerHTML = "Les mots de passe ne correspondent pas.";
    return;
  }

  try {
    // Vérifier d'abord si l'utilisateur existe
    const userExists = await checkUser(email);
    console.log(userExists);

    if (!userExists) {
      // Si l'utilisateur n'existe pas, procéder à l'inscription
      await inscription(nom, email, confirmPassword);
    }
    errorMessage.innerHTML = "L'utilisateur existe déjà.";
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    errorMessage.innerHTML = "Une erreur est survenue. Veuillez réessayer.";
  }
});

async function inscription(nom, email, password) {
  console.log("Tentative d'inscription");
  const user = {
     "name" : nom, 
     "email" : email, 
     "password" : password 
    };
  try {
    const response = await fetch("https://bdd-mongo-vercel-nine.vercel.app/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    console.log("Réponse du serveur:", response.status);
    const data = await response.json();

    if (response.ok) {
      alert("Inscription réussie !");
      localStorage.setItem("email", data.email);
      localStorage.setItem("connect", true);
      localStorage.setItem("name", nom);
      window.location = "abus.html";
    } else {
      console.error("Erreur d'inscription:", data.error);
      errorMessage.innerHTML = data.error;
    }
  } catch (error) {
    console.error("Erreur de fetch:", error);
    errorMessage.innerHTML =
      "Erreur lors de l'inscription. Veuillez réessayer plus tard.";
  }
}

async function checkUser(email) {
  try {
    const response = await fetch("https://bdd-mongo-vercel-nine.vercel.app/api/users/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      // La réponse est ok, on vérifie le champ exists
      console.log("Données de vérification:", data);
      return data.exists;
    } else {
      // Gestion des erreurs
      alert("Erreur de vérification:", data.error);
      errorMessage.innerHTML = data.error || "Erreur de vérification";
      return data.exists;
    }
  } catch (error) {
    alert("Erreur de fetch:", error);
    errorMessage.innerHTML = "Erreur lors de la vérification de l'utilisateur.";
  }
}