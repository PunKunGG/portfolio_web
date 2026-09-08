import { projects } from "./projects.js";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  interpolate,
  translations,
} from "./i18n.js";

const html = document.documentElement;
const metaDescription = document.querySelector('meta[name="description"]');
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("primaryNav");
const languageToggle = document.getElementById("languageToggle");
const languageLabel = document.getElementById("languageLabel");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const yearEl = document.getElementById("year");

function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The interface still works when browser storage is unavailable.
  }
}

const savedLanguage = readPreference("language");
let currentLanguage = SUPPORTED_LANGUAGES.includes(savedLanguage)
  ? savedLanguage
  : DEFAULT_LANGUAGE;

function t(key, values) {
  const template =
    translations[currentLanguage][key] ??
    translations[DEFAULT_LANGUAGE][key] ??
    key;
  return interpolate(template, values);
}

function localizedText(value) {
  return value[currentLanguage] ?? value[DEFAULT_LANGUAGE];
}

// ========== MOBILE NAVIGATION ==========
function setNavigationOpen(isOpen) {
  if (!navToggle || !navLinks) return;

  navLinks.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute(
    "aria-label",
    t(isOpen ? "closeNavigation" : "openNavigation"),
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
const githubUrls = {
  light: { contrib: "https://ghchart.rshah.org/4a7fff/PunKunGG" },
  dark: { contrib: "https://ghchart.rshah.org/7aa2ff/PunKunGG" },
};

function currentTheme() {
  return html.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

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
      t(isDark ? "switchToLight" : "switchToDark"),
    );
  }
}

const savedTheme = readPreference("theme") === "dark" ? "dark" : "light";
if (savedTheme === "dark") html.setAttribute("data-theme", "dark");
updateGithubImages(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = currentTheme() === "dark" ? "light" : "dark";

    if (newTheme === "dark") {
      html.setAttribute("data-theme", "dark");
    } else {
      html.removeAttribute("data-theme");
    }

    updateThemeControl(newTheme);
    updateGithubImages(newTheme);
    savePreference("theme", newTheme);
  });
}

if (yearEl) yearEl.textContent = new Date().getFullYear();

// ========== EXPANDABLE COLLECTIONS ==========
function updateExpandableCollection({
  items,
  initialVisible,
  isExpanded,
  controls,
  toggle,
  moreLabelKey,
  restoreToggleView = false,
}) {
  items.forEach((item, index) => {
    item.hidden = !isExpanded && index >= initialVisible;
  });

  const hiddenCount = Math.max(items.length - initialVisible, 0);
  if (controls) controls.hidden = hiddenCount === 0;

  if (toggle) {
    toggle.setAttribute("aria-expanded", String(isExpanded));
    toggle.textContent = isExpanded
      ? t("showLess")
      : t(moreLabelKey, { count: hiddenCount });
  }

  if (restoreToggleView && toggle) {
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      toggle.focus({ preventScroll: true });
      toggle.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    });
  }
}

// ========== PROJECTS ==========
const INITIAL_VISIBLE_PROJECTS = 4;
const projectsGrid = document.getElementById("projectsGrid");
const projectControls = document.getElementById("projectControls");
const projectToggle = document.getElementById("projectToggle");
let projectsExpanded = false;

const projectLinkIcons = Object.freeze({
  repository:
    '<svg class="link-icon" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
  website:
    '<svg class="link-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  external:
    '<svg class="external-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
});

function isLocalizedText(value) {
  return (
    value &&
    SUPPORTED_LANGUAGES.every(
      (language) =>
        typeof value[language] === "string" && value[language].trim(),
    )
  );
}

const projectIds = new Set();
const validProjects = projects.filter((project) => {
  const isValid =
    project &&
    typeof project.id === "string" &&
    isLocalizedText(project.title) &&
    isLocalizedText(project.summary) &&
    isLocalizedText(project.description) &&
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

function updateProjectVisibility(restoreToggleView = false) {
  const projectCards = projectsGrid
    ? Array.from(projectsGrid.querySelectorAll(".project"))
    : [];

  updateExpandableCollection({
    items: projectCards,
    initialVisible: INITIAL_VISIBLE_PROJECTS,
    isExpanded: projectsExpanded,
    controls: projectControls,
    toggle: projectToggle,
    moreLabelKey: "showMoreProjects",
    restoreToggleView,
  });
}

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project col-6";
  article.dataset.project = project.id;

  const title = document.createElement("h3");
  title.textContent = localizedText(project.title);

  const summary = document.createElement("p");
  summary.className = "muted";
  summary.textContent = localizedText(project.summary);

  const tags = document.createElement("div");
  tags.className = "meta";
  const visibleTagCount = Math.min(project.cardTagCount, project.tags.length);
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
  button.textContent = t("viewDetails");

  article.append(title, summary, tags, button);
  return article;
}

function renderProjects() {
  if (!projectsGrid) return;

  const fragment = document.createDocumentFragment();

  if (validProjects.length === 0) {
    const fallback = document.createElement("div");
    fallback.className = "card p col-12";
    fallback.append(document.createTextNode(`${t("projectsUnavailable")} `));

    const link = document.createElement("a");
    link.href = "https://github.com/PunKunGG";
    link.textContent = t("viewProjectsGithub");
    fallback.append(link);
    fragment.append(fallback);
  } else {
    validProjects.forEach((project) => {
      fragment.append(createProjectCard(project));
    });
  }

  projectsGrid.replaceChildren(fragment);
  updateProjectVisibility();
}

if (projectToggle) {
  projectToggle.addEventListener("click", () => {
    projectsExpanded = !projectsExpanded;
    updateProjectVisibility(!projectsExpanded);
  });
}

// ========== PROJECT MODAL ==========
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

let currentProjectId = null;
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
  window.setTimeout(() => (focusTarget || dialog)?.focus(), 0);
}

function closeDialog(dialog) {
  if (!dialog) return;

  const elementToRestore = lastFocusedElement;
  dialog.classList.remove("active");
  dialog.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  setPageInert(false);
  lastFocusedElement = null;
  window.setTimeout(() => elementToRestore?.focus({ preventScroll: true }), 0);
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

function updateGallery(animate = true) {
  if (!modalImage || currentImages.length === 0) return;

  const imageToShow = currentImages[currentImageIndex];
  clearTimeout(galleryUpdateTimer);

  const showImage = () => {
    modalImage.src = imageToShow;
    modalImage.style.opacity = "1";
  };

  if (animate) {
    modalImage.style.opacity = "0";
    galleryUpdateTimer = window.setTimeout(showImage, 150);
  } else {
    showImage();
  }

  if (galleryCounter) {
    galleryCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
  }

  const galleryDisplay = currentImages.length <= 1 ? "none" : "flex";
  if (galleryPrev) galleryPrev.style.display = galleryDisplay;
  if (galleryNext) galleryNext.style.display = galleryDisplay;
  if (galleryCounter) {
    galleryCounter.style.display = currentImages.length <= 1 ? "none" : "block";
  }
}

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

function renderProjectModal(project) {
  if (!modalImage || !modalTitle || !modalDescription || !modalTags || !modalLinks) {
    return;
  }

  const title = localizedText(project.title);
  currentImages = project.images;
  currentImageIndex = Math.min(currentImageIndex, currentImages.length - 1);

  modalImage.alt = t("projectImageAlt", { title });
  modalTitle.textContent = title;
  modalDescription.textContent = localizedText(project.description);
  updateGallery(false);

  const tagElements = project.tags.map((tag) => {
    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = tag;
    return pill;
  });
  modalTags.replaceChildren(...tagElements);

  const linkElements = project.links.map((projectLink) => {
    const isRepository = projectLink.type === "repository";
    const link = document.createElement("a");
    const icon = isRepository
      ? projectLinkIcons.repository
      : projectLinkIcons.website;
    const label = t(isRepository ? "repository" : "website");

    link.className = `link ${isRepository ? "repo-link" : "page-link"}`;
    link.href = projectLink.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.innerHTML = `${icon}<span>${label}</span>${projectLinkIcons.external}`;
    return link;
  });
  modalLinks.replaceChildren(...linkElements);
}

function openModal(projectId) {
  const project = projectsById.get(projectId);
  if (!project || !modal) return;

  currentProjectId = project.id;
  currentImageIndex = 0;
  modal.dataset.project = project.id;
  renderProjectModal(project);
  openDialog(modal, modalClose);
}

function closeModal() {
  clearTimeout(galleryUpdateTimer);
  galleryUpdateTimer = null;
  closeDialog(modal);
  currentProjectId = null;
  currentImages = [];
  currentImageIndex = 0;
  if (modal) delete modal.dataset.project;
}

if (projectsGrid) {
  projectsGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const button = target.closest(".view-project-btn");
    if (!button || !projectsGrid.contains(button)) return;
    openModal(button.dataset.project);
  });
}

galleryPrev?.addEventListener("click", (event) => {
  event.stopPropagation();
  prevImage();
});
galleryNext?.addEventListener("click", (event) => {
  event.stopPropagation();
  nextImage();
});
modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
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
const certificateIssuerNames = new Map(
  certificateCards.map((card) => [
    card,
    (card.dataset.certIssuer || "").replace(/^Issued by\s*/i, ""),
  ]),
);
let certificatesExpanded = false;
let currentCertificateCard = null;

function updateCertificateVisibility(restoreToggleView = false) {
  updateExpandableCollection({
    items: certificateCards,
    initialVisible: INITIAL_VISIBLE_CERTIFICATES,
    isExpanded: certificatesExpanded,
    controls: certificateControls,
    toggle: certificateToggle,
    moreLabelKey: "showMoreCertificates",
    restoreToggleView,
  });
}

function localizeCertificates() {
  certificateCards.forEach((card) => {
    const title = card.dataset.certTitle || "";
    const issuerName = certificateIssuerNames.get(card) || "";
    const issuer = issuerName ? `${t("issuedBy")} ${issuerName}` : "";
    const issuerElement = card.querySelector(".cert-content > .muted");
    const imageWrapper = card.querySelector(".cert-img-wrapper");

    card.dataset.certIssuer = issuer;
    card.setAttribute("aria-label", t("viewCertificate", { title }));
    if (issuerElement) issuerElement.textContent = issuer;
    if (imageWrapper) imageWrapper.dataset.viewLabel = t("clickToView");
  });

  if (currentCertificateCard && certLightboxIssuer) {
    certLightboxIssuer.textContent = currentCertificateCard.dataset.certIssuer;
  }
}

function openCertLightbox(card) {
  if (!certLightbox || !certLightboxImg) return;

  const imgSrc = card.dataset.certImg;
  const title = card.dataset.certTitle;
  if (!imgSrc || !title) return;

  currentCertificateCard = card;
  certLightboxImg.src = imgSrc;
  certLightboxImg.alt = title;
  if (certLightboxTitle) certLightboxTitle.textContent = title;
  if (certLightboxIssuer) {
    certLightboxIssuer.textContent = card.dataset.certIssuer || "";
  }
  openDialog(certLightbox, certLightboxClose);
}

function closeCertLightbox() {
  closeDialog(certLightbox);
  currentCertificateCard = null;
}

if (certificateToggle && certificateControls) {
  certificateToggle.addEventListener("click", () => {
    certificatesExpanded = !certificatesExpanded;
    updateCertificateVisibility(!certificatesExpanded);
  });
}

certificateCards.forEach((card) => {
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-haspopup", "dialog");
  card.setAttribute("aria-controls", "certLightbox");

  const openCertificate = () => {
    card.focus({ preventScroll: true });
    openCertLightbox(card);
  };

  card.addEventListener("click", openCertificate);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCertificate();
    }
  });
});

certLightboxClose?.addEventListener("click", closeCertLightbox);
certLightbox?.addEventListener("click", (event) => {
  if (event.target === certLightbox) closeCertLightbox();
});

// ========== LANGUAGE ==========
function updateLanguageControl() {
  if (languageLabel) {
    languageLabel.textContent = currentLanguage === "en" ? "TH" : "EN";
  }
  if (languageToggle) {
    languageToggle.setAttribute("aria-label", t("switchToLanguage"));
  }
}

function applyLanguage() {
  html.lang = currentLanguage;
  document.title = t("pageTitle");
  if (metaDescription) metaDescription.content = t("pageDescription");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.setAttribute("alt", t(element.dataset.i18nAlt));
  });

  updateLanguageControl();
  updateThemeControl(currentTheme());
  setNavigationOpen(navToggle?.getAttribute("aria-expanded") === "true");
  renderProjects();
  localizeCertificates();
  updateCertificateVisibility();

  modalClose?.setAttribute("aria-label", t("closeProject"));
  galleryPrev?.setAttribute("aria-label", t("previousProjectImage"));
  galleryNext?.setAttribute("aria-label", t("nextProjectImage"));
  certLightboxClose?.setAttribute("aria-label", t("closeCertificate"));

  if (currentProjectId && modal?.classList.contains("active")) {
    const project = projectsById.get(currentProjectId);
    if (project) renderProjectModal(project);
  }
}

languageToggle?.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "th" : "en";
    savePreference("language", currentLanguage);
  applyLanguage();
});

// ========== GLOBAL KEYBOARD INTERACTIONS ==========
document.addEventListener("keydown", (event) => {
  const navigationIsOpen = navToggle?.getAttribute("aria-expanded") === "true";

  if (navigationIsOpen && event.key === "Escape") {
    setNavigationOpen(false);
    navToggle.focus();
    return;
  }

  if (modal?.classList.contains("active")) {
    trapFocus(modal, event);
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevImage();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextImage();
    }
    return;
  }

  if (certLightbox?.classList.contains("active")) {
    trapFocus(certLightbox, event);
    if (event.key === "Escape") closeCertLightbox();
  }
});

applyLanguage();
