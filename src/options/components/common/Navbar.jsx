import {
	Box,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Tooltip,
	Typography,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link as BrowserLink, useHistory } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from "react";
import { grey } from "@mui/material/colors";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";
import LaptopIcon from "@mui/icons-material/Laptop";

const drawerStrings = ["History", "Favourites", "Sessions", "Settings"];
const drawerUrls = ["/", "/favourites", "/sessions", "/settings"];

const Navbar = () => {
	const history = useHistory();
	const [drawerIdx, setDrawerIdx] = useState(() => {
		const initPath = history.location.pathname;
		const initIdx = drawerUrls.indexOf(initPath);
		return initIdx;
	});

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const collapsedIndicatorClickHandler = () => {
		setDrawerIdx((prev) => {
			const next = (prev + 1) % drawerStrings.length;
			history.push(drawerUrls[next]);
			return next;
		});
	};

	const settingsBtnClickHandler = () => {
		setDrawerIdx(3);
		history.push("/settings");
	};

	const outerListRef = useRef();
	const arrowBtnRef = useRef();

	const [innerListHeight, setInnerListHeight] = useState(null);

	useEffect(() => {
		let paddingY = getComputedStyle(outerListRef.current).getPropertyValue(
			"padding-top"
		);
		paddingY = paddingY.slice(0, -2);
		paddingY = parseInt(paddingY);

		const btnHeight = arrowBtnRef.current.clientHeight;

		setInnerListHeight(window.innerHeight - 2 * paddingY - btnHeight);
	});

	const icons = [
		<HistoryIcon />,
		<StarIcon />,
		<LaptopIcon />,
		<SettingsIcon />,
	];

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
					ref={outerListRef}
				>
					<ListItem
						sx={{ display: "flex", justifyContent: "flex-end" }}
						ref={arrowBtnRef}
					>
						<Tooltip title={isDrawerOpen ? "Collapse" : "Expand"}>
							<IconButton
								onClick={() => setIsDrawerOpen((prev) => !prev)}
								sx={{
									transform: `rotate(${
										isDrawerOpen ? 0 : 180
									}deg)`,
									transition:
										"transform 300ms, background-color 300ms",
								}}
							>
								<NavigateBeforeIcon />
							</IconButton>
						</Tooltip>
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
											"& > .MuiTypography-root": {
												display: "flex",
												justifyContent: "center",
											},
										}}
									>
										{icons[idx]}
										<Typography sx={{ marginLeft: 1 }}>
											{str}
										</Typography>
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
								<Box
									sx={{
										height: innerListHeight
											? `${innerListHeight}px`
											: "100%",
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
									}}
								>
									<Box
										sx={{
											"&": {
												height: "100%",
												display: "flex",
												flexDirection: "column",
												justifyContent: "center",
												cursor: "pointer",
												transition:
													"background-color 300ms",
											},
											"&:hover": {
												backgroundColor: grey[900],
											},
										}}
										onClick={collapsedIndicatorClickHandler}
									>
										<List
											sx={{
												"&": {
													display: "flex",
													flexDirection: "column",
													justifyContent: "center",
												},
											}}
										>
											{arr.map((char, idx) => (
												<ListItem
													key={idx}
													sx={{
														display: "flex",
														justifyContent:
															"center",
													}}
												>
													<Typography variant="h5">
														{char.toUpperCase()}
													</Typography>
												</ListItem>
											))}
										</List>
									</Box>
									<ListItem>
										<Tooltip title="Settings">
											<IconButton
												onClick={
													settingsBtnClickHandler
												}
											>
												<SettingsIcon />
											</IconButton>
										</Tooltip>
									</ListItem>
								</Box>
							);
						})()}
				</List>
			</Paper>
		</Drawer>
	);
};

export default Navbar;
