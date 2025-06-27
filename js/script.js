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
                // Cierra el menú móvil si está abierto al hacer clic en un enlace
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                }
            }
        });
    });

    // --- Ventana Modal (Formulario) ---
    const modal = document.getElementById('form-modal');
    const openModalBtns = document.querySelectorAll('#open-form, #open-form-from-calc');
    const closeModalBtn = document.getElementById('close-modal');

    if (modal) {
        openModalBtns.forEach(btn => btn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }));

        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', e => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
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
                resultContainer.style.display = 'block';
                resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert('Por favor, introduce un peso válido.');
            }
        });
    }

    // --- Año del Copyright Dinámico ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

    // --- Funcionalidad para el Cambio de Tema (Modo Oscuro) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = 'fa-moon';
    const sunIcon = 'fa-sun';

    themeToggle.addEventListener('click', () => {
        body.toggleAttribute('data-theme');
        const icon = themeToggle.querySelector('i');
        
        // Cambiar el icono
        if (body.hasAttribute('data-theme')) {
            icon.classList.remove(moonIcon);
            icon.classList.add(sunIcon);
        } else {
            icon.classList.remove(sunIcon);
            icon.classList.add(moonIcon);
        }
    });
});
