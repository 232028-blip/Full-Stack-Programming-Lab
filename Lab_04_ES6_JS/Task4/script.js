const tabBtns    = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('.tab-section');

function activateTab(targetId) {
  // Update buttons
  tabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === targetId);
  });

  // Update sections
  tabSections.forEach(section => {
    section.classList.toggle('active', section.id === targetId);
  });

  // Smooth scroll to the active section
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Tab button click handler
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    activateTab(btn.dataset.tab);
  });
});

// Activate first tab on load
activateTab(tabBtns[0].dataset.tab);