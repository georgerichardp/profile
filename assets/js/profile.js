!(function ($) {
    "use strict";

    // Wait for the DOM to be fully loaded before trying to manipulate it.
    // This is crucial to ensure all HTML elements are available before script tries to access them.
    document.addEventListener('DOMContentLoaded', function () {
        // Fetch data.json with a cache-busting timestamp.
        // This ensures the browser always requests the latest version of the JSON file
        // and bypasses aggressive caching, which often causes data to "disappear" on refresh.
        fetch('./assets/database/data.json?v=' + new Date().getTime())
            .then(response => {
                // Check if the network request was successful (HTTP status 200-299).
                if (!response.ok) {
                    // If not successful, throw an error to be caught by the .catch() block.
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Parse the response body as JSON.
                return response.json();
            })
            .then(data => {
                // --- Data Loading Functions ---
                // These functions populate specific HTML sections with data from the JSON.
                // Added null/undefined checks for elements to prevent errors if they don't exist.

                function loadHeader(profile, navigation) {
                    const container = document.getElementById('header-profile-container');
                    if (!container) {
                        console.error('Header profile container not found! Please ensure your index.html has a div with id="header-profile-container" inside the <header>.');
                        return;
                    }
                    const socialLinksHtml = profile.social.map(s => `<a href="${s.url}" class="${s.name}" target="_blank" rel="noopener noreferrer"><i class="${s.icon}"></i></a>`).join('');
                    const navMenuHtml = navigation.map(n => `<li class="${n.active ? 'active' : ''}"><a href="${n.href}"><i class="${n.icon}"></i> <span>${n.text}</span></a></li>`).join('');
                    container.innerHTML = `
                        <div class="profile">
                            <img src="${profile.image}" alt="" class="img-fluid rounded-circle">
                            <h1 class="text-light"><a href="index.html">${profile.name}</a></h1>
                            <div class="social-links mt-3 text-center">${socialLinksHtml}</div>
                        </div>
                        <nav class="nav-menu">
                            <ul>${navMenuHtml}</ul>
                        </nav>`;
                    // The mobile nav toggle button remains outside this container, which is fine.
                }

                function loadHero(hero) {
                    const heroName = document.getElementById('hero-name');
                    const heroRoles = document.getElementById('hero-roles');
                    if (heroName) heroName.textContent = hero.name;
                    if (heroRoles) {
                        heroRoles.setAttribute('data-typed-items', hero.roles.join(','));
                        // Initialize/Re-initialize Typed.js after setting data-typed-items
                        if (window.Typed) {
                            // Destroy existing instance if any, to prevent multiple instances
                            if (heroRoles._typedInstance) {
                                heroRoles._typedInstance.destroy();
                            }
                            // Create new instance and store it on the element for future reference
                            heroRoles._typedInstance = new window.Typed(heroRoles, {
                                strings: hero.roles,
                                loop: true,
                                typeSpeed: 100,
                                backSpeed: 50,
                                backDelay: 2000
                            });
                        } else {
                            console.warn('Typed.js library not found. Please ensure assets/vendor/typed.js/typed.min.js is loaded before profile.js.');
                        }
                    }
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
                    if (aboutImg) aboutImg.src = image; // Assuming `image` is the full path from data.profile.image
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
                        // Initialize/Re-initialize Counter-Up after content is loaded
                        if (window.jQuery && window.jQuery.fn.counterUp) {
                            // Delay execution slightly to ensure elements are fully rendered
                            setTimeout(() => {
                                window.jQuery('[data-toggle="counter-up"]').counterUp({
                                    delay: 10,
                                    time: 1000
                                });
                            }, 100); // A small delay might help with DOM readiness
                        } else {
                            console.warn('Counter-Up or jQuery not found. Please ensure assets/vendor/jquery/jquery.min.js and assets/vendor/counterup/counterup.min.js are loaded.');
                        }
                    }
                }

                function loadSkills(skills) {
                    const skillsTitle = document.getElementById('skills-title');
                    const skillsDescription = document.getElementById('skills-description');
                    const container = document.getElementById('skills-container');

                    if (skillsTitle) skillsTitle.textContent = skills.title;
                    if (skillsDescription) skillsDescription.textContent = skills.description;

                    if (container) {
                        // Dynamically set width for progress bars
                        const skillsHtml = skills.items.map(skill => `
                            <div class="progress">
                                <span class="skill">${skill.name} <i class="val">${skill.value}%</i></span>
                                <div class="progress-bar-wrap">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="${skill.value}" aria-valuemin="0" aria-valuemax="100" style="width: ${skill.value}%;"></div>
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
                                <h3 class="resume-title">Summary</h3>
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
                // ... (kode lainnya)

                function loadPortfolio(portfolio) {
                    const portfolioTitle = document.getElementById('portfolio-title');
                    const portfolioDescription = document.getElementById('portfolio-description');
                    const filtersContainer = document.getElementById('portfolio-flters');
                    const itemsContainer = document.getElementById('portfolio-container'); // Ini adalah elemen yang terpotong

                    if (portfolioTitle) portfolioTitle.textContent = portfolio.title;
                    if (portfolioDescription) portfolioDescription.textContent = portfolio.description;

                    if (filtersContainer) {
                        filtersContainer.innerHTML = portfolio.filters.map((f, i) => `<li data-filter="${f.filter}" class="${i === 0 ? 'filter-active' : ''}">${f.name}</li>`).join('');

                        // Jangan inisialisasi Isotope di sini dulu, kita akan inisialisasi setelah item dimuat
                        // dan mungkin setelah gambar dimuat.
                    }

                    if (itemsContainer) {
                        itemsContainer.innerHTML = portfolio.items.map(item => `
            <div class="col-lg-4 col-md-6 portfolio-item filter-${item.category.toLowerCase().replace(/\s+/g, '')}">
                <div class="portfolio-wrap">
                    <img src="${item.image}" class="img-fluid" alt="${item.title}">
                    <div class="portfolio-links">
                        // <a href="${item.detailsUrl}" data-gall="portfolioDetailsGallery" data-vbtype="iframe" class="venobox" title="More Details">See Detail<i class="bx bx-link"></i></a>
                    </div>
                </div>
            </div>`).join('');

                        // --- Perbaikan Isotope dan Venobox di Sini ---

                        // 1. Inisialisasi Venobox terlebih dahulu
                        if (window.jQuery && window.jQuery.fn.venobox) {
                            window.jQuery('.venobox').venobox();
                        } else {
                            console.warn('Venobox or jQuery not found. Ensure assets/vendor/jquery/jquery.min.js and assets/vendor/venobox/venobox.min.js are loaded.');
                        }

                        // 2. Inisialisasi Isotope, pastikan gambar sudah dimuat
                        if (window.jQuery && window.jQuery.fn.isotope) {
                            // Hancurkan instance Isotope yang ada jika ada
                            if (itemsContainer._isotopeInstance) {
                                itemsContainer._isotopeInstance.destroy();
                            }

                            // Gunakan imagesLoaded (jika tersedia dan dimuat) atau setTimeout
                            // Cara terbaik adalah dengan imagesLoaded
                            // Anda perlu memastikan imagesloaded.pkgd.min.js dimuat di HTML Anda
                            // <script src="assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
                            if (window.imagesLoaded) {
                                window.imagesLoaded(itemsContainer, function() {
                                    // Semua gambar di dalam itemsContainer telah dimuat
                                    itemsContainer._isotopeInstance = window.jQuery(itemsContainer).isotope({
                                        itemSelector: '.portfolio-item',
                                        layoutMode: 'fitRows' // Pastikan layoutMode sesuai kebutuhan Anda
                                    });
                                    // Refresh layout setelah perubahan
                                    itemsContainer._isotopeInstance.isotope('layout');
                                });
                            } else {
                                // Alternatif jika imagesLoaded tidak digunakan (kurang ideal tapi sering berhasil)
                                setTimeout(() => {
                                    itemsContainer._isotopeInstance = window.jQuery(itemsContainer).isotope({
                                        itemSelector: '.portfolio-item',
                                        layoutMode: 'fitRows'
                                    });
                                    itemsContainer._isotopeInstance.isotope('layout');
                                }, 500); // Beri jeda 500ms agar gambar punya waktu loading
                                console.warn('imagesLoaded.pkgd.min.js not found. Consider adding it for more reliable Isotope layout with dynamic images.');
                            }

                            // 3. Atur event listener untuk filter (ini bisa di luar `if (itemsContainer)`)
                            // Tapi karena filter dan item terkait erat, letakkan di sini juga tidak masalah.
                            if (filtersContainer) { // Pastikan filtersContainer ada
                                // Hapus event listener sebelumnya untuk mencegah duplikasi
                                window.jQuery(filtersContainer).off('click', 'li');
                                window.jQuery(filtersContainer).on('click', 'li', function() {
                                    window.jQuery(filtersContainer).find('.filter-active').removeClass('filter-active');
                                    window.jQuery(this).addClass('filter-active');
                                    const filterValue = window.jQuery(this).attr('data-filter');
                                    // Periksa apakah instance Isotope sudah ada
                                    if (itemsContainer._isotopeInstance) {
                                        itemsContainer._isotopeInstance.isotope({ filter: filterValue });
                                    }
                                });
                            }
                        } else {
                            console.warn('Isotope or jQuery not found. Ensure assets/vendor/jquery/jquery.min.js and assets/vendor/isotope-layout/isotope.pkgd.min.js are loaded.');
                        }
                    }
                }

// ... (sisa kode Anda)

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

                function loadTestimonials(testimonials) {
                    const testimonialsTitle = document.getElementById('testimonials-title');
                    const testimonialsDescription = document.getElementById('testimonials-description');
                    const container = document.getElementById('testimonials-container');

                    if (testimonialsTitle) testimonialsTitle.textContent = testimonials.title;
                    if (testimonialsDescription) testimonialsDescription.textContent = testimonials.description;

                    if (container) {
                        container.innerHTML = testimonials.items.map((item, index) => `
                            <div class="testimonial-item" data-aos="fade-up" data-aos-delay="${index * 100}">
                                <p><i class="bx bxs-quote-alt-left quote-icon-left"></i>${item.quote}<i class="bx bxs-quote-alt-right quote-icon-right"></i></p>
                                <img src="${item.image}" class="testimonial-img" alt="">
                                <h3>${item.name}</h3>
                                <h4>${item.role}</h4>
                            </div>`).join('');
                        // Initialize Owl Carousel if needed
                        if (window.jQuery && window.jQuery.fn.owlCarousel) {
                            // Destroy existing instance if any
                            if (container._owlCarouselInstance) {
                                container._owlCarouselInstance.destroy();
                            }
                            // Create new instance
                            container._owlCarouselInstance = window.jQuery(container).owlCarousel({
                                margin: 20, // Example option
                                loop: true, // Example option
                                autoplay: true, // Example option
                                dots: true, // Example option
                                responsive: { // Example responsive settings
                                    0: {items: 1},
                                    768: {items: 2},
                                    992: {items: 3}
                                }
                            });
                        } else {
                            console.warn('Owl Carousel or jQuery not found. Please ensure assets/vendor/jquery/jquery.min.js and assets/vendor/owl.carousel/owl.carousel.min.js are loaded.');
                        }
                    }
                }

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
                // Call all loading functions with the fetched data.
                // The order matters if sections depend on data from other sections (e.g., profile image for About).
                loadHeader(data.profile, data.navigation); // Re-enabled and crucial for header content
                loadHero(data.hero);
                loadAbout(data.about, data.profile.image); // Pass profile image to About section
                loadFacts(data.facts);
                loadSkills(data.skills);
                loadResume(data.resume);
                loadPortfolio(data.portfolio);
                loadServices(data.services);
                loadTestimonials(data.testimonials); // Uncomment if you enable testimonials section in HTML
                loadContact(data.contact);

                // Initialize AOS (Animate On Scroll) after all dynamic content has been inserted into the DOM.
                // This ensures AOS can correctly detect and apply animations to newly added elements.
                if (window.AOS) {
                    window.AOS.init({
                        duration: 1000,
                        easing: "ease-in-out-back",
                        once: true
                    });
                    // Crucial: Refresh AOS to re-scan the DOM for new elements after dynamic loading.
                    window.AOS.refresh();
                } else {
                    console.warn('AOS library not found. Please ensure assets/vendor/aos/aos.js is loaded.');
                }

                // If main.js contains other global initializations that are not handled in specific load functions,
                // you might still need to execute them. However, for dynamic content,
                // it's generally better to re-initialize plugins right after their target HTML is loaded.
                // If assets/js/main.js contains the theme's core logic for mobile nav, back-to-top, etc.,
                // it should ideally be loaded in index.html before profile.js, or adapted.
                // The dynamic loading of main.js here can create issues if main.js is expected to run immediately.
                // It's usually better to load `main.js` as a standard script tag in `index.html` *after* all vendor scripts.
                // And ensure `main.js` has a mechanism to re-initialize components if needed.

                // For now, I'll keep your dynamic main.js load, but caution that it's often better as static.
                // If main.js has logic that needs to run after ALL data and plugins are setup,
                // its contents might need to be modified, or you can explicitly call a function from it.
                const mainScript = document.createElement('script');
                mainScript.src = 'assets/js/main.js';
                mainScript.onload = () => {
                    console.log('main.js loaded and ready.');
                    // Example: if main.js defines an initialization function like `themeInit()`, call it here.
                    // if (typeof window.themeInit === 'function') {
                    //    window.themeInit();
                    // }
                };
                // Append script to body to ensure it executes after DOM is mostly ready.
                // This might cause double-loading if main.js is also in index.html.
                // Best practice: ONLY load `main.js` once, either statically in HTML or dynamically here.
                // I recommend statically in HTML for better control over execution order.
                // document.body.appendChild(mainScript);
                // Instead of dynamic loading, let's assume main.js is loaded statically via index.html
                // and its initialization logic handles post-DOM content. If it doesn't,
                // you'll need to adapt main.js to have a callable function.

                console.log('All dynamic data loaded and initial plugin setups complete.');
            })
            .catch(error => {
                console.error('An error occurred while fetching or processing data:', error);
                // Display a user-friendly error message on the page if data loading fails.
                const mainContent = document.getElementById('main');
                if (mainContent) {
                    mainContent.innerHTML = `
                        <section style="text-align: center; margin-top: 50px; padding: 20px; background-color: #ffe0e0; border: 1px solid #ff0000; border-radius: 8px;">
                            <h2>Oops! Something went wrong.</h2>
                            <p>We couldn't load the portfolio data. This might be due to a network issue or missing data file.</p>
                            <p>Please check your internet connection and try refreshing the page.</p>
                            <p style="font-size: 0.8em; color: #888;">Error details: ${error.message}</p>
                        </section>
                    `;
                } else {
                    document.body.innerHTML = `
                        <div style="text-align: center; margin-top: 50px; color: red;">
                            <h1>Error loading portfolio.</h1>
                            <p>Please check your internet connection or try again later.</p>
                            <p>Details: ${error.message}</p>
                        </div>
                    `;
                }
            });
    });
    // The `loadedData` variable logic is removed as it's not effective for full page refreshes.
    // The immediate `return;` if `loadedData` is not null would also prevent initial load.
})(jQuery);