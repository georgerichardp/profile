!(function ($) {
    "use strict";
    const params = new URLSearchParams(window.location.search);
    const database = params.get("database");
    fetch(database)
        .then(response => response.json())
        .then(data => {

            document.getElementById('breadcrumbs-title').innerText = data.breadcrumbsTitle;

            // Langsung tambahkan semua gambar ke carousel
            const carousel = document.getElementById('carousel-container');
            carousel.innerHTML = data.carouselImages.map(src => `
        <div class="item text-center">
          <img src="${src}" class="img-fluid" alt="${src.split('/').pop()}">
        </div>
      `).join('');

            // Project Info
            const info = data.projectInfo;
            document.getElementById('project-info').innerHTML = `
        <li><strong>Category</strong>: ${info.category}</li>
        <li><strong>Client</strong>: ${info.client}</li>
        <li><strong>Project date</strong>: ${info.date}</li>
        <li><strong>App Store</strong>: <a href="${info.url_ios}" target="_blank" rel="noopener noreferrer">${info.url_ios}</a></li>
        <li><strong>Google Play</strong>: <a href="${info.url_android}" target="_blank" rel="noopener noreferrer">${info.url_android}</a></li>
      `;

            // Description
            document.getElementById('description-title').innerText = data.description.title;
            document.getElementById('description-content').innerText = data.description.content;

            // Panggil ulang main.js setelah data hero siap
            var script = document.createElement('script');
            script.src = 'assets/js/main.js';
            document.body.appendChild(script);
            //panggil main js di sini
        })
        .catch(error => console.error('Gagal load JSON:', error));
})(jQuery);