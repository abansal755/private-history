import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import DataList from "./common/DataList";
import DownloadButton from "./History/DownloadButton";
import ClearAllButton from "./History/ClearAllButton";
import PrivateAccessDialog from "./History/PrivateAccessDialog";
import { Fragment } from "react";
import HistoryListItem from "./History/HistoryListItem";
import { fetch as fetchHistory } from "../services/History";
import LoadingFallback from "./common/LoadingFallback";

const History = () => {
	const {
		data: history,
		isLoading,
		isSuccess,
	} = useQuery("history", fetchHistory);

	return (
		<Fragment>
			<PrivateAccessDialog />
			<Box justifyContent="center" display="flex" marginTop={2}>
				<ClearAllButton />
				<DownloadButton history={history} />
			</Box>
			{isLoading && <LoadingFallback />}
			{isSuccess && (
				<DataList list={history} DataListItem={HistoryListItem} />
			)}
		</Fragment>
	);
};

export default History;
