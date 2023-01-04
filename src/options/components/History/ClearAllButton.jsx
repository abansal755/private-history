import { Fragment, useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";

const ClearAllButton = () => {
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

	const queryClient = useQueryClient();

	const mutation = useMutation(
		async () => {
			await chrome.storage.local.remove("history");
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

	return (
		<Fragment>
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
						Are you sure you want to clear all the private browsing
						history? This action is irreversible.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={clearHistoryHandler}>Yes</Button>
					<Button onClick={dialogCloseHandler}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

export default ClearAllButton;
