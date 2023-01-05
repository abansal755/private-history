export const fetch = async () => {
	const { history = [] } = await chrome.storage.local.get("history");
	history.reverse();
	return history;
};
