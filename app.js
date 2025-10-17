/**
 * Template Name: iPortfolio - Soham Sawalakhe
 * Updated: Oct 17 2024
 * Author: Soham Sawalakhe
 */

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  })

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let progress = entry.target.querySelectorAll('.progress .progress-bar');
          progress.forEach((el) => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    }).observe(skilsContent);
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        let filterValue = this.getAttribute('data-filter');
        let portfolioItems = select('.portfolio-item', true);
        
        portfolioItems.forEach(function(item) {
          if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s';
          } else {
            item.style.display = 'none';
          }
        });
      }, true);
    }
  });

  /**
   * Typed animation for hero section
   */
  const typed = select('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    
    let currentStringIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
      const currentString = typed_strings[currentStringIndex];
      
      if (isDeleting) {
        typed.textContent = currentString.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentStringIndex = (currentStringIndex + 1) % typed_strings.length;
          setTimeout(typeWriter, 500); // Pause before typing next string
          return;
        }
      } else {
        typed.textContent = currentString.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentString.length) {
          isDeleting = true;
          setTimeout(typeWriter, 2000); // Pause before deleting
          return;
        }
      }
      
      setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
    
    typeWriter();
  }

  /**
   * Counter animation
   */
  const counters = select('.purecounter', true);
  if (counters.length > 0) {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-purecounter-end'));
          const duration = parseInt(counter.getAttribute('data-purecounter-duration')) * 1000;
          const start = parseInt(counter.getAttribute('data-purecounter-start'));
          
          let current = start;
          const increment = target / (duration / 50);
          
          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.textContent = Math.floor(current);
              setTimeout(updateCounter, 50);
            } else {
              counter.textContent = target;
            }
          };
          
          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  /**
   * Contact form submission
   */
 window.handleFormSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const subject = form.subject.value;
  const message = form.message.value;
  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=sohamsawalakhe@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.open(mailtoLink, '_blank');
};


  /**
   * CV Download functionality
   */
  window.downloadCV = function() {
    // Create a comprehensive PDF-like content as data URL
    const pdfContent = `
    Resume - Soham Manish Sawalakhe
    Computer Engineer | AI/ML Engineer | Full Stack Developer
    
    Contact Information:
    Email: sohamsawalakhe@gmail.com
    Phone: +91 7558496659
    Birthday: 26 April 2004 (Age: 21)
    Location: Amravati, Maharashtra
    GitHub: https://github.com/SohamSawalakhe
    LinkedIn: https://www.linkedin.com/in/soham-sawalakhe-901366278/
    
    Professional Summary:
    Results-driven Computer Engineering student with strong expertise in Python, AI/ML, and Full-Stack Web Development. 
    Experienced in building scalable applications, implementing advanced algorithms, and integrating secure systems. 
    Proven track record of delivering high-impact projects with clean, maintainable code.
    
    Education:
    B.Tech in Computer Engineering (2021-2025)
    Government College of Engineering, Yavatmal
    CGPA: 8.26
    
    Higher Secondary (HSC) - 84.80% (2020-2021)
    Bhartiya Mahavidyalaya, Amravati
    
    Secondary (SSC) - 77.6% (2019)
    Dnyanmata High School, Amravati
    
    Technical Skills:
    • Languages: Python (95%), JavaScript (85%), Java (80%), SQL (90%), HTML/CSS (90%)
    • Frameworks & Tools: Django (90%), Flask (85%), React (80%), Node.js (80%), Bootstrap (90%)
    • AI/ML & Data: Scikit-learn (85%), TensorFlow/Keras (80%), Pandas/NumPy (90%), Power BI (85%), Machine Learning (85%)
    • Tools & Technologies: Git/GitHub (95%), VS Code (90%), Docker (75%), AWS (70%), MongoDB (85%)
    
    Professional Experience:
    
    Software Developer Intern (June 2025 - Present)
    TCS (Tata Consultancy Services), India
    • Working on enterprise software development projects
    • Collaborating with development teams on code reviews and implementation
    • Participating in agile development methodologies
    • Learning industry best practices and professional software development
    
    Full Stack Developer (2023 - Present)
    Freelance Projects, Amravati, Maharashtra
    • Developed multiple full-stack web applications using Django, Flask, and React
    • Implemented AI/ML models for various projects including image recognition and data analysis
    • Built REST APIs for seamless integration between frontend and backend systems
    • Managed databases using MySQL and MongoDB for efficient data storage
    • Collaborated with clients to understand requirements and deliver custom solutions
    
    Technical Volunteer & Class Representative (2021 - 2024)
    NSS & GCOE Yavatmal
    • Led 60+ peers as Class Representative
    • Volunteered in 100+ hours of community service through National Service Scheme
    • Organized technical workshops, coding competitions, and awareness programs
    
    Key Projects:
    • Covert Database Detection (AI/ML) - Sophisticated desktop application with 90% detection accuracy
    • Library Management System (Full Stack) - Dual-interface system with role-based authentication
    • CDP Chatbot (AI/ML) - Intelligent chatbot using NLP and machine learning
    • Data Analytics Dashboard (Web App) - Interactive dashboard with real-time data visualization
    • Any Search Tool (Desktop App) - Real-time file search with advanced filtering
    • Spreadsheet Application (Web App) - Interactive spreadsheet with formula support
    
    Professional Certifications:
    • Google Cybersecurity Professional Certificate (2024)
    • Microsoft & LinkedIn - Generative AI (2024)
    • Google AI Essentials (2024)
    • Cisco Data Analytics Essentials (2024)
    • Power BI Masterclass (2023)
    • Python Professional Certification (2023)
    • NPTEL - Soft Skills (2023)
    • NPTEL - Professional Skills (2023)
    
    Achievements:
    • Published Research Paper on 'Covert Data Intelligence' in Scopus Indexed journal (2024)
    • TCS Interview Selection for Software Developer role (2025)
    • Solved 100+ Problems on competitive coding platforms (2023-2024)
    • Recognition in multiple national and state-level hackathons (2023-2024)
    • Leadership Excellence as Class Representative (2021-2024)
    • 100+ Hours Community Service through NSS (2021-2024)
    
    Statistics:
    • 20+ Projects completed successfully
    • 15+ Happy clients with delivered solutions
    • 500+ Hours of support and development
    • 8+ Professional certifications earned
    `;
    
    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Resume_Soham_Sawalakhe_Professional.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // Show download confirmation
    setTimeout(() => {
      alert('Resume downloaded successfully! Thank you for your interest.');
    }, 500);
  };

  /**
   * Smooth reveal animation on scroll
   */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Apply animation to elements with data-aos attribute
  window.addEventListener('load', () => {
    const elementsToAnimate = select('[data-aos]', true);
    elementsToAnimate.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  });

  /**
   * Add fadeIn animation keyframes
   */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

})();