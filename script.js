// script.js

// Fun‡Æo para redirecionar para a galeria
document.getElementById('exploreButton').addEventListener('click', function () {
    // Altere o link para a p gina da galeria
    window.location.href = 'galeria.html'; // Vocˆ pode criar essa p gina depois
});

// Exemplo de intera‡Æo adicional (opcional)
console.log('Bem-vindo ao Jardim Botƒnico!');


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