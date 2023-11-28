$(window).on('load', function () {
	//Создадим маску для поля ввода телефона
	$('.mask-phone').mask('+9999999999?99');

	//Стилизуем поле "Страна" и будем отслеживать изменения в этом поле
	$('#country').selectize({
		onChange: function (event) {
			if (event != 'Россия') {
				$('.ordering__wrap-reg-select').addClass('close');
				$('.ordering__wrap-reg-input').addClass('open');
			} else {
				$('.ordering__wrap-reg-select').removeClass('close');
				$('.ordering__wrap-reg-input').removeClass('open');
			}
		}
	});

	//Стилизуем поле "Область"
	$('#region').selectize();
})