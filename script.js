const cursor = document.getElementById('cursor');

// Déplacement du curseur personnalisé
document.addEventListener('mousemove', e => {
  cursor.style.left = (e.clientX - 4) + 'px';
  cursor.style.top  = (e.clientY - 4) + 'px';
});

// Agrandissement au survol des éléments cliquables
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
});

// Système de révélation au scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { 
      e.target.classList.add('visible'); 
      observer.unobserve(e.target); 
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));