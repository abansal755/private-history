import Cache from "./Cache";
import getPageFromArray from "../utils/getPageFromArray";

export default class ArrayCache extends Cache {
	constructor(key) {
		super(key, []);
	}

	static getPageSize() {
		return 50;
	}

	async push(item) {
		const data = await this.getCache();
		await this.setCache([...data, item]);
	}

	async getLength() {
		const data = await this.getCache();
		return data.length;
	}

	async getPage(page, reverse = true) {
		const data = await this.getCache();
		return getPageFromArray(
			data,
			this.constructor.getPageSize(),
			page,
			reverse
		);
	}
}
