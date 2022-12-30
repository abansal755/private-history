import { Fragment } from "react";
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";

const HistoryList = ({ history }) => {
	return (
		<List>
			{history.map((item, idx) => {
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
								primary={item.title}
								secondary={item.url}
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
		</List>
	);
};

export default HistoryList;
