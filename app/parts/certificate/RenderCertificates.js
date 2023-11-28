(function () {
	'use strict';

	/**
	 * Класс для отрисовки подарочных сертификатов
	 */
	class RenderCertificates {
		constructor() {
			this.pathToProductsImages = 'img/dist/products';
			this.wrapEl = document.querySelector('.certificate__wrap');
		}

		/**
		 * Метод вставляет сертификаты на страницу 
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		insertCertificatesIntoPage(products) {
			let productsMarkup = '';

			for (let product of products) {

				if (product.category == 'certificates') {
					productsMarkup += this.getProductMarkup(product);
				}
			}
			this.wrapEl.insertAdjacentHTML('beforeend', productsMarkup);
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
		 * Этот метод принимает один из объектов из массива products в файле products.js
		 * @param {ProductDTO} product объект с информацией о сертификате
		 * @returns {string} html-разметка карточки сертификата
		 */
		getProductMarkup(product) {
			return `<a href="product-card.html#${product.id}" class="certificate__item">
			<picture class="certificate__img">
				<source srcset="${this.pathToProductsImages}/${product.category}/${product.image}" media="(min-width: 576px)" width="436" height="400">
				<source srcset="${this.pathToProductsImages}/${product.category}/${product.imageSmall}" media="(min-width: 0)" width="206" height="189">
				<img src="${this.pathToProductsImages}/${product.category}/${product.imageSmall}" alt="${product.name} ${this.formatNumberAndAddCurrencySign(product.price)}" width="206" height="189">
			</picture>
			<span class="certificate__item-txt">${product.name}<br>${this.formatNumberAndAddCurrencySign(product.price)}</span>
		</a>`;
		}
	}

	window.addEventListener('load', () => {
		let renderCertificates = new RenderCertificates();
		renderCertificates.insertCertificatesIntoPage(products);
	});

})();