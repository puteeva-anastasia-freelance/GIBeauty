(function () {
	"use strict";

	/**
	 * Данный класс управляет рекомендованными товарами для пользователя
	 */
	class RecommendedProduct {
		constructor() {
			this.settings = {
				speed: 500,
				loop: true,
				loopedSlides: 4,
				navigation: {
					nextEl: '.recommendation__swiper-button-next',
					prevEl: '.recommendation__swiper-button-prev',
				},
				breakpoints: {
					320: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					360: {
						slidesPerView: 2,
						spaceBetween: 25,
					},
					576: {
						slidesPerView: 3,
						spaceBetween: 25,
					},
					768: {
						slidesPerView: 4,
						spaceBetween: 25,
					},
				}
			};

			this.recommendedSwiper = new Swiper('#recommendation-slider', this.settings);
		}

		/**
		 * Метод позволяет задавать рекомендуемым товарам высоту в зависимости от ширины картинки
		 */
		setImagesHeight() {
			let recommendationImgElems = document.querySelectorAll('.recommendation__img');
			let recommendationItemWidth = document.querySelector('.recommendation__item').clientWidth;
			let widthSlide = document.querySelector('.recommendation__swiper .swiper-slide').clientWidth;

			recommendationImgElems.forEach(function (image) {
				if (window.innerWidth <= 992) {
					image.style.height = `${widthSlide * 0.929}px`;
				} else {
					image.style.height = `${recommendationItemWidth * 0.917}px`;
				}
			});
		}
	}

	window.addEventListener('load', () => {
		let recommendedProduct = new RecommendedProduct();
		recommendedProduct.setImagesHeight();
		window.addEventListener('resize', () => {
			recommendedProduct = new RecommendedProduct();
			recommendedProduct.setImagesHeight();
		});

	});
})();