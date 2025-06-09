// Función para manejar el colapso de secciones
function initCollapsibleSections() {
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', () => {
            const section = header.dataset.section;
            const content = document.getElementById(`${section}-section`);
            const icon = header.querySelector('.section-icon');
            
            content.classList.toggle('active');
            icon.classList.toggle('active');
        });
    });
}

// Inicializar secciones colapsables cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initCollapsibleSections();
}); 