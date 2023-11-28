(function () {
	"use strict";

	/**
	 * Данный класс управляет отзывами клиентов
	 */
	class Reviews {
		constructor() {
			this.settings = {
				speed: 500,
				loop: true,
				autoHeight: true,
				pagination: {
					el: '.reviews__pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.reviews__button-next',
					prevEl: '.reviews__button-prev',
				},
				breakpoints: {
					320: {
						slidesPerView: 2,
						initialSlide: 1
					},
					576: {
						slidesPerView: 4,
					}
				}
			};

			this.reviewsSwiper = new Swiper('#reviews-slider', this.settings);
		}
	}

	window.addEventListener('load', () => {
		let reviews = new Reviews();
	});


})();