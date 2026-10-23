
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll("#navLinks a");

// Mobile navigation menu
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

// Close mobile menu after clicking a navigation link
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Automatically display the current year
document.querySelector("#year").textContent =
  new Date().getFullYear();

// Copy GitHub profile link
const copyButton = document.querySelector("#copyProfile");
const copyFeedback = document.querySelector("#copyFeedback");

copyButton.addEventListener("click", async () => {
  const profileUrl = "https://github.com/Janakjana24";

  try {
    await navigator.clipboard.writeText(profileUrl);
    copyFeedback.textContent = "GitHub profile link copied!";
  } catch (error) {
    copyFeedback.textContent =
      "Copy unavailable. Your GitHub: " + profileUrl;
  }
});
