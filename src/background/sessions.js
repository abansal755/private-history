import { v4 as uuidv4 } from "uuid";

chrome.windows.onCreated.addListener(async (window) => {
	if (!window.incognito) return;
	const { sessions = {} } = await chrome.storage.local.get("sessions");
	const newSessions = { ...sessions };
	newSessions[window.id] = {};
	await chrome.storage.local.set({ sessions: newSessions });
});

chrome.windows.onRemoved.addListener(async (windowId) => {
	const { sessions = {} } = await chrome.storage.local.get("sessions");
	if (sessions[windowId]) {
		const newSessions = { ...sessions };
		const newSession = newSessions[windowId];
		newSession.timestamp = new Date().toUTCString();
		delete newSessions[windowId];
		if (Object.keys(newSession).length > 1)
			newSessions[uuidv4()] = newSession;
		await chrome.storage.local.set({ sessions: newSessions });
	}
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	if (changeInfo.status !== "complete") return;
	if (!tab.incognito) return;

	const { sessions = {} } = await chrome.storage.local.get("sessions");
	const newSessions = { ...sessions };
	newSessions[tab.windowId][tabId] = {
		url: tab.url,
		title: tab.title,
		favIconUrl: tab.favIconUrl,
	};
	await chrome.storage.local.set({ sessions: newSessions });
});

chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
	if (removeInfo.isWindowClosing) return;
	const { sessions = {} } = await chrome.storage.local.get("sessions");
	const newSessions = { ...sessions };
	if (newSessions[removeInfo.windowId])
		delete newSessions[removeInfo.windowId][tabId];
	await chrome.storage.local.set({ sessions: newSessions });
});
