!function(){"use strict";class s{constructor(){this.pathToProductsImages="img/dist/products"}formatNumberAndAddCurrencySign(t){return t.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")+" ₽"}getPriceProductMarkup(t){return`<span class="card__price">${this.formatNumberAndAddCurrencySign(t.price)}</span>`}getPriceOldProductMarkup(t){return null!=t.priceOld?`<span class="card__price-old">${this.formatNumberAndAddCurrencySign(t.priceOld)}</span>`:""}getFeatureProductMarkup(t){return null==t.feature?`<button type="button" class="card__more hidden">
					Подробнее
					<svg width="12" height="22" viewBox="0 0 12 22" xmlns="http://www.w3.org/2000/svg" class="card__more-icon">
						<path d="M1 1L10 11.303L1 21" stroke-width="2" />
					</svg>
				</button>`:`<button type="button" class="card__more">
				Подробнее
				<svg width="12" height="22" viewBox="0 0 12 22" xmlns="http://www.w3.org/2000/svg" class="card__more-icon">
					<path d="M1 1L10 11.303L1 21" stroke-width="2" />
				</svg>
			</button>
			<div class="card__detailed">
					<p class="card__desc-txt">${t.feature}</p>
				</div>`}getImagesTopSliderMarkup(e){let s="";for(let t=0;t<e.images.length;t++)s+=`<div class="swiper-slide">
				<picture>
					<source data-srcset="${this.pathToProductsImages}/${e.category}/${e.images[t]}" media="(min-width: 576px)" width="645" height="593">
					<source data-srcset="${this.pathToProductsImages}/${e.category}/${e.imagesMiddle[t]}" media="(min-width: 0)" width="516" height="475">
					<img class="swiper-lazy gallery-top__img" data-src="${this.pathToProductsImages}/${e.category}/${e.imagesMiddle[t]}" alt="Фотография товара" width="516" height="475">
				</picture>
			</div>`;return s}getImagesThumbsSliderMarkup(s){if(0==s.images.length)return`<div class="swiper gallery-thumbs hidden">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<picture>
								<source srcset="${this.pathToProductsImages}/${s.category}/${s.imageMiddle}" media="(min-width: 768.1px)" width="146" height="163">
								<source srcset="#" media="(min-width: 0)" width="0" height="0">
								<img class="gallery-thumbs__img" src="#" alt="${s.name}" width="0" height="0">
							</picture>
						</div>
					</div>
				</div>`;{let e="";return s.imagesMiddle.forEach(t=>{e+=`<div class="swiper-slide">
					<picture>
						<source srcset="${this.pathToProductsImages}/${s.category}/${t}" media="(min-width: 768.1px)" width="146" height="163">
						<source srcset="#" media="(min-width: 0)" width="0" height="0">
						<img class="gallery-thumbs__img" src="#" alt="${s.name}" width="0" height="0">
					</picture>
				</div>`}),`<div class="swiper gallery-thumbs">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<picture>
								<source srcset="${this.pathToProductsImages}/${s.category}/${s.imageMiddle}" media="(min-width: 768.1px)" width="146" height="163">
								<source srcset="#" media="(min-width: 0)" width="0" height="0">
								<img class="gallery-thumbs__img" src="#" alt="${s.name}" width="0" height="0">
							</picture>
						</div>
						${e}
					</div>
				</div>
				<div class="swiper-button-next swiper-button-next-thumbs"></div>
				<div class="swiper-button-prev swiper-button-prev-thumbs"></div>`}}getBtnBuyMarkup(t){return 0<t.quantity?'<button type="submit" class="button button__accent card__buy-button">Купить</button>':'<button type="submit" class="button button__accent card__buy-button hidden">Купить</button>'}getQuantityInStockMarkup(t){return 0<t.quantity?`<span class="card__quantity">В наличии <span>${t.quantity}</span> шт.</span>`:'<span class="card__quantity bold">Нет в наличии</span>'}renderCardProduct(t){null==t&&(window.location.href="/");var e=this.getPriceProductMarkup(t),s=this.getPriceOldProductMarkup(t),i=this.getFeatureProductMarkup(t),a=this.getImagesTopSliderMarkup(t),r=this.getImagesThumbsSliderMarkup(t),d=this.getBtnBuyMarkup(t),c=this.getQuantityInStockMarkup(t),a=`
					<h2 class="h3 card__title card__title_top">${t.name}</h2>
					<div class="card__left">
						<div class="swiper gallery-top">
							<div class="swiper-wrapper">
								<div class="swiper-slide">
									<picture>
										<source data-srcset="${this.pathToProductsImages}/${t.category}/${t.image}" media="(min-width: 576px)" width="645" height="593">
										<source data-srcset="${this.pathToProductsImages}/${t.category}/${t.imageMiddle}" media="(min-width: 0)" width="516" height="475">
										<img class="swiper-lazy gallery-top__img" data-src="${this.pathToProductsImages}/${t.category}/${t.imageMiddle}" alt="${t.name}" width="516" height="475">
									</picture>
								</div>
								${a}
							</div>
						</div>
						${r}
						<div class="swiper-pagination card__pagination"></div>
					</div>
					<div class="card__right">
						<h2 class="h3 card__title">${t.name}</h2>
						${e}
						${s}
						<div class="card__buy">
							<div class="choose-quantity">
								<button type="button" class="choose-quantity__button minus">-</button>
								<input type="text" class="choose-quantity__input" value="1" data-max-count="${t.quantity}" aria-label="Поле для ввода количества товаров">
								<button type="button" class="choose-quantity__button plus">+</button>
							</div>
							${d}
						</div>
						<span class="card__in-basket hidden"></span>
						<a class="card__in-basket-link" href="basket.html" aria-label="Перейти в корзину"></a>
						${c}
						<a href="https://api.whatsapp.com/send/?phone=79912812090&amp;text=Здравствуйте!%0aМожете+мне+помочь?"
							target="_blank" class="card__payment">КУПИТЬ В РАССРОЧКУ</a>
						<div class="card__desc">
							<p class="card__desc-txt">${t.shortDescription}</p>
						</div>
						${i}
					</div>`;document.querySelector(".card__wrap").insertAdjacentHTML("beforeend",a)}}window.addEventListener("load",()=>{var t=new s,e=location.hash.replace(/#/,"");t.renderCardProduct(products[e])})}();