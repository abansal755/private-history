import {
	Drawer,
	IconButton,
	List,
	ListItem,
	Paper,
	Tooltip,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import OpenDrawer from "./Navbar/OpenDrawer";
import ClosedDrawer from "./Navbar/ClosedDrawer";
import { drawerStrings, drawerUrls } from "../../ config";

const Navbar = () => {
	const history = useHistory();
	const outerListRef = useRef();
	const arrowBtnRef = useRef();
	const { windowWidth, windowHeight } = useWindowDimensions();

	const [drawerIdx, setDrawerIdx] = useState(() => {
		const initPath = history.location.pathname;
		const initIdx = drawerUrls.indexOf(initPath);
		return initIdx;
	});
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [innerListHeight, setInnerListHeight] = useState(null);

	useEffect(() => {
		let paddingY = getComputedStyle(outerListRef.current).getPropertyValue(
			"padding-top"
		);
		paddingY = paddingY.slice(0, -2);
		paddingY = parseInt(paddingY);

		const btnHeight = arrowBtnRef.current.clientHeight;

		setInnerListHeight(windowHeight - 2 * paddingY - btnHeight);
	}, [windowWidth, windowHeight]);

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
						<OpenDrawer
							drawerIdx={drawerIdx}
							setDrawerIdx={setDrawerIdx}
						/>
					)}
					{!isDrawerOpen && (
						<ClosedDrawer
							drawerIdx={drawerIdx}
							setDrawerIdx={setDrawerIdx}
							innerListHeight={innerListHeight}
						/>
					)}
				</List>
			</Paper>
		</Drawer>
	);
};

export default Navbar;
