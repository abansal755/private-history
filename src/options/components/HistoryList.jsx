import { Fragment, useState } from "react";
import {
	Box,
	Button,
	Divider,
	List,
	ListItem,
	ListItemText,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";

const pageSize = 50;

const HistoryList = ({ history }) => {
	const [cursor, setCursor] = useState(pageSize);
	const [searchText, setSearchText] = useState("");

	// Search
	let filteredHistory = history;
	if (searchText.length > 0) {
		filteredHistory = [];
		history.forEach((item) => {
			let { url, title } = item;
			url = url.toLowerCase();
			title = title.toLowerCase();
			const filter = searchText.toLowerCase();

			const urlIdx = url.indexOf(filter);
			const titleIdx = title.indexOf(filter);
			if (urlIdx !== -1 || titleIdx !== -1) {
				const newItem = { ...item };
				if (titleIdx !== -1)
					newItem.match = {
						type: "title",
						idx: titleIdx,
					};
				else if (urlIdx !== -1)
					newItem.match = {
						type: "url",
						idx: urlIdx,
					};
				filteredHistory.push(newItem);
			}
		});
	}

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
			<Box display="flex" sx={{ marginTop: 3 }}>
				<TextField
					variant="filled"
					fullWidth
					label="Search"
					value={searchText}
					onInput={(e) => setSearchText(e.target.value)}
				/>
				<Button
					variant="contained"
					sx={{ marginLeft: 2 }}
					onClick={() => setSearchText("")}
				>
					Clear
				</Button>
			</Box>
			<Paper elevation={6} sx={{ marginY: 2, padding: 2 }}>
				<List>
					{filteredHistory.slice(0, cursor).map((item, idx) => {
						const timestamp = new Date(item.timestamp);

						return (
							<Fragment key={item.id}>
								<ListItem>
									{item.favIconUrl && (
										<img
											src={item.favIconUrl}
											width="32"
											height="32"
										/>
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
									<Stack>
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
								{idx !== history.length - 1 && <Divider />}
							</Fragment>
						);
					})}
					<ListItem>
						<Button
							onClick={() => setCursor((prev) => prev + pageSize)}
							disabled={cursor >= filteredHistory.length}
							sx={{
								marginX: "auto",
							}}
						>
							Load More
						</Button>
					</ListItem>
				</List>
			</Paper>
		</Fragment>
	);
};

export default HistoryList;
