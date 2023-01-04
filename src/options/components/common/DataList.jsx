import { Fragment, useState } from "react";
import {
	Box,
	Button,
	Divider,
	List,
	ListItem,
	IconButton,
	ListItemText,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import StarIcon from "@mui/icons-material/Star";
import { v4 as uuidv4 } from "uuid";

const pageSize = 50;

const DataList = ({ list, DataListItem }) => {
	const [cursor, setCursor] = useState(pageSize);
	const [searchText, setSearchText] = useState("");

	// Search
	let filteredList = list;
	if (searchText.length > 0) {
		filteredList = [];
		list.forEach((item) => {
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
				filteredList.push(newItem);
			}
		});
	}

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
					{filteredList.slice(0, cursor).map((item, idx) => {
						return (
							<Fragment key={item.id}>
								<DataListItem
									item={item}
									searchText={searchText}
								/>
								{idx !== list.length - 1 && <Divider />}
							</Fragment>
						);
					})}
					<ListItem>
						<Button
							onClick={() => setCursor((prev) => prev + pageSize)}
							disabled={cursor >= filteredList.length}
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

export default DataList;
