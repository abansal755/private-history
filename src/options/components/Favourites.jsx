import { useQuery } from "react-query";
import {
	Box,
	Button,
	CircularProgress,
	List,
	ListItem,
	ListItemText,
	Paper,
} from "@mui/material";
import { Fragment, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import DataList from "./common/DataList";
import HistoryListItem from "./History/HistoryListItem";
import FavouritesListItem from "./FavouritesListItem";

const pageSize = 50;

const Favourites = () => {
	const {
		data: favourites,
		isLoading,
		isSuccess,
	} = useQuery("favourites", async () => {
		const { favourites = [] } = await chrome.storage.local.get(
			"favourites"
		);
		favourites.reverse();
		return favourites;
	});

	return (
		<Fragment>
			{isLoading && (
				<Box justifyContent="center" display="flex">
					<CircularProgress />
				</Box>
			)}
			{isSuccess && favourites.length > 0 && (
				<DataList list={favourites} DataListItem={FavouritesListItem} />
			)}
		</Fragment>
	);
};

export default Favourites;
