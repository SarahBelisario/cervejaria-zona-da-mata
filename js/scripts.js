import "./components/global.js";
const pagina = document.body.dataset.pagina;

switch (pagina) {
    case "home":
        await import("./components/global.js");
        break;
}