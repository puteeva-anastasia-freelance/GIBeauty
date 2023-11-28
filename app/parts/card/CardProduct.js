(function () {
	"use strict";

	/**
	 * Класс управляет карточкой товара
	 */
	class CardProduct {
		constructor() {
			this.moreEl = document.querySelector('.card__more');
			this.detailedEl = document.querySelector('.card__detailed');
			this.moreIconEl = this.moreEl.querySelector('.card__more-icon');
		}

		/**
		 * Инициализация карточки товара
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		init(products) {
			let id = location.hash.replace(/#/, '');
			this.renderGallery();
			this.addWidthResizeListener();
			this.addButtonDetailedClickListeners();
			if (products[id].category != 'certificates') {
				this.changeStyleAndTextElements(document.querySelector(`[data-name="category-${products[id].category}"]`), products[id]);
			} else {
				this.changeTextBreadcrumbs('', products[id]);
			}
			this.addButtonBuyClickListeners();
		}

		/**
		 * Метод добавляет кнопке "Купить" слушатель события клика
		 */
		addButtonBuyClickListeners() {
			let buttonBuyEl = document.querySelector('.card__buy-button');
			let basketQuantityEl = document.querySelector('.main-header__basket-quantity');
			let linkInBasketEl = document.querySelector('.card__in-basket-link');
			let textInBasketEl = document.querySelector('.card__in-basket');

			buttonBuyEl.addEventListener('click', () => {
				let quantitySelectedProducts = document.querySelector('.choose-quantity__input').value;

				basketQuantityEl.textContent = quantitySelectedProducts;
				textInBasketEl.classList.remove('hidden');
				textInBasketEl.textContent = 'Товары добавлены в корзину!';
				linkInBasketEl.textContent = 'Перейти в корзину';
			});
		}

		/**
		 * Метод изменяет стиль и текст элементов
		 * @param {HTMLAnchorElement} button кнопка категории, которая относится к выбранному товару
		 * @param {ProductDTO} product объект с информацией о товаре
		 */
		changeStyleAndTextElements(button, product) {
			this.changeStyleBtn(button);
			this.changeTextBreadcrumbs(button.textContent, product);
		}

		/**
		 * Метод изменяет цвет кнопки, которая относится к нужной категории
		 * @param {HTMLAnchorElement} button кнопка, которой необходимо изменить цвет
		 */
		changeStyleBtn(button) {
			if (document.querySelector('.shop-category__btn.accent')) {
				document.querySelector('.accent').classList.remove('accent');
			}
			button.classList.add('accent');
		}

		/**
		 * Метод изменяет навигационный путь к категории товара 
		 * @param {string} buttonTxt текст кнопки
		 * @param {ProductDTO} product объект с информацией о товаре
		 */
		changeTextBreadcrumbs(buttonTxt, product) {
			let breadcrumbsLinks = document.querySelectorAll('.breadcrumbs__link');
			let cardTitleTxt = document.querySelector('.card__title').textContent;

			if (product.category == 'certificates') {
				breadcrumbsLinks[breadcrumbsLinks.length - 2].textContent = 'Подарочные сертификаты';
				breadcrumbsLinks[breadcrumbsLinks.length - 2].href = `certificates.html`;
			} else {
				breadcrumbsLinks[breadcrumbsLinks.length - 2].textContent = buttonTxt;
				breadcrumbsLinks[breadcrumbsLinks.length - 2].href = `shop.html#${product.category}`;
			}
			breadcrumbsLinks[breadcrumbsLinks.length - 1].textContent = cardTitleTxt;
			breadcrumbsLinks[breadcrumbsLinks.length - 1].href = `product-card.html#${product.id}`;
		}

		/**
		 * Метод отрисовывает галерею с карточками товаров
		 */
		renderGallery() {
			this.setDistanceBottomForArrowThumbs();
		}

		/**
		 * Метод добавляет слушатель события изменения ширины экрана
		 */
		addWidthResizeListener() {
			window.addEventListener('resize', () => {
				this.renderGallery();
			});
		}

		/**
		 * Установить расстояние от нижнего края для стрелок слайдера на середине миниатюр фотографий товара
		 */
		setDistanceBottomForArrowThumbs() {

			let heightGalleryThumbsEl = document.querySelector('.gallery-thumbs').clientHeight;
			let arrowPrevThumbsEl = document.querySelector('.swiper-button-prev-thumbs');
			let arrowNextThumbsEl = document.querySelector('.swiper-button-next-thumbs');
			if (arrowPrevThumbsEl && arrowNextThumbsEl) {
				let heightBtnPrevThumbsEl = arrowPrevThumbsEl.clientHeight;
				let distanceBottom = (heightGalleryThumbsEl - heightBtnPrevThumbsEl) / 2;

				arrowPrevThumbsEl.style.bottom = `${distanceBottom}px`;
				arrowNextThumbsEl.style.bottom = `${distanceBottom}px`;
			}
		}

		/**
		 * Метод добавляет кнопке "Подробнее" слушатель события
		 */
		addButtonDetailedClickListeners() {
			this.moreEl.addEventListener('click', () => {
				this.detailedEl.classList.toggle('open');
				this.moreIconEl.classList.toggle('down');
			});
		}
	}

	window.addEventListener('load', () => {
		let cardProduct = new CardProduct();
		cardProduct.init(products);
	});
})();