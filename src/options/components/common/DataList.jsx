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

const DataList = ({ DataListItem, queryKey, queryFn, createFilter }) => {
	const [searchText, setSearchText] = useState("");
	const [visibleLength, setVisibleLength] = useState(0);

	const query = useInfiniteQuery({
		queryKey: [queryKey, searchText],
		queryFn: queryFn(searchText),
		getNextPageParam: ({ page, total }) => {
			if (page < total - 1) return page + 1;
		},
	});

	const { fetchNextPage, hasNextPage, data, isSuccess, isFetchingNextPage } =
		query;

	const { data: length, isSuccess: isLengthAvailable } = useQuery({
		queryKey: `${queryKey}_${searchText}_length`,
		queryFn: async () => {
			const length = await chrome.runtime.sendMessage({
				type: queryKey,
				method: "getFilteredLength",
				args: [searchText],
			});
			return length;
		},
	});

	useEffect(() => {
		if (!data) return;
		if (data.pages[0].error) setVisibleLength(0);
		else
			setVisibleLength(
				50 * (data.pages.length - 1) + data.pages.at(-1).data.length
			);
	}, [data]);

	const searchTextInputHandler = async (e) => {
		setSearchText(e.target.value);
		await createFilter(e);
	};

	return (
		<Fragment>
			<Box display="flex" sx={{ marginTop: 3 }}>
				<TextField
					variant="filled"
					fullWidth
					label="Search"
					value={searchText}
					onInput={searchTextInputHandler}
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
					</Box>
					<List>
						{data.pages.map((page) => {
							if (!page.data) return;
							return page.data.map((item) => (
								<DataListItem
									key={item.id}
									item={item}
									searchText={searchText}
									query={query}
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
