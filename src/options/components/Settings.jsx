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
import validateJSON from "../utils/validateJSON";

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
		setIsClearDialogOpen(false);
		enqueueSnackbar("Cleared all data");
	};

	const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
	const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

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
					//validate json
					if (!validateJSON(json)) throw new Error("Invalid JSON");
					await chrome.storage.local.set(json);
					enqueueSnackbar("Successfully imported all data");
				} catch (err) {
					console.error(err);
					setIsImportDialogOpen(true);
				}
			});
			reader.readAsText(file);
		});

		input.click();

		document.body.removeChild(input);
	};

	return (
		<Box display="flex" justifyContent="center" marginTop={3}>
			<Button
				variant="contained"
				onClick={() => setIsClearDialogOpen(true)}
			>
				Clear
			</Button>
			<Dialog
				open={isClearDialogOpen}
				onClose={() => setIsClearDialogOpen(false)}
			>
				<DialogTitle>Warning</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to clear all data?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={clearHandler}>Yes</Button>
					<Button onClick={() => setIsClearDialogOpen(false)}>
						No
					</Button>
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
			<Dialog
				open={isImportDialogOpen}
				onClose={() => setIsImportDialogOpen(false)}
			>
				<DialogTitle>Error</DialogTitle>
				<DialogContent>
					<DialogContentText>Corrupted data found.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsImportDialogOpen(false)}>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default Settings;
