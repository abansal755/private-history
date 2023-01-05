export const fetch = async () => {
	const { history = [] } = await chrome.storage.local.get("history");
	history.reverse();
	return history;
};

export const add = (listSize) => {
	return async (idx) => {
		const { favourites = [] } = await chrome.storage.local.get(
			"favourites"
		);
		await chrome.storage.local.set({
			favourites: [
				...favourites.slice(0, listSize - idx - 1),
				...favourites.slice(listSize - idx),
			],
		});
	};
};
