// ===================================
// MMH DIGITAL AGENCY
// JavaScript functionality
// ===================================

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  // Close mobile menu after clicking a navigation link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// PRICING TABS
const pricingTabs = document.querySelectorAll(".pricing-tab");
const pricingPanels = document.querySelectorAll(".pricing-panel");

function showPricingPanel(service) {
  pricingTabs.forEach((tab) => {
    const isActive = tab.dataset.target === service;

    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  pricingPanels.forEach((panel) => {
    const isActive = panel.id === `panel-${service}`;

    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
}

pricingTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showPricingPanel(tab.dataset.target);
  });
});

// Make service and footer package links open the relevant pricing tab
const packageLinks = {
  "plan-web": "web",
  "plan-design": "design",
  "plan-seo": "seo",
  "plan-social": "social",
  "plan-ai": "ai"
};

document.querySelectorAll('a[href^="#plan-"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = link.getAttribute("href").slice(1);
    const service = packageLinks[target];

    if (!service) return;

    event.preventDefault();
    showPricingPanel(service);

    const pricingSection = document.getElementById("pricing");

    if (pricingSection) {
      pricingSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// WHATSAPP CONTACT FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const service = document.getElementById("service")?.value || "";
    const message = document.getElementById("message")?.value.trim() || "";

    if (!name || !email || !service || !message) {
      alert("Please complete all fields before sending.");
      return;
    }

    const phoneNumber = "923708609699";

    const whatsappMessage = [
      "Hello MMH Digital Marketing Agency!",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      "",
      "Project Details:",
      message
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}

// AUTOMATIC FOOTER YEAR
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}