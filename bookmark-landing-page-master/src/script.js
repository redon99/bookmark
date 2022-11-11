'use strict';

const header = document.querySelector('.header');
const btnOpenNav = document.querySelector('.header__btn-mobile--open');
const btnCloseNav = document.querySelector('.header__btn-mobile--close');
const navLinks = document.querySelectorAll('.header__nav-link');
const allSections = document.querySelectorAll('.section');
const tabs = document.querySelectorAll('.features__btn');
const tabsContainer = document.querySelector('.features__tab-container');
const tabsContent = document.querySelectorAll('.features__content');
const faqHeaders = document.querySelectorAll('.faq__header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelector('.btn--show-modal');

////////////////////////////////
//Mobile navigation

btnOpenNav.addEventListener('click', (e) => {
  header.classList.add('nav-open');
});
btnCloseNav.addEventListener('click', () => {
  header.classList.remove('nav-open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
  });
});

//////////////////////////////////////////
//Tabbed component

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target;

  // Remove active classes
  tabs.forEach((tab) => tab.classList.remove('features__btn--active'));
  tabsContent.forEach((content) =>
    content.classList.remove('features__content--active')
  );

  // Set active tab
  clicked.classList.add('features__btn--active');

  // Showing feature content
  document
    .querySelector(`.features__content--${clicked.dataset.tab}`)
    .classList.add('features__content--active');
});

//////////////////////////////////////////
// Accordion component

// Toggling active class
faqHeaders.forEach((header) => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('faq__active');
  });
});

//////////////////////////////////////////
// MODAL

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////
/// Revealing section

const revealSecetion = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
};

const sectionObsever = new IntersectionObserver(revealSecetion, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObsever.observe(section);
  section.classList.add('section--hidden');
});

/////////////////////////////////////
// Nav animation on hover

const mouseOver = function (e) {
  if (e.target.classList.contains('header__nav-link')) {
    const link = e.target;
    const siblings = link
      .closest('.header__nav')
      .querySelectorAll('.header__nav-link');
    const logo = link.closest('.header').querySelector('.header__logo');
    const btn = link.closest('.header__nav').querySelector('.header__btn');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
    btn.style.opacity = this;
  }
};

header.addEventListener('mouseover', mouseOver.bind(0.5));
header.addEventListener('mouseout', mouseOver.bind(1));
