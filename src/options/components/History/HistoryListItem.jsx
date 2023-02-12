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
import { grey } from "@mui/material/colors";
import PublicIcon from "@mui/icons-material/Public";
import SearchText from "../common/SearchText";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { memo } from "react";

const HistoryListItem = ({ item, searchText }) => {
	const { enqueueSnackbar } = useSnackbar();

	const timestamp = new Date(item.timestamp);

	const mutation = useMutation(
		async (item) => {
			await chrome.runtime.sendMessage({
				type: "favourites",
				method: "push",
				args: [item],
			});
		},
		{
			onSuccess: () => {
				enqueueSnackbar("Added to favourites");
			},
		}
	);

	const favouriteBtnClickHandler = (item, event) => {
		event.stopPropagation();
		mutation.mutate(item);
	};

	const itemClickHandler = async (item) => {
		await navigator.clipboard.writeText(item.url);
		enqueueSnackbar("Copied to clipboard");
	};

	return (
		<ListItem
			key={item.id}
			secondaryAction={
				<Tooltip title="Favourite">
					<IconButton
						onClick={(e) => favouriteBtnClickHandler(item, e)}
					>
						<StarIcon />
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

export default memo(HistoryListItem);
