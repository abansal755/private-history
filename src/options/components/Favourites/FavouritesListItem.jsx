import {
	Box,
	IconButton,
	ListItem,
	ListItemText,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { grey } from "@mui/material/colors";
import PublicIcon from "@mui/icons-material/Public";
import SearchText from "../common/SearchText";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";

const FavouritesListItem = ({ item, searchText, query }) => {
	const { enqueueSnackbar } = useSnackbar();

	const { refetch } = query;

	const timestamp = new Date(item.timestamp);

	const mutation = useMutation(
		async (id) => {
			await chrome.runtime.sendMessage({
				type: "favourites",
				method: "remove",
				args: [id],
			});
		},
		{
			onSuccess: async () => {
				await refetch();
				enqueueSnackbar("Removed from favourites");
			},
		}
	);

	const favouriteBtnClickHandler = (item, event) => {
		event.stopPropagation();
		mutation.mutate(item.id);
	};

	const itemClickHandler = async (item) => {
		await navigator.clipboard.writeText(item.url);
		enqueueSnackbar("Copied to clipboard");
	};

	return (
		<ListItem
			key={item.id}
			secondaryAction={
				<Tooltip title="Remove">
					<IconButton
						onClick={(e) => favouriteBtnClickHandler(item, e)}
					>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			}
			sx={{
				"&": {
					cursor: "pointer",
					transition: "background-color 300ms",
				},
				"&:hover": {
					backgroundColor: grey[800],
				},
			}}
			onClick={() => itemClickHandler(item)}
		>
			{item.favIconUrl && (
				<img src={item.favIconUrl} width="32" height="32" />
			)}
			{!item.favIconUrl && <PublicIcon sx={{ fontSize: 32 }} />}
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
	);
};

export default FavouritesListItem;
