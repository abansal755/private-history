import { v4 as uuidv4 } from "uuid";

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	if (changeInfo.status !== "complete") return;
	if (!tab.incognito) return;

	const { history = [] } = await chrome.storage.local.get("history");
	await chrome.storage.local.set({
		history: [
			...history,
			{
				id: uuidv4(),
				timestamp: new Date().toUTCString(),
				url: tab.url,
				title: tab.title,
				favIconUrl: tab.favIconUrl,
			},
		],
	});
});
