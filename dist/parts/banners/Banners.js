!function(){"use strict";class e{constructor(){this.settings={speed:1200,loop:!0,autoplay:{delay:5e3},slidesPerView:"auto",pagination:{el:".banners__pagination",clickable:!0},navigation:{nextEl:".banners__button-next",prevEl:".banners__button-prev"}},this.bannersSwiper=new Swiper("#banners-slider",this.settings),this.slider=document.querySelector("#banners-slider")}doAutoHeight(){this.bannersSwiper.destroy(),this.bannersSwiper=new Swiper("#banners-slider",this.settings),this.addSliderEventHandlers()}addSliderEventHandlers(){this.slider.addEventListener("mouseenter",()=>{this.bannersSwiper.autoplay.stop()}),this.slider.addEventListener("mouseleave",()=>{this.bannersSwiper.autoplay.start()})}}window.addEventListener("load",()=>{(new e).doAutoHeight()})}();