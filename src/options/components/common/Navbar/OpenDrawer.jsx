import { ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link as BrowserLink } from "react-router-dom";
import { Fragment } from "react";
import HistoryIcon from "@mui/icons-material/History";
import StarIcon from "@mui/icons-material/Star";
import LaptopIcon from "@mui/icons-material/Laptop";
import SettingsIcon from "@mui/icons-material/Settings";

const OpenDrawer = ({ drawerStrings, drawerUrls, drawerIdx, setDrawerIdx }) => {
	const icons = [
		<HistoryIcon />,
		<StarIcon />,
		<LaptopIcon />,
		<SettingsIcon />,
	];
	return (
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
						<Typography sx={{ marginLeft: 1 }}>{str}</Typography>
					</ListItemText>
				</ListItemButton>
			))}
		</Fragment>
	);
};

export default OpenDrawer;
