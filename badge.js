const form = document.forms["badgeForm"];
const badge = new BadgeGenerator("badge-example", {
    exportHeight: 2048,
    exportWidth: 2048,
    exportName: "image",
    downloadBtnId: "exportBtn"
});
function dessinerBadge(e){
    if (e){
        e.preventDefault();
    }
    badge.clear();
    const mode = (form["badgeMode"].value)
    const rect = new BadgeRectLayer({
        height: 100,
        width: 100,
        top: 0,
        left: 0,
        color:(mode=="Clair")? "#60241E" :  "white"
    });
    badge.addLayer(rect);
    
    const nom = new BadgeTextLayer(form["badgePrenom"].value, "Avigea", {
        size: 10,
        color: (mode=="Clair")? "white" : "#60241E",
        top: (h, w) => 5,
        left: (h, w) => 5
    });
    badge.addLayer(nom);
    
    const role = new BadgeTextLayer(form["badgeRole"].value, "Montserrat", {
        size: 6,
        color: (mode=="Clair")? "white" :  "#60241E",
        bottom: (h, w) => 5,
        right: (h, w) => 5
    });
    badge.addLayer(role);

    const url = URL.createObjectURL(form["badgePhoto"].files[0]);
    const img = new BadgeImageLayer(url, {
        width: 100,
        left: (h, w) => 50 - w/2,
        top: (h, w) => 50 - h/2
    });
    badge.addLayer(img);

    const logo = new BadgeImageLayer((mode=="Clair")? "images/8mars-logo-light.png" : "images/8mars-logo-dark.png", {
        width: 20,
        right: (h, w) => 5,
        top: (h, w) => 5
    });
    badge.addLayer(logo);
}
form.addEventListener("input", dessinerBadge);
dessinerBadge();









