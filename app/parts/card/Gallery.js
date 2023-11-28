(function () {
	"use strict";

	/**
	 * Данный класс управляет галереей с фотографиями товаров
	 */
	class Gallery {
		constructor() {
			this.settingsTop = {
				lazy: {
					loadPrevNext: true,
				},
				speed: 600,
				spaceBetween: 10,
				loop: true,
				loopedSlides: 6,
				navigation: {
					nextEl: '.swiper-button-next-thumbs',
					prevEl: '.swiper-button-prev-thumbs',
				},
				pagination: {
					el: '.card__pagination',
					clickable: true,
				}
			};

			this.settingsThumbs = {
				speed: 600,
				spaceBetween: 20,
				loop: true,
				loopedSlides: 6,
				watchSlidesProgress: true,
				centeredSlides: true,
				slideToClickedSlide: true,
				breakpoints: {
					320: {
						slidesPerView: 3,
					},
					769: {
						slidesPerView: 3,
					},
					993: {
						slidesPerView: 4,
					},
				}
			};

			this.galleryTop = new Swiper('.gallery-top', this.settingsTop);
			this.galleryThumbs = new Swiper('.gallery-thumbs', this.settingsThumbs);
		}

		/**
		 * Метод позволяет задавать картинкам в галерее высоту в зависимости от ширины картинки
		 */
		setImagesHeight() {
			let galleryTopImgElems = document.querySelectorAll('.gallery-top__img');
			let galleryThumbsImgElems = document.querySelectorAll('.gallery-thumbs__img');
			let widthCardLeftImg = document.querySelector('.card__left').clientWidth;
			let widthSwiperSlideThumbs = document.querySelector('.gallery-thumbs .swiper-slide').clientWidth;

			galleryTopImgElems.forEach(function (image) {
				image.style.height = `${widthCardLeftImg * 0.92}px`;
			});

			galleryThumbsImgElems.forEach(function (image) {
				image.style.height = `${widthSwiperSlideThumbs * 1.116}px`;
			});
		}

		/**
		 * Метод добавляет окну браузера слушатель события изменения размеров
		 */
		addWindowResizeListener(){
			let windowWidth = window.innerWidth;
			let resizeTimeout = null;

			window.addEventListener('resize', () => {
				clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(function () {
					let newWindowWidth = window.innerWidth;
		
					if (newWindowWidth !== windowWidth) {
						windowWidth = newWindowWidth;

						let gallery = new Gallery();
						gallery.galleryTop.controller.control = gallery.galleryThumbs;
						gallery.galleryThumbs.controller.control = gallery.galleryTop;
						gallery.setImagesHeight();
					}
				}, 200);
			});
		}
	}

	window.addEventListener('load', () => {
		let gallery = new Gallery();

		gallery.galleryTop.controller.control = gallery.galleryThumbs;
		gallery.galleryThumbs.controller.control = gallery.galleryTop;
		gallery.setImagesHeight();

		gallery.addWindowResizeListener();
	});

})();