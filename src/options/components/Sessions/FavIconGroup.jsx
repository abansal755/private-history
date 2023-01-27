import { Avatar, Box } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import randomColor from "randomcolor";
import { useState } from "react";

const maxLength = 4;

const FavIconGroup = ({ session }) => {
	const [iconColors] = useState([
		...session.tabs.map((tab) => {
			if (!tab.favIconUrl) return randomColor({ luminosity: "light" });
		}),
		randomColor({ luminosity: "light" }),
	]);

	return (
		<Box
			total={session.tabs.length}
			sx={{
				marginRight: 2,
				display: "flex",
			}}
		>
			{(() => {
				let tabs = session.tabs;
				if (session.tabs.length > maxLength)
					tabs = tabs.slice(0, maxLength);
				return tabs.map((tab, idx) => (
					<Avatar
						src={tab.favIconUrl}
						key={idx}
						sx={{
							height: 40,
							width: 40,
							marginRight: 0.5,
							backgroundColor: iconColors[idx],
						}}
					>
						<PublicIcon sx={{ fontSize: 32 }} />
					</Avatar>
				));
			})()}
			{session.tabs.length > maxLength && (
				<Avatar
					sx={{
						backgroundColor: iconColors[iconColors.length - 1],
					}}
				>
					+{session.tabs.length - maxLength}
				</Avatar>
			)}
		</Box>
	);
};

export default FavIconGroup;
