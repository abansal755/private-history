import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetch as fetchSessions } from "../services/Sessions";
import { Fragment, useState } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	CircularProgress,
	IconButton,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabsList from "./Sessions/TabsList";
import DeleteIcon from "@mui/icons-material/Delete";
import { remove as removeSession } from "../services/Sessions";
import { useSnackbar } from "notistack";

const pageSize = 50;

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

	const queryClient = useQueryClient();

	const mutation = useMutation(removeSession, {
		onMutate: ({ id, idx }) => {
			const oldSessions = queryClient.getQueryData("sessions");
			queryClient.setQueryData("sessions", [
				...oldSessions.slice(0, idx),
				...oldSessions.slice(idx + 1),
			]);
			return oldSessions;
		},
		onError: (err, { id, idx }, oldSessions) => {
			queryClient.setQueryData("sessions", oldSessions);
		},
	});

	const { enqueueSnackbar } = useSnackbar();

	const deleteBtnClickHandler = (session, idx) => {
		return (e) => {
			e.stopPropagation();
			enqueueSnackbar("Removed from sessions");
			mutation.mutate({ id: session.id, idx });
		};
	};

	const [cursor, setCursor] = useState(pageSize);

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
					{sessions.length > 0 && (
						<Box
							display="flex"
							justifyContent="center"
							marginBottom={2}
						>
							<Typography>
								Showing {Math.min(cursor, sessions.length)}{" "}
								results out of {sessions.length}
							</Typography>
						</Box>
					)}
					{sessions.slice(0, cursor).map((session, idx) => (
						<Accordion key={session.id}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
									<Box>
										<Button
											onClick={openInIncognitoBtnClickHandler(
												session
											)}
										>
											Open in Incognito
										</Button>
										<IconButton
											onClick={deleteBtnClickHandler(
												session,
												idx
											)}
										>
											<DeleteIcon />
										</IconButton>
									</Box>
								</Box>
							</AccordionSummary>
							<AccordionDetails>
								<TabsList session={session} />
							</AccordionDetails>
						</Accordion>
					))}
					<Box display="flex" justifyContent="center" marginTop={2}>
						{sessions.length > 0 && (
							<Button
								onClick={() =>
									setCursor((prev) => prev + pageSize)
								}
								disabled={cursor >= sessions.length}
							>
								Load More
							</Button>
						)}
					</Box>
				</Box>
			)}
		</Fragment>
	);
};

export default Sessions;
