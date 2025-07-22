// CSP Blog Interactive Features
let links;
let directiveCards;
document.addEventListener('DOMContentLoaded', function() {
    // Event Listeners
    links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    directiveCards = document.querySelectorAll('.directive-card');
    directiveCards.forEach(card => {
        card.addEventListener('mouseenter', handleCardMouseEnter);
        card.addEventListener('mouseleave', handleCardMouseLeave);
    });

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();
});

window.addEventListener('unload', () => {
    window.removeEventListener('scroll', updateActiveSection);
    links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
    });
    directiveCards.forEach(card => {
        card.removeEventListener('mouseenter', handleCardMouseEnter);
        card.removeEventListener('mouseleave', handleCardMouseLeave);
    });
});

// Function Definitions
function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function handleCardMouseEnter() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
}

function handleCardMouseLeave() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
}

function updateActiveSection() {
    const scrollPosition = window.scrollY + 100; // Offset for better detection
    const tocLinks = document.querySelectorAll('.toc a');
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            tocLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            const activeLink = document.querySelector(`.toc a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}
