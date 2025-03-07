const form = document.forms["badgeForm"];

const badge = new BadgeGenerator("badge-example", {
    exportHeight: 2048,
    exportWidth: 2048,
    exportName: "image",
    downloadBtnId: "exportBtn"
});

function dessinerBadge(e) {
    if (e) {
        e.preventDefault();
    }

    badge.layers = [];
    const rect = new BadgeRectLayer({
        height: 100,
        width: 100,
        top: 0,
        left: 0,
        color: "#AB4459"
    });
    badge.addLayer(rect);
    
    const nom = new BadgeTextLayer(form["badgePrenom"].value, "Avigea", {
        size: 10,
        color: "white",
        top: (h, w) => 5,
        left: (h, w) => 5
    });
    badge.addLayer(nom);
    
    const role = new BadgeTextLayer(form["badgeRole"].value, "Montserra", {
        size: 10,
        color: "white",
        bottom: (h, w) => 5,
        right: (h, w) => 5
    });
    badge.addLayer(role);
    


    const url = URL.createObjectURL(form["badgePhoto"].files[0])
    const img = new BadgeImageLayer(url, {
        width: 100,
        left: (h, w) => 50 - w/2,
        top: (h, w) => 50 - h/2
    });
    badge.addLayer(img);
};
form.addEventListener("submit", dessinerBadge);

dessinerBadge();