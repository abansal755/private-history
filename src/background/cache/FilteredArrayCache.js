import ArrayCache from "./ArrayCache";
import getPageFromArray from "../utils/getPageFromArray";

export default class FilteredArrayCache extends ArrayCache {
	_filters = {};
	_filterFn;

	constructor(key, filterFn) {
		super(key);
		this._filterFn = filterFn;
	}

	getFilters() {
		return this._filters;
	}

	async createFilter(searchText) {
		if (searchText === "") return;
		const data = await this.getCache();
		this._filters[searchText] = this._filterFn(data, searchText);
	}

	async getFilteredPage(searchText, page, reverse = true) {
		if (searchText === "") {
			const data = await this.getPage(page, reverse);
			return data;
		}
		const data = this._filters[searchText];
		if (data === undefined) throw new Error("Filter not created");
		return getPageFromArray(
			data,
			this.constructor.getPageSize(),
			page,
			reverse
		);
	}
}
