import ObjectCache from "./ObjectCache";
import decorateSessions from "../utils/decorateSessions";
import { v4 as uuidv4 } from "uuid";

export default class Sessions extends ObjectCache {
	constructor() {
		super("sessions", decorateSessions);

		this.addMutation("initSession", async (window) => {
			if (!window.incognito) return;
			const sessions = await this.getCache();
			const newSessions = { ...sessions };
			newSessions[window.id] = {};
			await this.setCache(newSessions);
		});

		this.addMutation("closeSession", async (windowId) => {
			const sessions = await this.getCache();
			if (!sessions[windowId]) return;
			const newSessions = { ...sessions };
			const newSession = { ...newSessions[windowId] };
			newSession.timestamp = new Date().toUTCString();
			delete newSessions[windowId];
			if (Object.keys(newSession).length > 1)
				newSessions[uuidv4()] = newSession;
			await this.setCache(newSessions);
		});

		this.addMutation("addTab", async (tabId, changeInfo, tab) => {
			if (changeInfo.status !== "complete") return;
			if (!tab.incognito) return;

			const sessions = await this.getCache();
			const newSessions = { ...sessions };
			const newSession = { ...newSessions[tab.windowId] };
			newSession[tabId] = {
				url: tab.url,
				title: tab.title,
				favIconUrl: tab.favIconUrl,
			};
			newSessions[tab.windowId] = newSession;
			await this.setCache(newSessions);
		});

		this.addMutation("removeTab", async (tabId, removeInfo) => {
			if (removeInfo.isWindowClosing) return;
			const sessions = await this.getCache();
			const newSessions = { ...sessions };
			const session = newSessions[removeInfo.windowId];
			if (session) {
				const newSession = { ...session };
				delete newSession[tabId];
			}
			await this.setCache(newSessions);
		});

		this.addMutation("removeSession", async (id) => {
			const sessions = await this.getCache();
			const newSessions = { ...sessions };
			delete newSessions[id];
			await this.setCache(newSessions);
		});
	}
}
