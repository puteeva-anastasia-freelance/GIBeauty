!function(){"use strict";class t{constructor(){this.pathToProductsImages="img/dist/products",this.wrapEl=document.querySelector(".certificate__wrap")}insertCertificatesIntoPage(t){let e="";for(var r of t)"certificates"==r.category&&(e+=this.getProductMarkup(r));this.wrapEl.insertAdjacentHTML("beforeend",e)}formatNumberAndAddCurrencySign(t){return t.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")+" ₽"}getProductMarkup(t){return`<a href="product-card.html#${t.id}" class="certificate__item">
			<picture class="certificate__img">
				<source srcset="${this.pathToProductsImages}/${t.category}/${t.image}" media="(min-width: 576px)" width="436" height="400">
				<source srcset="${this.pathToProductsImages}/${t.category}/${t.imageSmall}" media="(min-width: 0)" width="206" height="189">
				<img src="${this.pathToProductsImages}/${t.category}/${t.imageSmall}" alt="${t.name} ${this.formatNumberAndAddCurrencySign(t.price)}" width="206" height="189">
			</picture>
			<span class="certificate__item-txt">${t.name}<br>${this.formatNumberAndAddCurrencySign(t.price)}</span>
		</a>`}}window.addEventListener("load",()=>{(new t).insertCertificatesIntoPage(products)})}();