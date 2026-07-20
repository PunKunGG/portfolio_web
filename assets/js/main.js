import { projects } from "./projects.js";

// ========== MOBILE NAVIGATION ==========
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("primaryNav");

function setNavigationOpen(isOpen) {
  if (!navToggle || !navLinks) return;

  navLinks.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setNavigationOpen(!isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNavigationOpen(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setNavigationOpen(false);
  });
}

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const html = document.documentElement;

// GitHub stats URLs for light and dark themes
const githubUrls = {
  light: {
    contrib: "https://ghchart.rshah.org/4a7fff/PunKunGG",
  },
  dark: {
    contrib: "https://ghchart.rshah.org/7aa2ff/PunKunGG",
  },
};

// Update GitHub images based on theme
function updateGithubImages(theme) {
  const contribImg = document.getElementById("githubContrib");

  const urls = githubUrls[theme] || githubUrls.light;

  if (contribImg) contribImg.src = urls.contrib;
}

function updateThemeControl(theme) {
  const isDark = theme === "dark";

  if (themeIcon) themeIcon.textContent = isDark ? "☀️" : "🌙";
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme",
    );
  }
}

// Check saved theme or default to light
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  html.setAttribute("data-theme", "dark");
  updateThemeControl("dark");
  updateGithubImages("dark");
} else {
  updateThemeControl("light");
}

// Toggle theme on click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    if (newTheme === "dark") {
      html.setAttribute("data-theme", "dark");
    } else {
      html.removeAttribute("data-theme");
    }

    // Update the accessible control and icon
    updateThemeControl(newTheme);

    // Update GitHub images
    updateGithubImages(newTheme);

    // Save preference
    localStorage.setItem("theme", newTheme);
  });
}

// Update footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ========== PROJECT MODAL ==========

const projectsGrid = document.getElementById("projectsGrid");
const projectLinkIcons = Object.freeze({
  repository:
    '<svg class="link-icon" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
  website:
    '<svg class="link-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  external:
    '<svg class="external-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
});
const projectIds = new Set();
const validProjects = projects.filter((project) => {
  const isValid =
    project &&
    typeof project.id === "string" &&
    typeof project.title === "string" &&
    typeof project.summary === "string" &&
    typeof project.description === "string" &&
    Array.isArray(project.images) &&
    project.images.length > 0 &&
    project.images.every((image) => typeof image === "string") &&
    Array.isArray(project.tags) &&
    project.tags.length > 0 &&
    project.tags.every((tag) => typeof tag === "string") &&
    Number.isInteger(project.cardTagCount) &&
    project.cardTagCount > 0 &&
    Array.isArray(project.links) &&
    project.links.length > 0 &&
    project.links.every(
      (link) =>
        (link.type === "repository" || link.type === "website") &&
        typeof link.url === "string",
    ) &&
    !projectIds.has(project.id);

  if (isValid) {
    projectIds.add(project.id);
  } else {
    console.warn("Skipping invalid or duplicate project entry.", project);
  }

  return isValid;
});
const projectsById = new Map(
  validProjects.map((project) => [project.id, project]),
);

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project col-6";
  article.dataset.project = project.id;

  const title = document.createElement("h3");
  title.textContent = project.title;

  const summary = document.createElement("p");
  summary.className = "muted";
  summary.textContent = project.summary;

  const tags = document.createElement("div");
  tags.className = "meta";
  const visibleTagCount = Math.min(
    Math.max(project.cardTagCount || project.tags.length, 0),
    project.tags.length,
  );
  project.tags.slice(0, visibleTagCount).forEach((tag) => {
    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = tag;
    tags.append(pill);
  });

  const button = document.createElement("button");
  button.className = "view-project-btn";
  button.type = "button";
  button.dataset.project = project.id;
  button.textContent = "View Details";

  article.append(title, summary, tags, button);
  return article;
}

function renderProjects() {
  if (!projectsGrid) return;

  const fragment = document.createDocumentFragment();

  if (validProjects.length === 0) {
    const fallback = document.createElement("div");
    fallback.className = "card p col-12";
    fallback.textContent = "Projects are temporarily unavailable. ";

    const link = document.createElement("a");
    link.href = "https://github.com/PunKunGG";
    link.textContent = "View projects on GitHub";
    fallback.append(link);
    fragment.append(fallback);
  } else {
    validProjects.forEach((project) => {
      fragment.append(createProjectCard(project));
    });
  }

  projectsGrid.replaceChildren(fragment);
}

renderProjects();

// DOM Elements
const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
const modalLinks = document.getElementById("modalLinks");
const modalClose = document.getElementById("modalClose");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryCounter = document.getElementById("galleryCounter");

// Gallery state
let currentImages = [];
let currentImageIndex = 0;
let galleryUpdateTimer = null;
let lastFocusedElement = null;

function setPageInert(isInert) {
  const nav = document.querySelector("nav");
  const main = document.querySelector("main");

  if (nav) nav.inert = isInert;
  if (main) main.inert = isInert;
}

function openDialog(dialog, focusTarget) {
  if (!dialog) return;

  lastFocusedElement = document.activeElement;
  dialog.classList.add("active");
  dialog.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setPageInert(true);

  const elementToFocus = focusTarget || dialog;
  window.setTimeout(() => elementToFocus?.focus({ preventScroll: true }), 0);
}

function closeDialog(dialog) {
  if (!dialog) return;

  const elementToRestore = lastFocusedElement;
  dialog.classList.remove("active");
  dialog.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  setPageInert(false);
  lastFocusedElement = null;

  window.setTimeout(
    () => elementToRestore?.focus({ preventScroll: true }),
    0,
  );
}

function trapFocus(dialog, event) {
  if (event.key !== "Tab") return;

  const focusableElements = Array.from(
    dialog.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.offsetParent !== null);

  if (focusableElements.length === 0) {
    event.preventDefault();
    dialog.focus();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  } else if (!dialog.contains(document.activeElement)) {
    event.preventDefault();
    firstElement.focus();
  }
}

// Update gallery display
function updateGallery() {
  if (currentImages.length === 0) return;

  const imageToShow = currentImages[currentImageIndex];
  clearTimeout(galleryUpdateTimer);
  modalImage.style.opacity = "0";
  galleryUpdateTimer = setTimeout(() => {
    modalImage.src = imageToShow;
    modalImage.style.opacity = "1";
  }, 150);

  galleryCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;

  // Hide/show arrows if only one image
  if (currentImages.length <= 1) {
    galleryPrev.style.display = "none";
    galleryNext.style.display = "none";
    galleryCounter.style.display = "none";
  } else {
    galleryPrev.style.display = "flex";
    galleryNext.style.display = "flex";
    galleryCounter.style.display = "block";
  }
}

// Navigate gallery
function prevImage() {
  if (currentImages.length <= 1) return;
  currentImageIndex =
    currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1;
  updateGallery();
}

function nextImage() {
  if (currentImages.length <= 1) return;
  currentImageIndex =
    currentImageIndex === currentImages.length - 1 ? 0 : currentImageIndex + 1;
  updateGallery();
}

// Open modal with project data
function openModal(projectId) {
  const project = projectsById.get(projectId);
  if (!project) return;

  // Set gallery images
  currentImages = project.images || [];
  currentImageIndex = 0;

  // Populate modal content
  modalImage.src = currentImages[0] || "";
  modalImage.alt = project.title;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  // Update gallery counter
  updateGallery();

  // Render tags
  const tagElements = project.tags.map((tag) => {
    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = tag;
    return pill;
  });
  modalTags.replaceChildren(...tagElements);

  // Render links with icons
  const linkElements = project.links.map((projectLink) => {
    const isRepository = projectLink.type === "repository";
    const link = document.createElement("a");
    const icon = isRepository
      ? projectLinkIcons.repository
      : projectLinkIcons.website;
    const label = isRepository ? "GitHub Repository" : "Visit Website";

    link.className = `link ${isRepository ? "repo-link" : "page-link"}`;
    link.href = projectLink.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.innerHTML = `${icon}<span>${label}</span>${projectLinkIcons.external}`;
    return link;
  });
  modalLinks.replaceChildren(...linkElements);

  // Show modal
  openDialog(modal, modalClose);
}

// Close modal
function closeModal() {
  clearTimeout(galleryUpdateTimer);
  galleryUpdateTimer = null;
  closeDialog(modal);
  currentImages = [];
  currentImageIndex = 0;
}

// Event listeners for view buttons
if (projectsGrid) {
  projectsGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const button = target.closest(".view-project-btn");
    if (!button || !projectsGrid.contains(button)) return;

    openModal(button.dataset.project);
  });
}

// Gallery navigation
if (galleryPrev) {
  galleryPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    prevImage();
  });
}

if (galleryNext) {
  galleryNext.addEventListener("click", (e) => {
    e.stopPropagation();
    nextImage();
  });
}

// Close modal on X button click
if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

// Close modal on overlay click
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const navigationIsOpen =
    navToggle?.getAttribute("aria-expanded") === "true";

  if (navigationIsOpen && e.key === "Escape") {
    setNavigationOpen(false);
    navToggle.focus();
    return;
  }

  if (
    !modal.classList.contains("active") &&
    !certLightbox?.classList.contains("active")
  )
    return;

  if (modal.classList.contains("active")) {
    trapFocus(modal, e);

    switch (e.key) {
      case "Escape":
        closeModal();
        break;
      case "ArrowLeft":
        e.preventDefault();
        prevImage();
        break;
      case "ArrowRight":
        e.preventDefault();
        nextImage();
        break;
    }
  }

  if (certLightbox?.classList.contains("active")) {
    trapFocus(certLightbox, e);

    if (e.key === "Escape") {
      closeCertLightbox();
    }
  }
});

// ========== CERTIFICATE LIGHTBOX ==========
const INITIAL_VISIBLE_CERTIFICATES = 6;
const certificateGrid = document.getElementById("certificatesGrid");
const certificateCards = certificateGrid
  ? Array.from(certificateGrid.querySelectorAll(".certificate-card"))
  : [];
const certificateControls = document.getElementById("certificateControls");
const certificateToggle = document.getElementById("certificateToggle");
const certLightbox = document.getElementById("certLightbox");
const certLightboxImg = document.getElementById("certLightboxImg");
const certLightboxTitle = document.getElementById("certLightboxTitle");
const certLightboxIssuer = document.getElementById("certLightboxIssuer");
const certLightboxClose = document.getElementById("certLightboxClose");

function setCertificatesExpanded(isExpanded, restoreToggleView = false) {
  certificateCards.forEach((card, index) => {
    card.hidden = !isExpanded && index >= INITIAL_VISIBLE_CERTIFICATES;
  });

  if (certificateToggle) {
    const hiddenCount = Math.max(
      certificateCards.length - INITIAL_VISIBLE_CERTIFICATES,
      0,
    );
    certificateToggle.setAttribute("aria-expanded", String(isExpanded));
    certificateToggle.textContent = isExpanded
      ? "Show less"
      : `Show ${hiddenCount} more certificates`;
  }

  if (restoreToggleView && certificateToggle) {
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      certificateToggle.focus({ preventScroll: true });
      certificateToggle.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    });
  }
}

if (
  certificateToggle &&
  certificateControls &&
  certificateCards.length > INITIAL_VISIBLE_CERTIFICATES
) {
  certificateControls.hidden = false;
  setCertificatesExpanded(false);

  certificateToggle.addEventListener("click", () => {
    const isExpanded =
      certificateToggle.getAttribute("aria-expanded") === "true";
    setCertificatesExpanded(!isExpanded, isExpanded);
  });
}

// Open certificate lightbox
function openCertLightbox(imgSrc, title, issuer) {
  if (!certLightbox || !certLightboxImg) return;

  certLightboxImg.src = imgSrc;
  certLightboxImg.alt = title;
  if (certLightboxTitle) certLightboxTitle.textContent = title;
  if (certLightboxIssuer) certLightboxIssuer.textContent = issuer;

  openDialog(certLightbox, certLightboxClose);
}

// Close certificate lightbox
function closeCertLightbox() {
  if (!certLightbox) return;
  closeDialog(certLightbox);
}

// Add click listeners to certificate cards
certificateCards.forEach((card) => {
  const title = card.dataset.certTitle;
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-haspopup", "dialog");
  card.setAttribute("aria-controls", "certLightbox");
  card.setAttribute("aria-label", `View certificate: ${title}`);

  const openCertificate = () => {
    const imgSrc = card.dataset.certImg;
    const issuer = card.dataset.certIssuer;

    if (imgSrc && title) {
      card.focus({ preventScroll: true });
      openCertLightbox(imgSrc, title, issuer || "");
    }
  };

  card.addEventListener("click", openCertificate);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCertificate();
    }
  });
});

// Close lightbox on close button click
if (certLightboxClose) {
  certLightboxClose.addEventListener("click", closeCertLightbox);
}

// Close lightbox on overlay click
if (certLightbox) {
  certLightbox.addEventListener("click", (e) => {
    if (e.target === certLightbox) {
      closeCertLightbox();
    }
  });
}
