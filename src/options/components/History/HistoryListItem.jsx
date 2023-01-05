import {
	Box,
	IconButton,
	ListItem,
	ListItemText,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PublicIcon from "@mui/icons-material/Public";
import { Fragment } from "react";
import SearchText from "../common/SearchText";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";
import {
	add as addFavourite,
	getModifiedItem,
} from "../../services/Favourites";

const HistoryListItem = ({ item, searchText }) => {
	const timestamp = new Date(item.timestamp);

	const queryClient = useQueryClient();

	const mutation = useMutation(addFavourite, {
		onMutate: (item) => {
			const oldFavourites = queryClient.getQueryData("favourites");
			queryClient.setQueryData("favourites", [
				...oldFavourites,
				getModifiedItem(item),
			]);

			return oldFavourites;
		},
		onError: (err, item, oldFavourites) => {
			queryClient.setQueryData("favourites", oldFavourites);
		},
	});

	const favouriteBtnClickHandler = (item) => {
		enqueueSnackbar("Added to favourites");
		mutation.mutate(item);
	};

	const { enqueueSnackbar } = useSnackbar();

	return (
		<Fragment>
			<ListItem
				secondaryAction={
					<Tooltip title="Favourite">
						<IconButton
							onClick={() => favouriteBtnClickHandler(item)}
						>
							<StarIcon />
						</IconButton>
					</Tooltip>
				}
			>
				{item.favIconUrl && (
					<img src={item.favIconUrl} width="32" height="32" />
				)}
				{!item.favIconUrl && <PublicIcon />}
				<ListItemText
					primary={
						<SearchText
							item={item}
							type="title"
							searchText={searchText}
						/>
					}
					secondary={
						<SearchText
							item={item}
							type="url"
							searchText={searchText}
						/>
					}
					sx={{
						marginX: 2,
						overflow: "hidden",
					}}
				/>
				<Stack sx={{ marginRight: 2 }}>
					<Box>
						<Typography
							variant="subtitle1"
							sx={{
								whiteSpace: "nowrap",
							}}
						>
							{timestamp.toLocaleTimeString()}
						</Typography>
					</Box>
					<Box>
						<Typography variant="subtitle2">
							{timestamp.toLocaleDateString()}
						</Typography>
					</Box>
				</Stack>
			</ListItem>
		</Fragment>
	);
};

export default HistoryListItem;
