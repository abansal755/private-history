import {
	Box,
	IconButton,
	List,
	ListItem,
	Tooltip,
	Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import SettingsIcon from "@mui/icons-material/Settings";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const transitionDuration = 400;

const ClosedDrawer = ({
	drawerStrings,
	drawerUrls,
	drawerIdx,
	setDrawerIdx,
	innerListHeight,
}) => {
	const history = useHistory();

	const [isTextHidden, setIsTextHidden] = useState(false);

	const arr = [];
	for (let idx = 0; idx < drawerStrings[drawerIdx].length; idx++) {
		arr.push(drawerStrings[drawerIdx][idx]);
	}

	const collapsedIndicatorClickHandler = () => {
		setIsTextHidden(true);
		setTimeout(() => {
			setDrawerIdx((prev) => {
				const next = (prev + 1) % drawerStrings.length;
				history.push(drawerUrls[next]);
				return next;
			});
			setIsTextHidden(false);
		}, transitionDuration / 2);
	};

	const settingsBtnClickHandler = () => {
		setIsTextHidden(true);
		setTimeout(() => {
			setDrawerIdx(3);
			history.push("/settings");
			setIsTextHidden(false);
		}, transitionDuration / 2);
	};

	return (
		<Box
			sx={{
				height: innerListHeight ? `${innerListHeight}px` : "100%",
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
						transition: "background-color 300ms",
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
							opacity: `${isTextHidden ? 0 : 100}%`,
							transform: `scale(${isTextHidden ? 1.5 : 1})`,
							transition: `opacity ${
								transitionDuration / 2
							}ms, transform ${transitionDuration / 2}ms`,
						},
					}}
				>
					{arr.map((char, idx) => (
						<ListItem
							key={idx}
							sx={{
								display: "flex",
								justifyContent: "center",
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
					<IconButton onClick={settingsBtnClickHandler}>
						<SettingsIcon />
					</IconButton>
				</Tooltip>
			</ListItem>
		</Box>
	);
};

export default ClosedDrawer;
