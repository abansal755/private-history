export default class Cache {
	_data = null;
	_key = null;
	_initValue;

	constructor(key, initValue) {
		this._key = key;
		this._initValue = initValue;
	}

	async _hydrate() {
		if (this._data !== null) return;
		let data = await chrome.storage.local.get(this._key);
		data = data[this._key];
		if (data) this._data = data;
		else this._data = this._initValue;
	}

	async getCache() {
		await this._hydrate();
		return this._data;
	}

	async setCache(data) {
		const items = {};
		items[this._key] = data;
		await chrome.storage.local.set(items);
		this._data = data;
	}
}
