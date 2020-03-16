const MENU = document.querySelector('#menu');
const BTN_FORM = document.querySelector('#form-btn');
const BTN_POPUP = document.querySelector('#popup-btn');
const FORM = document.querySelector('#form');
const FILTER_BLOCK = document.querySelector('#filters');
const GALLERY = document.querySelector('#gallery');
const SLIDER = document.querySelector('#slider');
const PHONE_BTN_VERT = document.querySelector('.phone_btn--vert');
const PHONE_BTN_HOR = document.querySelector('.phone_btn--hor');


// Header
MENU.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('main-nav__link')) {
        MENU.querySelectorAll('.main-nav__link').forEach(el => el.classList.remove('main-nav__link--active'));
        evt.target.classList.add('main-nav__link--active');
    }
    
});

// Slider. Переключение слайдов
let items = document.querySelectorAll('.slider__item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    if (currentItem === 0) {
        document.querySelector('.slider').classList.toggle('slider--red');
        document.querySelector('.slider').classList.toggle('slider--blue');
    } else if (currentItem === 1) {
        document.querySelector('.slider').classList.toggle('slider--red');
        document.querySelector('.slider').classList.toggle('slider--blue');
    }
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.slider__arrow--left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.slider__arrow--right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

// Slider. Активация экранов телефонов
function toggle(el) {
    el.style.display = (el.style.display === 'none' || !el.style.display) ? 'block' : 'none';
}

PHONE_BTN_VERT.addEventListener('click', () => {
    toggle(document.querySelector('.phone_screen--vert'));   
});
PHONE_BTN_HOR.addEventListener('click', () => {
    toggle(document.querySelector('.phone_screen--hor'));   
});

// Portfolio. Переключение табов
FILTER_BLOCK.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('portfolio__filters__link')) {
        let images = GALLERY.querySelectorAll('.portfolio__gallery__item');
        let arr = Array.from(images).splice(images.length - 4,5);
        arr.forEach((el, i) => GALLERY.insertBefore(arr[i], images[0]));

        FILTER_BLOCK.querySelectorAll('.portfolio__filters__link').forEach(el => el.classList.remove('portfolio__filters__link--active'));
        evt.target.classList.add('portfolio__filters__link--active');
    }
});

// Portfolio. Взаимодействие с картинками
GALLERY.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('portfolio__gallery__item')) {
        GALLERY.querySelectorAll('.portfolio__gallery__item').forEach(el => el.classList.remove('portfolio__gallery__item--active'));
        evt.target.classList.add('portfolio__gallery__item--active');
    }
});

FORM.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const subject = document.querySelector('#form-subject').value.toString();
    const description = document.querySelector('#form-desc').value.toString();

    if (subject) {
        document.querySelector('.popup__topic').innerHTML = '<span>Subject:</span> ' + subject;
    } else {
        document.querySelector('.popup__topic').innerHTML = '<span>Without subject</span>';
    }
    
    if (description) {
        document.querySelector('.popup__desc').innerHTML = '<span>Description:</span> ' + description;
    } else {
        document.querySelector('.popup__desc').innerHTML = '<span>Without description</span>';
    }
    
    document.querySelector('.popup').classList.remove('hidden');    
});

BTN_POPUP.addEventListener('click', () => {
    document.querySelector('.popup').classList.add('hidden');
});