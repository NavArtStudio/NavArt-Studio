// Archivo de JavaScript para NavArt Studio
document.addEventListener("DOMContentLoaded", () => {
    console.log("NavArt Studio cargado correctamente.");

    // Efecto de texto dinámico en el subtítulo del Hero
    const dynamicWords = ["Independiente", "de Videojuegos", "Creativo", "2D & 3D"];
    const targetSpan = document.querySelector(".typing-text");
    
    if (targetSpan) {
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = dynamicWords[wordIndex];
            
            if (isDeleting) {
                targetSpan.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                targetSpan.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 60 : 120;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pausa al completar la palabra
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % dynamicWords.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }
});