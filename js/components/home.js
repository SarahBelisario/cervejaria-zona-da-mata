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

const linksSecoes = document.querySelectorAll('#menu-principal a[href^="#"]');

const secoesMenu = Array.from(linksSecoes, (link) => ({
    link,
    secao: document.getElementById(link.hash.slice(1))
})).filter((item) => item.secao);

function atualizarLinkAtivo() {
    if (!secoesMenu.length) return;

    const linhaReferencia = window.innerHeight * 0.3;
    let itemAtivo = secoesMenu[0];

    secoesMenu.forEach((item) => {
        if (item.secao.getBoundingClientRect().top <= linhaReferencia) {
            itemAtivo = item;
        }
    });

    const alturaPagina = document.documentElement.scrollHeight;
    const paginaTemRolagem = alturaPagina > window.innerHeight + 2;
    const fimDaPagina = window.scrollY + window.innerHeight >= alturaPagina - 2;

    if (paginaTemRolagem && fimDaPagina) {
        itemAtivo = secoesMenu[secoesMenu.length - 1];
    }

    linksSecoes.forEach((link) => {
        if (link === itemAtivo.link) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

let atualizacaoPendente = false;

function agendarAtualizacao() {
    if (atualizacaoPendente) return;

    atualizacaoPendente = true;

    window.requestAnimationFrame(() => {
        atualizarLinkAtivo();
        atualizacaoPendente = false;
    });
}

window.addEventListener("scroll", agendarAtualizacao, { passive: true });
window.addEventListener("resize", agendarAtualizacao);
window.addEventListener("load", agendarAtualizacao);
window.addEventListener("hashchange", agendarAtualizacao);

atualizarLinkAtivo();