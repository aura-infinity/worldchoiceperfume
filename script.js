
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .product-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Create floating particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            document.querySelector('.hero').appendChild(particle);
        }

        for (let i = 0; i < 20; i++) {
            createParticle();
        }

        // Add hover effect for phone number
        const phoneLink = document.querySelector('a[href^="tel:"]');
        phoneLink.addEventListener('mouseenter', () => {
            phoneLink.style.color = '#d4af37';
        });
        phoneLink.addEventListener('mouseleave', () => {
            phoneLink.style.color = 'inherit';
        });

        // Reviews slideshow: dynamically load images named review1..review10 (jpg/png/webp)
        (function(){
            const slidesEl = document.querySelector('.slides');
            const dotsEl = document.querySelector('.rev-dots');
            const prevBtn = document.querySelector('.rev-prev');
            const nextBtn = document.querySelector('.rev-next');
            if(!slidesEl || !dotsEl) return;

            const slides = [];
            const exts = ['jpg','png','jpeg','webp'];
            const max = 10;

            function addSlide(src){
                const slide = document.createElement('div');
                slide.className = 'slide';
                slide.style.display = 'none';
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Customer review screenshot';
                slide.appendChild(img);
                slidesEl.appendChild(slide);
                slides.push(slide);

                const dot = document.createElement('span');
                dot.className = 'rev-dot';
                dot.addEventListener('click', () => {
                    const nodes = Array.from(slidesEl.querySelectorAll('.slide'));
                    const idx = nodes.indexOf(slide);
                    if(idx >= 0) showSlide(idx);
                });
                dotsEl.appendChild(dot);
            }

            for(let i=1;i<=max;i++){
                for(const e of exts){
                    const src = `images/review${i}.${e}`;
                    const img = new Image();
                    img.onload = (function(s){ return function(){ addSlide(s); }; })(src);
                    img.onerror = function(){};
                    img.src = src;
                }
            }

            function initSlides(){
                if(slides.length === 0){
                    slidesEl.innerHTML = '<div class="slide" style="display:flex; align-items:center; justify-content:center; height:220px; color:#999;">Please Refresh page to view comments and reviews from our Customers.</div>';
                    return;
                }

                let current = 0;

                function show(n){
                    slides.forEach((s,i)=> s.style.display = (i===n)?'flex':'none');
                    const dots = dotsEl.querySelectorAll('.rev-dot');
                    dots.forEach((d,i)=> d.classList.toggle('active', i===n));
                    current = n;
                }

                function showSlide(n){ show((n + slides.length) % slides.length); }
                window.showSlide = showSlide;

                prevBtn.addEventListener('click', ()=> showSlide(current-1));
                nextBtn.addEventListener('click', ()=> showSlide(current+1));

                let autoplay = setInterval(()=> showSlide(current+1), 4500);
                [prevBtn,nextBtn,slidesEl].forEach(el=>{
                    el.addEventListener('mouseenter', ()=> clearInterval(autoplay));
                    el.addEventListener('mouseleave', ()=> { autoplay = setInterval(()=> showSlide(current+1), 4500); });
                });

                show(0);
            }

            // give a short delay for images to complete loading
            setTimeout(initSlides, 600);
        })();
