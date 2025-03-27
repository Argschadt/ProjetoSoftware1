// script.js

// Função para redirecionar para a galeria
document.getElementById('exploreButton').addEventListener('click', function () {
    // Altere o link para a página da galeria
    window.location.href = 'galeria.html'; // Você pode criar essa página depois
});

// Exemplo de interação adicional (opcional)
console.log('Bem-vindo ao Jardim Botânico!');


// Lightbox
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxDesc = document.getElementById('lightbox-desc');
        
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
        lightboxDesc.textContent = img.dataset.description;
    });
});

// Fechar lightbox
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
});

// Fechar ao clicar fora da imagem
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox')) {
        document.getElementById('lightbox').style.display = 'none';
    }
});

// Carrossel de Imagens
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;
    let slideInterval;

    // Função para mostrar o slide atual
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Função para ir para o próximo slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Função para ir para o slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Iniciar o carrossel automático
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    }

    // Parar o carrossel automático
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners para os botões
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });

    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlideShow();
            startSlideShow();
        });
    });

    // Pausar o carrossel quando o mouse estiver sobre ele
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', stopSlideShow);
    slideshowContainer.addEventListener('mouseleave', startSlideShow);

    // Iniciar o carrossel
    startSlideShow();
});