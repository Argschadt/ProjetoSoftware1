document.addEventListener('DOMContentLoaded', function() {
    // Fetch the species data from our API
    fetch('http://127.0.0.1:5000/get_species')
        .then(response => response.json())
        .then(species => {
            // Group species by type (plants, animals, fungi)
            const plantSpecies = species.filter(s => s.type === 'plant' || !s.type);
            const animalSpecies = species.filter(s => s.type === 'animal');
            const fungiSpecies = species.filter(s => s.type === 'fungi');

            // Function to populate a gallery section
            function populateGallery(containerId, speciesList) {
                const container = document.getElementById(containerId);
                if (!container) return;

                speciesList.forEach(s => {
                    const item = document.createElement('a');
                    item.href = `especie-detail.html?id=${s.id}`;
                    item.className = 'gallery-item';
                    item.setAttribute('aria-label', `Ver detalhes de ${s.name}`);
                    
                    item.innerHTML = `
                        <img src="${s.image_path}" alt="${s.name}" loading="lazy">
                        <div class="caption">${s.name}</div>
                    `;
                    
                    container.appendChild(item);
                });
            }

            // Populate each gallery section
            populateGallery('plants-gallery', plantSpecies);
            populateGallery('animals-gallery', animalSpecies);
            populateGallery('fungi-gallery', fungiSpecies);
        })
        .catch(error => {
            console.error('Error loading gallery:', error);
            // Show a friendly error message to the user
            const galleryContainer = document.querySelector('.gallery-items');
            if (galleryContainer) {
                galleryContainer.innerHTML = '<p>Sorry, we couldn\'t load the gallery. Please try again later.</p>';
            }
        });
});
