import FilteredArrayCache from "./FilteredArrayCache";
import filterFn from "../utils/filterFn";
import { v4 as uuidv4 } from "uuid";

export default class Favourites extends FilteredArrayCache {
	constructor() {
		super("favourites", filterFn);
	}

	_getModifiedItem(item) {
		const modifiedItem = { ...item };
		modifiedItem.id = uuidv4();
		modifiedItem.timestamp = new Date().toUTCString();
		return modifiedItem;
	}

	async push(item) {
		await super.push(this._getModifiedItem(item));
	}

	async remove(id) {
		const data = await this.getCache();
		await this.setCache(data.filter((item) => item.id !== id));

		const filters = this.getFilters();
		for (const searchText in filters) {
			filters[searchText] = filters[searchText].filter(
				(item) => item.id !== id
			);
		}
	}
}
