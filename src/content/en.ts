import type { Content } from "./types";

/**
 * English content. Source: LinkedIn profile (Oct 2026).
 * Engineer-view details marked REVIEW are inferred from the CV and must be
 * confirmed by Raja before release.
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
    location: "Jakarta, Indonesia",
    availability: "Open to remote work and relocation",
    email: "rajasaputera@gmail.com",
    links: {
      github: "https://github.com/rajastra",
      linkedin: "https://www.linkedin.com/in/rajasaputera",
      cv: "/cv/raja-saputera-cv.pdf",
    },
    headline: "I build interfaces that change with the person using them.",
    intro: {
      recruiter:
        "Frontend engineer with 3+ years of experience building school ERP systems and booking platforms with React, Next.js and TypeScript. I currently lead the frontend of a 5-module ERP at Future Gate High School, and I built the booking platform used by 5,000+ students at Universiti Kebangsaan Malaysia.",
      engineer:
        "Most of my work is role-based UI: one data model, many views. Admissions, HR, finance and inventory screens that share state across 20+ REST endpoints, forms that guard real money, and booking flows that have to work on a student's phone.",
    },
    coreStack: ["TypeScript", "React", "Next.js", "Redux", "Zustand", "Node.js / Express", "Jest + RTL", "GCP"],
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
        recruiter: "Leads the frontend of the school's ERP, used by 400+ staff and students.",
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
      company: "Chup",
      role: "Software Engineer (remote)",
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
          "Made online payment for dorm rentals and hotel stays possible end to end.",
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
      end: "2023-08",
      project: "waste-scanner",
      summary: {
        recruiter: "Selected for Google-led training; built an admin dashboard and a cloud backend.",
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
      end: "2023-03",
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
    {
      company: "Institut Teknologi Sumatera",
      role: "Computer lab assistant",
      place: "South Lampung, Indonesia",
      start: "2021-02",
      end: "2022-02",
      summary: {
        recruiter: "Taught algorithms and data structures labs to fellow students.",
        engineer: "Lab assistant for Algorithms, Data Structures and Intro to Computing courses.",
      },
      highlights: {
        recruiter: ["Wrote exercises, explained material and graded assignments."],
        engineer: ["Wrote exercises and graded assignments for Algorithms and Data Structures."],
      },
      stack: [],
    },
  ],

  projects: [
    {
      slug: "school-erp",
      title: "School ERP",
      client: "Future Gate High School",
      period: "2023 – now",
      confidential: true,
      shots: [
        {
          src: "/work/school-erp/home-desktop.jpg",
          alt: "ERP home screen: greeting, attendance, teaching schedule, foundation announcements, quick actions and the module launcher",
          caption: "Home: every role starts here and only sees the modules it can use.",
          device: "desktop",
          width: 2880,
          height: 1800,
        },
        {
          src: "/work/school-erp/home-mobile.jpg",
          alt: "The same ERP home screen on a phone",
          caption: "The same home on a teacher's phone.",
          device: "mobile",
          width: 780,
          height: 1688,
        },
        {
          src: "/work/school-erp/admissions-desktop.jpg",
          alt: "Admissions dashboard with a to-do list for registrations, applicant status breakdown and the active intake wave",
          caption: "Admissions: what needs action today, not a raw table.",
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
        { value: "400+", label: "daily users" },
        { value: "20+", label: "REST APIs integrated" },
      ],
      recruiter: {
        problem:
          "The school ran admissions, academics, HR, finance and inventory on separate tools and spreadsheets, so staff entered the same data many times.",
        role: "I lead the frontend: architecture, the screens for each department, and integration with the backend team's APIs.",
        outcome: [
          "Every department works in one system, with screens built for its own job.",
          "400+ users, from new-student enrollment through payroll.",
          "Fewer UI bugs after introducing internal testing and documentation.",
        ],
      },
      engineer: {
        architecture: [
          // REVIEW: confirm module layout and state split with Raja.
          "Module-based frontend: Academic, Admissions, HR, Finance and Inventory share a design system and an API layer.",
          "Global state for cross-module data (Redux), local module state with Zustand.",
          "Role-specific views decide which screens and actions each user sees.",
        ],
        decisions: [
          {
            title: "Role-based views over one data model",
            body: "Each role sees a different interface on top of the same records, so a change in Admissions is immediately correct in Finance.",
          },
          {
            title: "Tests where money and records move",
            body: "Unit tests with Jest and React Testing Library cover the forms and flows where a bug would cost the most.",
          },
        ],
        stack: ["React", "TypeScript", "Redux", "Zustand", "REST", "Jest", "React Testing Library"],
      },
    },
    {
      slug: "ukm-booking",
      title: "Dorm & hotel booking",
      client: "Chup, for Universiti Kebangsaan Malaysia",
      period: "2024 – 2025",
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
          caption: "Most students book from their phone.",
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
        decisions: [
          {
            title: "Owning both sides of the booking flow",
            body: "Building the client and the API together kept availability, pricing and payment status consistent from search to receipt.",
          },
        ],
        stack: ["React", "Node.js", "Express", "REST", "Payment gateway"],
      },
    },
    {
      slug: "waste-scanner",
      title: "Waste-scanning app backend & admin dashboard",
      client: "Bangkit Academy capstone",
      period: "2023",
      confidential: false,
      summary: {
        recruiter: "Capstone project in Google's Bangkit program: an app that identifies waste from a photo.",
        engineer: "Backend service on GCP plus a React admin dashboard over a REST API.",
      },
      metrics: [],
      recruiter: {
        problem: "The team built an app that tells people what kind of waste they are holding.",
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
    { name: "Languages", items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS / SCSS"] },
    { name: "Frameworks", items: ["React", "Next.js", "Node.js", "Express"] },
    { name: "State", items: ["Redux", "Zustand", "Context API"] },
    { name: "Testing", items: ["Jest", "React Testing Library"] },
    { name: "Practices", items: ["REST API integration", "OOP", "Dependency injection", "Agile / Scrum"] },
    { name: "Tools", items: ["Git, GitHub, GitLab", "Google Cloud Platform", "Jira", "Trello", "Slack"] },
  ],

  education: [
    {
      school: "Institut Teknologi Sumatera",
      program: "Bachelor's degree, Computer Science",
      start: "2020-09",
      end: "2024-09",
    },
    {
      school: "Impact Byte",
      program: "Fullstack Web Developer program",
      start: "2023-06",
      end: "2023-12",
      note: "Selected as 1 of 12 participants from 500+ applicants.",
    },
  ],
};
