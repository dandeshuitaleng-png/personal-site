const world = document.querySelector('#world');
const archive = document.querySelector('#archive');
const archiveTitle = document.querySelector('#archive-title');
const archiveStatus = document.querySelector('#archive-status');
const archiveCopy = document.querySelector('#archive-copy');
const closeButtons = document.querySelectorAll('.close');
const stageCount = document.querySelectorAll('.stage').length;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const archiveText = {
  '乡音地图': ['SAVE 01 · ACTIVE', '一个面向方言与地方文化的移动产品。这里将展示项目背景、关键界面和开发过程。'],
  '项目二': ['SAVE 02 · UNLOCKING', '这个存档位已留好。填入第二个作品后，它会成为乡村场景中的可探索入口。'],
  '项目三': ['SAVE 03 · READY', '这个存档位已留好。填入第三个作品后，它会成为城镇场景中的可探索入口。'],
};

function currentStage() {
  return Math.round(world.scrollLeft / window.innerWidth);
}

function moveToStage(index) {
  const next = Math.max(0, Math.min(stageCount - 1, index));
  world.scrollTo({ left: next * window.innerWidth, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

function openArchive(project) {
  const [status, copy] = archiveText[project] || ['SAVE FILE', '这个存档还没有内容。'];
  archiveStatus.textContent = status;
  archiveTitle.textContent = project;
  archiveCopy.textContent = copy;
  archive.showModal();
}

world.addEventListener('keydown', (event) => {
  if (archive.open) return;
  if (['ArrowRight', 'd', 'D'].includes(event.key)) { event.preventDefault(); moveToStage(currentStage() + 1); }
  if (['ArrowLeft', 'a', 'A'].includes(event.key)) { event.preventDefault(); moveToStage(currentStage() - 1); }
  if (event.key === 'Enter') {
    const project = document.querySelectorAll('.stage')[currentStage()]?.dataset.project;
    if (project) openArchive(project);
  }
});

document.querySelector('.scroll-next').addEventListener('click', () => { world.focus(); moveToStage(1); });
document.querySelectorAll('.gate').forEach((gate) => gate.addEventListener('click', () => openArchive(gate.dataset.project)));
closeButtons.forEach((button) => button.addEventListener('click', () => archive.close()));
document.querySelector('.help').addEventListener('click', () => { world.focus(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && archive.open) archive.close(); });
