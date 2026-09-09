const pagina = document.body.dataset.pagina;

switch (pagina) {
    case "home":
        await import("./components/home.js");
        break;
}