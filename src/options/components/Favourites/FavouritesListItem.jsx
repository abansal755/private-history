import {
	Box,
	IconButton,
	ListItem,
	ListItemText,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "react-query";
import SearchText from "../common/SearchText";
import { useSnackbar } from "notistack";
import { remove as removeFavourite } from "../../services/Favourites";
import { grey } from "@mui/material/colors";

const FavouritesListItem = ({ item, searchText, listSize, idx }) => {
	const timestamp = new Date(item.timestamp);

	const queryClient = useQueryClient();

	const mutation = useMutation(removeFavourite(listSize), {
		onMutate: (idx) => {
			const oldFavourites = queryClient.getQueryData("favourites");
			queryClient.setQueryData("favourites", [
				...oldFavourites.slice(0, idx),
				...oldFavourites.slice(idx + 1),
			]);

			return oldFavourites;
		},
		onError: (err, idx, oldFavourites) => {
			queryClient.setQueryData("favourites", oldFavourites);
		},
	});

	const { enqueueSnackbar } = useSnackbar();

	const removeBtnClickHandler = (idx, event) => {
		event.stopPropagation();
		enqueueSnackbar("Removed from favourites");
		mutation.mutate(idx);
	};

	const itemClickHandler = async () => {
		await navigator.clipboard.writeText(item.url);
		enqueueSnackbar("Copied to clipboard");
	};

	return (
		<Fragment>
			<ListItem
				secondaryAction={
					<Tooltip title="Remove">
						<IconButton
							onClick={(e) => removeBtnClickHandler(idx, e)}
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				}
				sx={{
					"&": {
						cursor: "pointer",
						borderTopLeftRadius: idx === 0 ? 5 : 0,
						borderTopRightRadius: idx === 0 ? 5 : 0,
						borderBottomLeftRadius: idx === listSize - 1 ? 5 : 0,
						borderBottomRightRadius: idx === listSize - 1 ? 5 : 0,
					},
					"&:hover": {
						backgroundColor: grey[800],
					},
				}}
				onClick={itemClickHandler}
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

export default FavouritesListItem;
