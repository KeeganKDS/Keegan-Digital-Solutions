document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const revealItems = document.querySelectorAll(".reveal");

  // Respect accessibility preferences
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Header scroll effect
  const updateHeaderState = () => {
    if (!header) return;

    if (window.scrollY > 18) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  // If user prefers reduced motion, show everything immediately
  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  // Add a slight staggered delay to reveal items for a more premium feel
  revealItems.forEach((item, index) => {
    const delay = Math.min(index * 60, 420); // caps the delay so it doesn't get silly
    item.style.transitionDelay = `${delay}ms`;
  });

  // Reveal animation on scroll
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
});