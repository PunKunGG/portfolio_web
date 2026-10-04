/**
 * @typedef {{en: string, th: string}} LocalizedText
 * @typedef {{type: "repository" | "website", url: string}} ProjectLink
 * @typedef {Object} PortfolioProject
 * @property {string} id
 * @property {LocalizedText} title
 * @property {LocalizedText} summary
 * @property {LocalizedText} description
 * @property {string[]} images
 * @property {string[]} tags
 * @property {number} cardTagCount
 * @property {ProjectLink[]} links
 */

/** @type {ReadonlyArray<PortfolioProject>} */
export const projects = Object.freeze([
  {
    id: "nexusplay",
    title: {
      en: "NexusPlay — Order Tracking",
      th: "NexusPlay ระบบติดตามคำสั่งซื้อ",
    },
    summary: {
      en: "A responsive order-tracking interface with search, status tabs, validation, and accessible feedback.",
      th: "หน้าติดตามคำสั่งซื้อแบบ responsive พร้อมการค้นหา แท็บสถานะ การตรวจสอบข้อมูล และ feedback ที่เข้าถึงได้",
    },
    description: {
      en: "A Front-End Developer technical assessment built with the Next.js App Router, React, TypeScript, and Tailwind CSS. It uses fictional local data to demonstrate order search, current and completed order tabs, validation, loading and error states, copy feedback, keyboard navigation, and responsive accessible design without requiring a backend.",
      th: "ผลงานแบบทดสอบตำแหน่ง Front-End Developer ที่พัฒนาด้วย Next.js App Router, React, TypeScript และ Tailwind CSS ใช้ข้อมูลจำลองภายในเครื่องเพื่อสาธิตการค้นหาคำสั่งซื้อ แท็บรายการปัจจุบันและประวัติ การตรวจสอบข้อมูล สถานะโหลดและข้อผิดพลาด feedback การคัดลอก การใช้งานด้วยคีย์บอร์ด และการออกแบบ responsive ที่เข้าถึงได้โดยไม่ต้องมี backend",
    },
    images: ["assets/img/projects/nexusplay-preview.svg"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Accessibility"],
    cardTagCount: 4,
    links: [
      {
        type: "repository",
        url: "https://github.com/PunKunGG/NexusPlay",
      },
      {
        type: "website",
        url: "https://nexus-play-one.vercel.app/",
      },
    ],
  },
  {
    id: "personal-work",
    title: { en: "Mobile Web Lab", th: "แลปพัฒนาเว็บและโมบาย" },
    summary: {
      en: "Coursework for SC310006 Mobile and Web Application Development, covering responsive interfaces and browser-side interaction.",
      th: "ผลงานรายวิชา SC310006 Mobile and Web Application Development ครอบคลุม responsive interface และการโต้ตอบบนเบราว์เซอร์",
    },
    description: {
      en: "A collection of coursework for SC310006 Mobile and Web Application Development. The work demonstrates responsive layouts, structured HTML and CSS, TypeScript and JavaScript interaction, and deployment through GitHub Pages.",
      th: "ชุดผลงานจากรายวิชา SC310006 Mobile and Web Application Development แสดงการทำ responsive layout, การจัดโครงสร้าง HTML/CSS, การโต้ตอบด้วย TypeScript และ JavaScript รวมถึงการเผยแพร่ผ่าน GitHub Pages",
    },
    images: [
      "assets/img/projects/pw1.jpg",
      "assets/img/projects/pw2.jpg",
      "assets/img/projects/pw3.jpg",
    ],
    tags: ["Web Development", "TypeScript", "HTML", "CSS", "JavaScript"],
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
    title: { en: "KKU Archery Club", th: "ระบบชมรมยิงธนู มข." },
    summary: {
      en: "An equipment borrowing and return system built for the university archery club.",
      th: "ระบบยืมและคืนอุปกรณ์ที่พัฒนาสำหรับชมรมยิงธนูของมหาวิทยาลัย",
    },
    description: {
      en: "A management system for the KKU Archery Club centered on borrowing and returning bows and arrows. It includes authentication, equipment and inventory management, booking workflows, and an administrative dashboard.",
      th: "ระบบจัดการสำหรับชมรมยิงธนู มข. โดยเน้นขั้นตอนการยืมและคืนคันธนูกับลูกธนู พร้อมระบบยืนยันตัวตน จัดการอุปกรณ์และคลัง การจอง และแดชบอร์ดผู้ดูแล",
    },
    images: [
      "assets/img/projects/arc1.jpg",
      "assets/img/projects/arc2.jpg",
      "assets/img/projects/arc3.jpg",
      "assets/img/projects/arc4.jpg",
      "assets/img/projects/arc5.jpg",
    ],
    tags: ["Java", "UX/UI", "Database", "Software Design", "Inventory"],
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
    title: { en: "Holographic Data Globe", th: "ลูกโลกข้อมูลแบบโฮโลกราฟิก" },
    summary: {
      en: "A 3D globe visualization for exploring earthquake and wildfire data.",
      th: "ระบบแสดงข้อมูลแผ่นดินไหวและไฟป่าบนลูกโลกสามมิติ",
    },
    description: {
      en: "A geographic data simulation and visualization project that presents earthquake and wildfire information on a 3D globe. The project combines Python-based data work with a web visualization and Firebase-backed updates.",
      th: "โครงงานจำลองและแสดงผลข้อมูลภูมิศาสตร์ โดยนำข้อมูลแผ่นดินไหวและไฟป่ามาแสดงบนลูกโลกสามมิติ ผสานงานประมวลผลข้อมูลด้วย Python เว็บ visualization และการอัปเดตข้อมูลผ่าน Firebase",
    },
    images: ["assets/img/projects/holo1.jpg", "assets/img/projects/holo2.jpg"],
    tags: ["Python", "Web", "3D Visualization", "Firebase"],
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
    title: { en: "Nurse Learning Platform", th: "แพลตฟอร์มการเรียนรู้พยาบาล" },
    summary: {
      en: "A learning platform for nursing students with authentication, lessons, quizzes, and progress tracking.",
      th: "แพลตฟอร์มสำหรับนักศึกษาพยาบาล พร้อมระบบเข้าสู่ระบบ บทเรียน แบบทดสอบ และติดตามความก้าวหน้า",
    },
    description: {
      en: "An educational platform developed for the Faculty of Nursing at Khon Kaen University. It supports authenticated learning, video lessons, quizzes, progress dashboards, and certificate generation.",
      th: "แพลตฟอร์มการศึกษาที่พัฒนาสำหรับคณะพยาบาลศาสตร์ มหาวิทยาลัยขอนแก่น รองรับการเรียนแบบยืนยันตัวตน วิดีโอบทเรียน แบบทดสอบ แดชบอร์ดความก้าวหน้า และการสร้างเกียรติบัตร",
    },
    images: [
      "assets/img/projects/nlp1.jpg",
      "assets/img/projects/nlp2.jpg",
      "assets/img/projects/nlp3.jpg",
      "assets/img/projects/nlp4.jpg",
    ],
    tags: ["C#", "JavaScript", "Supabase", "Auth", "Education"],
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
  {
    id: "classmood-ai",
    title: {
      en: "ClassMood AI",
      th: "ClassMood AI วิเคราะห์พฤติกรรมในชั้นเรียน",
    },
    summary: {
      en: "A classroom behavior analytics system using YOLOv8, pose estimation, and anonymous position tracking.",
      th: "ระบบวิเคราะห์พฤติกรรมในชั้นเรียนด้วย YOLOv8, pose estimation และการติดตามตำแหน่งแบบไม่ระบุตัวตน",
    },
    description: {
      en: "A web system that analyzes classroom video from a webcam or uploaded file. It detects learning-related behaviors with YOLOv8 and pose estimation, tracks anonymous position IDs, presents real-time charts, and exports reports as PDF, Excel, CSV, or JSON. Teacher access is protected with Supabase Auth.",
      th: "ระบบเว็บสำหรับวิเคราะห์วิดีโอในชั้นเรียนจากเว็บแคมหรือไฟล์ที่อัปโหลด ตรวจจับพฤติกรรมด้วย YOLOv8 และ pose estimation ติดตาม Position ID แบบไม่ระบุตัวตน แสดงกราฟแบบ real time และส่งออกรายงานเป็น PDF, Excel, CSV หรือ JSON โดยป้องกันการเข้าถึงของอาจารย์ด้วย Supabase Auth",
    },
    images: ["assets/img/projects/classmood-logo.png"],
    tags: ["Python", "YOLOv8", "Computer Vision", "Supabase", "Analytics"],
    cardTagCount: 4,
    links: [
      {
        type: "repository",
        url: "https://github.com/PunKunGG/Seminar_Prototype",
      },
    ],
  },
  {
    id: "solarflow-ai",
    title: {
      en: "SolarFlow AI",
      th: "SolarFlow AI ออกแบบโครงสร้างโซลาร์",
    },
    summary: {
      en: "A reproducible prototype for AI-assisted optimization of solar optical structures.",
      th: "ต้นแบบกระบวนการที่ทำซ้ำได้สำหรับใช้ AI ช่วยปรับโครงสร้างเชิงแสงของโซลาร์เซลล์",
    },
    description: {
      en: "A prototype workflow for the EGAT Circular Innovation Challenge that explores solar optical-structure optimization with MEEP, Solcore, DEVSIM, and a Python optimizer. The repository separates surrogate dry-run outputs from scientific results; numerical and experimental validation remains required.",
      th: "ต้นแบบกระบวนการสำหรับ EGAT Circular Innovation Challenge เพื่อสำรวจการปรับโครงสร้างเชิงแสงของโซลาร์เซลล์ด้วย MEEP, Solcore, DEVSIM และตัวปรับค่าเหมาะสมด้วย Python โดยแยกผล dry-run จำลองออกจากผลทางวิทยาศาสตร์อย่างชัดเจน ซึ่งยังต้องผ่านการตรวจสอบเชิงตัวเลขและการทดลองจริง",
    },
    images: [
      "assets/img/projects/solarflow-concept.png",
      "assets/img/projects/solarflow-heatmap.png",
    ],
    tags: ["Python", "Simulation", "Optimization", "Solar", "Research"],
    cardTagCount: 4,
    links: [
      {
        type: "repository",
        url: "https://github.com/PunKunGG/solarflow_ai",
      },
    ],
  },
  {
    id: "byte-defense",
    title: { en: "Byte Defense", th: "Byte Defense เกมวางแผนป้องกันฐาน" },
    summary: {
      en: "A browser tower-defense game with branching upgrades, varied enemies, three levels, and local score tracking.",
      th: "เกม tower defense บนเบราว์เซอร์ที่มีสายอัปเกรด ศัตรูหลายรูปแบบ สามด่าน และบันทึกคะแนนในเครื่อง",
    },
    description: {
      en: "A JavaScript tower-defense game featuring four tower roles, branching level-three upgrades, multiple enemy mechanics, bosses, and three maps with different lane layouts. It also includes wave previews, a codex, contextual hints, pause controls, and locally persisted best scores.",
      th: "เกม tower defense ด้วย JavaScript ที่มีป้อมสี่บทบาท สายอัปเกรดระดับสาม กลไกศัตรูและบอสหลายแบบ รวมถึงสามแผนที่ที่จัดเลนต่างกัน พร้อมระบบดู wave ล่วงหน้า codex คำแนะนำตามสถานการณ์ เมนูพักเกม และบันทึกคะแนนสูงสุดไว้ในเครื่อง",
    },
    images: ["assets/img/projects/byte-defense-logo.png"],
    tags: ["JavaScript", "Game Development", "HTML", "CSS", "LocalStorage"],
    cardTagCount: 5,
    links: [
      {
        type: "repository",
        url: "https://github.com/PunKunGG/tower-defense",
      },
      {
        type: "website",
        url: "https://punkungg.github.io/tower-defense/",
      },
    ],
  },
  {
    id: "math-teacher",
    title: {
      en: "Math Teacher Website",
      th: "เว็บไซต์รายวิชาคณิตศาสตร์",
    },
    summary: {
      en: "A Next.js learning website for students, parents, and teachers with lessons, documents, news, and administration tools.",
      th: "เว็บไซต์การเรียนรู้ด้วย Next.js สำหรับนักเรียน ผู้ปกครอง และครู พร้อมบทเรียน เอกสาร ข่าวสาร และเครื่องมือผู้ดูแล",
    },
    description: {
      en: "A Mathayom 3 mathematics website built with the Next.js App Router. It provides dynamic lessons, documents, announcements, contact APIs, and authenticated administration for managing lessons and files through Supabase.",
      th: "เว็บไซต์รายวิชาคณิตศาสตร์ระดับมัธยมศึกษาปีที่ 3 ที่พัฒนาด้วย Next.js App Router มีบทเรียนแบบ dynamic เอกสาร ประกาศ API ติดต่อ และระบบผู้ดูแลแบบยืนยันตัวตนสำหรับจัดการบทเรียนกับไฟล์ผ่าน Supabase",
    },
    images: ["assets/img/projects/math-teacher.jpg"],
    tags: ["Next.js", "TypeScript", "Supabase", "API", "Education"],
    cardTagCount: 4,
    links: [
      {
        type: "repository",
        url: "https://github.com/PunKunGG/math-teacher-website",
      },
    ],
  },
]);
