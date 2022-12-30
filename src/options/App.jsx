import {
	Paper,
	Typography,
	Container,
	Box,
	CircularProgress,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Link,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import HistoryList from "./components/HistoryList";
import { useState } from "react";

const App = () => {
	const {
		data: history,
		isLoading,
		isSuccess,
	} = useQuery("history", async () => {
		const fromStorage = await chrome.storage.local.get(null);
		const newData = [];
		for (const id in fromStorage)
			newData.push({
				...fromStorage[id],
				id,
			});

		newData.sort((a, b) => {
			const aDate = new Date(a.timestamp);
			const bDate = new Date(b.timestamp);
			return bDate.getTime() - aDate.getTime();
		});
		return newData;
	});

	const queryClient = useQueryClient();

	const mutation = useMutation(
		async () => {
			await chrome.storage.local.clear();
		},
		{
			onMutate: () => {
				const oldHistory = queryClient.getQueryData("history");
				queryClient.setQueryData("history", []);

				return oldHistory;
			},
			onError: (err, { message }, oldHistory) => {
				queryClient.setQueryData("history", oldHistory);
			},
		}
	);

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const dialogCloseHandler = () => {
		setIsDialogOpen(false);
	};

	const dialogOpenHandler = () => {
		setIsDialogOpen(true);
	};

	const clearHistoryHandler = async () => {
		mutation.mutate({
			message: "Clear All",
		});
		dialogCloseHandler();
	};

	const blob = new Blob([JSON.stringify(history)]);
	const blobUrl = URL.createObjectURL(blob);

	return (
		<Container>
			<Typography variant="h2" component="h1" align="center">
				Private History
			</Typography>
			<Box justifyContent="center" display="flex" marginTop={2}>
				<Button
					variant="contained"
					sx={{ marginRight: 2 }}
					onClick={dialogOpenHandler}
				>
					Clear All
				</Button>
				<Dialog open={isDialogOpen} onClose={dialogCloseHandler}>
					<DialogTitle>Warning</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to clear all the private
							browsing history? This action is irreversible
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={clearHistoryHandler}>Yes</Button>
						<Button onClick={dialogCloseHandler}>Cancel</Button>
					</DialogActions>
				</Dialog>
				<Button
					variant="contained"
					component={Link}
					href={blobUrl}
					download="private-history.json"
				>
					Download As File
				</Button>
			</Box>
			{isLoading && (
				<Box justifyContent="center" display="flex">
					<CircularProgress />
				</Box>
			)}
			{isSuccess && history.length > 0 && (
				<Paper elevation={6} sx={{ marginTop: 5, padding: 2 }}>
					<HistoryList history={history} />
				</Paper>
			)}
		</Container>
	);
};

export default App;
