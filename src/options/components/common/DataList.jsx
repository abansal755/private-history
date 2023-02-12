import { Fragment, useEffect, useState } from "react";
import {
	Box,
	Button,
	List,
	ListItem,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useInfiniteQuery, useQuery } from "react-query";
import SortBySelect from "./DataList/SortBySelect";

const DataList = ({ DataListItem, queryKey, queryFn, createFilter }) => {
	const [searchText, setSearchText] = useState("");
	const [lastSearchText, setLastSearchText] = useState("");
	const [visibleLength, setVisibleLength] = useState(0);
	const [sortBy, setSortBy] = useState("desc");

	const query = useInfiniteQuery({
		queryKey: [queryKey],
		queryFn: queryFn(lastSearchText, sortBy === "desc"),
		getNextPageParam: ({ page, total }) => {
			if (page < total - 1) return page + 1;
		},
	});

	const {
		fetchNextPage,
		hasNextPage,
		data,
		isSuccess,
		isFetchingNextPage,
		refetch,
	} = query;

	const lengthQuery = useQuery({
		queryKey: `${queryKey}_length`,
		queryFn: async () => {
			const length = await chrome.runtime.sendMessage({
				type: queryKey,
				method: "getFilteredLength",
				args: [lastSearchText],
			});
			return length;
		},
	});

	const {
		data: length,
		isSuccess: isLengthAvailable,
		refetch: refetchLength,
	} = lengthQuery;

	useEffect(() => {
		if (!data) return;
		if (data.pages[0].error) setVisibleLength(0);
		else
			setVisibleLength(
				50 * (data.pages.length - 1) + data.pages.at(-1).data.length
			);
	}, [data]);

	useEffect(() => {
		(async () => {
			await refetch();
		})();
	}, [sortBy]);

	useEffect(() => {
		const id = setTimeout(async () => {
			setLastSearchText(searchText);
			await createFilter(searchText);
			await refetch();
			await refetchLength();
		}, 500);

		return () => clearTimeout(id);
	}, [searchText]);

	return (
		<Fragment>
			<Box display="flex" sx={{ marginTop: 3 }}>
				<TextField
					variant="filled"
					fullWidth
					label="Search"
					value={searchText}
					onInput={(e) => setSearchText(e.target.value)}
				/>
				<Button
					variant="contained"
					sx={{ marginLeft: 2 }}
					onClick={() => setSearchText("")}
				>
					Clear
				</Button>
			</Box>
			{isSuccess && (
				<Paper elevation={6} sx={{ marginY: 2, padding: 2 }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{isLengthAvailable && (
							<Typography textAlign="center">
								Showing {visibleLength} results out of {length}
							</Typography>
						)}
						<SortBySelect sortBy={sortBy} setSortBy={setSortBy} />
					</Box>
					<List>
						{data.pages.map((page) => {
							if (!page.data) return;
							return page.data.map((item) => (
								<DataListItem
									key={item.id}
									item={item}
									searchText={lastSearchText}
									refetch={refetch}
									refetchLength={refetchLength}
								/>
							));
						})}
						<ListItem>
							<LoadingButton
								disabled={!hasNextPage || isFetchingNextPage}
								sx={{
									marginX: "auto",
								}}
								onClick={fetchNextPage}
								loading={isFetchingNextPage}
							>
								Load More
							</LoadingButton>
						</ListItem>
					</List>
				</Paper>
			)}
		</Fragment>
	);
};

export default DataList;
