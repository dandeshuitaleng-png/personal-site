const field = document.querySelector('#field');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (field) {
  window.setTimeout(() => field.classList.add('is-revealed'), prefersReducedMotion ? 0 : 220);
}

if (field && !prefersReducedMotion) {
  field.addEventListener('pointermove', (event) => {
    const box = field.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    field.style.transform = `rotate(${x * 3}deg) translate(${x * 9}px, ${y * 9}px)`;
  });
  field.addEventListener('pointerleave', () => { field.style.transform = ''; });
}
