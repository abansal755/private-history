import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
	Typography,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link as BrowserLink, useHistory } from "react-router-dom";
import { Fragment, useState } from "react";
import { grey } from "@mui/material/colors";

const drawerStrings = ["History", "Favourites", "Sessions"];
const drawerUrls = ["/", "/favourites", "/sessions"];

const Navbar = () => {
	const [drawerIdx, setDrawerIdx] = useState(0);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const history = useHistory();

	const collapsedIndicatorClickHandler = () => {
		setDrawerIdx((prev) => {
			const next = (prev + 1) % drawerStrings.length;
			history.push(drawerUrls[next]);
			return next;
		});
	};

	return (
		<Drawer variant="permanent">
			<Paper sx={{ height: "100vh" }}>
				<List
					sx={{
						width: isDrawerOpen ? "250px" : "72px",
						transition: "width 300ms",
						height: "100%",
						overflow: "hidden",
					}}
				>
					<ListItem
						sx={{ display: "flex", justifyContent: "flex-end" }}
					>
						<IconButton
							onClick={() => setIsDrawerOpen((prev) => !prev)}
							sx={{
								transform: `rotate(${
									isDrawerOpen ? 0 : 180
								}deg)`,
								transition: "transform 300ms",
							}}
						>
							<NavigateBeforeIcon />
						</IconButton>
					</ListItem>
					{isDrawerOpen && (
						<Fragment>
							{drawerStrings.map((str, idx) => (
								<ListItemButton
									component={BrowserLink}
									to={drawerUrls[idx]}
									selected={drawerIdx === idx}
									onClick={() => setDrawerIdx(idx)}
									key={idx}
								>
									<ListItemText
										sx={{
											justifyContent: "center",
											display: "flex",
										}}
									>
										{str}
									</ListItemText>
								</ListItemButton>
							))}
						</Fragment>
					)}
					{!isDrawerOpen &&
						(() => {
							const arr = [];
							for (
								let idx = 0;
								idx < drawerStrings[drawerIdx].length;
								idx++
							) {
								arr.push(drawerStrings[drawerIdx][idx]);
							}

							return (
								<List
									sx={{
										"&": {
											height: "100%",
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											cursor: "pointer",
										},
										"&:hover": {
											backgroundColor: grey[900],
										},
									}}
									onClick={collapsedIndicatorClickHandler}
								>
									{arr.map((char, idx) => (
										<ListItem
											key={idx}
											sx={{
												display: "flex",
												justifyContent: "center",
											}}
										>
											<Typography variant="subtitle1">
												{char.toUpperCase()}
											</Typography>
										</ListItem>
									))}
								</List>
							);
						})()}
				</List>
			</Paper>
		</Drawer>
	);
};

export default Navbar;
