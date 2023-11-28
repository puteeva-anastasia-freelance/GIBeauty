(function () {
	"use strict";

	/**
	 * Данный класс управляет баннерами
	 */
	class Banners {
		constructor() {
			this.settings = {
				speed: 1200,
				loop: true,
				autoplay: {
					delay: 5000,
				},
				slidesPerView: 'auto',
				pagination: {
					el: '.banners__pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.banners__button-next',
					prevEl: '.banners__button-prev',
				},
			};

			this.bannersSwiper = new Swiper('#banners-slider', this.settings);

			this.slider = document.querySelector("#banners-slider");
		}

		/**
		 * Метод делает одинаковую высоту для всех баннеров
		 */
		doAutoHeight() {
			this.bannersSwiper.destroy();
			this.bannersSwiper = new Swiper('#banners-slider', this.settings);
			this.addSliderEventHandlers();
		}

		/**
		 * Метод добавляет слайдеру слушатель событий наведения на слайды
		 */
		addSliderEventHandlers() {
			this.slider.addEventListener('mouseenter', () => {
				this.bannersSwiper.autoplay.stop();
			});
			this.slider.addEventListener('mouseleave', () => {
				this.bannersSwiper.autoplay.start();
			});
		}
	}

	window.addEventListener('load', () => {
		let banners = new Banners();
		banners.doAutoHeight();
	});
})();