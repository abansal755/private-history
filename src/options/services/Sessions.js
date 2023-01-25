export const fetch = async () => {
	const { sessions: rawSessions = {} } = await chrome.storage.local.get(
		"sessions"
	);
	const sessions = [];
	for (const sessionId in rawSessions) {
		if (!rawSessions[sessionId].timestamp) continue;
		const tabs = [];
		for (const tabId in rawSessions[sessionId]) {
			if (tabId === "timestamp") continue;
			tabs.push(rawSessions[sessionId][tabId]);
		}
		sessions.push({
			id: sessionId,
			timestamp: rawSessions[sessionId].timestamp,
			tabs,
		});
	}
	sessions.sort((a, b) => {
		const timeA = new Date(a.timestamp).getTime();
		const timeB = new Date(b.timestamp).getTime();
		return timeB - timeA;
	});
	return sessions;
};
