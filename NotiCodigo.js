// =========================================================
// NAVART STUDIO - SCRIPT PARA PANEL DE CONTROL Y NOTIFICACIONES
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("Panel de control de NavArt Studio inicializado.");

    // Elementos del DOM
    const menuButtons = document.querySelectorAll(".sidebar-menu button[data-tab]");
    const tabContents = document.querySelectorAll(".tab-content");
    const badgeNoti = document.getElementById("badgeNoti");
    const badgeActu = document.getElementById("badgeActu");
    const notiCards = document.querySelectorAll("#listNoti .noti-card");

    // Elementos del Modal Grande de Proyectos
    const projectModal = document.getElementById("projectModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modalTitle = document.getElementById("modalTitle");
    const modalTag = document.getElementById("modalTag");
    const modalDesc = document.getElementById("modalDesc");
    const modalProgressBar = document.getElementById("modalProgressBar");
    const modalProgressText = document.getElementById("modalProgressText");
    const modalFeatures = document.getElementById("modalFeatures");
    const modalStatus = document.getElementById("modalStatus");

    // =========================================================
    // 1. CÁLCULO DE TIEMPO REAL TRANSCURRIDO
    // =========================================================
    function calcularTiempoReal() {
        const timeElements = document.querySelectorAll(".noti-time[data-time]");
        
        timeElements.forEach(el => {
            const timeString = el.getAttribute("data-time");
            if (!timeString) return;

            const fechaPublicacion = new Date(timeString);
            const ahora = new Date();
            const segundos = Math.floor((ahora - fechaPublicacion) / 1000);

            if (isNaN(segundos) || segundos < 0) {
                el.textContent = "Hace un momento";
                return;
            }

            if (segundos < 60) {
                el.textContent = "Hace un momento";
            } else if (segundos < 3600) {
                const minutos = Math.floor(segundos / 60);
                el.textContent = `Hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
            } else if (segundos < 86400) {
                const horas = Math.floor(segundos / 3600);
                el.textContent = `Hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
            } else if (segundos < 2592000) {
                const dias = Math.floor(segundos / 86400);
                el.textContent = `Hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
            } else {
                const meses = Math.floor(segundos / 2592000);
                el.textContent = `Hace ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
            }
        });
    }

    calcularTiempoReal();
    setInterval(calcularTiempoReal, 60000);

    // =========================================================
    // 2. GESTIÓN DE INSIGNIAS (LOCALSTORAGE)
    // =========================================================
    const notiVistas = localStorage.getItem("navart_noti_vistas");
    const actuVistas = localStorage.getItem("navart_actu_vistas");

    if (notiVistas === "true") {
        if (badgeNoti) badgeNoti.style.display = "none";
        notiCards.forEach(card => card.classList.remove("unread"));
    } else {
        let totalNoti = notiCards.length;
        if (totalNoti > 99) totalNoti = "99+";
        if (badgeNoti) {
            badgeNoti.textContent = totalNoti;
            badgeNoti.style.display = "inline-block";
        }
    }

    if (actuVistas === "true") {
        if (badgeActu) badgeActu.style.display = "none";
    } else {
        if (badgeActu) {
            badgeActu.textContent = "NUEVO";
            badgeActu.style.display = "inline-block";
        }
    }

    // =========================================================
    // 3. CAMBIO DE PESTAÑAS
    // =========================================================
    menuButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTabId = btn.getAttribute("data-tab");

            menuButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            btn.classList.add("active");
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add("active");
            }

            if (targetTabId === "tab-noti") {
                localStorage.setItem("navart_noti_vistas", "true");
                if (badgeNoti && badgeNoti.style.display !== "none") {
                    badgeNoti.style.transition = "opacity 0.3s ease";
                    badgeNoti.style.opacity = "0";
                    setTimeout(() => { badgeNoti.style.display = "none"; }, 300);
                }
                notiCards.forEach(card => card.classList.remove("unread"));
            }

            if (targetTabId === "tab-actu") {
                localStorage.setItem("navart_actu_vistas", "true");
                if (badgeActu && badgeActu.style.display !== "none") {
                    badgeActu.style.transition = "opacity 0.3s ease";
                    badgeActu.style.opacity = "0";
                    setTimeout(() => { badgeActu.style.display = "none"; }, 300);
                }
            }
        });
    });

    // =========================================================
    // 4. PANTALLA MODAL GRANDE PARA FUTUROS PROYECTOS
    // =========================================================
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        card.addEventListener("click", () => {
            // Extraer datos del proyecto desde atributos HTML
            const title = card.getAttribute("data-title");
            const tag = card.getAttribute("data-tag");
            const progress = card.getAttribute("data-progress");
            const desc = card.getAttribute("data-desc");
            const features = card.getAttribute("data-features") ? card.getAttribute("data-features").split(",") : [];
            const status = card.getAttribute("data-status");

            // Rellenar la ventana modal con la información
            modalTitle.textContent = title;
            modalTag.textContent = tag;
            modalDesc.textContent = desc;
            modalProgressBar.style.width = progress;
            modalProgressText.textContent = `Progreso actual: ${progress}`;
            modalStatus.textContent = status;

            // Rellenar lista de características
            modalFeatures.innerHTML = "";
            features.forEach(feat => {
                const li = document.createElement("li");
                li.textContent = feat.trim();
                modalFeatures.appendChild(li);
            });

            // Mostrar el Modal
            projectModal.classList.add("active");
        });
    });

    // Cerrar Modal al hacer clic en el botón X o fuera del contenedor
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            projectModal.classList.remove("active");
        });
    }

    if (projectModal) {
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove("active");
            }
        });
    }
});