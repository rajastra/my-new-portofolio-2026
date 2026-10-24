# Rencana Portofolio — Raja Saputera

## 1. Tujuan
- Positioning: **Frontend Engineer (React / Next.js / TypeScript)**, terbuka untuk remote & relokasi.
- Target pembaca: recruiter (scan 30 detik) dan engineer/hiring manager (baca case study).
- Portofolio itu sendiri harus jadi bukti skill: cepat (Lighthouse ≥ 95), aksesibel, rapi, ada test.
- Menggantikan portofolio lama: https://portfolio-raja.vercel.app/

## 2. Konten (diambil dari CV & LinkedIn)
**Hero:** lihat bagian 3 (Arah Desain). Angka-angka (5 modul ERP, 400+ user, 20+ REST API,
5.000+ mahasiswa) **tidak** ditaruh sebagai deretan statistik besar di hero; tiap angka muncul
di case study-nya masing-masing, di samping konteks yang membuatnya bermakna.

**Pengalaman (timeline):**
| Peran | Tempat | Periode |
|---|---|---|
| Frontend Engineer | Future Gate High School | Mei 2023 – sekarang |
| Software Developer (Remote) | Chup Online (Malaysia) | Sep 2024 – Jun 2025 |
| Cloud Computing Cohort | Bangkit Academy (Google, Tokopedia, Gojek, Traveloka) | Feb – Jul/Agu 2023 |
| Frontend Engineer (Intern) | DOT Indonesia | Feb – Mar/Apr 2023 |
| Asisten Lab Komputer | Institut Teknologi Sumatera | Feb 2021 – Feb 2022 |

**Case study (halaman MDX, format: masalah → peran saya → solusi teknis → hasil/angka → stack):**
1. **ERP Sekolah (Future Gate)** — 5 modul (Akademik, PPDB, HR, Keuangan, Inventaris), UI per-role, Redux/Zustand, 20+ API.
2. **Booking Asrama & Hotel UKM (Chup)** — full-stack React + Express, payment gateway, 5.000+ mahasiswa.
3. **Admin Dashboard + Backend Waste-Scanning (Bangkit)** — React dashboard, backend di GCP.
4. **Revamp Website DPR (DOT)** — Next.js, responsive layout.
5. Proyek pribadi pilihan dari github.com/rajastra (2–3 terbaik).

> Catatan: kode/screenshot proyek klien mungkin rahasia — pakai mockup/diagram arsitektur & deskripsi, bukan kode asli.

**Lainnya:** Skills (dikelompokkan, bukan progress bar), Pendidikan (S1 Informatika ITERA, bootcamp fullstack), Sertifikat, Kontak + tombol unduh CV (PDF).

## 3. Arah Desain (usulan, perlu konfirmasi)

**Subjek:** portofolio frontend engineer yang keahlian khasnya adalah *antarmuka berbasis peran*
(ERP dengan tampilan berbeda untuk Admin, HR, Keuangan; booking flow untuk mahasiswa).
**Pembaca:** recruiter (butuh ringkasan cepat) dan engineer (butuh detail teknis).
**Tugas utama halaman:** membuat pembaca menghubungi Raja / mengunduh CV.

**Ide pokok — "Lihat sebagai…"**: satu kontrol di hero membuat pengunjung memilih peran,
**Recruiter** atau **Engineer**, dan seluruh halaman menyesuaikan diri: Recruiter melihat
ringkasan dampak & tombol CV; Engineer melihat stack, keputusan arsitektur, dan potongan kode.
Ini bukan dekorasi; ini demonstrasi langsung pekerjaan yang sama yang ia lakukan di ERP.
Ini satu-satunya elemen "berani"; sisanya tenang dan disiplin.

```
┌──────────────────────────────────────────────────────────┐
│ Raja Saputera                              EN/ID  ☾      │
│                                                          │
│ Saya membangun antarmuka yang                            │
│ berubah sesuai siapa yang memakainya.                    │
│                                                          │
│ Lihat sebagai: [ Recruiter ] [ Engineer ]   ← kontrol    │
│                                                          │
│ ┌ panel yang berubah sesuai pilihan ──────────────────┐  │
│ │ Recruiter: 3 kalimat dampak + Unduh CV + Kontak     │  │
│ │ Engineer : stack, diagram kecil, link GitHub        │  │
│ └─────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│ Proyek (daftar, bukan grid kartu identik):               │
│ ERP Sekolah ............ ringkasan per peran ........ → │
│ Booking UKM ............ ringkasan per peran ........ → │
├──────────────────────────────────────────────────────────┤
│ Pengalaman (timeline kronologis — nomor/urutan sah di sini)│
│ Kontak                                                   │
└──────────────────────────────────────────────────────────┘
```
Rata kiri di semua bagian; lebar teks maks ~70 karakter; grid 12 kolom, konten di 8 kolom.

**Warna** (sejuk, terinspirasi seragam & formulir sekolah, bukan cream/terakota atau hitam+neon):
| Token | Hex | Peran |
|---|---|---|
| `paper` | `#F2F4F3` | latar terang |
| `ink` | `#16202B` | teks utama |
| `slate` | `#5B6B7A` | teks sekunder, garis |
| `jade` | `#0F5C4D` | aksen utama: link, peran aktif |
| `marigold` | `#F2B705` | sorotan & focus ring (hanya untuk status, bukan dekorasi) |
Mode gelap: `paper`↔`#121A22`, `ink`↔`#E6EBEE`, jade dicerahkan ke `#3FA58C`.

**Tipografi:** satu keluarga, **Schibsted Grotesk** (variable) untuk judul & isi; skala
1.25 (16 / 20 / 25 / 31 / 39 / 49 px), judul hero 600, isi 400, line-height isi 1.6.
**JetBrains Mono** hanya untuk blok kode di case study (bukan untuk label kecil).
Tanpa label ALL-CAPS, tanpa satu kata berwarna/miring di judul.

**Gerak:** satu momen saja — transisi saat peran diganti (panel & isi proyek berganti dengan
crossfade + perubahan tinggi). Tidak ada animasi fade-up per section. `prefers-reduced-motion`
→ ganti instan.

**Copy:** kalimat biasa, sentence case, kata kerja aktif ("Unduh CV", "Kirim pesan").
Pesan sukses form memakai kata yang sama dengan tombolnya ("Pesan terkirim").

**Yang sengaja dihindari:** hero berisi angka besar + gradient, grid kartu identik dengan
shadow sama, label "01 / 02 / 03" untuk konten yang bukan urutan, tanda "→" di setiap tombol.

## 4. Teknologi
| Area | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js (App Router) + React + TypeScript strict | Sesuai CV, SSG/ISR, SEO bagus |
| Styling | Tailwind CSS v4 + shadcn/ui | Komponen aksesibel; **wajib di-restyle** ke token di atas (tampilan default shadcn mudah dikenali sebagai template) |
| Animasi | Motion (`motion/react`) | Hanya untuk transisi ganti peran; hormati reduced-motion |
| Mode peran | State di URL (`?view=recruiter\|engineer`) | Bisa dibagikan: kirim link versi Recruiter ke HR |
| Konten | MDX + file TS bertipe (`src/content`) | Case study mudah ditulis, tanpa CMS |
| i18n | next-intl (EN default + ID) | Recruiter lokal & luar negeri |
| Tema | next-themes (dark/light) | Standar ekspektasi |
| Form kontak | react-hook-form + Zod + Resend (route handler) | Tanpa backend terpisah |
| Data GitHub | GitHub REST API + ISR (revalidate 1 hari) | Tampilkan repo/aktivitas terbaru |
| SEO | Metadata API, `next/og` (OG image dinamis), sitemap, JSON-LD `Person` | Mudah ditemukan & preview link bagus |
| Test | Vitest + RTL, Playwright + axe | Bukti skill testing di CV |
| Kualitas | ESLint, Prettier, Husky + lint-staged | Konsisten |
| CI/CD | GitHub Actions (lint/typecheck/test/build) + Vercel preview per PR | Tiap PR terverifikasi |
| Analytics | Vercel Analytics + Speed Insights | Ukur kunjungan & Core Web Vitals |
| Package manager | pnpm | Cepat, hemat disk |

Sengaja **tidak** dipakai: CMS headless, database, state manager global (tidak perlu untuk situs statis).

## 5. Tahapan & pembagian kerja (Claude vs Antigravity)
| Fase | Isi | Dikerjakan oleh |
|---|---|---|
| 0. Setup | `git init`, scaffold Next.js + semua config & tooling | **agy** (bulk), Claude verifikasi gates |
| 1. Desain | Token (warna, font, skala) + prototipe hero "Lihat sebagai…" | **Claude** |
| 2. Konten | `src/content/*` dari CV, tiap item punya versi Recruiter & Engineer, tulis case study | **Claude** (wording), agy terjemahkan ke ID |
| 3. Section | Hero, Experience, Projects, Skills, Contact | Claude spesifikasi → **agy** (handoff + test) |
| 4. Fitur | Halaman case study MDX, form kontak, GitHub feed, OG image | campuran; fitur ≥200 baris → handoff |
| 5. Kualitas | Test e2e + a11y, Lighthouse, review lintas-model | agy generate test, Claude jalankan & review |
| 6. Rilis | Domain, Vercel, update link di CV & LinkedIn | Kamu + Claude |

## 6. Hal yang perlu dicek sebelum rilis
Ada perbedaan kecil antara CV dan LinkedIn — samakan dulu:
- Lulus S1: CV "Nov 2025" vs LinkedIn "Sep 2024".
- Bootcamp: CV "Skilvul" vs LinkedIn "Impact Byte".
- Bangkit selesai: Jul vs Agu 2023. DOT selesai: Apr vs Mar 2023.
- Lokasi: CV "Lubuklinggau" vs LinkedIn "Jakarta Metropolitan Area".
- Email: rajasaputera@gmail.com (pakai yang mana untuk kontak?).
