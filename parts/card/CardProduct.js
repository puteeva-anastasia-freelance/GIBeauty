!function(){"use strict";class e{constructor(){this.moreEl=document.querySelector(".card__more"),this.detailedEl=document.querySelector(".card__detailed"),this.moreIconEl=this.moreEl.querySelector(".card__more-icon")}init(e){var t=location.hash.replace(/#/,"");this.renderGallery(),this.addWidthResizeListener(),this.addButtonDetailedClickListeners(),"certificates"!=e[t].category?this.changeStyleAndTextElements(document.querySelector(`[data-name="category-${e[t].category}"]`),e[t]):this.changeTextBreadcrumbs("",e[t]),this.addButtonBuyClickListeners()}addButtonBuyClickListeners(){var e=document.querySelector(".card__buy-button");let t=document.querySelector(".main-header__basket-quantity"),r=document.querySelector(".card__in-basket-link"),n=document.querySelector(".card__in-basket");e.addEventListener("click",()=>{var e=document.querySelector(".choose-quantity__input").value;t.textContent=e,n.classList.remove("hidden"),n.textContent="Товары добавлены в корзину!",r.textContent="Перейти в корзину"})}changeStyleAndTextElements(e,t){this.changeStyleBtn(e),this.changeTextBreadcrumbs(e.textContent,t)}changeStyleBtn(e){document.querySelector(".shop-category__btn.accent")&&document.querySelector(".accent").classList.remove("accent"),e.classList.add("accent")}changeTextBreadcrumbs(e,t){var r=document.querySelectorAll(".breadcrumbs__link"),n=document.querySelector(".card__title").textContent;"certificates"==t.category?(r[r.length-2].textContent="Подарочные сертификаты",r[r.length-2].href="certificates.html"):(r[r.length-2].textContent=e,r[r.length-2].href="shop.html#"+t.category),r[r.length-1].textContent=n,r[r.length-1].href="product-card.html#"+t.id}renderGallery(){this.setDistanceBottomForArrowThumbs()}addWidthResizeListener(){window.addEventListener("resize",()=>{this.renderGallery()})}setDistanceBottomForArrowThumbs(){var e=document.querySelector(".gallery-thumbs").clientHeight,t=document.querySelector(".swiper-button-prev-thumbs"),r=document.querySelector(".swiper-button-next-thumbs");t&&r&&(e=(e-t.clientHeight)/2,t.style.bottom=e+"px",r.style.bottom=e+"px")}addButtonDetailedClickListeners(){this.moreEl.addEventListener("click",()=>{this.detailedEl.classList.toggle("open"),this.moreIconEl.classList.toggle("down")})}}window.addEventListener("load",()=>{(new e).init(products)})}();