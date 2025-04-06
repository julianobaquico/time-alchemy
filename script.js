// Esperar o DOM ser completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Se o link for apenas "#", rolamos para o topo
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular posição do elemento considerando o header fixo
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu responsivo - Adicionar botão de menu para mobile
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Criar botão de menu
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-toggle');
    menuButton.innerHTML = `<span></span><span></span><span></span>`;
    menuButton.setAttribute('aria-label', 'Menu');
    
    // Adicionar botão apenas em telas pequenas via JavaScript
    if (window.innerWidth <= 768) {
        header.querySelector('.container').insertBefore(menuButton, nav);
        
        // Adicionar classe para esconder o menu inicialmente
        nav.classList.add('nav-hidden');
        
        // Adicionar funcionalidade de toggle no botão
        menuButton.addEventListener('click', function() {
            nav.classList.toggle('nav-visible');
            nav.classList.toggle('nav-hidden');
            menuButton.classList.toggle('active');
        });
    }
    
    // Ajustar menu em resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.menu-toggle')) {
                header.querySelector('.container').insertBefore(menuButton, nav);
                nav.classList.add('nav-hidden');
            }
        } else {
            if (document.querySelector('.menu-toggle')) {
                document.querySelector('.menu-toggle').remove();
                nav.classList.remove('nav-hidden');
                nav.classList.remove('nav-visible');
            }
        }
    });
    
    // Adicionar estilo CSS dinamicamente para o menu móvel
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 30px;
                height: 22px;
            }
            
            .menu-toggle span {
                height: 3px;
                width: 100%;
                background-color: #333;
                border-radius: 3px;
                transition: all 0.3s ease;
            }
            
            .menu-toggle.active span:nth-child(1) {
                transform: translateY(9px) rotate(45deg);
            }
            
            .menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .menu-toggle.active span:nth-child(3) {
                transform: translateY(-10px) rotate(-45deg);
            }
            
            nav {
                width: 100%;
            }
            
            nav.nav-hidden {
                display: none;
            }
            
            nav.nav-visible {
                display: block;
            }
            
            nav ul {
                flex-direction: column;
                align-items: center;
            }
            
            nav ul li {
                margin: 10px 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Efeito de revelação para os artigos ao rolar
    const revealElements = document.querySelectorAll('.article-card');
    
    function checkReveal() {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150; // Distância em que o elemento começa a aparecer
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    }
    
    // Adicionar animação CSS para os artigos
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .article-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .article-card.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Checar se há elementos para revelar ao carregar a página
    window.addEventListener('scroll', checkReveal);
    
    // Chamar uma vez na inicialização
    checkReveal();
});

/* 
 * ÁREA PARA ADICIONAR MAIS FUNÇÕES JAVASCRIPT
 * Aqui você pode adicionar animações, carregamento de dados, 
 * filtros para categorias de artigos, etc.
 */