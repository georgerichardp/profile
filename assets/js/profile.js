!(function ($) {
    "use strict";
    const firebaseConfig = {
        apiKey: "AIzaSyBmOwSOy-dFd0lczblOHTO3EandGxxMGCs",
        authDomain: "profile-f1b63.firebaseapp.com",
        databaseURL: "https://profile-f1b63-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "profile-f1b63",
        storageBucket: "profile-f1b63.firebasestorage.app",
        messagingSenderId: "79907423697",
        appId: "1:79907423697:web:f26e69d2b42c71cf96ccf0",
        measurementId: "G-QP5QPDH6VF"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    db.ref('portfolioSite').once('value').then(snapshot => {
        const data = snapshot.val();
        function loadHeader(profile, navigation) {
            const container = document.getElementById('header-profile-container');
            const socialLinksHtml = profile.social.map(s => `<a href="${s.url}" class="${s.name}" target="_blank"><i class="${s.icon}"></i></a>`).join('');
            const navMenuHtml = navigation.map(n => `<li class="${n.active ? 'active' : ''}"><a href="${n.href}"><i class="${n.icon}"></i> <span>${n.text}</span></a></li>`).join('');
            container.innerHTML = `
          <div class="profile">
            <img src="${profile.image}" alt="" class="img-fluid rounded-circle">
            <h1 class="text-light"><a href="index.html">${profile.name}</a></h1>
            <div class="social-links mt-3 text-center">${socialLinksHtml}</div>
          </div>
          <nav class="nav-menu">
            <ul>${navMenuHtml}</ul>
          </nav>
          <button type="button" class="mobile-nav-toggle d-xl-none"><i class="icofont-navigation-menu"></i></button>`;
        }

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
        //panggil main js di sini
    })
        .catch(error => console.error('Gagal load JSON:', error));
})(jQuery);