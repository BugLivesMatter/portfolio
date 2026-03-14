const en = {
  nav: {
    about: "About",
    github: "GitHub",
    skills: "Skills",
    projects: "Projects",
    education: "Education",
    contact: "Contact",
  },
  hero: {
    label: "Portfolio",
    roles: [
      "Backend Developer",
      "AI / ML Engineer",
      "Systems Programmer",
      "Game Developer",
      "Full-Stack Engineer",
    ],
    github: "GitHub",
    contact: "Contact me",
    stats: {
      projects: "Projects",
      technologies: "Technologies",
      years: "Years coding",
    },
    scroll: "Scroll",
  },
  about: {
    label: "About me",
    h1: "Building software",
    h2: "that actually works.",
    p1: "I'm a software engineer with a strong focus on backend systems, AI/ML, and cross-platform development. I build everything from high-performance C++ tools to intelligent Python pipelines and full web services.",
    p2: "My work spans computer vision, game development, industrial automation, and networked applications — always driven by the goal of shipping reliable, efficient software.",
    p3: "I'm comfortable diving deep into systems-level code or orchestrating cloud infrastructure with Docker and REST APIs.",
    info: {
      location: { label: "Location", value: "Russia" },
      focus: { label: "Focus", value: "Backend & AI" },
      degree: { label: "Degree", value: "B.Sc. SE" },
    },
    status: "Available",
    statusLabel: "Status",
  },
  github: {
    label: "Open Source",
    heading: "GitHub Activity",
    viewProfile: "View Profile",
    recentCommits: "Recent commits",
    noActivity: "No recent public activity",
    loading: "Fetching data...",
    error: "Could not load GitHub data",
    pushed: "pushed to",
    repositories: "Public repos",
    contributions: "Contributions",
    followers: "Followers",
  },
  skills: {
    label: "Tech Stack",
    heading: "Skills & Tools",
    categories: {
      languages: "Languages",
      aiml: "AI / ML",
      backend: "Backend",
      database: "Database",
      devops: "DevOps",
      other: "Other",
    },
  },
  projects: {
    label: "Work",
    heading: "Projects",
    viewAll: "View all on GitHub",
    featured: "Featured",
    items: [
      {
        title: "Composite Defect Scanner",
        description:
          "Industrial software for automated defectoscopy of a composite-material machine. OpenCV and Python for real-time anomaly detection from sensors and image data.",
      },
      {
        title: "AI Aimbot",
        description:
          "Real-time CV system detecting and tracking game targets. Built with C#, DirectML and ONNX-Runtime for fast inference on Windows.",
      },
      {
        title: "Subscription Auth System",
        description:
          "License & subscription management backend for a desktop app. Python and Flask, JWT auth, payment integration, RBAC, and hardware fingerprinting against key sharing.",
      },
      {
        title: "RNG Paradice",
        description:
          "Mobile card game in Unity and C# where every mechanic revolves around probability. Custom shaders, animated UI, and a full game loop with progression systems.",
      },
      {
        title: "AnonLine VPN — VLESS",
        description:
          "VPN client for VLESS servers with Reality security. Python + PyQt5 with Xray-core backend. Supports VLESS key format with simple GUI configuration.",
      },
      {
        title: "LZT Market Monitor",
        description:
          "LZT.Market monitor with Telegram notifications for new listings. Dark PyQt5 GUI, headless Chrome automation, Windows autostart, and event log.",
      },
    ],
  },
  education: {
    label: "Background",
    heading: "Education",
    badge1: "Bachelor's Degree",
    badge2: "In Progress",
    university: "South Russian State Polytechnic University",
    specialty: "Software Engineering — Программная инженерия",
    description:
      "Studying CS fundamentals, software architecture, algorithms, and applied programming. Hands-on experience through academic and independent projects.",
  },
  contact: {
    label: "Let's talk",
    h1: "Have a project",
    h2: "in mind?",
    description:
      "Open to interesting projects, collaborations, and job opportunities. I respond quickly.",
    write: "Write me",
    copyUsername: "Copy username",
    copied: "Copied!",
    copyright: "All rights reserved.",
    builtWith: "Vite · React · TypeScript",
  },
};

export default en;
export type Translations = typeof en;
