// script.js

// Carrossel de Imagens
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    const slideshowContainer = document.querySelector('.slideshow-container');

    // Só executa o código do carrossel se os elementos existirem
    if (slides.length > 0 && dots.length > 0 && prevBtn && nextBtn && slideshowContainer) {
        let currentSlide = 0;
        let slideInterval;

        // Função para mostrar o slide atual
        function showSlide(index) {
            // Primeiro, remove a classe active de todos os slides
            slides.forEach(slide => {
                slide.classList.remove('active');
                // Garante que o slide anterior permaneça visível durante a transição
                if (slide.style.opacity === '1') {
                    slide.style.opacity = '0';
                }
            });
            
            // Remove a classe active de todos os dots
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Adiciona a classe active ao slide atual
            slides[index].classList.add('active');
            // Garante que o slide atual fique visível
            slides[index].style.opacity = '1';
            
            // Adiciona a classe active ao dot atual
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
            slideInterval = setInterval(nextSlide, 8000); // Muda a cada 10 segundos
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
        slideshowContainer.addEventListener('mouseenter', stopSlideShow);
        slideshowContainer.addEventListener('mouseleave', startSlideShow);

        // Iniciar o carrossel
        startSlideShow();
    }
});

// Função para o balão de fala do Jerivaldo
document.addEventListener('DOMContentLoaded', function() {
    const mascote = document.querySelector('.mascote');
    const speechBubble = document.querySelector('.speech-bubble');
    let isBubbleVisible = false;

    mascote.addEventListener('click', function() {
        isBubbleVisible = !isBubbleVisible;
        speechBubble.classList.toggle('show', isBubbleVisible);
    });

    // Fechar o balão ao clicar fora
    document.addEventListener('click', function(event) {
        if (isBubbleVisible && !mascote.contains(event.target) && !speechBubble.contains(event.target)) {
            isBubbleVisible = false;
            speechBubble.classList.remove('show');
        }
    });
}); 