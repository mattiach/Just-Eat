// funzione per tornare sopra la pagina con un'animazione fluida
export function scrollToTopFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};