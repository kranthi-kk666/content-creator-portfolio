// Smooth scroll for navbar links & CTA button
document.querySelectorAll('.nav-link').forEach(el => {
  el.addEventListener('click', function (e) {
    e.preventDefault();

    // Get target from href OR data-target
    const targetSelector =
      this.getAttribute('href') || this.getAttribute('data-target');

    if (!targetSelector) return;

    const target = document.querySelector(targetSelector);
    if (!target) return;

    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top;
    const duration = 900; // 🔥 control speed here
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;

      const run = ease(
        timeElapsed,
        startPosition,
        targetPosition,
        duration
      );

      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  });
});

// EmailJS init
(function () {
  emailjs.init("b2O6NVTnA3sjHih_j");
})();

// Contact form handling
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

if (!form) {
  console.error("❌ contact-form not found");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  statusText.textContent = "Sending...";
  statusText.style.color = "#aaa";

  emailjs.sendForm(
    "service_6axhzk7",
    "template_7s12xme",
    this
  ).then(
    function () {
      statusText.textContent = "Message sent successfully!";
      statusText.style.color = "#4CAF50";
      form.reset();
    },
    function (error) {
      console.error("❌ EmailJS error:", error);
      statusText.textContent = "Failed to send message.";
      statusText.style.color = "#ff4d4d";
    }
  );
});







// ================= MOBILE NAVBAR =================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const ctaBtn = document.getElementById("nav-cta");

// Toggle menu
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Smooth scroll + close menu
document.querySelectorAll(".nav-link, #nav-cta").forEach(link => {
  link.addEventListener("click", e => {
    const target = link.getAttribute("href") || "#contact";
    e.preventDefault();

    document.querySelector(target).scrollIntoView({
      behavior: "smooth"
    });

    navLinks.classList.remove("active");
  });
});
