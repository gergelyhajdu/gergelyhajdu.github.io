const menuButton = document.querySelector("[data-menu]");
const nav = document.querySelector("[data-nav]");

if (menuButton && nav) {
  const setMenuState = (isOpen) => {
    nav.classList.toggle("open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  };

  setMenuState(nav.classList.contains("open"));

  menuButton.addEventListener("click", () => {
    setMenuState(!nav.classList.contains("open"));
  });

  document.addEventListener("click", (event) => {
    if (nav.classList.contains("open") && !nav.contains(event.target) && !menuButton.contains(event.target)) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setMenuState(false);
      menuButton.focus();
    }
  });
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.filter;

    document.querySelectorAll("[data-filter]").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    document.querySelectorAll("[data-tags], [data-category]").forEach((card) => {
      const tags = card.dataset.tags ? card.dataset.tags.split(/\s+/) : [card.dataset.category];

      card.hidden = value !== "all" && !tags.includes(value);
    });
  });
});

const backToTopButton = document.querySelector("[data-back-to-top]");

if (backToTopButton) {
  const toggleBackToTop = () => {
    backToTopButton.classList.toggle("is-visible", window.scrollY > 320);
  };

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTopButton.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}
