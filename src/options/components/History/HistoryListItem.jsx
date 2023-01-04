import {
	Box,
	Divider,
	IconButton,
	ListItem,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PublicIcon from "@mui/icons-material/Public";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

const HistoryListItem = ({ item, searchText }) => {
	const timestamp = new Date(item.timestamp);

	const getJsx = (item, type) => {
		if (!item.match || item.match.type !== type) return item[type];

		return (
			<span>
				{item[type].slice(0, item.match.idx)}
				<b>
					{item[type].slice(
						item.match.idx,
						item.match.idx + searchText.length
					)}
				</b>
				{item[type].slice(item.match.idx + searchText.length)}
			</span>
		);
	};

	const favouriteBtnClickHandler = async (item) => {
		const { favourites = [] } = await chrome.storage.local.get(
			"favourites"
		);

		const modifiedItem = { ...item };
		modifiedItem.id = uuidv4();
		modifiedItem.timestamp = new Date().toUTCString();

		await chrome.storage.local.set({
			favourites: [...favourites, modifiedItem],
		});
	};

	return (
		<Fragment>
			<ListItem
				secondaryAction={
					<IconButton onClick={() => favouriteBtnClickHandler(item)}>
						<StarIcon />
					</IconButton>
				}
			>
				{item.favIconUrl && (
					<img src={item.favIconUrl} width="32" height="32" />
				)}
				{!item.favIconUrl && <PublicIcon />}
				<ListItemText
					primary={getJsx(item, "title")}
					secondary={getJsx(item, "url")}
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
