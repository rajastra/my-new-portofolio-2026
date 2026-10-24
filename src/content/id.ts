import type { Content } from "./types";

/**
 * Indonesian content. Source: LinkedIn profile (Oct 2026).
 * Engineer-view details marked REVIEW are inferred from the CV and must be
 * confirmed by Raja before release.
 */
export const id: Content = {
  profile: {
    name: "Raja Saputera",
    role: "Frontend Engineer",
    photo: {
      src: "/photo/raja-saputera.jpg",
      alt: "Foto Raja Saputera mengenakan kemeja kotak-kotak hijau",
      width: 960,
      height: 1200,
    },
    location: "Jakarta, Indonesia",
    availability: "Terbuka untuk kerja remote dan relokasi",
    email: "rajasaputera@gmail.com",
    links: {
      github: "https://github.com/rajastra",
      linkedin: "https://www.linkedin.com/in/rajasaputera",
      cv: "/cv/raja-saputera-cv.pdf",
    },
    headline: "Saya membangun antarmuka yang berubah sesuai siapa yang memakainya.",
    intro: {
      recruiter:
        "Frontend engineer dengan pengalaman 3+ tahun membangun sistem ERP sekolah dan platform booking menggunakan React, Next.js, dan TypeScript. Saat ini saya memimpin frontend ERP 5 modul di SMA Future Gate, dan membangun platform booking yang digunakan oleh 5.000+ mahasiswa di Universiti Kebangsaan Malaysia.",
      engineer:
        "Sebagian besar pekerjaan saya adalah UI berbasis peran: satu model data, banyak tampilan. Antarmuka Admisi, HR, keuangan, dan inventaris yang berbagi state melalui 20+ endpoint REST, formulir yang menjaga transaksi finansial nyata, serta alur booking yang harus berjalan lancar di ponsel mahasiswa.",
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
        recruiter: "Memimpin frontend ERP sekolah yang digunakan oleh 400+ staf dan siswa.",
        engineer: "Arsitektur frontend untuk 5 modul ERP dengan React + TypeScript, Redux/Zustand, 20+ REST API.",
      },
      highlights: {
        recruiter: [
          "Merilis 5 modul utama: Akademik, PPDB (Admisi), HR, Keuangan, dan Inventaris.",
          "Merancang antarmuka per-role yang mencakup seluruh alur dari pendaftaran siswa hingga penggajian.",
          "Mengurangi bug UI melalui pengujian internal dan dokumentasi teknis tertulis.",
        ],
        engineer: [
          "Memegang kepemilikan arsitektur frontend di 5 modul yang saling terhubung.",
          "Mengintegrasikan 20+ REST API dan mengoptimalkan state Redux/Zustand agar data tetap sinkron antar modul.",
          "Menulis unit test dengan Jest dan React Testing Library, serta dokumentasi teknis untuk tim.",
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
        recruiter: "Membangun platform booking asrama dan hotel untuk 5.000+ mahasiswa universitas.",
        engineer: "Platform booking full-stack: React client, REST API Node.js/Express, payment gateway.",
      },
      highlights: {
        recruiter: [
          "Membangun platform booking yang digunakan oleh 5.000+ mahasiswa aktif di Universiti Kebangsaan Malaysia.",
          "Memungkinkan pembayaran online untuk sewa asrama dan reservasi hotel secara menyeluruh.",
          "Bekerja secara remote dalam tim Agile berisi 10+ developer dan desainer lintas Indonesia dan Malaysia.",
        ],
        engineer: [
          "Membangun alur booking React yang responsif serta REST API Express dan logika database di belakangnya.",
          "Mengintegrasikan payment gateway di sisi client dan server.",
          "Menjaga performa tetap stabil di setiap sprint dalam tim lintas negara berjumlah 10+ orang.",
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
        recruiter: "Terpilih dalam program pelatihan pimpinan Google; membangun dashboard admin dan backend cloud.",
        engineer: "Dashboard admin React di atas REST API; backend untuk aplikasi pemindai sampah yang di-deploy di GCP.",
      },
      highlights: {
        recruiter: [
          "Merancang dan membangun dashboard admin yang mempermudah pengelolaan data.",
          "Membangun backend aplikasi capstone pemindai sampah, di-deploy di Google Cloud.",
        ],
        engineer: [
          "Dashboard admin React yang terhubung ke REST API.",
          "Layanan backend untuk aplikasi capstone yang di-deploy di Google Cloud Platform.",
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
        recruiter: "Berkontribusi dalam pembaruan desain situs web Dewan Perwakilan Rakyat (DPR) RI.",
        engineer: "Halaman React dan Next.js pada revamp situs web DPR; tata letak responsif dengan HTML5 dan SCSS.",
      },
      highlights: {
        recruiter: [
          "Berkontribusi pada desain ulang situs web DPR.",
          "Membangun tata letak ramah seluler dan UI interaktif.",
          "Mengikuti daily stand-up dan sprint planning dalam tim Scrum.",
        ],
        engineer: [
          "Membangun halaman dengan React dan Next.js untuk pembaruan situs web DPR.",
          "Mengimplementasikan tata letak responsif dengan HTML5 dan SCSS.",
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
        recruiter: "Mengajar praktikum algoritma dan struktur data untuk sesama mahasiswa.",
        engineer: "Asisten lab untuk mata kuliah Algoritma, Struktur Data, dan Pengantar Komputasi.",
      },
      highlights: {
        recruiter: ["Menyusun soal latihan, menjelaskan materi, dan menilai tugas praktikum."],
        engineer: ["Menyusun soal latihan dan menilai tugas untuk mata kuliah Algoritma dan Struktur Data."],
      },
      stack: [],
    },
  ],

  projects: [
    {
      slug: "school-erp",
      title: "ERP Sekolah",
      client: "Future Gate High School",
      period: "2023 – sekarang",
      confidential: true,
      shots: [
        {
          src: "/work/school-erp/home-desktop.jpg",
          alt: "Beranda ERP: sapaan, presensi, jadwal mengajar, info yayasan, aksi cepat, dan daftar modul",
          caption: "Beranda: setiap peran mulai dari sini dan hanya melihat modul yang boleh dipakainya.",
          device: "desktop",
          width: 2880,
          height: 1800,
        },
        {
          src: "/work/school-erp/home-mobile.jpg",
          alt: "Beranda ERP yang sama di ponsel",
          caption: "Beranda yang sama di ponsel guru.",
          device: "mobile",
          width: 780,
          height: 1688,
        },
        {
          src: "/work/school-erp/admissions-desktop.jpg",
          alt: "Dashboard PSB berisi daftar tindakan pendaftaran, sebaran status pendaftar, dan gelombang aktif",
          caption: "PSB: apa yang perlu ditindaklanjuti hari ini, bukan sekadar tabel.",
          device: "desktop",
          width: 2880,
          height: 1800,
        },
        {
          src: "/work/school-erp/learning-desktop.jpg",
          alt: "Dashboard Pembelajaran dengan progres kelas, materi terbaru, dan roadmap modul",
          caption: "Pembelajaran: progres kelas dibandingkan rencana semester.",
          device: "desktop",
          width: 2880,
          height: 1800,
        },
      ],
      summary: {
        recruiter: "Lima modul yang menjalankan operasional sekolah sehari-hari, dari admisi hingga penggajian.",
        engineer: "Satu frontend React + TypeScript, lima modul, 20+ REST API, antarmuka berbasis peran.",
      },
      metrics: [
        { value: "5", label: "modul dirilis" },
        { value: "400+", label: "pengguna harian" },
        { value: "20+", label: "REST API terintegrasi" },
      ],
      recruiter: {
        problem:
          "Sekolah menjalankan admisi, akademik, HR, keuangan, dan inventaris di berbagai aplikasi terpisah dan spreadsheet, sehingga staf berulang kali memasukkan data yang sama.",
        role: "Saya memimpin frontend: arsitektur, tampilan antarmuka untuk setiap departemen, dan integrasi dengan API tim backend.",
        outcome: [
          "Setiap departemen bekerja dalam satu sistem terpadu, dengan tampilan yang dirancang sesuai alur kerjanya.",
          "400+ pengguna, dari pendaftaran siswa baru hingga penggajian.",
          "Bug UI berkurang setelah penerapan pengujian internal dan dokumentasi teknis.",
        ],
      },
      engineer: {
        architecture: [
          // REVIEW: confirm module layout and state split with Raja.
          "Frontend berbasis modul: Akademik, PPDB, HR, Keuangan, dan Inventaris berbagi design system dan layer API yang sama.",
          "Global state untuk data lintas modul (Redux), local state per modul dengan Zustand.",
          "Tampilan berbasis peran menentukan layar dan aksi yang dapat diakses tiap pengguna.",
        ],
        decisions: [
          {
            title: "Antarmuka berbasis peran di atas satu model data",
            body: "Setiap peran melihat tampilan berbeda di atas basis data yang sama, sehingga perubahan di PPDB langsung tercermin dengan tepat di Keuangan.",
          },
          {
            title: "Pengujian pada alur finansial dan pencatatan penting",
            body: "Unit test dengan Jest dan React Testing Library memvalidasi formulir dan alur di mana bug dapat berdampak fatal.",
          },
        ],
        stack: ["React", "TypeScript", "Redux", "Zustand", "REST", "Jest", "React Testing Library"],
      },
    },
    {
      slug: "ukm-booking",
      title: "Booking asrama & hotel",
      client: "Chup, untuk Universiti Kebangsaan Malaysia",
      period: "2024 – 2025",
      confidential: true,
      shots: [
        {
          src: "/work/ukm-booking/listing-desktop.jpg",
          alt: "Pencarian properti StayUKM: filter dalam dan luar kampus, serta kartu properti dengan slot tersedia",
          caption: "Cari dan saring hunian di dalam maupun luar kampus.",
          device: "desktop",
          width: 2560,
          height: 1600,
        },
        {
          src: "/work/ukm-booking/listing-mobile.jpg",
          alt: "Pencarian properti StayUKM di ponsel",
          caption: "Kebanyakan mahasiswa memesan dari ponsel.",
          device: "mobile",
          width: 780,
          height: 1688,
        },
      ],
      summary: {
        recruiter: "Bagaimana 5.000+ mahasiswa UKM memesan kamar asrama atau hotel dan membayar secara online.",
        engineer: "Full-stack: alur booking React, REST API Express, integrasi payment gateway.",
      },
      metrics: [
        { value: "5.000+", label: "mahasiswa aktif" },
        { value: "10+", label: "anggota tim remote" },
      ],
      recruiter: {
        problem: "Mahasiswa membutuhkan satu tempat terpusat untuk mencari, memesan, dan membayar sewa asrama serta kamar hotel.",
        role: "Saya membangun antarmuka booking dan API di belakangnya, bekerja secara remote bersama tim lintas Indonesia dan Malaysia.",
        outcome: [
          "Digunakan oleh 5.000+ mahasiswa aktif.",
          "Pembayaran online yang aman untuk sewa asrama dan reservasi hotel.",
        ],
      },
      engineer: {
        architecture: [
          "Client React responsif untuk pencarian, pemesanan, dan checkout.",
          "REST API Node.js / Express untuk logika pemesanan dan database.",
          "Integrasi payment gateway di sisi client dan server.",
        ],
        decisions: [
          {
            title: "Memegang kendali kedua sisi alur pemesanan",
            body: "Membangun client dan API secara bersamaan menjaga ketersediaan kamar, kalkulasi harga, dan status pembayaran tetap konsisten dari pencarian hingga tanda terima.",
          },
        ],
        stack: ["React", "Node.js", "Express", "REST", "Payment gateway"],
      },
    },
    {
      slug: "waste-scanner",
      title: "Backend & dashboard aplikasi pemindai sampah",
      client: "Capstone Bangkit Academy",
      period: "2023",
      confidential: false,
      summary: {
        recruiter: "Proyek capstone program Bangkit dari Google: aplikasi pendeteksi jenis sampah dari foto.",
        engineer: "Layanan backend di GCP ditambah dashboard admin React di atas REST API.",
      },
      metrics: [],
      recruiter: {
        problem: "Tim membangun aplikasi yang memberi tahu jenis sampah yang dipegang pengguna.",
        role: "Saya berada di tim backend sekaligus membangun dashboard admin.",
        outcome: ["Backend di-deploy di Google Cloud.", "Dashboard admin untuk mengelola data aplikasi."],
      },
      engineer: {
        architecture: [
          "Backend REST di-deploy di Google Cloud Platform.",
          "Dashboard admin React yang menggunakan API yang sama.",
        ],
        decisions: [],
        stack: ["React", "Node.js", "REST", "GCP"],
      },
      links: [
        { label: "Kode dashboard di GitHub", href: "https://github.com/rajastra/rewaste-frontend" },
        { label: "Dashboard live", href: "https://rewaste-frontend.vercel.app" },
      ],
    },
    {
      slug: "dpr-revamp",
      title: "Revamp situs web DPR",
      client: "DOT Indonesia",
      period: "2023",
      confidential: true,
      summary: {
        recruiter: "Desain ulang situs web Dewan Perwakilan Rakyat (DPR) RI.",
        engineer: "Halaman React + Next.js dengan tata letak responsif HTML5/SCSS.",
      },
      metrics: [],
      recruiter: {
        problem: "Situs web DPR membutuhkan pembaruan desain yang modern dan ramah seluler.",
        role: "Sebagai intern, saya membangun halaman dan tata letak responsif dalam tim Scrum.",
        outcome: ["Pengalaman pengguna di ponsel yang lebih baik.", "Selesai tepat waktu bersama tim."],
      },
      engineer: {
        architecture: ["Halaman Next.js dan komponen React.", "Tata letak responsif dengan HTML5 dan SCSS."],
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
        recruiter: "Platform latihan ujian untuk UTBK, CPNS, dan sekolah kedinasan.",
        engineer: "Aplikasi Next.js + TypeScript dengan autentikasi JWT, alur latihan soal, dan grafik skor (Chart.js, ApexCharts).",
      },
      stack: ["Next.js", "TypeScript", "Flowbite", "Chart.js", "JWT"],
      repo: "https://github.com/rajastra/taktix-web",
      demo: "https://taktix-web-ashen.vercel.app",
      image: { src: "/work/oss/taktix.jpg", alt: "Beranda Taktix dengan kategori ujian: UTBK, CPNS, dan kedinasan", width: 1920, height: 1200 },
    },
    {
      name: "Dashboard ReWaste",
      year: "2023",
      summary: {
        recruiter: "Dashboard admin untuk aplikasi capstone Bangkit yang menyarankan kerajinan dari sampah.",
        engineer: "Admin React + Ant Design dengan autentikasi token dan CRUD penuh ke REST API capstone.",
      },
      stack: ["React", "Ant Design", "React Router", "REST"],
      repo: "https://github.com/rajastra/rewaste-frontend",
      demo: "https://rewaste-frontend.vercel.app",
    },
    {
      name: "Katalog Film",
      year: "2023",
      summary: {
        recruiter: "Katalog film yang sedang tayang, lengkap dengan rating dan sinopsis.",
        engineer: "Halaman Next.js + TypeScript di atas API film publik, dengan Ant Design.",
      },
      stack: ["Next.js", "TypeScript", "Ant Design"],
      repo: "https://github.com/rajastra/movie-list",
      demo: "https://movie-list-henna-pi.vercel.app",
      image: { src: "/work/oss/movie-list.jpg", alt: "Grid Katalog Film berisi film yang sedang tayang beserta rating", width: 1920, height: 1200 },
    },
  ],

  skills: [
    { name: "Bahasa", items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS / SCSS"] },
    { name: "Framework", items: ["React", "Next.js", "Node.js", "Express"] },
    { name: "State", items: ["Redux", "Zustand", "Context API"] },
    { name: "Testing", items: ["Jest", "React Testing Library"] },
    { name: "Praktik", items: ["Integrasi REST API", "OOP", "Dependency injection", "Agile / Scrum"] },
    { name: "Tools", items: ["Git, GitHub, GitLab", "Google Cloud Platform", "Jira", "Trello", "Slack"] },
  ],

  education: [
    {
      school: "Institut Teknologi Sumatera",
      program: "Sarjana Komputer, Teknik Informatika",
      start: "2020-09",
      end: "2024-09",
    },
    {
      school: "Impact Byte",
      program: "Program Fullstack Web Developer",
      start: "2023-06",
      end: "2023-12",
      note: "Terpilih sebagai 1 dari 12 peserta dari 500+ pendaftar.",
    },
  ],
};
