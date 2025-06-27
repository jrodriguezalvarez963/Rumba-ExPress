// Mobile Navigation Toggle
document.querySelector('.mobile-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('nav ul').classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('nav ul').classList.remove('active');
            document.querySelector('.mobile-toggle').classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// Price Calculator
document.getElementById('calculate-btn').addEventListener('click', function() {
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (isNaN(weight) || weight <= 0) {
        alert('Por favor ingresa un peso válido');
        return;
    }
    
    const pricePerKg = 240;
    const totalPrice = weight * pricePerKg;
    
    document.getElementById('calculated-price').textContent = totalPrice.toFixed(2);
    document.getElementById('result-container').style.display = 'block';
    
    // Scroll to results
    document.getElementById('result-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Form Modal
const modal = document.getElementById('form-modal');
const openFormBtn = document.getElementById('open-form');
const openFormFromCalcBtn = document.getElementById('open-form-from-calc');
const closeModalBtn = document.getElementById('close-modal');

openFormBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

if (openFormFromCalcBtn) {
    openFormFromCalcBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
}

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Animación al hacer scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.feature-card, .testimonial-card, .blog-card');
    
    cards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.classList.add('visible');
        }
    });
}

// Header scroll effect
function headerScrollEffect() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        document.querySelector('.logo img').style.height = '40px';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        document.querySelector('.logo img').style.height = '50px';
    }
}

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
    // Animación inicial
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
    }, 300);
});

// Event Listeners
window.addEventListener('scroll', () => {
    animateOnScroll();
    headerScrollEffect();
});

// Inicializar animaciones al cargar
animateOnScroll();
