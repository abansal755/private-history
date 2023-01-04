import { v4 as uuidv4 } from "uuid";
import {
	Box,
	IconButton,
	ListItem,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PublicIcon from "@mui/icons-material/Public";
import { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const FavouritesListItem = ({ item, searchText }) => {
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

	return (
		<Fragment>
			<ListItem
				secondaryAction={
					<IconButton>
						<DeleteIcon />
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

export default FavouritesListItem;
