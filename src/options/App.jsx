import {
	Paper,
	Typography,
	Container,
	Box,
	CircularProgress,
} from "@mui/material";
import { useQuery } from "react-query";
import HistoryList from "./components/HistoryList";
import DownloadButton from "./components/DownloadButton";
import ClearAllButton from "./components/ClearAllButton";
import PrivateAccessDialog from "./components/PrivateAccessDialog";

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

	return (
		<Container>
			<PrivateAccessDialog />
			<Typography variant="h2" component="h1" align="center">
				Private History
			</Typography>
			<Box justifyContent="center" display="flex" marginTop={2}>
				<ClearAllButton />
				<DownloadButton history={history} />
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
