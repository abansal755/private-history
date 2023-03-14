import { useInfiniteQuery } from "react-query";
import PrivateAccessDialog from "./History/PrivateAccessDialog";
import { Fragment, useState } from "react";
import DataList from "./common/DataList";
import HistoryListItem from "./History/HistoryListItem";

const History = () => {
	const queryFunctor = (searchText, reverse) => {
		return async ({ pageParam = 0 }) => {
			const page = await chrome.runtime.sendMessage({
				type: "history",
				method: "getFilteredPage",
				args: [searchText, pageParam, reverse],
			});
			return page;
		};
	};

	const createFilter = async (searchText) => {
		await chrome.runtime.sendMessage({
			type: "history",
			method: "createFilter",
			args: [searchText],
		});
	};

	return (
		<Fragment>
			<PrivateAccessDialog />
			<DataList
				DataListItem={HistoryListItem}
				queryKey="history"
				queryFunctor={queryFunctor}
				createFilter={createFilter}
			/>
		</Fragment>
	);
};

export default History;
