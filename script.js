// Animación del título principal
anime({
  targets: '.hero-title',
  translateY: [-50, 0],
  opacity: [0, 1],
  duration: 1500,
  easing: 'easeOutExpo'
});

// Animación del texto del hero
anime({
  targets: '.hero-text',
  translateY: [30, 0],
  opacity: [0, 1],
  delay: 800,
  duration: 1200,
  easing: 'easeOutExpo'
});

// Animaciones al hacer scroll
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({
        targets: entry.target,
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1000,
        easing: 'easeOutExpo'
      });
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  section.style.opacity = 0;
  observer.observe(section);
});
