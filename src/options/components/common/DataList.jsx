import { Fragment, useState } from "react";
import {
	Box,
	Button,
	Divider,
	FormControl,
	InputLabel,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";

const pageSize = 50;

const DataList = ({ list, DataListItem }) => {
	const [cursor, setCursor] = useState(pageSize);
	const [searchText, setSearchText] = useState("");
	const [sortBy, setSortBy] = useState("timeDesc");
	/*
	sortBy values:
	timeAsc
	timeDesc
	domainAsc
	domainDesc
	* */

	// Search
	let filteredList = [...list];
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

	// Sort
	const sortByDomainName = (desc = true) => {
		const hostsMap = {};
		for (const item of filteredList) {
			const host = new URL(item.url).host;
			if (!hostsMap[host]) hostsMap[host] = [item];
			else hostsMap[host].push(item);
		}
		const hosts = [];
		for (const host in hostsMap) hosts.push(hostsMap[host]);
		hosts.sort((a, b) => {
			if (desc) return b.length - a.length;
			else return a.length - b.length;
		});
		let newFilteredList = [];
		for (const arr of hosts) {
			for (const item of arr) newFilteredList.push(item);
		}
		filteredList = newFilteredList;
	};
	if (sortBy === "timeAsc") filteredList.reverse();
	else if (sortBy === "domainDesc") sortByDomainName();
	else if (sortBy === "domainAsc") sortByDomainName(false);

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
				{filteredList.length > 0 && (
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography textAlign="center">
							Showing {Math.min(filteredList.length, cursor)}{" "}
							results out of {filteredList.length}
						</Typography>
						<FormControl
							sx={{
								marginLeft: 2,
								minWidth: 100,
							}}
							size="small"
						>
							<InputLabel>Sort By</InputLabel>
							<Select
								label="Sort By"
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
							>
								<MenuItem value="timeAsc">
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
										}}
									>
										Timestamp <NorthIcon />
									</Box>
								</MenuItem>
								<MenuItem value="timeDesc">
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
										}}
									>
										Timestamp <SouthIcon />
									</Box>
								</MenuItem>
								<MenuItem value="domainAsc">
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
										}}
									>
										Domain Name <NorthIcon />
									</Box>
								</MenuItem>
								<MenuItem value="domainDesc">
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
										}}
									>
										Domain Name <SouthIcon />
									</Box>
								</MenuItem>
							</Select>
						</FormControl>
					</Box>
				)}
				<List>
					{filteredList.slice(0, cursor).map((item, idx) => {
						return (
							<Fragment key={item.id}>
								<DataListItem
									item={item}
									searchText={searchText}
									listSize={list.length}
									idx={idx}
								/>
								{idx !== list.length - 1 && <Divider />}
							</Fragment>
						);
					})}
					{filteredList.length === 0 && (
						<ListItem>
							<ListItemText
								sx={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								Nothing found here...
							</ListItemText>
						</ListItem>
					)}
					{filteredList.length > 0 && (
						<ListItem>
							<Button
								onClick={() =>
									setCursor((prev) => prev + pageSize)
								}
								disabled={cursor >= filteredList.length}
								sx={{
									marginX: "auto",
								}}
							>
								Load More
							</Button>
						</ListItem>
					)}
				</List>
			</Paper>
		</Fragment>
	);
};

export default DataList;
