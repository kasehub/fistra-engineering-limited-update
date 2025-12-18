function loadHTML(id, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        })
        .catch(err => console.error('Error loading HTML:', err));
}
  
loadHTML("header", "header.html", initMobileMenu);
  loadHTML("footer", "footer.html");
  
     
  function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const body = document.body;

    if (!menuToggle || !nav) {
        console.error('Menu elements not found');
        return;
    }

    // Add index to menu items for staggered animation
    const navItems = document.querySelectorAll('#nav ul li');
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        const isActive = nav.classList.contains('active');

        if (isActive) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.display = 'none', 300);
        } else {
            nav.classList.add('active');
            menuToggle.classList.add('active');
            body.classList.add('menu-open');
            overlay.style.display = 'block';
            setTimeout(() => overlay.style.opacity = '1', 10);
        }
    }

    menuToggle.addEventListener('click', e => {
        e.stopPropagation();
        toggleMenu();
    });

    overlay.addEventListener('click', toggleMenu);

    document.querySelectorAll('#nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) toggleMenu();
        });
    });

    document.addEventListener('click', e => {
        if (
            window.innerWidth <= 768 &&
            nav.classList.contains('active') &&
            !nav.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            toggleMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
            overlay.style.display = 'none';
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
}

     
     // Contact form submission with validation + Web3Forms integration
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const service = document.getElementById('service').value;
    
    if (!name || !email || !message || !service) {
        alert('Please fill in all required fields: Name, Email, Services and Message.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Web3Forms submission
    const form = this;
    const formData = new FormData(form);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(async response => {
        let result = await response.json();

        if (result.success) {
            alert('Thank you for your message, ' + name + '! We will get back to you soon at ' + email + '.');
            form.reset();
        } else {
            alert('Submission failed. Please try again.');
        }

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    })
    .catch(() => {
        alert('Network error. Please try again.');

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});
     
     // Smooth scrolling for anchor links
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function(e) {
             const targetId = this.getAttribute('href');
             
             // Only handle internal page anchors
             if (targetId.startsWith('#') && targetId.length > 1) {
                 e.preventDefault();
                 const targetElement = document.querySelector(targetId);
                 
                 if (targetElement) {
                     // Calculate offset for header height
                     const headerHeight = document.querySelector('header').offsetHeight;
                     const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                     
                     window.scrollTo({
                         top: targetPosition - headerHeight - 20,
                         behavior: 'smooth'
                     });
                 }
             }
         });
     });
     
     // Add active class to current page in navigation
     function setActiveNavItem() {
         const currentPage = window.location.pathname.split('/').pop() || 'index.html';
         const navLinks = document.querySelectorAll('nav ul li a');
         
         navLinks.forEach(link => {
             const linkPage = link.getAttribute('href');
             if (linkPage === currentPage) {
                 link.classList.add('active');
             }
         });
     }
     
     // Call when page loads
     document.addEventListener('DOMContentLoaded', function() {
         setActiveNavItem();
         
         // Add animation on scroll for elements
         const animateOnScroll = () => {
             const elements = document.querySelectorAll('.service-card, .project-card, .value-item, .cert-card, .team-member, .benefit-item');
             
             elements.forEach(element => {
                 const elementPosition = element.getBoundingClientRect().top;
                 const screenPosition = window.innerHeight / 1.2;
                 
                 if (elementPosition < screenPosition) {
                     element.style.opacity = '1';
                     element.style.transform = 'translateY(0)';
                 }
             });
         };
         
         // Set initial state for animation
         document.querySelectorAll('.service-card, .project-card, .value-item, .cert-card, .team-member, .benefit-item').forEach(el => {
             el.style.opacity = '0';
             el.style.transform = 'translateY(20px)';
             el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
         });
         
         // Run on load and scroll
         animateOnScroll();
         window.addEventListener('scroll', animateOnScroll);
     });
     
     // Fix for mobile viewport height
     function setVhProperty() {
         const vh = window.innerHeight * 0.01;
         document.documentElement.style.setProperty('--vh', `${vh}px`);
     }
     
     // Set viewport height on load and resize
     setVhProperty();
     window.addEventListener('resize', setVhProperty);
     window.addEventListener('orientationchange', setVhProperty);
     
     // Optional: Lazy loading for images
     if ('IntersectionObserver' in window) {
         const imageObserver = new IntersectionObserver((entries, observer) => {
             entries.forEach(entry => {
                 if (entry.isIntersecting) {
                     const img = entry.target;
                     img.src = img.dataset.src;
                     img.classList.add('loaded');
                     observer.unobserve(img);
                 }
             });
         });
         
         document.querySelectorAll('img[data-src]').forEach(img => {
             imageObserver.observe(img);
         });
     }
