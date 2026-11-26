document.addEventListener("DOMContentLoaded", () => {
    console.log("Página secundaria de NavArt Studio cargada correctamente.");

    // Animación de aparición suave al hacer scroll
    const observerOptions = {
        threshold: 0.15
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Animación ejecutada solo una vez
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll(".scroll-reveal");
    elementsToReveal.forEach(el => revealOnScroll.observe(el));
});