(function () {
	"use strict";

	/*
	 * Класс изменяет количество товаров
	 */
	class ChooseQuantity {
		constructor() {
			this.minusBtn = document.querySelector('.choose-quantity__button.minus');
			this.plusBtn = document.querySelector('.choose-quantity__button.plus');
			this.inputEl = document.querySelector('.choose-quantity__input');
		}

		/*
		 * Метод добавляет слушатель событий на кнопки "Плюс", "Минус" и инпут
		 */
		addControlsEventListeners() {
			this.minusBtn.addEventListener('click', this.addBtnClickListeners.bind(this));
			this.plusBtn.addEventListener('click', this.addBtnClickListeners.bind(this));
			this.inputEl.addEventListener('keypress', this.allowsOnlyDigitsToEnter);
			this.inputEl.addEventListener('change', this.changeValueInput);
		}

		/*
		 * Метод меняет значение инпута, если оно выходит за рамки разрешенных значение
		 */
		changeValueInput() {
			if (this.value == '' || this.value == 0) {
				this.value = 1;
			}

			if (this.value > +(this.dataset.maxCount)) {
				this.value = this.dataset.maxCount;
			}
		}

		/*
		 * Метод проверяет вводимые символы (разрешается вводить только цифры)
		 * @param {KeyboardEvent} event 
		 */
		allowsOnlyDigitsToEnter(event) {
			if (isNaN(event.key) || event.key == ' ') {
				event.preventDefault();
			}
		}

		/**
		 * Метод обрабатывает нажатие на кнопки "Плюс" / "Минус"
		 * @param {MouseEvent} event 
		 */
		addBtnClickListeners(event) {
			let btnEl = event.currentTarget;
			let count = 1;

			//Если количество товаров не равно 0, тогда обрабатывать клик
			if (+(this.inputEl.dataset.maxCount) != 0) {
				if (btnEl.classList.contains('minus')) {
					count = +(this.inputEl.value) - 1;
					if (count < 1) {
						count = 1;
					}
				} else if (btnEl.classList.contains('plus')) {
					count = +(this.inputEl.value) + 1;
					if (count > +(this.inputEl.dataset.maxCount)) {
						count = this.inputEl.dataset.maxCount;
					}
				}
				this.inputEl.value = count;
			}
		}
	}

	window.addEventListener('load', () => {
		let chooseQuantity = new ChooseQuantity();
		chooseQuantity.addControlsEventListeners();
	});

})();