// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const html = document.documentElement;

// GitHub stats URLs for light and dark themes
const githubUrls = {
  light: {
    contrib: "https://ghchart.rshah.org/4a7fff/PunKunGG"
  },
  dark: {
    contrib: "https://ghchart.rshah.org/7aa2ff/PunKunGG"
  }
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
    description: "This is a personal project for creating a webpage and submitting work for the course CP310006 Mobile Web Development. The project showcases various web development techniques including responsive design, HTML/CSS layouts, and JavaScript interactivity.",
    images: [
      "assets/img/pw1.jpg",
      "assets/img/pw2.jpg",
      "assets/img/pw3.jpg"
    ],
    tags: ["Web Development", "Full-Stack", "HTML", "CSS", "JavaScript"],
    links: [
      { label: "Repo", url: "https://github.com/PunKunGG/MobileWeb-Lab" },
      { label: "Page", url: "https://punkungg.github.io/MobileWeb-Lab/" }
    ]
  },
  "kku-archery": {
    title: "KKU Archery Club",
    description: "KKU Archery Club is a project created for use within the university's archery club, with its main system being the borrowing and returning of bows and arrows. Features include user authentication, equipment management, booking system, and admin dashboard for managing inventory.",
    images: [
      "assets/img/arc1.jpg",
      "assets/img/arc2.jpg",
      "assets/img/arc3.jpg",
      "assets/img/arc4.jpg",
      "assets/img/arc5.jpg"
    ],
    tags: ["Web", "UX/UI", "Database", "Laravel", "MySQL"],
    links: [
      { label: "Repo", url: "https://github.com/PunKunGG/SoftwareDesign_FinalProject" }
    ]
  },
  "holo-globe": {
    title: "Holographic Data Globe",
    description: "This geographic data simulation program, in the form of Globe Visualization, focuses on displaying disaster data such as earthquakes and wildfires using holographic (3D Globe) data visualization. Built with Python and integrated with Firebase for real-time data updates.",
    images: [
      "assets/img/holo1.jpg",
      "assets/img/holo2.jpg"
    ],
    tags: ["Python", "Website", "3D Visualization", "Data"],
    links: [
      { label: "Repo", url: "https://github.com/PunKunGG/Holographic-Data-Globe-Earthquake-Wildfire" },
      { label: "Page", url: "https://punkungg.github.io/MobileWeb_Project/"}
    ]
  },
  "nurse-platform": {
    title: "Nurse Learning Platform",
    description: "Educational project for Faculty of Nursing, Khon Kaen University. A platform for nursing students to learn and practice skills with authentication and progress tracking. Features include video lessons, quizzes, progress dashboard, and certificate generation.",
    images: [
      "assets/img/nlp1.jpg",
      "assets/img/nlp2.jpg",
      "assets/img/nlp3.jpg",
      "assets/img/nlp4.jpg"
    ],
    tags: ["HTML", "CSS", "JavaScript", "Supabase", "Auth"],
    links: [
      { label: "Repo", url: "https://github.com/PunKunGG/nurse_project" },
      { label: "Page", url: "https://nurse-project-red.vercel.app/" }
    ]
  }
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
  currentImageIndex = currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1;
  updateGallery();
}

function nextImage() {
  if (currentImages.length <= 1) return;
  currentImageIndex = currentImageIndex === currentImages.length - 1 ? 0 : currentImageIndex + 1;
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
  modalTags.innerHTML = project.tags.map(tag => `<span class="pill">${tag}</span>`).join("");

  // Render links
  modalLinks.innerHTML = project.links.map(link =>
    `<a class="link" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`
  ).join("");

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
document.querySelectorAll(".view-project-btn").forEach(btn => {
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
  if (!modal.classList.contains("active")) return;
  
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
});
