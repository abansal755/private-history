import { useQuery } from "react-query";
import { Box, CircularProgress } from "@mui/material";
import { Fragment } from "react";
import DataList from "./common/DataList";
import FavouritesListItem from "./Favourites/FavouritesListItem";
import { fetch as fetchFavourites } from "../services/Favourites";

const Favourites = () => {
	const {
		data: favourites,
		isLoading,
		isSuccess,
	} = useQuery("favourites", fetchFavourites);

	return (
		<Fragment>
			{isLoading && (
				<Box justifyContent="center" display="flex">
					<CircularProgress />
				</Box>
			)}
			{isSuccess && (
				<DataList list={favourites} DataListItem={FavouritesListItem} />
			)}
		</Fragment>
	);
};

export default Favourites;
