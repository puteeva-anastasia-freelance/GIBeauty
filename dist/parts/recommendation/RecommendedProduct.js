!function(){"use strict";class t{constructor(){this.settings={speed:500,loop:!0,loopedSlides:4,navigation:{nextEl:".recommendation__swiper-button-next",prevEl:".recommendation__swiper-button-prev"},breakpoints:{320:{slidesPerView:2,spaceBetween:10},360:{slidesPerView:2,spaceBetween:25},576:{slidesPerView:3,spaceBetween:25},768:{slidesPerView:4,spaceBetween:25}}},this.recommendedSwiper=new Swiper("#recommendation-slider",this.settings)}setImagesHeight(){var e=document.querySelectorAll(".recommendation__img");let t=document.querySelector(".recommendation__item").clientWidth,i=document.querySelector(".recommendation__swiper .swiper-slide").clientWidth;e.forEach(function(e){window.innerWidth<=992?e.style.height=.929*i+"px":e.style.height=.917*t+"px"})}}window.addEventListener("load",()=>{let e=new t;e.setImagesHeight(),window.addEventListener("resize",()=>{(e=new t).setImagesHeight()})})}();