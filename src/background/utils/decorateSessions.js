const decorateSession = (sessionId, session) => {
	const tabs = [];
	for (const tabId in session) {
		if (tabId === "timestamp") continue;
		tabs.push(session[tabId]);
	}
	return {
		id: sessionId,
		timestamp: session.timestamp,
		tabs,
	};
};

const decorateSessions = (rawSessions) => {
	const sessions = [];
	for (const sessionId in rawSessions) {
		const session = rawSessions[sessionId];
		if (!session.timestamp) continue;
		sessions.push(decorateSession(sessionId, session));
	}
	sessions.sort((a, b) => {
		const timeA = new Date(a.timestamp).getTime();
		const timeB = new Date(b.timestamp).getTime();
		return timeA - timeB;
	});
	return sessions;
};

export default decorateSessions;
