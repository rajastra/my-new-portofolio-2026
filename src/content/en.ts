import type { Content } from "./types";

/**
 * English content. Source: Resume_Frontend_Raja_Saputera_new_2026 (Oct 2026).
 * Every claim must be backed by the CV or LinkedIn. Do not add numbers or outcomes from elsewhere.
 */
export const en: Content = {
  profile: {
    name: "Raja Saputera",
    role: "Frontend Engineer",
    photo: {
      src: "/photo/raja-saputera.jpg",
      alt: "Portrait of Raja Saputera in a green checked shirt",
      width: 960,
      height: 1200,
    },
    location: "Lubuklinggau, Indonesia",
    availability: "Open to remote work and relocation",
    email: "rajasaputera@gmail.com",
    links: {
      github: "https://github.com/rajastra",
      linkedin: "https://www.linkedin.com/in/rajasaputera",
      cv: "/cv/raja-saputera-cv.pdf",
    },
    headline: "I build interfaces that change with the person using them.",
    intro: {
      recruiter: "I'm Raja. I build school ERP systems and booking platforms with React, Next.js and TypeScript.",
      engineer: "Role-based UI in React and TypeScript, with shared state across 20+ REST APIs.",
    },
    coreStack: ["TypeScript", "React", "Next.js", "Redux", "Zustand", "Node.js / Express", "Jest + RTL", "GCP"],
    about: {
      recruiter: [
        "I'm Raja Saputera, a frontend engineer from ",
        { mark: "Lubuklinggau, Indonesia", tone: "soft" },
        " with ",
        { mark: "3+ years", tone: "sun" },
        " of experience. Since 2023 I have led the frontend of the school ERP at ",
        { mark: "Future Gate High School", tone: "soft" },
        ": five modules, from admissions to payroll, used by 400+ people. Before that I built a dormitory and hotel booking platform for students of ",
        { mark: "Universiti Kebangsaan Malaysia", tone: "plain" },
        " in a remote team of ten, covering both the React screens and the Node.js API, online payment included. I trained in Google's ",
        { mark: "Bangkit Academy", tone: "sun" },
        " and worked on the redesign of the DPR website at DOT Indonesia. I work in ",
        { mark: "React, Next.js and TypeScript", tone: "plain" },
        ", write unit tests, and am used to Agile teams spread across two countries. I am open to remote work and relocation.",
      ],
      engineer: [
        "I'm Raja Saputera. Most of my work is role-based UI: ",
        { mark: "the same records, shown differently", tone: "sun" },
        " to admissions, HR, finance and inventory staff. At ",
        { mark: "Future Gate High School", tone: "soft" },
        " I lead a five-module frontend in ",
        { mark: "React and TypeScript", tone: "plain" },
        ", with state in Redux and Zustand kept in sync across 20+ REST APIs, and unit tests in Jest and React Testing Library. At ",
        { mark: "Chup Online", tone: "soft" },
        " I built both sides of a booking platform for 5,000+ UKM students: the responsive React client, the ",
        { mark: "Node.js and Express API", tone: "plain" },
        ", and the payment gateway between them. Earlier I built a React admin dashboard and a backend deployed on ",
        { mark: "Google Cloud", tone: "sun" },
        " in the Bangkit program, and Next.js pages for the DPR website revamp. Day to day I use Git, GitLab and Jira.",
      ],
    },
    aboutClose: {
      recruiter: "If your team needs a frontend engineer, let's talk.",
      engineer: "If you want to talk about the code, write to me.",
    },
  },

  experience: [
    {
      company: "Future Gate High School",
      role: "Frontend Engineer",
      place: "Bekasi, Indonesia",
      start: "2023-05",
      end: null,
      project: "school-erp",
      summary: {
        recruiter: "Leads the frontend of the school's ERP, which has 400+ users.",
        engineer: "Frontend architecture for 5 ERP modules in React + TypeScript, Redux/Zustand, 20+ REST APIs.",
      },
      highlights: {
        recruiter: [
          "Delivered 5 core modules: Academic, Admissions, HR, Finance and Inventory.",
          "Designed role-specific screens that cover the whole journey from enrollment to payroll.",
          "Reduced UI bugs through internal testing and written technical documentation.",
        ],
        engineer: [
          "Owned the frontend architecture across 5 interconnected modules.",
          "Integrated 20+ REST APIs and tuned Redux/Zustand state so data stays in sync between modules.",
          "Wrote unit tests with Jest and React Testing Library, plus technical docs for the team.",
        ],
      },
      stack: ["React", "TypeScript", "Redux", "Zustand", "REST", "Jest", "RTL"],
    },
    {
      company: "Chup Online",
      role: "Software Developer (remote)",
      place: "Malaysia",
      start: "2024-09",
      end: "2025-06",
      project: "ukm-booking",
      summary: {
        recruiter: "Built a dormitory and hotel booking platform for 5,000+ university students.",
        engineer: "Full-stack booking platform: React client, Node.js/Express REST API, payment gateway.",
      },
      highlights: {
        recruiter: [
          "Built the booking platform used by 5,000+ active students at Universiti Kebangsaan Malaysia.",
          "Added online payment for dorm rentals and hotel stays, from the booking screen to the server.",
          "Worked remotely in an Agile team of 10+ developers and designers across Indonesia and Malaysia.",
        ],
        engineer: [
          "Built the responsive React booking flow and the Express REST API and database logic behind it.",
          "Integrated a payment gateway across client and server.",
          "Kept performance steady across sprints in a 10+ person cross-border team.",
        ],
      },
      stack: ["React", "Node.js", "Express", "REST", "Payment gateway"],
    },
    {
      company: "Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)",
      role: "Cloud Computing cohort",
      place: "Indonesia",
      start: "2023-02",
      end: "2023-07",
      project: "waste-scanner",
      summary: {
        recruiter: "Built an admin dashboard and worked on a cloud backend in Google's Bangkit program.",
        engineer: "React admin dashboard on a REST API; backend for a waste-scanning app deployed on GCP.",
      },
      highlights: {
        recruiter: [
          "Designed and built an admin dashboard that made data management easier.",
          "Built the backend of a waste-scanning capstone app, deployed on Google Cloud.",
        ],
        engineer: [
          "React admin dashboard backed by a REST API.",
          "Backend service for the capstone app deployed on Google Cloud Platform.",
        ],
      },
      stack: ["React", "REST", "Node.js", "GCP"],
    },
    {
      company: "DOT Indonesia",
      role: "Frontend Engineer (internship)",
      place: "Indonesia",
      start: "2023-02",
      end: "2023-04",
      project: "dpr-revamp",
      summary: {
        recruiter: "Worked on the redesign of the Indonesian House of Representatives (DPR) website.",
        engineer: "React and Next.js on the DPR website revamp; responsive layouts in HTML5 and SCSS.",
      },
      highlights: {
        recruiter: [
          "Contributed to the DPR website redesign.",
          "Built mobile-friendly layouts and interactive UI.",
          "Joined daily stand-ups and sprint planning in a Scrum team.",
        ],
        engineer: [
          "Built pages with React and Next.js for the DPR revamp.",
          "Implemented responsive layouts with HTML5 and SCSS.",
        ],
      },
      stack: ["React", "Next.js", "SCSS"],
    },
  ],

  projects: [
    {
      slug: "school-erp",
      title: "School ERP",
      client: "Future Gate High School",
      period: "2023 – now",
      kind: "Frontend lead, 5 modules",
      year: "2023",
      confidential: true,
      shots: [
        {
          src: "/work/school-erp/home-desktop.jpg",
          alt: "ERP home screen: greeting, attendance, teaching schedule, foundation announcements, quick actions and the module launcher",
          caption: "Home screen, where every user role starts.",
          device: "desktop",
          width: 2880,
          height: 1800,
        },
        {
          src: "/work/school-erp/home-mobile.jpg",
          alt: "The same ERP home screen on a phone",
          caption: "The same home screen on a phone.",
          device: "mobile",
          width: 780,
          height: 1688,
        },
        {
          src: "/work/school-erp/admissions-desktop.jpg",
          alt: "Admissions dashboard with a to-do list for registrations, applicant status breakdown and the active intake wave",
          caption: "Admissions dashboard with the registrations that need action today.",
          device: "desktop",
          width: 2880,
          height: 1800,
        },
        {
          src: "/work/school-erp/learning-desktop.jpg",
          alt: "Learning dashboard with class progress bars, latest materials and the module roadmap",
          caption: "Learning: class progress against the semester plan.",
          device: "desktop",
          width: 2880,
          height: 1800,
        },
      ],
      summary: {
        recruiter: "Five modules that run a school day to day, from admissions to payroll.",
        engineer: "One React + TypeScript frontend, five modules, 20+ REST APIs, role-based views.",
      },
      metrics: [
        { value: "5", label: "modules shipped" },
        { value: "400+", label: "users" },
        { value: "20+", label: "REST APIs integrated" },
      ],
      recruiter: {
        problem:
          "The school needed one system for admissions, academics, HR, finance and inventory, with screens suited to each department.",
        role: "I lead the frontend: architecture, the screens for each department, and integration with the backend team's APIs.",
        outcome: [
          "Every department works in one system, with screens built for its own job.",
          "400+ users, from new-student enrollment through payroll.",
          "Fewer UI bugs after introducing internal testing and documentation.",
        ],
      },
      engineer: {
        architecture: [
          "Five connected modules (Academic, Admissions, HR, Finance, Inventory) in one React + TypeScript frontend.",
          "Redux and Zustand hold the state, so data stays in sync across modules.",
          "Role-specific views for each type of user.",
        ],
        decisions: [
          {
            title: "Role-based views over shared data",
            body: "Each role gets its own screens, built on the same records, so the modules stay in sync with each other.",
          },
          {
            title: "Testing and documentation",
            body: "Unit tests with Jest and React Testing Library, plus internal testing and written technical docs, reduced UI bugs.",
          },
        ],
        stack: ["React", "TypeScript", "Redux", "Zustand", "REST", "Jest", "React Testing Library"],
      },
    },
    {
      slug: "ukm-booking",
      title: "Dorm & hotel booking",
      client: "Chup Online, for Universiti Kebangsaan Malaysia",
      period: "2024 – 2025",
      kind: "Full-stack, online payment",
      year: "2024",
      confidential: true,
      shots: [
        {
          src: "/work/ukm-booking/listing-desktop.jpg",
          alt: "StayUKM property search: on-campus and off-campus filters and property cards with available slots",
          caption: "Search and filter on-campus and off-campus housing.",
          device: "desktop",
          width: 2560,
          height: 1600,
        },
        {
          src: "/work/ukm-booking/listing-mobile.jpg",
          alt: "StayUKM property search on a phone",
          caption: "The same search on a phone.",
          device: "mobile",
          width: 780,
          height: 1688,
        },
      ],
      summary: {
        recruiter: "How 5,000+ UKM students book a dorm room or a hotel stay and pay online.",
        engineer: "Full-stack: React booking flow, Express REST API, payment gateway integration.",
      },
      metrics: [
        { value: "5,000+", label: "active students" },
        { value: "10+", label: "people in the remote team" },
      ],
      recruiter: {
        problem: "Students needed one place to find, book and pay for dorm rooms and hotel stays.",
        role: "I built both the booking interface and the API behind it, working remotely with a team across Indonesia and Malaysia.",
        outcome: [
          "Used by 5,000+ active students.",
          "Secure online payment for dorm rentals and hotel bookings.",
        ],
      },
      engineer: {
        architecture: [
          "Responsive React client for search, booking and checkout.",
          "Node.js / Express REST API with the booking and database logic.",
          "Payment gateway integrated across client and server.",
        ],
        decisions: [],
        stack: ["React", "Node.js", "Express", "REST", "Payment gateway"],
      },
    },
    {
      slug: "waste-scanner",
      title: "ReWaste capstone",
      client: "Bangkit Academy capstone",
      period: "2023",
      kind: "Backend and admin dashboard",
      year: "2023",
      confidential: false,
      summary: {
        recruiter: "Capstone project in Google's Bangkit program: an app that identifies waste from a photo.",
        engineer: "Backend service on GCP plus a React admin dashboard over a REST API.",
      },
      metrics: [],
      recruiter: {
        problem: "The team built an app that scans waste from a photo and suggests crafts you can make from it.",
        role: "I was on the backend team and also built the admin dashboard.",
        outcome: ["Backend deployed on Google Cloud.", "Admin dashboard for managing the app's data."],
      },
      engineer: {
        architecture: ["REST backend deployed on Google Cloud Platform.", "React admin dashboard consuming the same API."],
        decisions: [],
        stack: ["React", "Node.js", "REST", "GCP"],
      },
      links: [
        { label: "Dashboard source on GitHub", href: "https://github.com/rajastra/rewaste-frontend" },
        { label: "Live dashboard", href: "https://rewaste-frontend.vercel.app" },
      ],
    },
    {
      slug: "dpr-revamp",
      title: "DPR website revamp",
      client: "DOT Indonesia",
      period: "2023",
      kind: "Frontend intern",
      year: "2023",
      confidential: true,
      summary: {
        recruiter: "Redesign of the Indonesian House of Representatives website.",
        engineer: "React + Next.js pages with responsive HTML5/SCSS layouts.",
      },
      metrics: [],
      recruiter: {
        problem: "The DPR website needed a modern, mobile-friendly redesign.",
        role: "As an intern, I built pages and responsive layouts in a Scrum team.",
        outcome: ["Better experience on mobile.", "Delivered on schedule with the team."],
      },
      engineer: {
        architecture: ["Next.js pages and React components.", "Responsive layouts in HTML5 and SCSS."],
        decisions: [],
        stack: ["React", "Next.js", "SCSS"],
      },
    },
  ],

  openSource: [
    {
      name: "Taktix",
      year: "2025",
      summary: {
        recruiter: "Exam practice platform for Indonesian university entrance (UTBK), civil service (CPNS) and service-school tests.",
        engineer: "Next.js + TypeScript app with JWT auth, practice-test flows and score charts (Chart.js, ApexCharts).",
      },
      stack: ["Next.js", "TypeScript", "Flowbite", "Chart.js", "JWT"],
      repo: "https://github.com/rajastra/taktix-web",
      demo: "https://taktix-web-ashen.vercel.app",
      image: { src: "/work/oss/taktix.jpg", alt: "Taktix home with exam categories: UTBK, CPNS and service schools", width: 1920, height: 1200 },
    },
    {
      name: "ReWaste dashboard",
      year: "2023",
      summary: {
        recruiter: "Admin dashboard for the Bangkit capstone app that suggests crafts you can make from waste.",
        engineer: "React + Ant Design admin with token auth and full CRUD over the capstone's REST API.",
      },
      stack: ["React", "Ant Design", "React Router", "REST"],
      repo: "https://github.com/rajastra/rewaste-frontend",
      demo: "https://rewaste-frontend.vercel.app",
    },
    {
      name: "Movie Catalogue",
      year: "2023",
      summary: {
        recruiter: "A catalogue of films now playing, with ratings and synopses.",
        engineer: "Next.js + TypeScript pages over a public movie API, styled with Ant Design.",
      },
      stack: ["Next.js", "TypeScript", "Ant Design"],
      repo: "https://github.com/rajastra/movie-list",
      demo: "https://movie-list-henna-pi.vercel.app",
      image: { src: "/work/oss/movie-list.jpg", alt: "Movie Catalogue grid of films now playing with ratings", width: 1920, height: 1200 },
    },
  ],

  skills: [
    { name: "Languages", items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS / SCSS / SASS"] },
    { name: "Frameworks", items: ["React (Hooks)", "Next.js", "Node.js", "Express"] },
    { name: "State", items: ["Redux", "Zustand", "Context API"] },
    { name: "Testing", items: ["Jest", "React Testing Library"] },
    { name: "Practices", items: ["REST API integration", "OOP", "Dependency injection", "Agile / Scrum"] },
    { name: "Tools", items: ["Git, GitHub, GitLab", "Google Cloud Platform", "Jira", "Trello", "Slack"] },
  ],

  education: [
    {
      school: "Institut Teknologi Sumatera",
      program: "Bachelor of Computer Science",
      note: "Relevant coursework: Web Programming, Software Engineering, OOP, Data Structures & Algorithms, Human-Computer Interaction, Database Systems, Cloud Computing.",
    },
    {
      school: "Skilvul",
      program: "Fullstack Web Developer Bootcamp",
      start: "2023-06",
      end: "2023-12",
      note: "Selected as 1 of 12 participants from 500+ applicants. Training covered HTML, CSS, JavaScript, Express.js and React.",
    },
  ],
};
