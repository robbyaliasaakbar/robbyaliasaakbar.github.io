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

  /* ================= PROFILE PAGE ================= */
  profileHero: {
    eyebrow: { en: 'Identity', id: 'Identitas' },
    h1: { en: 'Robby Aliasa Akbar', id: 'Robby Aliasa Akbar' },
    subtitle: { en: 'Applied AI Systems Builder', id: 'Sistem AI Terapan' },
    intro1: { en: 'AI gives you drafts, not answers.', id: 'Hal yang dihasilkan AI itu seharusnya hanya dijadikan sebagai draft, bukan sebagai jawaban mutlak.' },
    intro2: { en: 'Every output needs checking. Every result has to prove itself in real daily work.', id: 'Setiap outputnya wajib dicek, wajib diuji untuk membuktikan kalau memang outputnya benar-benar berguna buat kerjaan harian.' },
    para1: { en: 'I spend most of my time testing where AI helps and where it gets in the way. A lot of ideas fail here first so they do not fail on you.', id: 'Saya habiskan sebagian besar waktu saya untuk melakukan uji coba, di mana AI membantu dan di mana AI justru malah merusak. Banyak ide yang gagal di sini buat jadi pelajaran.' },
    para2: { en: 'What stays is usually boring in a good way. Clear steps, checked outputs, and a backup plan for when AI guesses wrong.', id: 'Yang bisa bertahan, biasanya hanya hal-hal yang membosankan tetapi bikin tenang. Langkah lebih jelas, hasilnya bisa dicek, dan ada plan cadangan di saat AI justru malah berhalusinasi.' },
    quote: { en: 'No hype. I test AI in real conditions and keep what survives real business use.', id: 'Di sini nggak ada hype. Saya hanya melakukan uji coba di dunia nyata yang benar-benar berguna, dan memakai apa yang memang bisa digunakan untuk bisnis di dunia nyata.' },
    quote2: { en: 'I am a self taught builder who learns by shipping. I use local and hosted models plus workflows and systems in real conditions, check every output, and keep only what holds up. This site is my open notebook of what worked, what failed, and why.', id: 'Saya builder otodidak yang belajar sambil shipping. Saya menggunakan model lokal dan hosted, workflows, dan sistem di kondisi nyata, dicek semua outputnya, dan cuma nyimpen yang kokoh. Site ini catatan terbuka saya soal apa yang berhasil, apa yang gagal, dan kenapa.' },
  },
  profilePositioning: {
    eyebrow: { en: 'Positioning', id: 'Penempatan' },
    tagline: { en: 'I am an independent builder. I build AI systems for real daily work.', id: 'Saya adalah builder independen. Saya merakit sistem AI buat kerjaan yang nyata.' },
    para1: { en: 'I do not claim mastery over every new tool. I test what new capabilities can do in real world conditions, check the outputs, and turn what holds up into systems you can use every day.', id: 'Saya nggak bisa bilang kalau saya paham semua tools baru. Saya test sendiri apa yang AI bisa lakuin di dunia nyata, review outputnya, dan hasilnya adalah sistem yang bisa digunakan sehari-hari, bukan sekadar project iseng.' },
    para2: { en: '14 experiments shipped. 5 live apps. Source code public. Every claim links to something you can open and check.', id: '17 eksperimen udah dirilis, 4 live aplikasi, dengan public source code. Setiap klaim ngelink satu sama lain yang bisa diverifikasi silang.' },
    quote: { en: 'Exploring what AI can do. Building what works. And asking one more question: is it really useful in everyday life?', id: 'Mengeksplorasi apa yang AI bisa lakuin. Pertahankan yang kuat, merakit sistem yang kokoh dan maintainable. Sekaligus mempertanyakan satu hal lagi. Ini kepake nggak di kehidupan atau pekerjaan sehari-hari?' },
  },
  profileJourney: {
    eyebrow: { en: 'Journey', id: 'Perjalanan' },
    heading: { en: 'Journey', id: 'Perjalanan' },
    j01: {
      title: { en: 'AI USER', id: 'PENGGUNA AI' },
      status: { en: 'Starting Point', id: 'Titik Awal' },
      desc: { en: 'Starting as a regular AI user without deep technical understanding. Using AI tools to solve everyday tasks, without understanding the architecture behind them.', id: 'Bermula dari pengguna AI biasa (Gemini dan ChatGPT) tanpa memahami teknisnya. Menggunakan aplikasinya tanpa paham arsitekturnya.' },
    },
    j02: {
      title: { en: 'AI EXPLORER', id: 'PENJELAJAH AI' },
      status: { en: 'Deepening', id: 'Pendalaman' },
      desc: { en: 'Moving from using AI to understanding how AI systems work. Exploring local and hosted models, model architecture, quantization, inference engines, and hardware requirements.', id: 'Dari pake AI, jadi bisa ngerti cara kerja sistem AI. Mengeksplorasi model-model lokal yang ada di Hugging Face, menggunakan model-model frontier dari API perusahaan AI, paham arsitektur model, kuantisasi, inference engine, dan bahkan kebutuhan hardware.' },
    },
    j03: {
      title: { en: 'AI BUILDER', id: 'PERAKIT AI' },
      status: { en: 'Creating', id: 'Menciptakan' },
      desc: { en: 'Building integrated systems using models, tools, automation, memory, and infrastructure. Moving from running models to orchestrating complete AI workflows.', id: 'Merakit sistem yang terintegrasi dengan model, tools, automasi workflow, context window, RAG, dan infrastruktur. Beralih dari jalanin model sampai mengatur workflow AI secara lengkap.' },
    },
    j04: {
      title: { en: 'AI SYSTEMS EXPERIMENTER', id: 'MENGEKSPERIMEN AI SYSTEM' },
      status: { en: 'Current', id: 'Sekarang' },
      desc: { en: 'Testing limits, measuring behavior, investigating bottlenecks, and refining systems based on evidence. Focused on checking every output and building from scratch to daily use.', id: 'Menguji batas, mengidentifikasi perilaku AI, mencari bottleneck, dan menyempurnakan sistem berdasarkan bukti dan iterasi. Fokus review semua output AI, dan merakit dari nol sampai bisa benar-benar berguna untuk kehidupan sehari-hari.' },
    },
  },
  profileFocus: {
    eyebrow: { en: 'Focus Areas', id: 'Area Fokus' },
    heading: { en: 'Focus Areas', id: 'Area Fokus' },
    f1: {
      title: { en: 'Local and Hosted AI', id: 'AI Lokal dan Hosted' },
      desc: { en: 'Model choice, quantization, runtime setup, CPU and GPU tuning, and performance checks in real conditions.', id: 'Pemilihan model, pemilihan kuantisasi, setup runtime, tuning GPU dan CPU, dan cek performa di kondisi nyata.' },
    },
    f2: {
      title: { en: 'AI Systems and Infrastructure', id: 'Sistem dan Infrastruktur AI' },
      desc: { en: 'Mixing models, interfaces, automation, tools, memory, and workflows into systems that hold up daily.', id: 'Variasi model, antarmuka, automasi, tools, context window, memory, RAG, dan workflow jadi sistem yang kokoh dan bisa digunakan setiap hari.' },
    },
    f3: {
      title: { en: 'Agent Architecture', id: 'Arsitektur Agen' },
      desc: { en: 'Systems that take goals, use tools, read info, reason, act, and improve with checks at each step.', id: 'Sistem yang nerima tujuan, pake tools, baca info, berpikir, bertindak, dan berkembang dengan cek di setiap langkah.' },
    },
    f4: {
      title: { en: 'Hardware Aware AI Evaluation', id: 'Evaluasi AI berdasarkan Hardware' },
      desc: { en: 'Reading the full stack from hardware to app and testing what survives limits of cost, power, and context.', id: 'Melihat seluruh stack dari hardware sampai ke aplikasi dan testing apa yang bertahan dari batasan biaya, daya, dan konteks.' },
    },
    f5: {
      title: { en: 'Coding Agents and Automation', id: 'Agen Coding dan Automation' },
      desc: { en: 'Daily work with coding agents and automation to move from scratch to working systems.', id: 'Kerjaan harian pake coding agents dan automation buat jalan dari nol ke sistem yang jalan.' },
    },
    f6: {
      title: { en: 'Full Stack Backend to Frontend', id: 'Full Stack Backend ke Frontend' },
      desc: { en: 'Building complete paths from backend to frontend including local backends with public frontends to fit cost, control, and scale.', id: 'Rakit jalur lengkap dari backend ke frontend, termasuk backend lokal dengan frontend publik, biar cocok sama biaya, kontrol, dan skala.' },
    },
  },
  profileAdaptive: {
    eyebrow: { en: 'Adaptive Approach', id: 'Pendekatan Adaptif' },
    tagline: { en: 'I adapt across hardware and software stacks.', id: 'Saya sangat adaptif lintas tech stack, hardware, dan software.' },
    para: { en: 'I am not tied to one GPU vendor, one device class, or one platform. I look at the full path from hardware to app and find ways to make AI work with what is actually available, mixed to fit cost, control, and scale.', id: 'Saya tidak terikat dengan satu vendor GPU, satu kelas device, atau satu platform. Saya melihat dari sudut pandang hardware ke aplikasi dan cara bikin AI beneran kepake dan jalan, dengan alasan biar cocok sama biaya, kontrol, dan skalabilitas.' },
    listLabel: { en: 'This includes evaluating:', id: 'Ini termasuk ngevaluasi:' },
    eval1: { en: 'CPU and GPU behavior', id: 'Perilaku CPU dan GPU' },
    eval2: { en: 'Memory and bandwidth limits', id: 'Batasan memory dan bandwidth' },
    eval3: { en: 'Runtime compatibility', id: 'Kompatibilitas runtime' },
    eval4: { en: 'Inference configuration', id: 'Konfigurasi inference' },
    eval5: { en: 'Model architecture', id: 'Arsitektur model' },
    eval6: { en: 'Context length', id: 'Panjang konteks' },
    eval7: { en: 'Thermal and power behavior', id: 'Perilaku thermal dan daya' },
    eval8: { en: 'Stability and usability', id: 'Stabilitas dan kemudahan pakai' },
    eval9: { en: 'Mixed private and public setups', id: 'Setup campuran privat dan publik' },
    eval10: { en: 'Coding agents and automation', id: 'Coding agents dan automation' },
  },
  profilePrinciples: {
    eyebrow: { en: 'Principles', id: 'Prinsip' },
    heading: { en: 'Principles', id: 'Prinsip' },
    p01: {
      title: { en: 'Evidence Is Not a Conclusion', id: 'Bukti Bukan Kesimpulan' },
      desc: { en: 'Observations must be understood in context. Experimental results are separated into: observation, interpretation, hypothesis, and conclusion.', id: 'Observasi harus dipahami dalam konteksnya. Hasil eksperimen dipisah jadi, observasi, interpretasi, hipotesis, dan kesimpulan.' },
    },
    p02: {
      title: { en: 'Newbie Mindset', id: 'Mindset Newbie' },
      desc: { en: 'Assumptions are treated as hypotheses. When evidence contradicts understanding, the mental model changes.', id: 'Asumsi diperlakukan sebagai hipotesis. Kalau bukti bertentangan sama pemahaman, model mentalnya yang berubah.' },
    },
    p03: {
      title: { en: 'AI as a Building Partner', id: 'AI cuma sebagai Partner Merakit Sistem' },
      desc: { en: 'AI is used as a partner for exploration, debugging, coding, research, and documentation. But AI output is still tested against documentation, experiments, and actual system behavior.', id: 'AI dipake sebagai partner buat eksplorasi, debugging, coding, riset, dan dokumentasi. Tapi output AI tetap diuji sama dokumentasi, eksperimen, dan perilaku sistem yang sebenarnya.' },
    },
    p04: {
      title: { en: 'Coding as a Tool', id: 'Coding sebagai Alat' },
      desc: { en: 'Coding is used to understand, modify, automate, and control AI systems, not as the final goal.', id: 'Coding dipake buat ngerti, ngubah, mengotomasi, dan ngontrol sistem AI, bukan sebagai tujuan akhir.' },
    },
  },
  profileValues: {
    eyebrow: { en: 'Value Proposition', id: 'Nilai yang saya tawarkan' },
    heading: { en: 'Value Proposition', id: 'Nilai yang saya tawarkan' },
    v1: {
      title: { en: 'Check If It Can Work', id: 'Cek Bisa Jalan atau Nggak' },
      desc: { en: 'Telling you plainly if your AI idea is worth trying and what the first safe test looks like.', id: 'Memberi tahu secara jujur kalau suatu ide worth untuk dicoba atau enggak, dan seperti apa test pertama kali yang aman dan ramah untuk pemula.' },
    },
    v2: {
      title: { en: 'Design The Full System', id: 'Desain Sistem Lengkap' },
      desc: { en: 'Drawing the whole path from input to output so you know what to build and what to skip.', id: 'Menggambarkan seluruh jalur input ke output, biar bisa tahu apa yang harus dirakit dan apa yang perlu dilewati.' },
    },
    v3: {
      title: { en: 'Fit To Real Limits', id: 'Sesuaikan sama Batasan Nyata' },
      desc: { en: 'Matching model and setup to your budget, power, and context so it keeps running daily.', id: 'Menyesuaikan model dan setup dengan budget, daya, dan konteks, supaya bisa terus jalan tanpa perlu khawatir sistemnya bermasalah.' },
    },
    v4: {
      title: { en: 'Connect Tools and Agents', id: 'Menghubungkan tools dan Agent' },
      desc: { en: 'Linking models to your tools and data with checks so each step stays safe to trust.', id: 'Menyambungkan model ke tools dan data yang dipunya dengan mengecek setiap langkah tetap aman dan bisa dipercaya.' },
    },
    v5: {
      title: { en: 'Test Small Before Big', id: 'Tes Kecil Dulu sebelum Besar' },
      desc: { en: 'Trying the risky part first at small scale before you pay for the full build.', id: 'Testing dulu bagian yang berisiko dalam skala kecil, sebelum akhirnya memutuskan untuk merakit dan membangun sistem yang lengkap.' },
    },
  },
  profileClosing: {
    h2: { en: 'I don\'t claim to have all the answers in AI.', id: 'Saya nggak ngaku punya semua jawaban soal AI.' },
    p: { en: 'I do not have all the answers. I just keep asking, keep testing, and learn from what fails. If it holds up, I build it into something you can use every day.', id: 'Saya nggak punya semua jawaban. Saya cuma terus bertanya, terus melakukan testing, dan belajar dari kegagalan. Kalau itu kokoh, saya jadikan sesuatu yang bisa saya gunakan sehari-hari.' },
    cta: { en: 'View Experiments', id: 'Cek semua Eksperimen Gue' },
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
