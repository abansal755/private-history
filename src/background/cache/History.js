import FilteredArrayCache from "./FilteredArrayCache";
import filterFn from "../utils/filterFn";

export default class History extends FilteredArrayCache {
	constructor() {
		super("history", filterFn);
	}
}
