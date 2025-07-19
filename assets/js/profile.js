!(function($) {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
        const data = {
            "profile": {
                "name": "George Richard P.",
                "image": "assets/img/profile-img.jpg",
                "social": [
                    { "name": "twitter", "url": "https://x.com/georgerichard_p", "icon": "bx bxl-twitter" },
                    { "name": "linkedin", "url": "https://www.linkedin.com/in/george-richard-payara-64517521b/", "icon": "bx bxl-linkedin" }
                ]
            },
            "hero": {
                "name": "George Richard P.",
                "roles": ["Sr Mobile Developer", "Flutter Expert", "Team Lead", "Problem Solver"]
            },
            "about": {
                "title": "About",
                "description": "I’m from Maluku, Indonesia — far from the tech hubs, but deeply passionate about IT, especially mobile app development. Right now, I mainly build apps using Flutter, focusing on clean, efficient code and great user experience.",
                "jobTitle": "Senior Mobile Developer",
                "introduction": "A proficient software engineer skilled in Object-Oriented Programming (OOP), adept at writing clean and structured code, experienced in designing robust and maintainable software architectures for mobile solutions—especially with Flutter—skilled in team management, creating project skeletons, developing core features, managing Git, performing code reviews, solving complex problems, and overseeing app deployments on both the App Store and Play Store.",
                "details": [
                    { "label": "Birthday", "value": "8 Feb 1995" },
                    { "label": "Phone", "value": "+62 821 9078 2029" },
                    { "label": "City", "value": "Jakarta" },
                    { "label": "Email", "value": "georgerichardpayara@gmail.com" }
                ],
                "closing": "I’m excited to take on new challenges and collaborate on innovative projects. With strong mobile development skills and a commitment to quality, I’m ready to make a meaningful contribution to your team’s and company’s success."
            },
            "facts": {
                "title": "Facts",
                "description": "Here are some achievements and statistics that highlight my experience and contributions across various projects I have worked on.",
                "items": [
                    { "icon": "icofont-simple-smile", "count": 15, "label": "Happy Clients" },
                    { "icon": "icofont-document-folder", "count": 20, "label": "Projects" },
                    { "icon": "icofont-live-support", "count": 2500, "label": "Hours Of Support" },
                    { "icon": "icofont-users-alt-5", "count": 8, "label": "Hard Workers" }
                ]
            },
            "skills": {
                "title": "Skills",
                "description": "A collection of my technical skills, covering various programming languages, frameworks, and tools that I master to develop efficient and high-quality software solutions.",
                "items": [
                    { "name": "Flutter & Dart", "value": 95 },
                    { "name": "Swift & Kotlin", "value": 70 },
                    { "name": "CI/CD (Codemagic, Bitrise)", "value": 90 },
                    { "name": "SOLID Principle", "value": 95 },
                    { "name": "Clean Architecture", "value": 90 },
                    { "name": "Git", "value": 95 }
                ]
            },
            "resume": {
                "title": "Resume",
                "description": "Jejak karir dan pendidikan saya, yang menggambarkan pengalaman profesional dan latar belakang akademis yang telah membentuk keahlian saya hingga saat ini.",
                "summary": {
                    "name": "George Richard P.",
                    "content": "Pengembang Mobile Senior yang inovatif dan berorientasi pada hasil dengan pengalaman lebih dari 5 tahun dalam merancang, mengembangkan, dan mengelola aplikasi mobile yang kompleks. Terbukti mampu memimpin tim dan memberikan solusi teknis yang solid.",
                    "details": [
                        "Jakarta, Indonesia",
                        "+62 821 9078 2029",
                        "georgerichardpayara@gmail.com"
                    ]
                },
                "education": [
                    {
                        "degree": "Sarjana Teknik Informatika",
                        "period": "2013 - 2017",
                        "institution": "Universitas Kristen Duta Wacana, Yogyakarta",
                        "description": "Fokus pada rekayasa perangkat lunak dan pengembangan aplikasi, membangun dasar yang kuat dalam algoritma, struktur data, dan paradigma pemrograman."
                    }
                ],
                "experience": [
                    {
                        "title": "Sr. Mobile Developer",
                        "period": "2021 - Sekarang",
                        "company": "PT. Suitmedia",
                        "tasks": [
                            "Memimpin pengembangan aplikasi mobile menggunakan Flutter untuk berbagai klien.",
                            "Merancang arsitektur aplikasi dan memastikan kualitas kode melalui code review.",
                            "Berkolaborasi dengan tim UI/UX, backend, dan manajer proyek.",
                            "Mengelola proses rilis aplikasi ke Google Play Store dan Apple App Store."
                        ]
                    },
                    {
                        "title": "Mobile Developer",
                        "period": "2018 - 2021",
                        "company": "PT. AINO INDONESIA",
                        "tasks": [
                            "Mengembangkan dan memelihara aplikasi e-money dan sistem pembayaran.",
                            "Menerapkan fitur-fitur baru berdasarkan kebutuhan bisnis.",
                            "Bekerja sama dalam tim untuk memecahkan masalah teknis yang kompleks."
                        ]
                    }
                ]
            },
            "portfolio": {
                "title": "Portfolio",
                "description": "Koleksi proyek-proyek unggulan yang pernah saya kerjakan, menunjukkan kemampuan saya dalam mengembangkan berbagai jenis aplikasi mobile dengan teknologi terdepan.",
                "filters": [
                    { "name": "Highlight", "filter": "*" },
                    { "name": "App", "filter": ".filter-app" },
                    { "name": "Web", "filter": ".filter-web" }
                ],
                "items": [
                    { "title": "Pospay", "category": "App", "image": "assets/img/portfolio/portfolio-pospay.jpeg", "detailsUrl": "portfolio-details.html" },
                    { "title": "Jakone Mobile", "category": "App", "image": "assets/img/portfolio/portfolio-jakone-mobile.jpeg", "detailsUrl": "portfolio-details.html" },
                    { "title": "Jakone Pay", "category": "App", "image": "assets/img/portfolio/portfolio-jakone-pay.jpeg", "detailsUrl": "portfolio-details.html" },
                    { "title": "Bank Jatim", "category": "App", "image": "assets/img/portfolio/portfolio-bank-jatim.jpeg", "detailsUrl": "portfolio-details.html" },
                    { "title": "SalesTrax", "category": "Web", "image": "assets/img/portfolio/portfolio-salestrax.png", "detailsUrl": "portfolio-details.html" }
                ]
            },
            "services": {
                "title": "Services",
                "description": "Layanan profesional yang saya tawarkan, berfokus pada pengembangan aplikasi mobile, konsultasi arsitektur, dan manajemen siklus hidup aplikasi untuk membantu bisnis Anda mencapai tujuan digitalnya.",
                "items": [
                    { "icon": "bi bi-phone", "title": "Mobile App Development", "description": "Pengembangan aplikasi cross-platform dengan Flutter untuk iOS dan Android, fokus pada performa, skalabilitas, dan user experience." },
                    { "icon": "icofont-architecture-alt", "title": "Software Architecture", "description": "Merancang arsitektur aplikasi yang bersih, modular, dan mudah dipelihara (Clean Architecture, SOLID) untuk proyek jangka panjang." },
                    { "icon": "icofont-code-alt", "title": "Code Review & Refactoring", "description": "Menganalisis dan meningkatkan kualitas basis kode yang sudah ada untuk performa dan keterbacaan yang lebih baik." },
                    { "icon": "icofont-people", "title": "Team Leadership", "description": "Memimpin dan membimbing tim developer, mengatur alur kerja Git, dan memastikan kolaborasi yang efektif." },
                    { "icon": "icofont-cloud-upload", "title": "App Deployment", "description": "Manajemen penuh untuk proses rilis dan pembaruan aplikasi di Google Play Store dan Apple App Store, termasuk CI/CD." },
                    { "icon": "icofont-gears", "title": "Technical Consultation", "description": "Memberikan konsultasi teknis untuk membantu Anda memilih teknologi dan pendekatan terbaik untuk proyek mobile Anda." }
                ]
            },
            "testimonials": {
                "title": "Testimonials",
                "description": "Apa kata mereka yang pernah bekerja sama dengan saya. Testimoni ini memberikan gambaran tentang etos kerja, keahlian, dan kontribusi saya dalam sebuah tim.",
                "items": [
                    { "quote": "George adalah seorang developer yang sangat handal dan cepat belajar. Kemampuannya dalam memecahkan masalah sangat luar biasa.", "image": "assets/img/testimonials/testimonials-1.jpg", "name": "Budi Santoso", "role": "Project Manager" },
                    { "quote": "Arsitektur kode yang dibuat George sangat rapi dan mudah untuk dikembangkan lebih lanjut oleh tim. Sangat profesional.", "image": "assets/img/testimonials/testimonials-2.jpg", "name": "Citra Dewi", "role": "Lead Backend" },
                    { "quote": "Sangat senang bekerja dengan George. Dia tidak hanya ahli secara teknis, tetapi juga seorang komunikator yang hebat.", "image": "assets/img/testimonials/testimonials-3.jpg", "name": "Rina Wulandari", "role": "UI/UX Designer" }
                ]
            },
            "contact": {
                "title": "Contact",
                "description": "Jangan ragu untuk menghubungi saya untuk diskusi proyek, peluang kolaborasi, atau sekadar bertanya. Saya siap membantu Anda.",
                "location": { "label": "Location:", "value": "Jakarta, Indonesia" },
                "email": { "label": "Email:", "value": "george.rich.project@gmail.com" },
                "call": { "label": "Call:", "value": "+62 821 9078 2029" },
                "map_url": "http://googleusercontent.com/maps.google.com/4"
            }
        };
        function loadHero(hero) {
            document.getElementById('hero-name').textContent = hero.name;
            document.getElementById('hero-roles').setAttribute('data-typed-items', hero.roles.join(','));
        }
        function loadAbout(about, image) {
            document.getElementById('about-title').textContent = about.title;
            document.getElementById('about-description').textContent = about.description;
            document.getElementById('about-img').src = image;
            document.getElementById('about-job-title').textContent = about.jobTitle;
            document.getElementById('about-intro').textContent = about.introduction;
            document.getElementById('about-closing').textContent = about.closing;
            const detailsContainer = document.getElementById('about-details-container');
            const detailsHtml = about.details.map(d => `<li><i class="icofont-rounded-right"></i> <strong>${d.label}:</strong> ${d.value}</li>`);
            const mid = Math.ceil(detailsHtml.length / 2);
            detailsContainer.innerHTML = `
          <div class="col-lg-6"><ul>${detailsHtml.slice(0, mid).join('')}</ul></div>
          <div class="col-lg-6"><ul>${detailsHtml.slice(mid).join('')}</ul></div>`;
        }
        function loadFacts(facts) {
            document.getElementById('facts-title').textContent = facts.title;
            document.getElementById('facts-description').textContent = facts.description;
            const container = document.getElementById('facts-container');
            container.innerHTML = facts.items.map((item, index) => `
          <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="count-box">
              <i class="${item.icon}"></i>
              <span data-toggle="counter-up">${item.count}</span>
              <p><strong>${item.label}</strong></p>
            </div>
          </div>`).join('');
        }
        function loadSkills(skills) {
            document.getElementById('skills-title').textContent = skills.title;
            document.getElementById('skills-description').textContent = skills.description;
            const container = document.getElementById('skills-container');
            const skillsHtml = skills.items.map(skill => `
          <div class="progress">
            <span class="skill">${skill.name} <i class="val">${skill.value}%</i></span>
            <div class="progress-bar-wrap">
              <div class="progress-bar" role="progressbar" aria-valuenow="${skill.value}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>`).join('');
            container.innerHTML = `<div class="col-lg-6" data-aos="fade-up">${skillsHtml}</div>`;
        }
        function loadResume(resume) {
            document.getElementById('resume-title').textContent = resume.title;
            document.getElementById('resume-description').textContent = resume.description;
            const container = document.getElementById('resume-container');
            const summaryDetailsHtml = resume.summary.details.map(d => `<li>${d}</li>`).join('');
            const educationHtml = resume.education.map(edu => `
          <div class="resume-item">
            <h4>${edu.degree}</h4>
            <h5>${edu.period}</h5>
            <p><em>${edu.institution}</em></p>
            <p>${edu.description}</p>
          </div>`).join('');
            const experienceHtml = resume.experience.map(exp => `
          <div class="resume-item">
            <h4>${exp.title}</h4>
            <h5>${exp.period}</h5>
            <p><em>${exp.company}</em></p>
            <ul>${exp.tasks.map(t => `<li>${t}</li>`).join('')}</ul>
          </div>`).join('');
            container.innerHTML = `
          <div class="col-lg-6" data-aos="fade-up">
            <h3 class="resume-title">Sumary</h3>
            <div class="resume-item pb-0">
              <h4>${resume.summary.name}</h4>
              <p><em>${resume.summary.content}</em></p>
              <ul>${summaryDetailsHtml}</ul>
            </div>
            <h3 class="resume-title">Education</h3>
            ${educationHtml}
          </div>
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3 class="resume-title">Professional Experience</h3>
            ${experienceHtml}
          </div>`;
        }
        function loadPortfolio(portfolio) {
            document.getElementById('portfolio-title').textContent = portfolio.title;
            document.getElementById('portfolio-description').textContent = portfolio.description;
            document.getElementById('portfolio-flters').innerHTML = portfolio.filters.map((f, i) => `<li data-filter="${f.filter}" class="${i === 0 ? 'filter-active' : ''}">${f.name}</li>`).join('');
            document.getElementById('portfolio-container').innerHTML = portfolio.items.map(item => `
          <div class="col-lg-4 col-md-6 portfolio-item filter-${item.category.toLowerCase().replace(/\s+/g, '')}">
            <div class="portfolio-wrap">
              <img src="${item.image}" class="img-fluid" alt="${item.title}">
              <div class="portfolio-links">
                <a href="${item.image}" data-gall="portfolioGallery" class="venobox" title="${item.title}"><i class="bx bx-plus"></i></a>
                <a href="${item.detailsUrl}" title="More Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>`).join('');
        }
        function loadServices(services) {
            document.getElementById('services-title').textContent = services.title;
            document.getElementById('services-description').textContent = services.description;
            document.getElementById('services-container').innerHTML = services.items.map((item, index) => `
          <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="icon"><i class="${item.icon}"></i></div>
            <h4 class="title"><a href="">${item.title}</a></h4>
            <p class="description">${item.description}</p>
          </div>`).join('');
        }
        function loadTestimonials(testimonials) {
            document.getElementById('testimonials-title').textContent = testimonials.title;
            document.getElementById('testimonials-description').textContent = testimonials.description;
            document.getElementById('testimonials-container').innerHTML = testimonials.items.map((item, index) => `
          <div class="testimonial-item" data-aos="fade-up" data-aos-delay="${index * 100}">
            <p><i class="bx bxs-quote-alt-left quote-icon-left"></i>${item.quote}<i class="bx bxs-quote-alt-right quote-icon-right"></i></p>
            <img src="${item.image}" class="testimonial-img" alt="">
            <h3>${item.name}</h3>
            <h4>${item.role}</h4>
          </div>`).join('');
        }
        function loadContact(contact) {
            document.getElementById('contact-title').textContent = contact.title;
            document.getElementById('contact-description').textContent = contact.description;
            document.getElementById('contact-info-container').innerHTML = `
          <div class="address"><i class="icofont-google-map"></i><h4>${contact.location.label}</h4><p>${contact.location.value}</p></div>
          <div class="email"><i class="icofont-envelope"></i><h4>${contact.email.label}</h4><p>${contact.email.value}</p></div>
          <div class="phone"><i class="icofont-phone"></i><h4>${contact.call.label}</h4><p>${contact.call.value}</p></div>
          <iframe src="${contact.map_url}" frameborder="0" style="border:0; width: 100%; height: 290px;" allowfullscreen></iframe>`;
        }

        // --- ALUR EKSEKUSI UTAMA ---

        // 1. Muat semua konten dari JSON ke dalam HTML
        loadHero(data.hero);
        loadAbout(data.about, data.profile.image);
        loadFacts(data.facts);
        loadSkills(data.skills);
        loadResume(data.resume);
        loadPortfolio(data.portfolio);
        loadServices(data.services);
        // loadTestimonials(data.testimonials);
        // loadContact(data.contact);


        // Panggil ulang main.js setelah data hero siap
        var script = document.createElement('script');
        script.src = 'assets/js/main.js';
        document.body.appendChild(script);
    });
})(jQuery);