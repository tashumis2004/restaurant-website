// Select interaction elements from the page
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const yearElement = document.getElementById('year');
const reservationForm = document.getElementById('reservationForm');
const slides = Array.from(document.querySelectorAll('.gallery-slide'));
const thumbs = Array.from(document.querySelectorAll('.thumb'));
const prevButton = document.querySelector('.gallery-btn.prev');
const nextButton = document.querySelector('.gallery-btn.next');

// Set the footer year dynamically
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobile menu toggle behavior
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

// Handle booking form submission feedback
if (reservationForm) {
  reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = reservationForm.querySelector('button');

    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Booked!';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        reservationForm.reset();
      }, 1800);
    }
  });
}

// Gallery slider behavior
let currentSlideIndex = 0;
let galleryTimer;

function showSlide(index) {
  if (!slides.length) return;

  currentSlideIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentSlideIndex);
  });

  thumbs.forEach((thumb, thumbIndex) => {
    thumb.classList.toggle('active', thumbIndex === currentSlideIndex);
  });
}

function startGalleryAutoPlay() {
  clearInterval(galleryTimer);
  galleryTimer = setInterval(() => {
    showSlide(currentSlideIndex + 1);
  }, 3500);
}

if (slides.length) {
  prevButton?.addEventListener('click', () => {
    showSlide(currentSlideIndex - 1);
    startGalleryAutoPlay();
  });

  nextButton?.addEventListener('click', () => {
    showSlide(currentSlideIndex + 1);
    startGalleryAutoPlay();
  });

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      showSlide(index);
      startGalleryAutoPlay();
    });
  });

  showSlide(0);
  startGalleryAutoPlay();
}
