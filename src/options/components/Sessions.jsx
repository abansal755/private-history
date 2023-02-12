import { useInfiniteQuery, useMutation } from "react-query";
import { Fragment } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabsList from "./Sessions/TabsList";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import FavIconGroup from "./Sessions/FavIconGroup";
import LoadingButton from "@mui/lab/LoadingButton";

const Sessions = () => {
	const { enqueueSnackbar } = useSnackbar();

	const {
		fetchNextPage,
		hasNextPage,
		data,
		isSuccess,
		isFetchingNextPage,
		refetch,
	} = useInfiniteQuery({
		queryKey: ["sessions"],
		queryFn: async ({ pageParam = 0 }) => {
			const page = await chrome.runtime.sendMessage({
				type: "sessions",
				method: "getPage",
				args: [pageParam],
			});
			return page;
		},
	});

	const mutation = useMutation(
		async (id) => {
			await chrome.runtime.sendMessage({
				type: "sessions",
				method: "removeSession",
				args: [id],
			});
		},
		{
			onSuccess: async () => {
				await refetch();
				enqueueSnackbar("Removed from sessions");
			},
		}
	);

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

	const deleteBtnClickHandler = (session) => {
		return (e) => {
			e.stopPropagation();
			mutation.mutate(session.id);
		};
	};

	return (
		<Fragment>
			{isSuccess && (
				<Box sx={{ marginTop: 3 }}>
					{data.pages.map((page) => {
						if (!page.data) return;
						return page.data.map((session, idx) => (
							<Accordion key={session.id}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
								>
									<Box
										display="flex"
										justifyContent="space-between"
										width="100%"
										alignItems="center"
										marginRight={2}
									>
										<Box display="flex">
											<FavIconGroup session={session} />
											<Stack>
												<Box>
													<Typography
														variant="subtitle1"
														sx={{
															whiteSpace:
																"nowrap",
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
										</Box>
										<Box>
											<Button
												onClick={openInIncognitoBtnClickHandler(
													session
												)}
											>
												Open in Incognito
											</Button>
											<Tooltip title="Remove">
												<IconButton
													onClick={deleteBtnClickHandler(
														session
													)}
												>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										</Box>
									</Box>
								</AccordionSummary>
								<AccordionDetails>
									<TabsList session={session} />
								</AccordionDetails>
							</Accordion>
						));
					})}
					<Box display="flex" justifyContent="center" marginTop={2}>
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
					</Box>
				</Box>
			)}
		</Fragment>
	);
};

export default Sessions;
