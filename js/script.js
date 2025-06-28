document.addEventListener('DOMContentLoaded', () => {

    // --- Menú Móvil ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navUl = document.querySelector('nav ul');

    if (mobileToggle && navUl) {
        mobileToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });
    }

    // --- Smooth Scrolling para todos los enlaces ancla ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; // Altura del header fijo
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                }
            }
        });
    });

    // --- Ventana Modal (Formulario) ---
    const modal = document.getElementById('form-modal');
    if (modal) {
        const openModalBtns = document.querySelectorAll('#open-form, #open-form-from-calc');
        const closeModalBtn = document.getElementById('close-modal');

        const openModal = () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
        closeModalBtn.addEventListener('click', closeModal);
        window.addEventListener('click', e => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
        });
    }

    // --- Blog Expandible ---
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const content = document.getElementById(targetId);
            if (content) {
                const isExpanded = content.classList.toggle('expanded');
                button.textContent = isExpanded ? 'Leer menos' : 'Leer más';
            }
        });
    });

    // --- Calculadora de Precios ---
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const weightInput = document.getElementById('weight');
            const resultContainer = document.getElementById('result-container');
            const calculatedPriceSpan = document.getElementById('calculated-price');
            const weight = parseFloat(weightInput.value);

            if (!isNaN(weight) && weight > 0) {
                const pricePerKg = 240;
                const totalPrice = weight * pricePerKg;
                calculatedPriceSpan.textContent = totalPrice.toFixed(2);
                resultContainer.classList.remove('hidden'); // Usamos la clase en vez de style
                resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert('Por favor, introduce un peso válido.');
            }
        });
    }

    // --- Funcionalidad para el Cambio de Tema (Modo Oscuro) con Memoria ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const body = document.body;
        const icon = themeToggle.querySelector('i');
        const sunIcon = 'fa-sun';
        const moonIcon = 'fa-moon';

        // Función para aplicar el tema guardado al cargar la página
        const applySavedTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                body.setAttribute('data-theme', 'dark');
                icon.classList.remove(moonIcon);
                icon.classList.add(sunIcon);
            } else {
                body.removeAttribute('data-theme');
                icon.classList.remove(sunIcon);
                icon.classList.add(moonIcon);
            }
        };

        themeToggle.addEventListener('click', () => {
            const isDark = body.toggleAttribute('data-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Guarda la preferencia
            
            // Cambiar el icono
            if (isDark) {
                icon.classList.remove(moonIcon);
                icon.classList.add(sunIcon);
            } else {
                icon.classList.remove(sunIcon);
                icon.classList.add(moonIcon);
            }
        });

        // Aplicar el tema al cargar la página
        applySavedTheme();
    }

    // --- Año del Copyright Dinámico ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

    // --- Envío del Formulario de Suscripción con AJAX (Fetch) ---
    const subscriptionForm = document.querySelector('.subscription-form');

    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Previene que la página se recargue

            const form = e.target;
            const formData = new FormData(form);
            const action = form.action;
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Muestra un estado de "cargando" en el botón
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            fetch(action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Importante para evitar errores de CORS con Make.com
            })
            .then(response => {
                // Oculta el formulario y muestra el mensaje de éxito
                form.querySelector('.form-elements').style.display = 'none';
                form.querySelector('.form-confirmation').style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al enviar tu suscripción. Por favor, inténtalo de nuevo.');
                // Restaura el botón si hay un error
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        });
    }
 
