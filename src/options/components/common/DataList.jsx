import { Fragment, useEffect, useMemo, useState } from "react";
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
import { grey } from "@mui/material/colors";
import useVisibleLength from "../../hooks/useVisibleLength";
import useDebounce from "../../hooks/useDebounce";

const DataList = ({ DataListItem, queryKey, queryFunctor, createFilter }) => {
	const [searchText, setSearchText] = useState("");
	const searchTextDebounced = useDebounce(searchText, 500);
	const [sortBy, setSortBy] = useState("desc");

	const query = useInfiniteQuery({
		queryKey: [queryKey],
		queryFn: queryFunctor(searchTextDebounced, sortBy === "desc"),
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
				args: [searchTextDebounced],
			});
			return length;
		},
	});

	const {
		data: length,
		isSuccess: isLengthAvailable,
		refetch: refetchLength,
	} = lengthQuery;

	const visibleLength = useVisibleLength(data);

	useEffect(() => {
		refetch();
	}, [sortBy]);

	useEffect(() => {
		(async () => {
			await createFilter(searchTextDebounced);
			await refetch();
			await refetchLength();
		})();
	}, [searchTextDebounced]);

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
				<Paper
					sx={{ marginY: 2, padding: 2, backgroundColor: grey[900] }}
					elevation={2}
				>
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
						<SortBySelect
							sortBy={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
						/>
					</Box>
					<List>
						{data.pages.map((page) => {
							if (!page.data) return;
							return page.data.map((item) => (
								<DataListItem
									key={item.id}
									item={item}
									searchText={searchTextDebounced}
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
