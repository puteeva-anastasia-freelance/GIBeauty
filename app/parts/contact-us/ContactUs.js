/**
 * Класс управляет разделом "Свяжитесь с нами" (полями "Сообщение" и "Приложить файл")
 */
class ContactUs {
	constructor() {
		this.messageEl = document.getElementsByTagName("textarea");
		this.fileEl = document.querySelector('.input-file input[type="file"]');
		this.titleEl = document.querySelector('.contact-us__title');
	}

	/**
	 * Метод добавляет полям "Сообщение" и "Приложить файл" слушатель событий
	 */
	addMessageAndFileEventListeners() {
		this.addNewLineToEnterMessage();
		this.addFileChangeListeners();
		this.addWidthResizeListener();
	}

	/**
	 * Метод добавляет новые строчки для ввода сообщения, при необходимости, и убирает их
	 */
	addNewLineToEnterMessage() {
		for (let i = 0; i < this.messageEl.length; i++) {
			this.messageEl[i].setAttribute("style", "height:" + (this.messageEl[i].scrollHeight) + "px; overflow-y: hidden;");
			this.messageEl[i].addEventListener("input", function () {
				this.style.height = 0;
				this.style.height = (this.scrollHeight) + "px";
			});
		}
	}

	/**
	 * Метод добавляет слушатель события на инпут с файлом и хранит данные о выбранных файлах
	 */
	addFileChangeListeners() {
		let dt = new DataTransfer();

		this.fileEl.addEventListener('change', function () {
			let fileList = document.querySelector('.contact-us__file-list');
			fileList.innerHTML = '';

			for (let i = 0; i < this.files.length; i++) {
				let newFileInput = '<div class="contact-us__file-item">' +
					'<span class="input-file-list-name">' + this.files.item(i).name + '</span>' +
					'</div>';
				fileList.insertAdjacentHTML("beforeend", newFileInput);
				dt.items.add(this.files.item(i));
			}
			this.files = dt.files;
		});
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
				this.changeTitleContactUs(windowWidth);
			}
		});
	}

	/**
	 * Метод изменяет текст заголовка в разделе "Свяжитесь с нами" в зависимости от ширины экрана
	 * @param {number} windowWidth ширина экрана
	 */
	changeTitleContactUs(windowWidth) {
		if (windowWidth <= 992) {
			this.titleEl.innerHTML = 'Напишите нам';
		} else {
			this.titleEl.innerHTML = 'Свяжитесь с&nbsp;нами';
		}
	}
}

let contactUs = new ContactUs();
contactUs.addMessageAndFileEventListeners();