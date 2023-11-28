(function () {
	'use strict';

	/**
	 * Класс для отрисовки карточек товаров
	 */
	class ProductsCards {
		constructor() {
			this.pathToProductsImages = 'img/dist/products';
			this.wrapEl = document.querySelector('.shop__wrap');
		}

		/**
		 * Метод устанавливает одинаковую высоту всем элементам, добавляет слушатели события 
		 */
		setSameHeightAllElementsAndAddEventListeners() {
			this.setSameHeightAllElements();
			this.addWidthResizeListener();
		}

		/**
		 * Метод устанавливает одинаковую высоту всем элементам, добавляет слушатель события изменения ширины экрана
		 */
		setSameHeightAllElements() {
			this.setSameHeightElements('.shop__img');
			this.setSameHeightElements('.shop__subtitle');
			this.setSameHeightElements('.shop__txt');
		}

		/**
		 * Метод добавляет слушатель события изменения ширины экрана
		 */
		addWidthResizeListener() {
			window.addEventListener('resize', () => {
				this.setSameHeightAllElements();
			});
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
			return `<span class="shop__price">${price}</span>`;
		}

		/**
		 * Метод получает разметку старой цены товара
		 * @param {ProductDTO} product объект с информацией о товаре 
		 * @returns {string} html-разметка старой цены товара, разделенная пробелами по тысячам, если есть старая цена 
		 */
		getPriceOldProductMarkup(product) {
			if (product.priceOld != null) {
				let priceOld = this.formatNumberAndAddCurrencySign(product.priceOld);
				return `<span class="shop__price-old">${priceOld}</span>`;
			} else {
				return '';
			}
		}

		/**
		 * Метод получает разметку, что товара нет в наличии
		 * @param {ProductDTO} product объект с информацией о товаре 
		 * @returns {string} html-разметка, что товара нет в наличии
		 */
		getOutOfStockMarkup(product) {
			if (product.quantity == 0) {
				return `<span class="shop__unavailable">Нет в наличии</span>`;
			}
			return '';
		}

		/**
		 * Этот метод принимает один из объектов из массива products в файле products.js
		 * @param {ProductDTO} product объект с информацией о товаре
		 * @returns {string} html-разметка карточки товара 
		 */
		getProductMarkup(product) {
			//Метод получает разметку цены товара
			let priceMarkup = this.getPriceProductMarkup(product);

			//Метод получает разметку старой цены товара
			let priceOldMarkup = this.getPriceOldProductMarkup(product);

			//Метод получает разметку, что товара нет в наличии
			let outOfStockMarkup = this.getOutOfStockMarkup(product);

			return `<div class="shop__item" data-name="${product.name}">
					<a href="product-card.html#${product.id}" class="shop__link">	
						<picture>
							<source srcset="${this.pathToProductsImages}/${product.category}/${product.imageMiddle}" media="(min-width: 576px)" width="436" height="402">
							<source srcset="${this.pathToProductsImages}/${product.category}/${product.imageSmall}" media="(min-width: 0)" width="250" height="231">
							<img class="shop__img" src="${this.pathToProductsImages}/${product.category}/${product.imageSmall}" alt="Фотография товара" width="250" height="231">
						</picture>
						<h2 class="h4 shop__subtitle">${product.name}</h2>
					</a>
					<p class="shop__txt">${product.shortDescription}</p>
					${priceMarkup}
					${priceOldMarkup}
					${outOfStockMarkup}
				</div>`;
		}

		/**
		 * Метод вставляет карточки товаров на страницу и устанавливает одинаковую высоту всем элементам
		 * @param {string} category категория товаров
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		insertProductsIntoPage(category, products) {
			let productsMarkup = '';
			this.wrapEl.innerHTML = '';

			for (let product of products) {

				if (product.category == category) {
					productsMarkup += this.getProductMarkup(product);
				}

				if (category == 'discount' && product.priceOld != null) {
					productsMarkup += this.getProductMarkup(product);
				}
			}

			this.wrapEl.insertAdjacentHTML('beforeend', productsMarkup);
			this.setSameHeightAllElementsAndAddEventListeners();
		}

		/**
		 * Метод изменяет цвет кнопки, которая относится к нужной категории
		 * @param {HTMLAnchorElement} button кнопка, которой необходимо изменить цвет
		 */
		changeStyleBtn(button) {
			if (document.querySelector('.shop-category__btn.accent')) {
				document.querySelector('.shop-category__btn.accent').classList.remove('accent');
			}
			button.classList.add('accent');
		}

		/**
		 * Метод изменяет навигационный путь к категории товара и заголовок страницы
		 * @param {string} buttonTxt текст кнопки
		 * @param {string} hashPage хэш адреса страницы
		 */
		changeTextBreadcrumbsAndTitle(buttonTxt, hashPage) {
			let breadcrumbsLinks = document.querySelectorAll('.breadcrumbs__link');

			breadcrumbsLinks[breadcrumbsLinks.length - 1].textContent = buttonTxt;
			breadcrumbsLinks[breadcrumbsLinks.length - 1].href = `shop.html#${hashPage}`;

			document.querySelector('.shop__title').textContent = buttonTxt;
		}

		/**
		 * Метод изменяет стиль и текст элементов
		 * @param {HTMLAnchorElement} button кнопка, которая относится к данной категории
		 * @param {string} hashPage хэш адреса страницы
		 */
		changeStyleAndTextElements(button, hashPage) {
			this.changeStyleBtn(button);
			this.changeTextBreadcrumbsAndTitle(button.textContent, hashPage);
		}

		/**
		 * Находим категорию, которую необходимо отрисовать, если хэш-адреса страницы пустой, то отрисовываем категорию sets
		 * @param {string} hashPage хэш адреса страницы
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		findCategoryForRender(hashPage, products) {
			if (location.hash.length == 0) {
				this.insertProductsIntoPage('sets', products);
				this.changeStyleAndTextElements(document.querySelector(`[data-name="category-sets"]`), hashPage);
			} else if (document.querySelector(`[data-name="category-${hashPage}"]`) == null) {
				window.location.href = '/';
			} else {
				this.insertProductsIntoPage(hashPage, products);
				this.changeStyleAndTextElements(document.querySelector(`[data-name="category-${hashPage}"]`), hashPage);
			}
		}

		/**
		 * Отрисовываем категорию товаров
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		renderCategoryProducts(products) {
			//Получаем хэш адреса страницы 
			let hashPage = window.location.hash.substring(1);

			this.findCategoryForRender(hashPage, products);

			window.addEventListener('hashchange', () => {
				let hashPage = window.location.hash.substring(1);
				this.findCategoryForRender(hashPage, products);
			})
		}

		/**
		 * Метод позволяет задавать одинаковую высоту DOM-элементам, находящимся в одном ряду контейнера
		 * @param {string} itemClass класс DOM-элемента
		 */
		setSameHeightElements(itemClass) {
			let menuItems = document.querySelectorAll(itemClass);
			let top = menuItems[0].getBoundingClientRect().top;

			let arrHeight = [];
			let arrItems = [];
			for (let i = 0; i < menuItems.length; i++) {
				menuItems[i].style.height = 'auto';
			}
			for (let i = 0; i < menuItems.length; i++) {
				if (top != menuItems[i].getBoundingClientRect().top) {
					arrHeight.sort(function (a, b) {
						return b - a
					});
					for (let j = 0; j < arrItems.length; j++) {
						arrItems[j].style.height = 'auto';
						arrItems[j].style.height = arrHeight[0] + 'px';
					}
					top = menuItems[i].getBoundingClientRect().top;
					arrHeight.length = arrItems.length = 0;
					i = i - 1;
					continue;
				}
				arrHeight[arrHeight.length] = menuItems[i].offsetHeight;
				arrItems[arrItems.length] = menuItems[i];
			}
			arrHeight.sort(function (a, b) {
				return b - a
			});
			for (let j = 0; j < arrItems.length; j++) {
				arrItems[j].style.height = 'auto';
				arrItems[j].style.height = arrHeight[0] + 'px';
			}
		}
	}

	window.addEventListener('load', () => {
		let productsCards = new ProductsCards();
		productsCards.renderCategoryProducts(products);
	});
})();