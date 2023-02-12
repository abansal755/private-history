import Cache from "./Cache";
import getPageFromArray from "../utils/getPageFromArray";

export default class ObjectCache extends Cache {
	_arr = null;
	_decorator;

	constructor(key, decorator) {
		super(key, {});
		this._decorator = decorator;
	}

	async _hydrateArr() {
		if (this._arr !== null) return;
		await this._forceArrHydration();
	}

	async _forceArrHydration() {
		const data = await this.getCache();
		this._arr = this._decorator(data);
	}

	addMutation(methodName, mutationFn) {
		this[methodName] = async function (...args) {
			await mutationFn.call(this, ...args);
			await this._forceArrHydration();
		};
	}

	static getPageSize() {
		return 50;
	}

	async getPage(page, reverse = true) {
		await this._hydrateArr();
		return getPageFromArray(
			this._arr,
			this.constructor.getPageSize(),
			page,
			reverse
		);
	}

	async getLength() {
		await this._hydrateArr();
		return this._arr.length;
	}
}
