import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";

const Settings = () => {
	const exportBtnClickHandler = async () => {
		const data = await chrome.storage.local.get([
			"history",
			"favourites",
			"sessions",
		]);
		const blob = new Blob([JSON.stringify(data)]);
		const blobUrl = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = blobUrl;
		link.download = "private-history.json";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		enqueueSnackbar("Exported all data");
	};

	const clearHandler = async () => {
		await chrome.storage.local.clear();
		dialogCloseHandler();
		enqueueSnackbar("Cleared all data");
	};

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const dialogCloseHandler = () => {
		setIsDialogOpen(false);
	};

	const dialogOpenHandler = () => {
		setIsDialogOpen(true);
	};

	const { enqueueSnackbar } = useSnackbar();

	const importBtnClickHandler = () => {
		const input = document.createElement("input");
		input.type = "file";
		document.body.appendChild(input);

		input.addEventListener("change", () => {
			const [file] = input.files;
			if (!file) return;
			const reader = new FileReader();
			reader.addEventListener("load", async () => {
				try {
					const json = JSON.parse(reader.result);
					//TODO: validate json
					await chrome.storage.local.set(json);
					enqueueSnackbar("Successfully imported all data");
				} catch {}
			});
			reader.readAsText(file);
		});

		input.click();

		document.body.removeChild(input);
	};

	return (
		<Box display="flex" justifyContent="center" marginTop={3}>
			<Button variant="contained" onClick={dialogOpenHandler}>
				Clear
			</Button>
			<Dialog open={isDialogOpen} onClose={dialogCloseHandler}>
				<DialogTitle>Warning</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to clear all data?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={clearHandler}>Yes</Button>
					<Button onClick={dialogCloseHandler}>No</Button>
				</DialogActions>
			</Dialog>
			<Button
				variant="contained"
				sx={{ marginX: 2 }}
				onClick={exportBtnClickHandler}
			>
				Export
			</Button>
			<Button variant="contained" onClick={importBtnClickHandler}>
				Import
			</Button>
		</Box>
	);
};

export default Settings;
