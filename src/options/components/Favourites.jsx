import { Fragment } from "react";
import DataList from "./common/DataList";
import FavouritesListItem from "./Favourites/FavouritesListItem";

const Favourites = () => {
	const queryFunctor = (searchText, reverse) => {
		return async ({ pageParam = 0 }) => {
			const page = await chrome.runtime.sendMessage({
				type: "favourites",
				method: "getFilteredPage",
				args: [searchText, pageParam, reverse],
			});
			return page;
		};
	};

	const createFilter = async (searchText) => {
		await chrome.runtime.sendMessage({
			type: "favourites",
			method: "createFilter",
			args: [searchText],
		});
	};

	return (
		<Fragment>
			<DataList
				DataListItem={FavouritesListItem}
				queryKey="favourites"
				queryFunctor={queryFunctor}
				createFilter={createFilter}
			/>
		</Fragment>
	);
};

export default Favourites;
