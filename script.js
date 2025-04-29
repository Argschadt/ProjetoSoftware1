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
    
    // Verifica se os elementos existem antes de adicionar event listeners
    if (mascote && speechBubble) {
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
    }
});

// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Verifica se os elementos existem antes de prosseguir
    if (menuToggle && mainNav) {
        const body = document.body;

        // Criar overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        body.appendChild(overlay);

        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');
            body.style.overflow = isExpanded ? 'auto' : 'hidden';
        });

        // Fechar menu ao clicar no overlay
        overlay.addEventListener('click', function() {
            menuToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = 'auto';
        });

        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });
    }
});

// Preload de imagens da galeria
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página da galeria
    if (window.location.pathname.includes('galeria.html')) {
        // Função para precarregar as imagens de galeria
        function preloadGalleryImages() {
            const galleryItems = document.querySelectorAll('.gallery-item img');
            
            // Para cada imagem na galeria
            galleryItems.forEach(img => {
                // Criar um novo objeto Image para precarregar
                const preloadImage = new Image();
                
                // Quando a imagem carrega, adicionar uma classe para uma transição suave
                preloadImage.onload = function() {
                    img.classList.add('loaded');
                };
                
                // Iniciar o carregamento da imagem
                preloadImage.src = img.src;
            });
        }
        
        // Executar o preload após um pequeno delay para não competir com recursos críticos
        setTimeout(preloadGalleryImages, 1000);
        
        // Adicionar lazy-loading observer para carregar imagens apenas quando visíveis
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    // Quando a imagem entra no viewport
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('.gallery-item img').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
});