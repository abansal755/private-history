import { useQuery } from "react-query";
import { fetch as fetchSessions } from "../services/Sessions";
import { Fragment } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	CircularProgress,
	List,
	ListItem,
	ListItemText,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PublicIcon from "@mui/icons-material/Public";

const Sessions = () => {
	const {
		data: sessions,
		isLoading,
		isSuccess,
	} = useQuery("sessions", fetchSessions);

	return (
		<Fragment>
			{isLoading && (
				<Box justifyContent="center" display="flex">
					<CircularProgress />
				</Box>
			)}
			{isSuccess && (
				<Box sx={{ marginTop: 3 }}>
					{sessions.length === 0 && (
						<Paper
							elevation={6}
							sx={{
								marginY: 2,
								padding: 2,
								display: "flex",
								justifyContent: "center",
							}}
						>
							Nothing found here...
						</Paper>
					)}
					{sessions.length > 0 &&
						sessions.map((session) => (
							<Accordion key={session.id}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									<Stack>
										<Box>
											<Typography
												variant="subtitle1"
												sx={{
													whiteSpace: "nowrap",
												}}
											>
												{new Date(
													session.timestamp
												).toLocaleTimeString()}
											</Typography>
										</Box>
										<Box>
											<Typography variant="subtitle2">
												{new Date(
													session.timestamp
												).toLocaleDateString()}
											</Typography>
										</Box>
									</Stack>
								</AccordionSummary>
								<AccordionDetails>
									<List>
										{session.tabs.map((tab, idx) => (
											<ListItem key={idx}>
												{tab.favIconUrl && (
													<img
														src={tab.favIconUrl}
														width="32"
														height="32"
													/>
												)}
												{!tab.favIconUrl && (
													<PublicIcon />
												)}
												<ListItemText
													primary={tab.title}
													secondary={tab.url}
													sx={{ marginX: 2 }}
												/>
											</ListItem>
										))}
									</List>
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			)}
		</Fragment>
	);
};

export default Sessions;
