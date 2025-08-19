const form = document.getElementById('contactForm');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!fullName || !email || !subject || !message) {
    alert("Please fill out all fields.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Show modal and reset form
  modal.style.display = "block";
  form.reset();
});

closeModal.addEventListener('click', () => {
  modal.style.display = "none";
});

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
