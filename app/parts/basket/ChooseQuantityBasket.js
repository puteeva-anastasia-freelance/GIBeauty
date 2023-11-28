(function () {
	"use strict";

	/**
	 * Класс изменяет количество товаров
	 */
	class ChooseQuantity {
		constructor(basketRowElems) {
			this.minusButtons = [];
			this.plusButtons = [];
			this.inputElems = [];

			for (let i = 0; i < basketRowElems.length; i++) {
				this.minusButtons[i] = basketRowElems[i].querySelectorAll('.choose-quantity__button.minus');
				this.plusButtons[i] = basketRowElems[i].querySelectorAll('.choose-quantity__button.plus');
				this.inputElems[i] = basketRowElems[i].querySelectorAll('.choose-quantity__input');
			}
		}

		/**
		 * Метод добавляет слушатель событий на кнопки "Плюс", "Минус" и инпут
		 * @param {HTMLDivElement[]} basketRowElems набор тегов div с классом .basket__row
		 */
		addControlsEventListeners(basketRowElems) {
			for (let i = 0; i < basketRowElems.length; i++) {
				this.minusButtons[i].forEach((button) => {
					button.addEventListener('click', (event) => {
						this.addBtnClickListeners(event, i);
					});
				});
				this.plusButtons[i].forEach((button) => {
					button.addEventListener('click', (event) => {
						this.addBtnClickListeners(event, i);
					});
				});
				this.inputElems[i].forEach((input) => {
					input.addEventListener('keypress', (event) => {
						this.allowsOnlyDigitsToEnter(event);
					});
					input.addEventListener('change', (event) => {
						this.changeValueInput(event, i);
					});
					input.addEventListener('input', (event) => {
						this.inputValueInput(event, i);
					});
				});
			}
		}

		/**
		 * Метод меняет значения всех инпутов на значение измененного инпута
		 * @param {KeyboardEvent} event 
		 * @param {number} numberRow номер строки с товаром
		 */
		inputValueInput(event, numberRow) {
			this.inputElems[numberRow].forEach((input) => {
				input.value = event.target.value;
			});
		}

		/**
		 * Метод меняет значение инпута, если оно выходит за рамки разрешенных значений
		 * @param {KeyboardEvent} event 
		 * @param {number} numberRow номер строки с товаром
		 */
		changeValueInput(event, numberRow) {
			if (event.target.value == '' || event.target.value == 0) {
				this.inputElems[numberRow].forEach((input) => {
					input.value = 1;
				});
			}

			if (event.target.value > +(event.target.dataset.maxCount)) {
				this.inputElems[numberRow].forEach((input) => {
					input.value = event.target.dataset.maxCount;
				});
			}
		}

		/**
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
		 * @param {number} numberRow номер строки с товаром
		 */
		addBtnClickListeners(event, numberRow) {
			let btnEl = event.currentTarget;
			let count = 1;

			//Если количество товаров не равно 0, тогда обрабатывать клик
			if (+(this.inputElems[numberRow][0].dataset.maxCount) != 0) {
				if (btnEl.classList.contains('minus')) {
					count = +(this.inputElems[numberRow][0].value) - 1;
					if (count < 1) {
						count = 1;
					}
				} else if (btnEl.classList.contains('plus')) {
					count = +(this.inputElems[numberRow][0].value) + 1;
					if (count > +(this.inputElems[numberRow][0].dataset.maxCount)) {
						count = this.inputElems[numberRow][0].dataset.maxCount;
					}
				}

				this.inputElems[numberRow].forEach((input) => {
					input.value = count;
				});

			}

			this.inputElems[numberRow].forEach((input) => {
				input.dispatchEvent(new Event("input"));
			});

		}
	}

	window.addEventListener('load', () => {
		let basketRowElems = document.querySelectorAll('.basket__row');
		let chooseQuantity = new ChooseQuantity(basketRowElems);
		chooseQuantity.addControlsEventListeners(basketRowElems);
	});

})();