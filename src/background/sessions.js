import cache from "./cache";

chrome.windows.onCreated.addListener(async (window) => {
	await cache.sessions.initSession(window);
});

chrome.windows.onRemoved.addListener(async (windowId) => {
	await cache.sessions.closeSession(windowId);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	await cache.sessions.addTab(tabId, changeInfo, tab);
});

chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
	await cache.sessions.removeTab(tabId, removeInfo);
});

chrome.runtime.onStartup.addListener(async () => {
	const sessions = await cache.sessions.getCache();
	for (const sessionId in sessions) {
		const session = sessions[sessionId];
		if (session.timestamp) continue;
		await cache.sessions.closeSession(sessionId);
	}
});
