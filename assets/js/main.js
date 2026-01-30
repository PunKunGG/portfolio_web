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

// Check saved theme or default to light
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  html.setAttribute("data-theme", "dark");
  if (themeIcon) themeIcon.textContent = "☀️";
  updateGithubImages("dark");
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

    // Update icon
    if (themeIcon) {
      themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
    }

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

// Project data with multiple images per project
const projectsData = {
  "personal-work": {
    title: "Personal Work",
    description:
      "This is a personal project for creating a webpage and submitting work for the course CP310006 Mobile Web Development. The project showcases various web development techniques including responsive design, HTML/CSS layouts, and JavaScript interactivity.",
    images: [
      "assets/img/projects/pw1.jpg",
      "assets/img/projects/pw2.jpg",
      "assets/img/projects/pw3.jpg",
    ],
    tags: ["Web Development", "Full-Stack", "HTML", "CSS", "JavaScript"],
    links: [
      { label: "Repo", url: "https://github.com/PunKunGG/MobileWeb-Lab" },
      { label: "Page", url: "https://punkungg.github.io/MobileWeb-Lab/" },
    ],
  },
  "kku-archery": {
    title: "KKU Archery Club",
    description:
      "KKU Archery Club is a project created for use within the university's archery club, with its main system being the borrowing and returning of bows and arrows. Features include user authentication, equipment management, booking system, and admin dashboard for managing inventory.",
    images: [
      "assets/img/projects/arc1.jpg",
      "assets/img/projects/arc2.jpg",
      "assets/img/projects/arc3.jpg",
      "assets/img/projects/arc4.jpg",
      "assets/img/projects/arc5.jpg",
    ],
    tags: ["Web", "UX/UI", "Database", "Laravel", "MySQL"],
    links: [
      {
        label: "Repo",
        url: "https://github.com/PunKunGG/SoftwareDesign_FinalProject",
      },
    ],
  },
  "holo-globe": {
    title: "Holographic Data Globe",
    description:
      "This geographic data simulation program, in the form of Globe Visualization, focuses on displaying disaster data such as earthquakes and wildfires using holographic (3D Globe) data visualization. Built with Python and integrated with Firebase for real-time data updates.",
    images: ["assets/img/projects/holo1.jpg", "assets/img/projects/holo2.jpg"],
    tags: ["Python", "Website", "3D Visualization", "Data"],
    links: [
      {
        label: "Repo",
        url: "https://github.com/PunKunGG/Holographic-Data-Globe-Earthquake-Wildfire",
      },
      { label: "Page", url: "https://punkungg.github.io/MobileWeb_Project/" },
    ],
  },
  "nurse-platform": {
    title: "Nurse Learning Platform",
    description:
      "Educational project for Faculty of Nursing, Khon Kaen University. A platform for nursing students to learn and practice skills with authentication and progress tracking. Features include video lessons, quizzes, progress dashboard, and certificate generation.",
    images: [
      "assets/img/projects/nlp1.jpg",
      "assets/img/projects/nlp2.jpg",
      "assets/img/projects/nlp3.jpg",
      "assets/img/projects/nlp4.jpg",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Supabase", "Auth"],
    links: [
      { label: "Repo", url: "https://github.com/PunKunGG/nurse_project" },
      { label: "Page", url: "https://nurse-project-red.vercel.app/" },
    ],
  },
};

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

// Update gallery display
function updateGallery() {
  if (currentImages.length === 0) return;

  modalImage.style.opacity = "0";
  setTimeout(() => {
    modalImage.src = currentImages[currentImageIndex];
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
  const project = projectsData[projectId];
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
  modalTags.innerHTML = project.tags
    .map((tag) => `<span class="pill">${tag}</span>`)
    .join("");

  // Render links with icons
  modalLinks.innerHTML = project.links
    .map((link) => {
      const isRepo = link.label.toLowerCase().includes("repo");
      const linkClass = isRepo ? "repo-link" : "page-link";
      const icon = isRepo
        ? `<svg class="link-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`
        : `<svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
      const externalIcon = `<svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
      const label = isRepo ? "GitHub Repository" : "Visit Website";
      return `<a class="link ${linkClass}" href="${link.url}" target="_blank" rel="noopener">${icon}${label}${externalIcon}</a>`;
    })
    .join("");

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
  currentImages = [];
  currentImageIndex = 0;
}

// Event listeners for view buttons
document.querySelectorAll(".view-project-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const projectCard = btn.closest("[data-project]");
    if (projectCard) {
      openModal(projectCard.dataset.project);
    }
  });
});

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
  if (
    !modal.classList.contains("active") &&
    !certLightbox?.classList.contains("active")
  )
    return;

  if (modal.classList.contains("active")) {
    switch (e.key) {
      case "Escape":
        closeModal();
        break;
      case "ArrowLeft":
        prevImage();
        break;
      case "ArrowRight":
        nextImage();
        break;
    }
  }

  if (certLightbox?.classList.contains("active")) {
    if (e.key === "Escape") {
      closeCertLightbox();
    }
  }
});

// ========== CERTIFICATE LIGHTBOX ==========
const certLightbox = document.getElementById("certLightbox");
const certLightboxImg = document.getElementById("certLightboxImg");
const certLightboxTitle = document.getElementById("certLightboxTitle");
const certLightboxIssuer = document.getElementById("certLightboxIssuer");
const certLightboxClose = document.getElementById("certLightboxClose");

// Open certificate lightbox
function openCertLightbox(imgSrc, title, issuer) {
  if (!certLightbox || !certLightboxImg) return;

  certLightboxImg.src = imgSrc;
  certLightboxImg.alt = title;
  if (certLightboxTitle) certLightboxTitle.textContent = title;
  if (certLightboxIssuer) certLightboxIssuer.textContent = issuer;

  certLightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close certificate lightbox
function closeCertLightbox() {
  if (!certLightbox) return;
  certLightbox.classList.remove("active");
  document.body.style.overflow = "";
}

// Add click listeners to certificate cards
document.querySelectorAll(".certificate-card").forEach((card) => {
  card.addEventListener("click", () => {
    const imgSrc = card.dataset.certImg;
    const title = card.dataset.certTitle;
    const issuer = card.dataset.certIssuer;

    if (imgSrc && title) {
      openCertLightbox(imgSrc, title, issuer || "");
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

// ========== GITHUB CONTRIBUTIONS COUNT ==========
async function fetchGitHubContributions() {
  const contribCountEl = document.getElementById("contribCount");
  if (!contribCountEl) return;

  try {
    // Use GitHub GraphQL API via a proxy or scrape from contribution calendar
    // For now, we'll estimate from the SVG image colors (placeholder approach)
    // In production, you'd use GitHub's GraphQL API with authentication

    // Fallback: Show a reasonable estimate or fetch from a proxy
    const response = await fetch(
      "https://api.github.com/users/PunKunGG/events/public?per_page=100",
    );
    if (response.ok) {
      const events = await response.json();
      // Count unique contribution days in the last year
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      const recentEvents = events.filter(
        (e) => new Date(e.created_at) > oneYearAgo,
      );
      // Estimate based on recent activity (this is a rough estimate)
      const estimatedContributions = Math.max(recentEvents.length * 5, 100);
      contribCountEl.textContent = estimatedContributions.toLocaleString();
    } else {
      contribCountEl.textContent = "500+";
    }
  } catch (error) {
    console.log("Could not fetch GitHub contributions:", error);
    contribCountEl.textContent = "500+";
  }
}

// Fetch contributions on page load
fetchGitHubContributions();
