const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.querySelector('.sidebar');
const overlay = document.getElementById('overlay');

function toggleSidebar() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  } else {
    sidebar.classList.toggle('collapsed');
  }
}
toggleBtn.addEventListener('click', toggleSidebar);

// Close on overlay click
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
});
