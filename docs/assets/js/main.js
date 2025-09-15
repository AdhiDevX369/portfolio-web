/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');
const linkAction = () => {
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SWIPER PROJECTS ===============*/
let swiperProjects = new Swiper('.projects_container', {
  loop: true,
  spaceBetween: 24,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
  touchRatio: 1,
  touchAngle: 45,
  grabCursor: true,
  resistance: true,
  resistanceRatio: 0.65,
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 1, spaceBetween: 30 },
    1200: { slidesPerView: 2, spaceBetween: -56 },
  },
})

/*=============== SWIPER TESTIMONIAL ===============*/
let swiperComments = new Swiper('.comments_container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  touchRatio: 1,
  touchAngle: 45,
  grabCursor: true,
  resistance: true,
  resistanceRatio: 0.65,
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 20 },
  },
})

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact_form')
const contactName = document.getElementById('contact_name')
const contactEmail = document.getElementById('contact_email')
const contactProject = document.getElementById('contact_textarea')
const contactMessage = document.getElementById('contact_message')

const sendEmail = (e) => {
  e.preventDefault()
  if (
    contactName.value === '' ||
    contactEmail.value === '' ||
    contactProject.value === ''
  ) {
    contactMessage.classList.remove('color_blue')
    contactMessage.textContent = 'Please fill out all fields'
    return
  }

  emailjs
    .sendForm(
      'service_pk8l6nt',
      'template_ywrdbbp',
      '#contact_form',
      'baLvWpZOmZSmQ-fU4'
    )
    .then(
      () => {
        contactMessage.classList.add('color_blue')
        contactMessage.textContent = 'Message sent'
        setTimeout(() => {
          contactMessage.textContent = ''
        }, 5000)
      },
      (error) => {
        console.error('OOPS! something has failed....', error)
        contactMessage.classList.remove('color_blue')
        contactMessage.textContent = 'Something went wrong. Try again.'
      }
    )

  contactName.value = ''
  contactEmail.value = ''
  contactProject.value = ''
}
if (contactForm) contactForm.addEventListener('submit', sendEmail)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
const scrollActive = () => {
  const scrollY = window.pageYOffset
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 58
    const sectionId = current.getAttribute('id')
    const sectionsClass = document.querySelector(
      '.nav__menu a[href*="#' + sectionId + '"]'
    )
    if (!sectionsClass) return
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active_link')
    } else {
      sectionsClass.classList.remove('active_link')
    }
  })
}

/*=============== SCROLL UP BUTTON ===============*/
const scrollUp = () => {
  const btn = document.getElementById('scroll_up')
  if (!btn) return
  window.scrollY >= 350
    ? btn.classList.add('show_scroll')
    : btn.classList.remove('show_scroll')
}

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme_button')
const darkTheme = 'dark_theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected_theme')
const selectedIcon = localStorage.getItem('selected_icon')

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme
  )
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](
    iconTheme
  )
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  localStorage.setItem('selected_theme', getCurrentTheme())
  localStorage.setItem('selected_icon', getCurrentIcon())
})

/*=============== CHANGE HEADER BACKGROUND ===============*/
const scrollHeader = () => {
  const header = document.getElementById('header')
  if (!header) return
  window.scrollY >= 50
    ? header.classList.add('bg_header')
    : header.classList.remove('bg_header')
}

/*=============== SCROLL REVEAL ANIMATIONS ===============*/
const sr = ScrollReveal({ origin: 'top', distance: '50px', duration: 2500, delay: 400 })
sr.reveal('.home_data, .projects_container, .comments_container, .footer_container')
sr.reveal('.home_info', { delay: 600, origin: 'bottom', interval: 100 })
sr.reveal('.skills_content:nth-child(1), .contact_content:nth-child(1)', { origin: 'left' })
sr.reveal('.skills_content:nth-child(2), .contact_content:nth-child(2)', { origin: 'right' })
sr.reveal('.qualification_content, .services_card', { interval: 100 })
sr.reveal('.links__content', { delay: 400, interval: 50 })

/*=============== LOADER ===============*/
// Initialize Lottie loader and hide after short delay
const initLottieLoader = () => {
  const loader = document.querySelector('.loader')
  if (!loader) return
  // Replace existing loader content with Lottie container + text
  loader.innerHTML = `
    <div class="loader__box">
      <div id="lottie-loader" class="lottie" aria-hidden="true"></div>
      <div class="loader__text" role="status" aria-live="polite">
        <h2 class="loader__title">AI Engineer | Adithya Bandara</h2>
        <p class="loader__subtitle">Loading portfolio…</p>
      </div>
    </div>
  `

  if (window.lottie) {
    try {
      window.lottie.loadAnimation({
        container: document.getElementById('lottie-loader'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        // Modern minimal loader animation
        path: 'https://assets9.lottiefiles.com/packages/lf20_j1adxtyb.json'
      })
    } catch (e) {
      // ignore
    }
  }
}

document.addEventListener('DOMContentLoaded', initLottieLoader)

window.addEventListener('load', () => {
  const loader = document.querySelector('.loader')
  if (!loader) return
  setTimeout(() => {
    loader.classList.add('loader--hidden')
    loader.addEventListener('transitionend', () => {
      if (document.body.contains(loader)) {
        document.body.removeChild(loader)
      }
    })
  }, 1200)
})
/*=============== MOBILE OPTIMIZATIONS ===============*/
document.addEventListener('touchstart', function () {}, { passive: true })
document.addEventListener('touchmove', function () {}, { passive: true })

let scrollTimeout
const optimizedScrollHandler = () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null
      scrollActive()
      scrollUp()
      scrollHeader()
    }, 16)
  }
}

window.removeEventListener('scroll', scrollActive)
window.removeEventListener('scroll', scrollUp)
window.removeEventListener('scroll', scrollHeader)
window.addEventListener('scroll', optimizedScrollHandler)

// Fast click for mobile
document
  .querySelectorAll('a, button, .nav__link, .services_card')
  .forEach((element) => {
    element.addEventListener('touchstart', function () {}, { passive: true })
  })

/*=============== IMAGE LOADING HINTS ===============*/
// Lazy-load non-critical images and decode async to improve performance
document.querySelectorAll('main img').forEach((img) => {
  img.setAttribute('loading', 'lazy')
  img.setAttribute('decoding', 'async')
})