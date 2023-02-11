import { Fragment } from "react";
import DataList from "./common/DataList";
import FavouritesListItem from "./Favourites/FavouritesListItem";

const Favourites = () => {
	const queryFn = (searchText) => {
		return async ({ pageParam = 0 }) => {
			const page = await chrome.runtime.sendMessage({
				type: "favourites",
				method: "getFilteredPage",
				args: [searchText, pageParam],
			});
			return page;
		};
	};

	const createFilter = async (e) => {
		await chrome.runtime.sendMessage({
			type: "favourites",
			method: "createFilter",
			args: [e.target.value],
		});
	};

	return (
		<Fragment>
			<DataList
				DataListItem={FavouritesListItem}
				queryKey="favourites"
				queryFn={queryFn}
				createFilter={createFilter}
			/>
		</Fragment>
	);
};

export default Favourites;
