import { useQuery } from "react-query";
import DataList from "./common/DataList";
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
			{isLoading && <LoadingFallback />}
			{isSuccess && (
				<DataList list={history} DataListItem={HistoryListItem} />
			)}
		</Fragment>
	);
};

export default History;
