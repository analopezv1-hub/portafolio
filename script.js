document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    const skillSection = document.getElementById('habilidades');
    const progressBars = document.querySelectorAll('.progress');

    function showProgress() {
        progressBars.forEach(progressBar => {
            const value = progressBar.getAttribute('data-width') || '80%';
            progressBar.style.width = value;
        });
    }

    if (skillSection) {
        window.addEventListener('scroll', () => {
            const sectionPos = skillSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;

            if (sectionPos < screenPos) {
                showProgress();
            }
        });
        
        // Ejecutar por si la sección ya está visible al cargar
        showProgress();
    }

    const form = document.querySelector('form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');

    function validarCampo(input, esValido, mensajeError) {
        let parent = input.parentElement;
        let errorSpan = parent.querySelector('.error-message');

        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            errorSpan.style.color = '#e74c3c';
            errorSpan.style.fontSize = '0.8rem';
            errorSpan.style.display = 'block';
            errorSpan.style.marginTop = '4px';
            parent.appendChild(errorSpan);
        }

        if (esValido) {
            input.style.borderColor = '#2ecc71';
            errorSpan.textContent = '';
        } else {
            input.style.borderColor = '#e74c3c';
            errorSpan.textContent = mensajeError;
        }
    }

    if (nombreInput) {
        nombreInput.addEventListener('input', () => {
            if (nombreInput.value.trim().length >= 3) {
                validarCampo(nombreInput, true, '');
            } else {
                validarCampo(nombreInput, false, 'El nombre debe tener al menos 3 caracteres.');
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(emailInput.value.trim())) {
                validarCampo(emailInput, true, '');
            } else {
                validarCampo(emailInput, false, 'Ingresa un correo electrónico válido.');
            }
        });
    }

    if (mensajeInput) {
        mensajeInput.addEventListener('input', () => {
            if (mensajeInput.value.trim().length >= 10) {
                validarCampo(mensajeInput, true, '');
            } else {
                validarCampo(mensajeInput, false, 'El mensaje debe tener al menos 10 caracteres.');
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const esNombreValido = nombreInput && nombreInput.value.trim().length >= 3;
            const esEmailValido = emailInput && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
            const esMensajeValido = mensajeInput && mensajeInput.value.trim().length >= 10;

            if (esNombreValido && esEmailValido && esMensajeValido) {
                alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
                form.reset();
                [nombreInput, emailInput, mensajeInput].forEach(inp => {
                    if (inp) inp.style.borderColor = '';
                });
            } else {
                alert('Por favor, completa correctamente todos los campos del formulario.');
            }
        });
    }
});