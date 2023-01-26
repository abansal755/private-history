import { useQuery } from "react-query";
import { fetch as fetchSessions } from "../services/Sessions";
import { Fragment } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	CircularProgress,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabsList from "./Sessions/TabsList";

const Sessions = () => {
	const {
		data: sessions,
		isLoading,
		isSuccess,
	} = useQuery("sessions", fetchSessions);

	const openInIncognitoBtnClickHandler = (session) => {
		return (e) => {
			e.stopPropagation();
			chrome.windows.create({
				incognito: true,
				state: "maximized",
				url: session.tabs.map((tab) => tab.url),
			});
		};
	};

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
									<Box
										display="flex"
										justifyContent="space-between"
										width="100%"
										alignItems="center"
										marginRight={2}
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
										<Button
											onClick={openInIncognitoBtnClickHandler(
												session
											)}
										>
											Open in Incognito
										</Button>
									</Box>
								</AccordionSummary>
								<AccordionDetails>
									<TabsList session={session} />
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			)}
		</Fragment>
	);
};

export default Sessions;
