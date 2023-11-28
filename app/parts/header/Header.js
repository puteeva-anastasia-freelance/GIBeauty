(function () {
	"use strict";

	/**
	 * Класс управляет меню сайта
	 */
	class Header {
		constructor() {
			this.menuBtn = document.querySelector('.main-header__menu');
			this.menuCloseBtn = document.querySelector('.main-header__menu-close');
			this.menuWrapEl = document.querySelector('.main-header__menu-wrap');
			this.languageEl = document.querySelector('.main-header__language');
			this.languageValueEl = document.querySelector('.main-header__language-value');
			this.languageSwitchElems = document.querySelectorAll('.main-header__language-switch');
			this.languageInnerEl = document.querySelector('.main-header__language-inner');
		}

		/**
		 * Метод добавляет кнопкам слушатель события клика
		 */
		addButtonsClickListeners() {
			this.addButtonsMenuClickListeners();
			this.addButtonLanguageClickListener();
		}

		/**
		 * Метод добавляет кнопкам "Открытие меню" и "Закрытие меню" слушатели событий
		 */
		addButtonsMenuClickListeners() {
			this.menuBtn.addEventListener('click', this.menuClickHandler.bind(this));
			this.menuCloseBtn.addEventListener('click', this.menuClickHandler.bind(this));
		}

		/**
		 * Метод добавляет кнопке переключения языка слушатель события клика
		 */
		addButtonLanguageClickListener() {
			this.languageEl.addEventListener('click', () => {
				if (this.languageEl.classList.toggle('open')) {
					this.languageEl.classList.add('open');

					this.addButtonsSwitchClickListener();
				} else {
					this.languageEl.classList.remove('open');
				}
			});
		}

		/**
		 * Метод добавляет кнопкам переключения языков слушатель события клика
		 */
		addButtonsSwitchClickListener(){
			this.languageSwitchElems.forEach((languageSwitchEl) => {
				languageSwitchEl.addEventListener('click', (event) => {
					this.languageValueEl.textContent = languageSwitchEl.textContent;

					this.languageSwitchElems.forEach((languageSwitchEl) => {
						languageSwitchEl.classList.remove('accent');
					});
					
					event.target.classList.add('accent');
				})
			});
		}

		/**
		 * Метод добавляет или удаляет класс .open
		 */
		menuClickHandler() {
			this.menuWrapEl.classList.toggle('open');
		}
	}

	window.addEventListener('load', () => {
		let header = new Header();
		header.addButtonsClickListeners();
	});
})();