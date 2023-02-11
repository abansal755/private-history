import { v4 as uuidv4 } from "uuid";
import cache from "./cache";

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	if (changeInfo.status !== "complete") return;
	if (!tab.incognito) return;

	await cache.history.push({
		id: uuidv4(),
		timestamp: new Date().toUTCString(),
		url: tab.url,
		title: tab.title,
		favIconUrl: tab.favIconUrl,
	});
});
