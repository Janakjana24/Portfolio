const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll("#navLinks a");

// Accessible mobile navigation: toggle and close after selection.
menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Current year in the footer.
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Copy the GitHub profile with a helpful fallback for non-secure contexts.
const copyButton = document.querySelector("#copyProfile");
const copyFeedback = document.querySelector("#copyFeedback");
copyButton?.addEventListener("click", async () => {
  const profileUrl = "https://github.com/Janakjana24";
  try {
    await navigator.clipboard.writeText(profileUrl);
    copyFeedback.textContent = "GitHub profile link copied!";
  } catch (error) {
    copyFeedback.textContent = `Copy unavailable — use ${profileUrl}`;
  }
});

// Reveal content once it enters the viewport. Falls back to visible content
// on browsers without IntersectionObserver.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Add a subtle cursor-follow tilt to the portrait on devices that have a mouse.
const portrait = document.querySelector(".portrait-frame");
const portraitArt = document.querySelector(".portrait-art");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

if (portrait && portraitArt && hasFinePointer && !prefersReducedMotion) {
  portraitArt.addEventListener("pointermove", (event) => {
    const bounds = portraitArt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    portrait.style.transform = `translateY(-3px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
  });

  portraitArt.addEventListener("pointerleave", () => {
    portrait.style.transform = "";
  });
}
