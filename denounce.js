const validateDenouce = document.getElementById("validateDenouce");

if (validateDenouce) {
  validateDenouce.addEventListener("click", (event) => {
    event.preventDefault();
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const adress = document.getElementById("adress").value;
    const street = document.getElementById("street").value;
    const abuseType = document.getElementById("abuseType").value;
    const message = document.getElementById("message").value;
    console.log(
      `{
        nom: ${nom},
        prenom: ${prenom},
        adress: ${adress},
        street: ${street},
        abuseType: ${abuseType},
        message: ${message}
      }`
    );
    validateBtn(nom, prenom, adress, street, abuseType, message);
  });
}

function validateBtn(nom, prenom, adress, street, abuseType, message) {
  const data = {
    "name": nom,
    "lastName": prenom,
    "adress": adress,
    "street": street,
    "abuseType": abuseType,
    "message": message,
  };

  fetch("https://bdd-mongo-vercel-nine.vercel.app/api/denounce", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        alert("Dénonciation ajoutée avec succès");
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
}
