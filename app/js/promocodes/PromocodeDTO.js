'use strict';

/**
 * Этот класс будет хранить в себе информацию о конкретном промокоде
 */
class PromocodeDTO {
	/**
	 * @param {number} id уникальный идентификатор каждого промокода
	 * @param {string} name название промокода
	 * @param {string} category категория скидки (возможные значения: percent - процент скидки на неакционные товары, fixed - фиксированная 
	 * скидка, all - процент скидки на все товары)
	 * @param {number} percent процент скидки
	 * @param {number} summa сумма скидки
	 * @param {number} minSummaOrder минимальная сумма заказа для скидки
	 */
	constructor(id, name, category, percent, summa, minSummaOrder) {
		this.id = id;
		this.name = name;
		this.category = category;
		this.percent = percent;
		this.summa = summa;
		this.minSummaOrder = minSummaOrder;
	}
}