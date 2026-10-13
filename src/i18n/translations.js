/*
  Translations — copy EN/ID per section.
  Struktur: { section.key: { en: '...', id: '...' } }
  Dipakai via: const t = useT('hero'); t('heading')
  Copy ID dikerjakan bareng user.
*/

export const TRANSLATIONS = {
  navbar: {
    home: { en: 'Home', id: 'Beranda' },
    profile: { en: 'Profile', id: 'Profil' },
    experiments: { en: 'Experiments', id: 'Eksperimen' },
    contact: { en: 'Contact', id: 'Kontak' },
    building: { en: 'Experiment', id: 'Eksperimen' },
  },
  hero: {
    eyebrow: { en: 'Applied AI System', id: 'Sistem AI Terapan' },
    p1: {
      en: 'I spend most of my time testing where AI helps and where it gets in the way. A lot of ideas fail here first so they do not fail on you.',
      id: 'Saya habiskan sebagian besar waktu saya untuk melakukan uji coba, di mana AI membantu dan di mana AI justru malah merusak. Banyak ide yang gagal di sini buat jadi pelajaran.',
    },
    p2: {
      en: 'What stays is usually boring in a good way. Clear steps, checked outputs, and a backup plan for when AI guesses wrong.',
      id: 'Yang bisa bertahan, biasanya hanya hal-hal yang membosankan tetapi bikin tenang. Langkah lebih jelas, hasilnya bisa dicek, dan ada plan cadangan di saat AI justru malah berhalusinasi.',
    },
    intro: {
      en: ['AI gives you drafts, not answers.', 'Every output needs checking. Every result has to prove itself in real daily work.'],
      id: ['Hal yang dihasilkan AI itu, seharusnya hanya dijadikan sebagai draft, dan bukan sebagai jawaban mutlak.', 'Setiap outputnya wajib di cek, wajib di test untuk ngebuktiin kalau memang outputnya bener-benar berguna buat kerjaan harian.'],
    },
    quote: {
      en: 'No hype. I test AI in real conditions and keep what survives real business use.',
      id: 'Di sini ga ada hype. Saya hanya melakukan uji coba di dunia nyata yang benar-benar berguna, dan memakai apa yang memang bisa digunakan untuk bisnis di dunia nyata.',
    },
    ctaPrimary: { en: 'View All Experiments', id: 'Cek Semua Eksperimen Gue' },
    ctaSecondary: { en: 'View GitHub Profile', id: 'Coba Mampir ke GitHub Gue' },
  },
  featured: {
    eyebrow: { en: 'Selected Experiments', id: 'Eksperimen Pilihan' },
    heading: { en: 'Selected Experiments', id: 'Eksperimen Pilihan' },
    desc: {
      en: '6 of 17 experiments. Every claim below links to a live app, public source code, or proof from outside my site. For the complete collection with full evidence, failure logs, and live demos, head to the full experiments list.',
      id: '6 dari 17 eksperimen pilihan. Setiap klaim yang ada di eksperimen saya ini ngelink ke app yang live, source code publik yang terhubung dengan repository GitHub, atau bahkan bukti dari site pihak ketiga yang bisa diverifikasi silang. Di setiap eksperimen saya ada koleksi lengkap dengan bukti-bukti yang udah tertera, punya log kegagalan, dan beberapa app yang udah live.',
    },
    cta: { en: 'View All Experiments', id: 'Semua Koleksi Eksperimen Gue' },
    exp017: {
      title: { en: 'Four Apps, One Door, Zero Funnel — Tracing Outages and Moving Auth and Data to Supabase.', id: 'Empat app dengan 1 autentifikasi, tanpa daftar ulang akun, bikin 1 akun di 1 app bisa kepake di banyak app dan nol Funnel.' },
      cta: { en: 'Read EXP 017: Supabase Migration', id: 'Cek EXP 017: Migrasi 1 Pintu Autentifikasi Via Supabase' },
    },
    exp016: {
      title: { en: 'From Static Tracker to Enterprise System JobTracker EXP010 Rebuilt on a Home PC Without VPS Bills.', id: 'App Job Tracker: dari statis upgrade ke sistem perusahaan yang disesuaikan, EXP010 yang dibangun ulang pake PC rumahan tanpa tagihan VPS.' },
      cta: { en: 'Read EXP 016: Enterprise JobTracker', id: 'Cek EXP 016: Upgrade Aplikasi JobTracker' },
    },
    exp014: {
      title: { en: 'Content Tracking Web App With Server Side Pagination, React + Vite, Live on GitHub Pages.', id: 'Bikin aplikasi konten manager dengan fitur MCP buat bikin konten plan dan rencana upload, pake pagination server side, React, Vite, dan live di GitHub Pages.' },
      cta: { en: 'Read EXP 014: Content Tracking Web App', id: 'Cek EXP 014: Aplikasi Kalender Konten' },
    },
    exp011: {
      title: { en: 'One Auth Backend for Many Frontends, PHP, SQLite and Docker Entry Point in a Day.', id: 'Bikin 1 backend autentifikasi buat beberapa frontend (micro service) pake PHP, SQLite, dan Docker entry point.' },
      cta: { en: 'Read EXP 011: Auth Backend PHP SQLite', id: 'Cek EXP 011: Bikin 1 Backend Autentifikasi (Micro Service)' },
    },
    exp012: {
      title: { en: 'Multi User CRM With Server Side Pagination, React + Vite, Live on GitHub Pages.', id: 'Bikin aplikasi CRM full stack buat kebutuhan bisnis pake React, Vite, pagination server side, dan live lewat GitHub Pages.' },
      cta: { en: 'Read EXP 012: React CRM Shared Auth', id: 'Cek EXP 012: Aplikasi CRM Full Stack' },
    },
    exp004: {
      title: { en: 'Creating digital employees with the help of open source LLMs.', id: 'Bikin karyawan digital buat ngurusin bisnis pribadi dan langsung ngegantiin 5 posisi repetitif, dibantuin sama LLM local open source.' },
      cta: { en: 'Read EXP 004: Digital Employees', id: 'Cek EXP 004: Bikin Karyawan Digital' },
    },
  },
  capability: {
    eyebrow: { en: 'Capability', id: 'Kemampuan' },
    heading: { en: 'Capability', id: 'Kemampuan' },
    c01: {
      title: { en: 'Business-Oriented Application', id: 'Sistem yang Berorientasi ke Bisnis' },
      desc: { en: 'Directing AI capabilities toward real problems, practical workflows, and measurable value.', id: 'Menggunakan kemampuan AI untuk ngeberesin masalah yang nyata, workflow yang praktis, sistem yang bisa diukur dan diaudit.' },
    },
    c02: {
      title: { en: 'Technical Problem Solving', id: 'Memecahkan Masalah Teknis' },
      desc: { en: 'Investigating bottlenecks, testing variables, and iterating based on actual behavior.', id: 'Menginvestigasi bottleneck, mencari akar masalah, mengetes tiap variabel, dan iterasi berdasarkan masalah yang benar-benar dihadapi.' },
    },
    c03: {
      title: { en: 'AI Systems Building', id: 'Bikin Sistem dengan AI' },
      desc: { en: 'Connecting model, infrastructure, tools, data, memory, and automation into usable systems.', id: 'Menghubungkan model, infrastruktur, tools, software, data, memory, tech stack, dan automasi supaya jadi sistem yang benar-benar dipake dan bukan untuk project iseng.' },
    },
    c04: {
      title: { en: 'AI Exploration', id: 'Mengeksplorasi Kemampuan AI' },
      desc: { en: 'Exploring emerging AI capabilities and identifying practical limits.', id: 'Mencari tau kemampuan AI yang muncul dan bisa dimanfaatkan, lalu mengidentifikasi batasan praktisnya.' },
    },
  },
  approach: {
    eyebrow: { en: 'Approach', id: 'Pendekatan' },
    heading: { en: 'Approach', id: 'Pendekatan' },
    pill1: { en: 'Test before trust', id: 'Test Dulu Baru Percaya' },
    pill2: { en: 'Show the failures', id: 'Ngasih Lihat Proses Gagalnya' },
    pill3: { en: 'Check every output', id: 'Cek Dulu Semua Outputnya' },
    pill4: { en: 'Keep what survives', id: 'Pertahanin yang Kepake' },
    pill5: { en: 'Build to maintain', id: 'Dibikin untuk Dijaga' },
    quote: {
      en: 'I do not claim to know every answer in AI. I build, test, measure, investigate failure, and find what actually works.',
      id: 'Saya gabisa bilang "saya tau semua jawaban soal AI". Yang saya lakukan adalah membuat, mengetest, mengukur, menginvestigasi, dan menggunakan yang benar-benar bisa dipakai.',
    },
  },
  about: {
    eyebrow: { en: 'About', id: 'Tentang' },
    heading: { en: 'About', id: 'Tentang' },
    desc: {
      en: 'I am a self taught builder who learns by shipping. I use local and hosted models plus workflows and systems in real conditions, check every output, and keep only what holds up. This site is my open notebook of what worked, what failed, and why.',
      id: 'Saya adalah seorang builder otodidak yang kebetulan punya bisnis pribadi dan belajar sambil mengimplementasikan di bisnis sendiri. Saya menggunakan model local open source yang ada di Hugging Face, saya juga menggunakan model frontier dari perusahaan-perusahaan AI besar, dan saya juga menggunakan workflow juga sistem yang berguna di dunia nyata dan juga bisnis saya. Saya cek semua output AI dan cuma menggunakan apa yang memang benar-benar berguna. Website ini adalah catatan terbuka saya soal apa yang benar-benar bisa digunakan, apa yang gagal, dan mengapa itu semua bisa terjadi.',
    },
    cta: { en: 'Read Full Profile', id: 'Kalau Penasaran Sama Gue' },
  },
  closing: {
    eyebrow: { en: 'Adaptive by Design', id: 'Adaptif Secara Desain' },
    heading: { en: 'Adaptive by Design', id: 'Adaptif Secara Desain' },
    desc: {
      en: 'AI systems are evaluated as complete stacks from hardware to app. I work across local runtimes, hosted models, coding agents, and automation. I often mix them in unusual ways such as local backends with public frontends to fit cost and control. The work goes from scratch to something you can use every day to see what holds up across different setups.',
      id: 'Sistem AI yang dibuat akan dievaluasi sebagai stack lengkap dari hardware sampai aplikasi atau sistem yang live. Saya bekerja lintas runtime, local model, hosted model, banyak aplikasi coding agent, dan beberapa workflow automasi. Saya sering melakukan hal yang mungkin tidak pernah terpikirkan oleh orang yang memang berkutat di dunia ini, seperti backend local dengan frontend publik, atau menggunakan AI yang parameternya super duper kecil untuk bisa dipakai agar irit token dan irit sumber daya hardware untuk kebutuhan automasi bisnis, dengan tujuan supaya biaya bisa lebih ditekan dan terkontrol.',
    },
  },
  ctaSection: {
    eyebrow: { en: 'Contact', id: 'Kontak' },
    heading: { en: 'Have a problem worth exploring?', id: 'Punya masalah yang sama?' },
    desc: {
      en: 'If you have a business problem, technical question, or AI opportunity that needs validation, feel free to reach out.',
      id: 'Kalau kamu punya masalah bisnis, pertanyaan teknis, atau peluang apapun soal AI yang butuh validasi, gausah ragu ya buat hubungin.',
    },
    button: { en: 'Send WhatsApp', id: 'Yuk Ngobrol' },
  },
  footer: {
    currently: { en: 'Currently', id: 'Sekarang' },
    status: {
      en: 'Testing where AI helps — and where it gets in the way.',
      id: 'Ngetest AI di mana dia ngebantu, dan di mana dia justru malah bikin masalah.',
    },
    brand: { en: 'Applied AI Systems Builder', id: 'Membangun Sistem AI Terapan' },
    tagline: {
      en: 'Exploring AI systems, local LLMs, automation workflows, and practical tools that actually work in real business operations. Building what matters, and checking whether AI is truly useful in everyday work.',
      id: 'Mengeksplorasi sistem AI, Local LLM, Hosted LLM, Workflow Automasi, dan tools praktis yang beneran berguna untuk operasional bisnis nyata. Membuat sesuatu yang terpakai, dan mengecek apakah AI memang benar-benar berguna untuk kerjaan sehari-hari.',
    },
    navigate: { en: 'Navigate', id: 'Navigasi' },
    connect: { en: 'Connect', id: 'Terhubung' },
    rights: { en: 'All rights reserved.', id: 'Semua hak dilindungi.' },
    home: { en: 'Home', id: 'Beranda' },
    profile: { en: 'Profile', id: 'Profil' },
    experiments: { en: 'Experiments', id: 'Eksperimen' },
    contact: { en: 'Contact', id: 'Kontak' },
  },
}

/* Helper: ambil copy per key sesuai bahasa aktif. Support nested key: 'exp017.title' */
export function pick(lang, section, key) {
  const parts = key.split('.')
  let entry = TRANSLATIONS[section]
  for (const part of parts) {
    entry = entry?.[part]
  }
  if (!entry) return key
  return entry[lang] || entry.en
}
