/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
      navToggle = document.getElementById('nav-toggle');
      navClose = document.getElementById('nav-close');
/*=============== SHOW MENU ===============*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}
/*=============== HIDE MENU ===============*/
if(navClose){
    navClose.addEventListener('click' , () => {
        navMenu.classList.remove('show-menu')
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')    
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SWIPER PROJECTS ===============*/
let swiperProjects = new Swiper(".projects_container", {
    loop: true,
    spaceBetween: 24,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    preloadImages: false,
    lazy: true,
    watchSlidesProgress: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: 2,
            spaceBetween: -56,
        },
    },
  })

/*=============== SWIPER TESTIMONIAL ===============*/
// ! comments swiper
let swiperComments = new Swiper(".comments_container", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
})


/*=============== EMAIL JS ===============*/
const   contactForm = document.getElementById("contact_form"),
        contactName = document.getElementById("contact_name"),
        contactEmail =   document.getElementById("contact_email"),
        contactProject = document.getElementById("contact_textarea"),
        contactMessage = document.getElementById("contact_message")
const sendEmail = (e) => {
    e.preventDefault()
    // check empty
    if(contactName.value==="" || contactEmail.value==="" || contactProject===""){}
    else{
        // server id , template id , form id , public key (emailjs)
        emailjs.sendForm('service_pk8l6nt','template_ywrdbbp','#contact_form','baLvWpZOmZSmQ-fU4')
        .then(()=>{
            // show message and add color
            contactMessage.classList.add("color_blue")
            contactMessage.textContent = "message sent ✔"
            // remove message after 5s
            setTimeout(()=>{
                contactMessage.textContent = ''
            },5000)
        },(error)=>{
            alert("OOPS! shomething has failed....", error)
        })
        // clear form
        contactName.value = ''
        contactEmail.value = ''
        contactProject.value = ''
    }
}
contactForm.addEventListener('submit', sendEmail)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// ! scoll actiove link
// select all sections id
const sections = document.querySelectorAll("section[id]")
// add active-link class while scrolling
const scrollActive = debounce(() => {
    // get scrallY value 
    const scrollY = window.pageYOffset
    // check where scroll currently is
    sections.forEach(current =>{
        const   sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - 58,
                sectionId = current.getAttribute('id'),
                sectionsClass = document.querySelector('.nav_menu a[href*=' + sectionId + ']')
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add("active_link")
        }else{
            sectionsClass.classList.remove("active_link")
        }
    })
}, 15)
window.addEventListener('scroll', scrollActive)
// ! show scroll up
const scrollUp = ()=>{
    const scrollUp = document.getElementById('scroll_up')
    this.scrollY >= 350? scrollUp.classList.add('show_scroll') : scrollUp.classList.remove('show_scroll')
}
window.addEventListener('scroll', scrollUp)
/*=============== DARK LIGHT THEME ===============*/ 
// ! theme
const   themeButton = document.getElementById("theme_button"),
        darkTheme = "dark_theme",
        iconTheme = "ri-sun-line"
// saved theme
const   selectedTheme = localStorage.getItem("selected_theme"),
        selectedIcon = localStorage.getItem("selected_icon")
// check theme
const getCurrentTheme = ()=> document.body.classList.contains(darkTheme) ? "dark" : "light"
const getCurrentIcon = ()=> themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line"
// set old theme
if(selectedTheme){
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme)
    themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](iconTheme)
}
// activte deactivate theme
themeButton.addEventListener('click', handleThemeSwitch)
// ! change background header
const scrollHeader = () =>{
    const header = document.getElementById('header') 
    this.scrollY >= 50 ? header.classList.add("bg_header") : header.classList.remove("bg_header")
}
window.addEventListener('scroll', scrollHeader)
// ! scroll animation
const sr = ScrollReveal({
    origin: "top",
    distance: "50px",
    duration: 2500,
    delay: 400,
})
sr.reveal(".home_data, .projects_container, .comments_container, .footer_container")
sr.reveal(".home_info", {delay:600,origin:"bottom",interval:100})
sr.reveal(".skills_content:nth-child(1), .contact_content:nth-child(1)", {origin:"left"})
sr.reveal(".skills_content:nth-child(2), .contact_content:nth-child(2)", {origin:"right"})
sr.reveal(".qualification_content, .services_card", {interval:100})
sr.reveal(".links__content", {delay:400, interval:50})

/*=============== LOADER ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const content = document.querySelector('.main');

    // Hide loader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loader--hidden');
            content.style.visibility = 'visible';
            initializeAnimations();
        }, 1000);
    });
});

/*=============== PERFORMANCE OPTIMIZATIONS ===============*/
// Debounce function for performance
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Optimize theme switching
const handleThemeSwitch = debounce(() => {
    // add remove
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // save theme
    localStorage.setItem("selected_theme", getCurrentTheme())
    localStorage.setItem("selected_icon", getCurrentIcon())
}, 150);

/*=============== LAZY LOADING IMAGES ===============*/
const lazyLoadImages = () => {
    const images = document.querySelectorAll('[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

/*=============== SMOOTH SCROLL ===============*/
const smoothScroll = (target, duration) => {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = currentTime => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
};

/*=============== INITIALIZE ANIMATIONS ===============*/
const initializeAnimations = () => {
    // ScrollReveal configurations
    ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400,
        // Disable for users who prefer reduced motion
        mobile: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });

    // Apply reveal animations
    ScrollReveal().reveal('.home__data, .home__social', { origin: 'bottom' });
    ScrollReveal().reveal('.home__info div', { delay: 600, origin: 'bottom', interval: 100 });
    ScrollReveal().reveal('.skills__content:nth-child(1)', { origin: 'left' });
    ScrollReveal().reveal('.skills__content:nth-child(2)', { origin: 'right' });
    ScrollReveal().reveal('.qualification__content', { interval: 100 });
    ScrollReveal().reveal('.services_card', { interval: 100 });
};

// Initialize everything after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    
    // Add smooth scroll to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) smoothScroll(target, 1000);
        });
    });
    
    // Initialize other existing functionality
    // ...existing initialization code...
});