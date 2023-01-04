import { Typography, Container, Box, CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import DataList from "./common/DataList";
import DownloadButton from "./History/DownloadButton";
import ClearAllButton from "./History/ClearAllButton";
import PrivateAccessDialog from "./History/PrivateAccessDialog";
import { Fragment } from "react";
import HistoryListItem from "./History/HistoryListItem";

const History = () => {
	const {
		data: history,
		isLoading,
		isSuccess,
	} = useQuery("history", async () => {
		const { history = [] } = await chrome.storage.local.get("history");
		history.reverse();
		return history;
	});

	return (
		<Fragment>
			<PrivateAccessDialog />
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
				<DataList list={history} DataListItem={HistoryListItem} />
			)}
		</Fragment>
	);
};

export default History;
