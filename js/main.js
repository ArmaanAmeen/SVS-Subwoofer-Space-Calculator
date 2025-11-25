document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.getElementById("calcBtn");
  const resultDiv = document.getElementById("result");
  if (calcBtn && resultDiv) {
    calcBtn.addEventListener("click", () => {
      resultDiv.textContent =
        "Calculator logic coming soon. For now this is just a placeholder.";
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thanks! This demo form doesn’t actually send email.");
    });
  }
});
