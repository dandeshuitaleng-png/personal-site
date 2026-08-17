const field = document.querySelector('#journey');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
let playerPosition = 44;

if (field) {
  field.style.setProperty('--player-x', `${playerPosition}%`);
  field.addEventListener('pointerdown', () => field.focus());
  field.addEventListener('keydown', (event) => {
    const movement = { ArrowLeft: -4, a: -4, A: -4, ArrowRight: 4, d: 4, D: 4 }[event.key];
    if (movement === undefined) return;
    event.preventDefault();
    playerPosition = Math.max(6, Math.min(83, playerPosition + movement));
    field.style.setProperty('--player-x', `${playerPosition}%`);
  });
}

if (field && !prefersReducedMotion && canHover) {
  field.addEventListener('pointermove', (event) => {
    const box = field.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    field.style.transform = `rotate(${x * 3}deg) translate(${x * 9}px, ${y * 9}px)`;
  });
  field.addEventListener('pointerleave', () => { field.style.transform = ''; });
}
