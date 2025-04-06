// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o botão CTA
    const ctaButton = document.getElementById('cta-button');
    
    // Adiciona um evento de clique ao botão
    ctaButton.addEventListener('click', function() {
        alert('Obrigado pelo seu interesse! Em breve entraremos em contato.');
        
        // Alternativa: rolar até a seção de contato
        // document.querySelector('.contact-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Efeito de hover nas features
    const features = document.querySelectorAll('.feature');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Menu responsivo (poderia ser expandido)
    console.log('JavaScript carregado com sucesso!');
});