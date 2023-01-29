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

const ClosedDrawer = ({
	drawerStrings,
	drawerUrls,
	drawerIdx,
	setDrawerIdx,
	innerListHeight,
}) => {
	const history = useHistory();

	const arr = [];
	for (let idx = 0; idx < drawerStrings[drawerIdx].length; idx++) {
		arr.push(drawerStrings[drawerIdx][idx]);
	}

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
