/**
 * @typedef {Object} ProjectLink
 * @property {"repository" | "website"} type
 * @property {string} url
 */

/**
 * @typedef {Object} PortfolioProject
 * @property {string} id
 * @property {string} title
 * @property {string} summary
 * @property {string} description
 * @property {string[]} images
 * @property {string[]} tags
 * @property {number} cardTagCount
 * @property {ProjectLink[]} links
 */

/** @type {ReadonlyArray<PortfolioProject>} */
export const projects = Object.freeze([
  {
    id: "personal-work",
    title: "Personal Work",
    summary:
      "This is a personal project for creating a webpage and submitting work for the course CP310006 Mobile Web Development.",
    description:
      "This is a personal project for creating a webpage and submitting work for the course CP310006 Mobile Web Development. The project showcases various web development techniques including responsive design, HTML/CSS layouts, and JavaScript interactivity.",
    images: [
      "assets/img/projects/pw1.jpg",
      "assets/img/projects/pw2.jpg",
      "assets/img/projects/pw3.jpg",
    ],
    tags: ["Web Development", "Full-Stack", "HTML", "CSS", "JavaScript"],
    cardTagCount: 2,
    links: [
      {
        type: "repository",
        url: "https://github.com/PunKunGG/MobileWeb-Lab",
      },
      {
        type: "website",
        url: "https://punkungg.github.io/MobileWeb-Lab/",
      },
    ],
  },
  {
    id: "kku-archery",
    title: "KKU Archery Club",
    summary:
      "KKU Archery Club is a project created for use within the university's archery club, with its main system being the borrowing and returning of bows and arrows.",
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
    cardTagCount: 3,
    links: [
      {
        type: "repository",
        url: "https://github.com/PunKunGG/SoftwareDesign_FinalProject",
      },
    ],
  },
  {
    id: "holo-globe",
    title: "Holographic Data Globe",
    summary:
      "This geographic data simulation program, in the form of Globe Visualization, focuses on displaying disaster data such as earthquakes and wildfires using holographic (3D Globe) data visualization.",
    description:
      "This geographic data simulation program, in the form of Globe Visualization, focuses on displaying disaster data such as earthquakes and wildfires using holographic (3D Globe) data visualization. Built with Python and integrated with Firebase for real-time data updates.",
    images: ["assets/img/projects/holo1.jpg", "assets/img/projects/holo2.jpg"],
    tags: ["Python", "Website", "3D Visualization", "Data"],
    cardTagCount: 4,
    links: [
      {
        type: "repository",
        url: "https://github.com/PunKunGG/Holographic-Data-Globe-Earthquake-Wildfire",
      },
      {
        type: "website",
        url: "https://punkungg.github.io/MobileWeb_Project/",
      },
    ],
  },
  {
    id: "nurse-platform",
    title: "Nurse Learning Platform",
    summary:
      "Educational project, Faculty of Nursing, Khon Kaen University. A platform for nursing students to learn and practice skills with authentication and progress tracking.",
    description:
      "Educational project for Faculty of Nursing, Khon Kaen University. A platform for nursing students to learn and practice skills with authentication and progress tracking. Features include video lessons, quizzes, progress dashboard, and certificate generation.",
    images: [
      "assets/img/projects/nlp1.jpg",
      "assets/img/projects/nlp2.jpg",
      "assets/img/projects/nlp3.jpg",
      "assets/img/projects/nlp4.jpg",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Supabase", "Auth"],
    cardTagCount: 5,
    links: [
      {
        type: "repository",
        url: "https://github.com/PunKunGG/nurse_project",
      },
      {
        type: "website",
        url: "https://nurse-project-red.vercel.app/",
      },
    ],
  },
]);
