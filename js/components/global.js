const cabecalho = document.querySelector("header");
const menuBotao = document.querySelector(".menu-botao");
const menuPrincipal = document.querySelector("#menu-principal");
const telaPequena = window.matchMedia("(max-width: 900px)");

if (cabecalho && menuBotao && menuPrincipal) {
    function definirMenu(aberto) {
        cabecalho.classList.toggle("menu-aberto", aberto);
        menuBotao.setAttribute("aria-expanded", String(aberto));
        menuBotao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    }

    definirMenu(false);
    menuBotao.hidden = false;
    cabecalho.classList.add("menu-interativo");

    menuBotao.addEventListener("click", () => {
        definirMenu(menuBotao.getAttribute("aria-expanded") !== "true");
    });

    menuPrincipal.addEventListener("click", (evento) => {
        if (evento.target.closest("a") && telaPequena.matches) {
            menuBotao.focus();
            definirMenu(false);
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && menuBotao.getAttribute("aria-expanded") === "true") {
            definirMenu(false);
            menuBotao.focus();
        }
    });

    document.addEventListener("click", (evento) => {
        if (!cabecalho.contains(evento.target)) {
            if (telaPequena.matches && menuPrincipal.contains(document.activeElement)) {
                menuBotao.focus();
            }

            definirMenu(false);
        }
    });

    telaPequena.addEventListener("change", () => {
        const focoNaNavegacao = menuPrincipal.contains(document.activeElement);
        const focoNoBotao = document.activeElement === menuBotao;

        definirMenu(false);

        if (telaPequena.matches && focoNaNavegacao) {
            menuBotao.focus();
        } else if (!telaPequena.matches && focoNoBotao) {
            menuPrincipal.querySelector("a")?.focus();
        }
    });
}
