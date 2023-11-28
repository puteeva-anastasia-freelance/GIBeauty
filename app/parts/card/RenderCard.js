(function () {
	"use strict";

	/**
	 * Класс для отрисовки карточек товаров
	 */
	class RenderCard {
		constructor() {
			this.pathToProductsImages = 'img/dist/products';
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
			return `<span class="card__price">${price}</span>`;
		}

		/**
		 * Метод получает разметку старой цены товара
		 * @param {ProductDTO} product объект с информацией о товаре 
		 * @returns {string} html-разметка старой цены товара, разделенная пробелами по тысячам, если есть старая цена 
		 */
		getPriceOldProductMarkup(product) {
			if (product.priceOld != null) {
				let priceOld = this.formatNumberAndAddCurrencySign(product.priceOld);
				return `<span class="card__price-old">${priceOld}</span>`;
			} else {
				return '';
			}
		}

		/**
		 * Метод получает разметку особенностей товара
		 * @param {ProductDTO} product объект с информацией о товаре 
		 * @returns {string} html-разметка особенностей товара
		 */
		getFeatureProductMarkup(product) {
			if (product.feature == null) {
				return `<button type="button" class="card__more hidden">
					Подробнее
					<svg width="12" height="22" viewBox="0 0 12 22" xmlns="http://www.w3.org/2000/svg" class="card__more-icon">
						<path d="M1 1L10 11.303L1 21" stroke-width="2" />
					</svg>
				</button>`;
			} else {
				return `<button type="button" class="card__more">
				Подробнее
				<svg width="12" height="22" viewBox="0 0 12 22" xmlns="http://www.w3.org/2000/svg" class="card__more-icon">
					<path d="M1 1L10 11.303L1 21" stroke-width="2" />
				</svg>
			</button>
			<div class="card__detailed">
					<p class="card__desc-txt">${product.feature}</p>
				</div>`;
			}
		}

		/**
		 * Метод получает разметку верхних картинок слайдера
		 * @param {ProductDTO} product объект с информацией о товаре 
		 * @returns {string} html-разметка верхних картинок слайдера
		 */
		getImagesTopSliderMarkup(product) {
			let imgTopProduct = '';
			for(let i = 0; i < product.images.length; i++){
				imgTopProduct += `<div class="swiper-slide">
				<picture>
					<source data-srcset="${this.pathToProductsImages}/${product.category}/${product.images[i]}" media="(min-width: 576px)" width="645" height="593">
					<source data-srcset="${this.pathToProductsImages}/${product.category}/${product.imagesMiddle[i]}" media="(min-width: 0)" width="516" height="475">
					<img class="swiper-lazy gallery-top__img" data-src="${this.pathToProductsImages}/${product.category}/${product.imagesMiddle[i]}" alt="Фотография товара" width="516" height="475">
				</picture>
			</div>`;
			}
			return imgTopProduct;
		}

		/**
		 * Метод получает разметку миниатюр слайдера
		 * @param {ProductDTO} product объект с информацией о товаре 
		 * @returns {string} html-разметка миниатюр слайдера
		 */
		getImagesThumbsSliderMarkup(product) {
			if (product.images.length != 0) {
				let imgThumbsProduct = '';
				product.imagesMiddle.forEach((img) => {
					imgThumbsProduct += `<div class="swiper-slide">
					<picture>
						<source srcset="${this.pathToProductsImages}/${product.category}/${img}" media="(min-width: 768.1px)" width="146" height="163">
						<source srcset="#" media="(min-width: 0)" width="0" height="0">
						<img class="gallery-thumbs__img" src="#" alt="${product.name}" width="0" height="0">
					</picture>
				</div>`;
				});
				return `<div class="swiper gallery-thumbs">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<picture>
								<source srcset="${this.pathToProductsImages}/${product.category}/${product.imageMiddle}" media="(min-width: 768.1px)" width="146" height="163">
								<source srcset="#" media="(min-width: 0)" width="0" height="0">
								<img class="gallery-thumbs__img" src="#" alt="${product.name}" width="0" height="0">
							</picture>
						</div>
						${imgThumbsProduct}
					</div>
				</div>
				<div class="swiper-button-next swiper-button-next-thumbs"></div>
				<div class="swiper-button-prev swiper-button-prev-thumbs"></div>`;
			} else {
				return `<div class="swiper gallery-thumbs hidden">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<picture>
								<source srcset="${this.pathToProductsImages}/${product.category}/${product.imageMiddle}" media="(min-width: 768.1px)" width="146" height="163">
								<source srcset="#" media="(min-width: 0)" width="0" height="0">
								<img class="gallery-thumbs__img" src="#" alt="${product.name}" width="0" height="0">
							</picture>
						</div>
					</div>
				</div>`;
			}
		}

		/**
		 * Метод получает разметку кнопки "Купить"
		 * @param {ProductDTO} product объект с информацией о товаре 
		 * @returns {string} html-разметка кнопки "Купить"
		 */
		getBtnBuyMarkup(product) {
			if (product.quantity > 0) {
				return `<button type="submit" class="button button__accent card__buy-button">Купить</button>`;
			} else {
				return `<button type="submit" class="button button__accent card__buy-button hidden">Купить</button>`;
			}
		}

		/**
		 * Метод получает разметку количества товаров в наличии
		 * @param {ProductDTO} product объект с информацией о товаре 
		 * @returns {string} html-разметка количества товаров в наличии
		 */
		getQuantityInStockMarkup(product) {
			if (product.quantity > 0) {
				return `<span class="card__quantity">В наличии <span>${product.quantity}</span> шт.</span>`;
			} else {
				return `<span class="card__quantity bold">Нет в наличии</span>`;
			}
		}

		/**
		 * Этот метод принимает один из объектов из массива products в файле products.js и отрисовывает карточку товара
		 * @param {ProductDTO} product объект с информацией о товаре 
		 */
		renderCardProduct(product) {
			if (product == undefined) {
				window.location.href = '/';
			}
			//Метод получает разметку цены товара
			let priceMarkup = this.getPriceProductMarkup(product);

			//Метод получает разметку старой цены товара
			let priceOldMarkup = this.getPriceOldProductMarkup(product);

			//Метод получает разметку особенностей товара
			let featureMarkup = this.getFeatureProductMarkup(product);

			//Метод получает разметку верхних картинок слайдера
			let imagesTopSliderMarkup = this.getImagesTopSliderMarkup(product);

			//Метод получает разметку миниатюр слайдера
			let imagesThumbsSliderMarkup = this.getImagesThumbsSliderMarkup(product);

			//Метод получает разметку кнопки "Купить"
			let btnBuyMarkup = this.getBtnBuyMarkup(product);

			//Метод получает разметку количество товара в наличии
			let quantityInStockMarkup = this.getQuantityInStockMarkup(product);

			let productMarkup = `
					<h2 class="h3 card__title card__title_top">${product.name}</h2>
					<div class="card__left">
						<div class="swiper gallery-top">
							<div class="swiper-wrapper">
								<div class="swiper-slide">
									<picture>
										<source data-srcset="${this.pathToProductsImages}/${product.category}/${product.image}" media="(min-width: 576px)" width="645" height="593">
										<source data-srcset="${this.pathToProductsImages}/${product.category}/${product.imageMiddle}" media="(min-width: 0)" width="516" height="475">
										<img class="swiper-lazy gallery-top__img" data-src="${this.pathToProductsImages}/${product.category}/${product.imageMiddle}" alt="${product.name}" width="516" height="475">
									</picture>
								</div>
								${imagesTopSliderMarkup}
							</div>
						</div>
						${imagesThumbsSliderMarkup}
						<div class="swiper-pagination card__pagination"></div>
					</div>
					<div class="card__right">
						<h2 class="h3 card__title">${product.name}</h2>
						${priceMarkup}
						${priceOldMarkup}
						<div class="card__buy">
							<div class="choose-quantity">
								<button type="button" class="choose-quantity__button minus">-</button>
								<input type="text" class="choose-quantity__input" value="1" data-max-count="${product.quantity}" aria-label="Поле для ввода количества товаров">
								<button type="button" class="choose-quantity__button plus">+</button>
							</div>
							${btnBuyMarkup}
						</div>
						<span class="card__in-basket hidden"></span>
						<a class="card__in-basket-link" href="basket.html" aria-label="Перейти в корзину"></a>
						${quantityInStockMarkup}
						<a href="https://api.whatsapp.com/send/?phone=79912812090&amp;text=Здравствуйте!%0aМожете+мне+помочь?"
							target="_blank" class="card__payment">КУПИТЬ В РАССРОЧКУ</a>
						<div class="card__desc">
							<p class="card__desc-txt">${product.shortDescription}</p>
						</div>
						${featureMarkup}
					</div>`;

			document.querySelector('.card__wrap').insertAdjacentHTML('beforeend', productMarkup);
		}
	}

	window.addEventListener('load', () => {
		let renderCard = new RenderCard();
		let id = location.hash.replace(/#/, '');
		renderCard.renderCardProduct(products[id]);
	});
})();