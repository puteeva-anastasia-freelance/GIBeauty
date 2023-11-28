(function () {
	'use strict';

	/**
	 * Класс для отрисовки корзины с товарами
	 */
	class Basket {
		constructor() {
			this.pathToProductsImages = 'img/dist/products';

			//Товары в корзине
			this.productsInBasket = [{
					id: 11,
					quantity: 1
				},
				{
					id: 6,
					quantity: 3
				},
				{
					id: 15,
					quantity: 2
				},
			];

			this.costPaidDelivery = 2300;
			this.minSummaProductsForFreeDelivery = 20000;
			this.totalSummaProducts = 0;
			this.costDelivery = 0;

			this.inTotalSummaEl = document.querySelector('#inTotalSumma');
			this.promocodeInputEl = document.querySelector('.basket__promocode-input');
			this.linkInShopEl = document.querySelector('.transitions__link-in-shop');
			this.promocodeButtonEl = document.querySelector('.basket__promocode-button');
			this.promocodeTextEl = document.querySelector('.basket__promocode-txt');
			this.inTotalSummaWithSaleEl = document.querySelector('#inTotalSummaWithSale');
		}

		/**
		 * Метод отрисовывает корзину с товарами
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		renderBasket(products) {
			this.renderCardProduct(this.productsInBasket, products);

			this.totalSummaProducts = this.setTotalQuantityAndSummaProducts(products);
			this.costDelivery = this.setCostDelivery(this.totalSummaProducts);
			this.inTotalSumma = this.setInTotalSumma(this.totalSummaProducts, this.costDelivery);

			this.addInputQuantityChangeListeners(products);
			this.addButtonPutAwayClickListeners(products);
			this.addPromocodeInputFocusListeners();
			this.addButtonSendPromocodeClickListeners(promocodes, products);
		}

		/**
		 * Устанавливаем итого
		 * @param {number} totalSummaProducts общая сумма товаров
		 * @param {number} costDelivery стоимость доставки
		 * @returns {number} inTotalSumma итого
		 */
		setInTotalSumma(totalSummaProducts, costDelivery) {
			let inTotalSumma = totalSummaProducts + costDelivery;
			this.inTotalSummaEl.textContent = this.formatNumberAndAddCurrencySign(inTotalSumma);
			return inTotalSumma;
		}

		/**
		 * Устанавливаем стоимость доставки
		 * @param {number} totalSummaProducts общая сумма товаров
		 * @returns {number} costDelivery стоимость доставки
		 */
		setCostDelivery(totalSummaProducts) {
			let costDelivery = 0;
			let costDeliveryEl = document.querySelector('#costDelivery');

			if ((totalSummaProducts + this.costPaidDelivery) >= this.minSummaProductsForFreeDelivery) {
				costDelivery = 0;
			} else {
				costDelivery = this.costPaidDelivery;
			}

			costDeliveryEl.textContent = this.formatNumberAndAddCurrencySign(costDelivery);

			return costDelivery;
		}

		/**
		 * Добавляем кнопке "Убрать" слушатель события клика
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		addButtonPutAwayClickListeners(products) {
			let basketRowElems = document.querySelectorAll('.basket__row');
			let putAwayButtonElems = [];

			for (let i = 0; i < basketRowElems.length; i++) {
				putAwayButtonElems[i] = basketRowElems[i].querySelectorAll('.basket__put-away');
				putAwayButtonElems[i].forEach((button) => {
					button.addEventListener('click', (event) => {
						let productId = +event.currentTarget.closest('.basket__row').dataset.productId;
						let index = this.productsInBasket.findIndex(n => n.id === productId);
						if (index !== -1) {
							this.productsInBasket.splice(index, 1);
						}
						basketRowElems[i].remove();
						this.isBasketEmpty();
						this.totalSummaProducts = this.setTotalQuantityAndSummaProducts(products);
						this.costDelivery = this.setCostDelivery(this.totalSummaProducts);
						this.inTotalSumma = this.setInTotalSumma(this.totalSummaProducts, this.costDelivery);
					})
				});
			}
		}

		/**
		 * Метод проверяет пустая ли корзина
		 */
		isBasketEmpty() {
			if (this.productsInBasket.length == 0) {
				window.location.href = 'index.html';
			}
		}

		/**
		 * Метод добавляет инпуту с количеством товаров слушатель события изменения
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		addInputQuantityChangeListeners(products) {
			let quantityInputElems = [];
			let basketRowElems = document.querySelectorAll('.basket__row');

			for (let i = 0; i < basketRowElems.length; i++) {
				quantityInputElems[i] = basketRowElems[i].querySelectorAll('.choose-quantity__input');
				quantityInputElems[i].forEach((input) => {
					input.addEventListener('input', (event) => {
						let productId = +event.currentTarget.closest('.basket__row').dataset.productId;
						let index = this.productsInBasket.findIndex(n => n.id === productId);
						let maxCountProducts = +event.currentTarget.dataset.maxCount;
						if (event.currentTarget.value > maxCountProducts) {
							this.productsInBasket[index].quantity = maxCountProducts;
						} else if (event.currentTarget.value == 0) {
							this.productsInBasket[index].quantity = 1;
						} else {
							this.productsInBasket[index].quantity = +event.currentTarget.value;
						}
						this.totalSummaProducts = this.setTotalQuantityAndSummaProducts(products);
						this.costDelivery = this.setCostDelivery(this.totalSummaProducts);
						this.inTotalSumma = this.setInTotalSumma(this.totalSummaProducts, this.costDelivery);
					});
				});
			}
		}

		/**
		 * Метод устанавливает общее количество товаров в корзине и общую сумму
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 * @returns {number} totalSummaProducts общая сумма товаров
		 */
		setTotalQuantityAndSummaProducts(products) {
			let totalSummaProducts = 0;
			let quantity = [];
			let summa = [];

			let basketRowElems = document.querySelectorAll('.basket__row');

			for (let i = 0; i < basketRowElems.length; i++) {
				this.getSummaProducts(i, products);
				quantity[i] = this.productsInBasket[i].quantity;
				summa[i] = this.productsInBasket[i].summa;
			}

			this.getTotalQuantityProducts(quantity);

			totalSummaProducts = this.getTotalSummaProducts(summa);

			return totalSummaProducts;
		}

		/**
		 * Метод получает сумму товаров в корзине
		 * @param {number} i номер товара в корзине
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 * @returns {number} summa сумма товаров
		 */
		getSummaProducts(i, products) {
			let quantity = this.productsInBasket[i].quantity;
			let id = this.productsInBasket[i].id;
			let row = document.querySelectorAll('.basket__row')[i];
			let summaElems = row.querySelectorAll('.basket__summa');
			let summa = quantity * products[id].price;

			this.productsInBasket[i].summa = summa;

			summaElems.forEach((summaEl) => {
				summaEl.textContent = this.formatNumberAndAddCurrencySign(summa);
			});

			return summa;
		}

		/**
		 * Метод получает общее количество товаров в корзине и выводит их в корзине в хедере
		 * @param {Array} quantity массив с количеством товаров на каждой строке
		 */
		getTotalQuantityProducts(quantity) {
			let totalQuantityProducts = 0;
			let basketQuantityEl = document.querySelector('.main-header__basket-quantity');

			for (let value of quantity) {
				totalQuantityProducts += value;
			}

			basketQuantityEl.textContent = totalQuantityProducts;
		}

		/**
		 * Метод получает общую сумму товаров
		 * @param {Array} summaProductsArray массив, где каждый элемент массива это сумма товаров
		 * @returns {number} totalSummaProducts общая сумма товаров
		 */
		getTotalSummaProducts(summaProductsArray) {
			let totalSummaProducts = 0;
			let totalSummaProductsEl = document.querySelector('#totalSummaProducts');

			for (let value of summaProductsArray) {
				totalSummaProducts += value;
			}

			totalSummaProductsEl.textContent = this.formatNumberAndAddCurrencySign(totalSummaProducts);

			return totalSummaProducts;
		}


		/**
		 * Метод получает разметку цены товара
		 * @param {ProductDTO} product объект с информацией о товаре 
		 * @returns {string} html-разметка цены товара, разделенная пробелами по тысячам
		 */
		getPriceProductMarkup(product) {
			let price = this.formatNumberAndAddCurrencySign(product.price);
			return `<span class="basket__price">${price}</span>	`;
		}

		/**
		 * Метод получает разметку старой цены товара
		 * @param {ProductDTO} product объект с информацией о товаре 
		 * @returns {string} html-разметка старой цены товара, разделенная пробелами по тысячам, если есть старая цена 
		 */
		getPriceOldProductMarkup(product) {
			if (product.priceOld != null) {
				let priceOld = this.formatNumberAndAddCurrencySign(product.priceOld);
				return `<span class="basket__price-old">${priceOld}</span>`;
			} else {
				return '';
			}
		}

		/**
		 * Метод отрисовывает карточку товара на странице
		 * @param {Array} productsInBasket массив с товарами в корзине
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		renderCardProduct(productsInBasket, products) {

			for (let i = 0; i < productsInBasket.length; i++) {
				let product = products[productsInBasket[i].id];
				let idProduct = productsInBasket[i].id;
				let quantityProduct = productsInBasket[i].quantity;

				//Метод получает разметку цены товара
				let priceMarkup = this.getPriceProductMarkup(product);

				//Метод получает разметку старой цены товара
				let priceOldMarkup = this.getPriceOldProductMarkup(product);

				let productMarkup = `<div class="basket__row" data-product-id="${idProduct}">
					<div class="basket__col-1">
					<img src="${this.pathToProductsImages}/${product.category}/${product.imageSmall}" alt="${product.name}" width="279" height="257" class="basket__img">
					<button type="button" class="basket__put-away basket__put-away_bottom">
						<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="basket__put-away-icon">
							<line x1="12.3536" y1="0.353553" x2="0.353554" y2="12.3536" stroke="black"/>
							<line x1="0.353553" y1="0.646447" x2="12.3536" y2="12.6464" stroke="black"/>
						</svg>
						убрать	
					</button>
					</div>
					<div class="basket__col-2">
					<div>
						<a href="product-card.html#${idProduct}" class="h5 basket__name">${product.name}</a>
						<p class="basket__desc">${product.shortDescription}</p>
					</div>
					<button type="button" class="basket__put-away">
						<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="basket__put-away-icon">
							<line x1="12.3536" y1="0.353553" x2="0.353554" y2="12.3536" stroke="black"/>
							<line x1="0.353553" y1="0.646447" x2="12.3536" y2="12.6464" stroke="black"/>
						</svg>
						убрать	
					</button>
					<div class="basket__col-7">
						${priceMarkup}
						${priceOldMarkup}
					</div>
					<div class="basket__col-8">
						<div class="choose-quantity basket__choose-quantity">
							<button type="button" class="choose-quantity__button minus">-</button>
							<input type="text" class="basket__choose-quantity-input choose-quantity__input" value="${quantityProduct}" data-max-count="${product.quantity}" aria-label="Поле для ввода количества товаров">
							<button type="button" class="choose-quantity__button plus">+</button>
						</div>
						<div class="basket__col-6">
							<span class="basket__subtitle">сумма:</span>	
							<span class="basket__summa"></span>	
							<span class="basket__summa-with-sale"></span>	
						</div>
					</div>
					</div>
					<div class="basket__col-3">
					${priceMarkup}
					${priceOldMarkup}
					</div>
					<div class="basket__col-4">
					<div class="choose-quantity basket__choose-quantity">
						<button type="button" class="choose-quantity__button minus">-</button>
						<input type="text" class="basket__choose-quantity-input choose-quantity__input" value="${quantityProduct}" data-max-count="${product.quantity}" aria-label="Поле для ввода количества товаров">
						<button type="button" class="choose-quantity__button plus">+</button>
					</div>
					<div class="basket__col-6">
						<span class="basket__subtitle">сумма:</span>	
						<span class="basket__summa"></span>	
						<span class="basket__summa-with-sale"></span>	
					</div>
					</div>
					<div class="basket__col-5">
					<span class="basket__summa"></span>	
					<span class="basket__summa-with-sale"></span>	
					</div>
					</div>`;

				document.querySelector('.basket__table').insertAdjacentHTML('beforeend', productMarkup);
			}
		}

		/**
		 * Метод изменяет атрибуты элементов на странице
		 */
		changeAttributesElements() {
			this.changeTextPlaceholderPromocode(window.innerWidth);
			this.changeTextTransitionsLink(window.innerWidth);
			this.addWidthResizeListener();
		}

		/**
		 * Метод добавляет слушатель события изменения ширины экрана
		 */
		addWidthResizeListener() {
			let windowWidth = window.innerWidth;

			window.addEventListener('resize', () => {
				let newWindowWidth = window.innerWidth;

				if (newWindowWidth != windowWidth) {
					windowWidth = newWindowWidth;
					this.changeTextPlaceholderPromocode(windowWidth);
					this.changeTextTransitionsLink(windowWidth);
				}
			});
		}

		/**
		 * Метод изменяет текст плейсхолдера в инпуте промокода в зависимости от ширины экрана
		 * @param {number} windowWidth ширина экрана
		 */
		changeTextPlaceholderPromocode(windowWidth) {
			let textPlaceholder = '';

			if (windowWidth <= 768) {
				textPlaceholder = "Введите скидочный код";
			} else if (windowWidth <= 1600) {
				textPlaceholder = "Введите ваш скидочный код";
			} else {
				textPlaceholder = "Введите ваш скидочный код, чтобы получить скидку";
			}

			this.setTextPlaceholder(textPlaceholder);
		}

		/**
		 * Метод устанавливает нужный текст плейсхолдеру
		 * @param {string} textPlaceholder текст в плейсхолдере
		 */
		setTextPlaceholder(textPlaceholder) {
			this.promocodeInputEl.setAttribute("placeholder", textPlaceholder);
		}

		/**
		 * Метод изменяет текст кнопки перехода на страницу "Каталог товаров" в зависимости от ширины экрана
		 * @param {number} windowWidth ширина экрана
		 */
		changeTextTransitionsLink(windowWidth) {
			if (windowWidth <= 450) {
				this.linkInShopEl.text = 'Вернуться';
			} else {
				this.linkInShopEl.text = 'Вернуться в магазин';
			}
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
		 * Метод отрисовывает процент скидки на все неакционные товары
		 * @param {number | null} priceOld старая цена товара
		 * @param {number} i номер товара в корзине
		 * @param {number} summaWithSale сумма товаров со скидкой
		 * @param {HTMLSpanElement[]} summaElems html-элементы, в которых содержимое сумма товаров
		 * @param {HTMLSpanElement[]} summaWithSaleElems html-элементы, в которых содержимое сумма товаров со скидкой
		 * @param {HTMLSpanElement[]} summaWithoutSaleElems html-элементы, в которых содержимое сумма товаров без скидки
		 * @param {number} summaProduct сумма товаров
		 */
		renderPercentSale(priceOld, i, summaWithSale, summaElems, summaWithSaleElems, summaWithoutSaleElems, summaProduct) {
			if (priceOld == null) {
				this.productsInBasket[i].summa = summaWithSale;
				summaElems.forEach((summaEl) => {
					summaEl.classList.add('basket__summa-without-sale');
					summaEl.classList.remove('basket__summa');
				});
				summaWithSaleElems.forEach((summaWithSaleEl) => {
					summaWithSaleEl.textContent = this.formatNumberAndAddCurrencySign(summaWithSale);
				});
				summaWithoutSaleElems.forEach((summaEl) => {
					summaEl.textContent = this.formatNumberAndAddCurrencySign(summaProduct);
				});
			} else {
				this.productsInBasket[i].summa = summaProduct;
				summaWithoutSaleElems.forEach((summaWithoutSaleEl) => {
					summaWithoutSaleEl.classList.add('basket__summa');
					summaWithoutSaleEl.classList.remove('basket__summa-without-sale');
				});
				summaWithSaleElems.forEach((summaWithSaleEl) => {
					summaWithSaleEl.textContent = '';
				});
			}
		}

		/**
		 * Метод отрисовывает процент скидки на все товары
		 * @param {HTMLSpanElement[]} summaElems html-элементы, в которых содержимое сумма товаров
		 * @param {HTMLSpanElement[]} summaWithSaleElems html-элементы, в которых содержимое сумма товаров со скидкой
		 * @param {number} summaWithSale сумма товаров со скидкой
		 */
		renderPercentSaleForAllProducts(summaElems, summaWithSaleElems, summaWithSale, summaWithoutSaleElems, summaProduct) {
			summaElems.forEach((summaEl) => {
				summaEl.classList.add('basket__summa-without-sale');
				summaEl.classList.remove('basket__summa');
			});
			summaWithoutSaleElems.forEach((summaEl) => {
				summaEl.textContent = this.formatNumberAndAddCurrencySign(summaProduct);
			});
			summaWithSaleElems.forEach((summaWithSaleEl) => {
				summaWithSaleEl.classList.add('basket__summa-with-sale');
				summaWithSaleEl.textContent = this.formatNumberAndAddCurrencySign(summaWithSale);
			});
		}


		/**
		 * Метод отрисовывает фиксированную скидку
		 * @param {HTMLSpanElement[]} summaWithoutSaleElems html-элементы, в которых содержимое сумма товаров без скидки
		 * @param {HTMLSpanElement[]} summaWithSaleElems html-элементы, в которых содержимое сумма товаров со скидкой
		 */
		renderFixedSale(summaWithoutSaleElems, summaWithSaleElems) {
			summaWithoutSaleElems.forEach((summaWithoutSaleEl) => {
				summaWithoutSaleEl.classList.add('basket__summa');
				summaWithoutSaleEl.classList.remove('basket__summa-without-sale');
			});

			summaWithSaleElems.forEach((summaWithSaleEl) => {
				summaWithSaleEl.textContent = '';
			});
		}

		/**
		 * Метод устанавливает скидку
		 * @param {PromocodeDTO} promocode объект с информацией о промокоде
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		setSale(promocode, products) {
			let totalSummaProducts = 0;
			let basketRowElems = document.querySelectorAll('.basket__row');

			for (let i = 0; i < basketRowElems.length; i++) {
				let priceOld = products[this.productsInBasket[i].id].priceOld;
				let row = basketRowElems[i];
				let summaElems = row.querySelectorAll('.basket__summa');
				let summaWithSaleElems = row.querySelectorAll('.basket__summa-with-sale');
				let summaWithoutSaleElems = row.querySelectorAll('.basket__summa-without-sale');

				let summaProduct = this.getSummaProducts(i, products);
				let summaWithSale = Math.round(summaProduct * (100 - promocode.percent) / 100);
				this.productsInBasket[i].summa = summaWithSale;

				this.inTotalSummaEl.classList.add('basket__summa-without-sale');
				this.inTotalSummaWithSaleEl.classList.add('basket__summa');

				switch (promocode.category) {
					case 'percent':
						this.renderPercentSale(priceOld, i, summaWithSale, summaElems, summaWithSaleElems, summaWithoutSaleElems, summaProduct);
						break;
					case 'all':
						this.renderPercentSaleForAllProducts(summaElems, summaWithSaleElems, summaWithSale, summaWithoutSaleElems, summaProduct);
						break;
					case 'fixed':
						this.renderFixedSale(summaWithoutSaleElems, summaWithSaleElems);
						break;
				}
			}

			this.productsInBasket.forEach((product) => {
				totalSummaProducts += product.summa;
			});

			this.costDelivery = this.setCostDelivery(totalSummaProducts);

			this.inTotalSummaWithSaleEl.textContent = this.formatNumberAndAddCurrencySign(totalSummaProducts - promocode.summa + this.costDelivery);

			if (this.inTotalSummaEl.textContent == this.inTotalSummaWithSaleEl.textContent) {
				this.inTotalSummaWithSaleEl.textContent = '';
				this.inTotalSummaEl.classList.remove('basket__summa-without-sale');
				this.inTotalSummaEl.classList.add('basket__summa');
				this.promocodeTextEl.textContent = `Промокод ${promocode.name.toUpperCase()} не распространяется на акционные товары`;
			}

		}

		/**
		 * Метод отрисовывает скидку для пользователя
		 * @param {PromocodeDTO[]} promocodes массив промокодов из файла promocodes.js
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		renderSale(promocodes, products) {
			let valuePromocodeInputEl = this.promocodeInputEl.value.trim();

			if (valuePromocodeInputEl != '') {
				for (let i = 0; i < promocodes.length; i++) {
					if (promocodes[i].name.toUpperCase() == valuePromocodeInputEl.toUpperCase()) {
						this.promocodeTextEl.textContent = `Промокод ${promocodes[i].name.toUpperCase()} применен!`;
						if (this.totalSummaProducts >= promocodes[i].minSummaOrder) {
							this.setSale(promocodes[i], products);
							return;
						} else {
							this.promocodeTextEl.innerHTML = `<svg class="" width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM6.85714 8.57143C6.85714 9.04482 6.47339 9.42857 6 9.42857C5.52661 9.42857 5.14286 9.04482 5.14286 8.57143C5.14286 8.09804 5.52661 7.71429 6 7.71429C6.47339 7.71429 6.85714 8.09804 6.85714 8.57143ZM6.85714 3H5.14286V6.85714H6.85714V3Z" fill="currentColor"></path></svg>Промокод ${promocodes[i].name.toUpperCase()} действует на сумму от ${this.formatNumberAndAddCurrencySign(promocodes[i].minSummaOrder)}`;
							this.inTotalSummaWithSaleEl.textContent = '';
							this.inTotalSummaEl.classList.remove('basket__summa-without-sale');
							this.inTotalSummaEl.classList.add('basket__summa');
							return;
						}
					} else {
						this.promocodeTextEl.innerHTML = '<svg class="" width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM6.85714 8.57143C6.85714 9.04482 6.47339 9.42857 6 9.42857C5.52661 9.42857 5.14286 9.04482 5.14286 8.57143C5.14286 8.09804 5.52661 7.71429 6 7.71429C6.47339 7.71429 6.85714 8.09804 6.85714 8.57143ZM6.85714 3H5.14286V6.85714H6.85714V3Z" fill="currentColor"></path></svg>Промокод не действителен';
					}
				}
			} else {
				this.promocodeTextEl.innerHTML = '<svg class="" width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM6.85714 8.57143C6.85714 9.04482 6.47339 9.42857 6 9.42857C5.52661 9.42857 5.14286 9.04482 5.14286 8.57143C5.14286 8.09804 5.52661 7.71429 6 7.71429C6.47339 7.71429 6.85714 8.09804 6.85714 8.57143ZM6.85714 3H5.14286V6.85714H6.85714V3Z" fill="currentColor"></path></svg>Введите промокод';
			}
		}

		/**
		 * Метод добавляет слушатель события клика на кнопку "Отправить промокод"
		 * @param {PromocodeDTO[]} promocodes массив промокодов из файла promocodes.js
		 * @param {ProductDTO[]} products массив товаров из файла products.js
		 */
		addButtonSendPromocodeClickListeners(promocodes, products) {
			this.promocodeButtonEl.addEventListener('click', () => {
				this.renderSale(promocodes, products);

				document.querySelectorAll('.basket__put-away').forEach((putAwayEl) => {
					putAwayEl.addEventListener('click', () => {
						this.renderSale(promocodes, products);
					});
				});

				document.querySelectorAll('.choose-quantity__input').forEach((inputEl) => {
					inputEl.addEventListener('input', () => {
						this.renderSale(promocodes, products);
					})
				})
			});
		}

		/**
		 * Метод добавляет полю ввода промокода слушатель события focus
		 */
		addPromocodeInputFocusListeners() {
			let style = document.createElement('style');
			style.innerText = '.basket__promocode-inner::after{content: ""}';

			this.promocodeInputEl.addEventListener('focus', () => {
				document.body.appendChild(style);
			});

			this.promocodeInputEl.addEventListener('blur', () => {
				document.body.removeChild(style);
			});
		}
	}

	window.addEventListener('load', () => {
		let basket = new Basket();
		basket.renderBasket(products);
		basket.changeAttributesElements();
	});

})();