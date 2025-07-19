!(function ($) {
    "use strict";
    fetch('./assets/database/data.json?v=' + new Date().getTime())
        .then(response => {
            // Check if the network request was successful (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // --- Data Loading Functions ---
            // These functions populate the HTML elements with data from the JSON file.

            // function loadHeader(profile, navigation) {
            //     const container = document.getElementById('header-profile-container');
            //     if (!container) {
            //         console.error('Header profile container not found!');
            //         return;
            //     }
            //     const socialLinksHtml = profile.social.map(s => `<a href="${s.url}" class="${s.name}" target="_blank"><i class="${s.icon}"></i></a>`).join('');
            //     const navMenuHtml = navigation.map(n => `<li class="${n.active ? 'active' : ''}"><a href="${n.href}"><i class="${n.icon}"></i> <span>${n.text}</span></a></li>`).join('');
            //     container.innerHTML = `
            //             <div class="profile">
            //                 <img src="${profile.image}" alt="" class="img-fluid rounded-circle">
            //                 <h1 class="text-light"><a href="index.html">${profile.name}</a></h1>
            //                 <div class="social-links mt-3 text-center">${socialLinksHtml}</div>
            //             </div>
            //             <nav class="nav-menu">
            //                 <ul>${navMenuHtml}</ul>
            //             </nav>
            //             <button type="button" class="mobile-nav-toggle d-xl-none"><i class="icofont-navigation-menu"></i></button>`;
            // }

            function loadHero(hero) {
                const heroName = document.getElementById('hero-name');
                const heroRoles = document.getElementById('hero-roles');
                if (heroName) heroName.textContent = hero.name;
                if (heroRoles) heroRoles.setAttribute('data-typed-items', hero.roles.join(','));
            }

            function loadAbout(about, image) {
                const aboutTitle = document.getElementById('about-title');
                const aboutDescription = document.getElementById('about-description');
                const aboutImg = document.getElementById('about-img');
                const aboutJobTitle = document.getElementById('about-job-title');
                const aboutIntro = document.getElementById('about-intro');
                const aboutClosing = document.getElementById('about-closing');
                const detailsContainer = document.getElementById('about-details-container');

                if (aboutTitle) aboutTitle.textContent = about.title;
                if (aboutDescription) aboutDescription.textContent = about.description;
                if (aboutImg) aboutImg.src = image;
                if (aboutJobTitle) aboutJobTitle.textContent = about.jobTitle;
                if (aboutIntro) aboutIntro.textContent = about.introduction;
                if (aboutClosing) aboutClosing.textContent = about.closing;

                if (detailsContainer) {
                    const detailsHtml = about.details.map(d => `<li><i class="icofont-rounded-right"></i> <strong>${d.label}:</strong> ${d.value}</li>`);
                    const mid = Math.ceil(detailsHtml.length / 2);
                    detailsContainer.innerHTML = `
                            <div class="col-lg-6"><ul>${detailsHtml.slice(0, mid).join('')}</ul></div>
                            <div class="col-lg-6"><ul>${detailsHtml.slice(mid).join('')}</ul></div>`;
                }
            }

            function loadFacts(facts) {
                const factsTitle = document.getElementById('facts-title');
                const factsDescription = document.getElementById('facts-description');
                const container = document.getElementById('facts-container');

                if (factsTitle) factsTitle.textContent = facts.title;
                if (factsDescription) factsDescription.textContent = facts.description;

                if (container) {
                    container.innerHTML = facts.items.map((item, index) => `
                            <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" data-aos="fade-up" data-aos-delay="${index * 100}">
                                <div class="count-box">
                                    <i class="${item.icon}"></i>
                                    <span data-toggle="counter-up">${item.count}</span>
                                    <p><strong>${item.label}</strong></p>
                                </div>
                            </div>`).join('');
                }
            }

            function loadSkills(skills) {
                const skillsTitle = document.getElementById('skills-title');
                const skillsDescription = document.getElementById('skills-description');
                const container = document.getElementById('skills-container');

                if (skillsTitle) skillsTitle.textContent = skills.title;
                if (skillsDescription) skillsDescription.textContent = skills.description;

                if (container) {
                    const skillsHtml = skills.items.map(skill => `
                            <div class="progress">
                                <span class="skill">${skill.name} <i class="val">${skill.value}%</i></span>
                                <div class="progress-bar-wrap">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="${skill.value}" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>`).join('');
                    container.innerHTML = `<div class="col-lg-6" data-aos="fade-up">${skillsHtml}</div>`;
                }
            }

            function loadResume(resume) {
                const resumeTitle = document.getElementById('resume-title');
                const resumeDescription = document.getElementById('resume-description');
                const container = document.getElementById('resume-container');

                if (resumeTitle) resumeTitle.textContent = resume.title;
                if (resumeDescription) resumeDescription.textContent = resume.description;

                if (container) {
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
            }

            function loadPortfolio(portfolio) {
                const portfolioTitle = document.getElementById('portfolio-title');
                const portfolioDescription = document.getElementById('portfolio-description');
                const filtersContainer = document.getElementById('portfolio-flters');
                const itemsContainer = document.getElementById('portfolio-container');

                if (portfolioTitle) portfolioTitle.textContent = portfolio.title;
                if (portfolioDescription) portfolioDescription.textContent = portfolio.description;

                if (filtersContainer) {
                    filtersContainer.innerHTML = portfolio.filters.map((f, i) => `<li data-filter="${f.filter}" class="${i === 0 ? 'filter-active' : ''}">${f.name}</li>`).join('');
                }

                if (itemsContainer) {
                    itemsContainer.innerHTML = portfolio.items.map(item => `
                            <div class="col-lg-4 col-md-6 portfolio-item filter-${item.category.toLowerCase().replace(/\s+/g, '')}">
                                <div class="portfolio-wrap">
                                    <img src="${item.image}" class="img-fluid" alt="${item.title}">
                                    <div class="portfolio-links">
                                        <a href="${item.detailsUrl}" data-gall="portfolioDetailsGallery" data-vbtype="iframe" class="venobox" title="More Details">See Detail<i class="bx bx-link"></i></a>
                                    </div>
                                </div>
                            </div>`).join('');
                }
            }

            function loadServices(services) {
                const servicesTitle = document.getElementById('services-title');
                const servicesDescription = document.getElementById('services-description');
                const container = document.getElementById('services-container');

                if (servicesTitle) servicesTitle.textContent = services.title;
                if (servicesDescription) servicesDescription.textContent = services.description;

                if (container) {
                    container.innerHTML = services.items.map((item, index) => `
                            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="${index * 100}">
                                <div class="icon"><i class="${item.icon}"></i></div>
                                <h4 class="title"><a href="">${item.title}</a></h4>
                                <p class="description">${item.description}</p>
                            </div>`).join('');
                }
            }

            // function loadTestimonials(testimonials) {
            //     const testimonialsTitle = document.getElementById('testimonials-title');
            //     const testimonialsDescription = document.getElementById('testimonials-description');
            //     const container = document.getElementById('testimonials-container');
            //
            //     if (testimonialsTitle) testimonialsTitle.textContent = testimonials.title;
            //     if (testimonialsDescription) testimonialsDescription.textContent = testimonials.description;
            //
            //     if (container) {
            //         container.innerHTML = testimonials.items.map((item, index) => `
            //                 <div class="testimonial-item" data-aos="fade-up" data-aos-delay="${index * 100}">
            //                     <p><i class="bx bxs-quote-alt-left quote-icon-left"></i>${item.quote}<i class="bx bxs-quote-alt-right quote-icon-right"></i></p>
            //                     <img src="${item.image}" class="testimonial-img" alt="">
            //                     <h3>${item.name}</h3>
            //                     <h4>${item.role}</h4>
            //                 </div>`).join('');
            //     }
            // }

            function loadContact(contact) {
                const contactTitle = document.getElementById('contact-title');
                const contactDescription = document.getElementById('contact-description');
                const contactLocation = document.getElementById('contact-location');
                const contactEmail = document.getElementById('contact-email');
                const contactPhone = document.getElementById('contact-phone');
                // const mapContainer = document.getElementById('map-container'); // Uncomment if you use the map

                if (contactTitle) contactTitle.textContent = contact.title;
                if (contactDescription) contactDescription.textContent = contact.description;
                if (contactLocation) contactLocation.textContent = contact.location;
                if (contactEmail) contactEmail.textContent = contact.email;
                if (contactPhone) contactPhone.textContent = contact.call;
                // if (mapContainer && contact.map_url) {
                //     mapContainer.innerHTML = `<iframe src="${contact.map_url}"
                //                                 frameborder="0" style="border:0; width: 100%; height: 290px;" allowfullscreen></iframe>`;
                // }
            }

            // --- MAIN EXECUTION FLOW ---
            // Call all loading functions with the fetched data
            // loadHeader(data.profile, data.navigation); // Added this missing call! ✅
            loadHero(data.hero);
            loadAbout(data.about, data.profile.image);
            loadFacts(data.facts);
            loadSkills(data.skills);
            loadResume(data.resume);
            loadPortfolio(data.portfolio);
            loadServices(data.services);
            // loadTestimonials(data.testimonials); // Commented out based on your original code
            loadContact(data.contact);

            // Dynamically load main.js AFTER all content has been populated.
            // This ensures that main.js can correctly initialize UI components
            // like Typed.js, Counter-Up, AOS, etc., which depend on the content being present.
            const mainScript = document.createElement('script');
            mainScript.src = 'assets/js/main.js';
            mainScript.onload = () => {
                // Optional: Add a console log to confirm main.js loaded
                console.log('main.js loaded and ready.');
                // If main.js contains specific initialization functions,
                // you might call them here if they are exposed globally.
                // For example, if main.js has a function initTheme(), you might call:
                // if (typeof initTheme === 'function') initTheme();
            };
            document.body.appendChild(mainScript);
        })
        .catch(error => {
            console.error('Failed to load JSON data:', error);
            // You might add fallback UI here if data loading fails
        });

})(jQuery);