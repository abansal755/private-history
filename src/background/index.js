import "./history";
import "./sessions";
import cache from "./cache";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	(async () => {
		const { type, method, args = [] } = request;
		const response = await cache[type][method](...args);
		sendResponse(response);
	})();
	return true;
});
