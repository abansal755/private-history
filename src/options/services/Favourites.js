import { v4 as uuidv4 } from "uuid";

export const fetch = async () => {
	const { favourites = [] } = await chrome.storage.local.get("favourites");
	favourites.reverse();
	return favourites;
};

export const getModifiedItem = (item) => {
	const modifiedItem = { ...item };
	modifiedItem.id = uuidv4();
	modifiedItem.timestamp = new Date().toUTCString();
	return modifiedItem;
};

export const add = async (item) => {
	const { favourites = [] } = await chrome.storage.local.get("favourites");

	await chrome.storage.local.set({
		favourites: [...favourites, getModifiedItem(item)],
	});
};
