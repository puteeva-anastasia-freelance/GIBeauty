(function () {
	"use strict";

	/**
	 * Класс для отрисовки рекомендуемых товаров
	 */
	class RenderRecommendedProduct {
		constructor() {
			this.pathToProductsImages = 'img/dist/products';
			this.wrapEl = document.querySelector('.recommendation');
			this.swiperWrapperEl = document.querySelector('#recommendation-slider .swiper-wrapper');
			this.quantityProductsOnPage = 4;
		}

		/**
		 * Метод отрисовывает рекомендуемые товары
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		renderProducts(products) {
			this.insertProductsIntoPage(products);
		}

		/**
		 * Метод вставляет карточки рекомендуемых товаров на страницу
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		insertProductsIntoPage(products) {
			//Получаем хэш адреса страницы 
			let hashPage = +window.location.hash.substring(1);
			let arrIndexes = [];
			let productsMarkup = '';
			let productsMarkupForSlider = '';

			while (arrIndexes.length < this.quantityProductsOnPage) {
				let randomNumber = Math.floor(Math.random() * products.length);
				if (arrIndexes.indexOf(randomNumber) === -1) {
					arrIndexes.push(randomNumber);
				}
				if (arrIndexes.indexOf(hashPage) !== -1) {
					arrIndexes.splice(arrIndexes.indexOf(hashPage), 1);
				}
			}

			for (let index of arrIndexes) {
				productsMarkup += this.getProductMarkup(products[index]);
				productsMarkupForSlider += this.getProductMarkupForSlider(products[index]);
			}

			this.wrapEl.insertAdjacentHTML('beforeend', productsMarkup);
			this.swiperWrapperEl.insertAdjacentHTML('beforeend', productsMarkupForSlider);
		}

		/**
		 * Этот метод получает разметку товара
		 * @param {ProductDTO} product объект с информацией о товаре
		 * @returns {string} html-разметка карточки товара 
		 */
		getProductMarkup(product) {
			return `<a href="product-card.html#${product.id}" class="recommendation__item">
			<img src="${this.pathToProductsImages}/${product.category}/${product.imageSmall}" alt="Фотография рекомендуемого товара" class="recommendation__img">
			<span class="recommendation__subtitle">${product.name}</span>
		</a>`;
		}

		/**
		 * Метод форматирует число, разбивая его на разряды, и добавляет ему знак валюты
		 * @param {number} number число, которое нужно отформатировать
		 * @returns {string} отформатированное число
		 */
		formatNumberAndAddCurrencySign(number) {
			return `${number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`;
		}

		/**
		 * Метод получает разметку цены товара
		 * @param {ProductDTO} product объект с информацией о товаре 
		 * @returns {string} html-разметка цены товара, разделенная пробелами по тысячам
		 */
		getPriceProductMarkup(product) {
			let price = this.formatNumberAndAddCurrencySign(product.price);
			return `<span class="recommendation__price">${price}</span>`;
		}

		/**
		 * Метод получает разметку старой цены товара
		 * @param {ProductDTO} product объект с информацией о товаре 
		 * @returns {string} html-разметка старой цены товара, разделенная пробелами по тысячам, если есть старая цена 
		 */
		getPriceOldProductMarkup(product) {
			if (product.priceOld != null) {
				let priceOld = this.formatNumberAndAddCurrencySign(product.priceOld);
				return `<span class="recommendation__price-old">${priceOld}</span>`;
			} else {
				return '';
			}
		}

		/**
		 * Этот метод получает разметку товара для слайдера
		 * @param {ProductDTO} product объект с информацией о товаре
		 * @returns {string} html-разметка карточки товара
		 */
		getProductMarkupForSlider(product) {
			//Метод получает разметку цены товара
			let priceMarkup = this.getPriceProductMarkup(product);

			//Метод получает разметку старой цены товара
			let priceOldMarkup = this.getPriceOldProductMarkup(product);

			return `<div class="swiper-slide">
			<a href="product-card.html#${product.id}" class="recommendation__item">
				<img src="${this.pathToProductsImages}/${product.category}/${product.imageSmall}" alt="${product.name}" class="recommendation__img">
				<span class="recommendation__subtitle recommendation__subtitle_center">${product.name}</span>
				${priceMarkup}
				${priceOldMarkup}
			</a>
		</div>`
		}

		/**
		 * Метод перезагружает страницу при изменении хэша страницы
		 */
		reloadPage() {
			window.addEventListener('hashchange', () => {
				window.location.reload();
				window.scrollTo(0, 0);
			});
		}
	}

	window.addEventListener('load', () => {
		let renderRecommendedProduct = new RenderRecommendedProduct();
		renderRecommendedProduct.renderProducts(products);
		renderRecommendedProduct.reloadPage();
	});
})();