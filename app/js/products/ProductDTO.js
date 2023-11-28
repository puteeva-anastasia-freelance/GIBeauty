'use strict';

/**
 * Этот класс будет хранить в себе информацию о конкретном товаре
 */
class ProductDTO {
	/**
	 * @param {number} id уникальный идентификатор каждого товара
	 * @param {string} category категория товара
	 * @param {string} image название файла с картинкой
	 * @param {string} imageMiddle название файла с картинкой среднего размера
	 * @param {string} imageSmall название файла с картинкой маленького размера
	 * @param {string} name имя товара
	 * @param {string} shortDescription описание товара
	 * @param {number} price цена товара
	 * @param {number | null} priceOld старая цена товара
	 * @param {number} quantity количество товара
	 * @param {string | null} feature особенности товара
	 * @param {array | null} images названия файлов с дополнительными картинками 
	 * @param {array | null} imagesMiddle названия файлов с дополнительными картинками среднего размера
	 */
	constructor(id, category, image, imageMiddle, imageSmall, name, shortDescription, price, priceOld, quantity, feature, images, imagesMiddle) {
		this.id = id;
		this.category = category;
		this.image = image;
		this.imageMiddle = imageMiddle;
		this.imageSmall = imageSmall;
		this.name = name;
		this.shortDescription = shortDescription;
		this.price = price;
		this.priceOld = priceOld;
		this.quantity = quantity;
		this.feature = feature;
		this.images = images;
		this.imagesMiddle = imagesMiddle;
	}
}