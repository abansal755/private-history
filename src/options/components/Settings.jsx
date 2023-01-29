import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
} from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import validateJSON from "../utils/validateJSON";
import CustomDialog from "./Settings/CustomDialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadIcon from "@mui/icons-material/Upload";

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
	const [isImportErrorDialogOpen, setIsImportErrorDialogOpen] =
		useState(false);
	const [isImportWarningDialogOpen, setIsImportWarningDialogOpen] =
		useState(false);

	const { enqueueSnackbar } = useSnackbar();

	const importBtnClickHandler = () => {
		setIsImportWarningDialogOpen(false);
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
					setIsImportErrorDialogOpen(true);
				}
			});
			reader.readAsText(file);
		});

		input.click();

		document.body.removeChild(input);
	};

	return (
		<Paper sx={{ marginTop: 3 }}>
			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={() => setIsClearDialogOpen(true)}>
						<ListItemIcon>
							<DeleteForeverIcon sx={{ fontSize: 32 }} />
						</ListItemIcon>
						<ListItemText
							primary="Clear"
							secondary="Clear all the settings: history, bookmarks and sessions."
						/>
					</ListItemButton>
					<CustomDialog
						title="Warning"
						content="Are you sure you want to clear all data?"
						buttons={["Yes", "No"]}
						clickHandlers={[
							clearHandler,
							() => setIsClearDialogOpen(false),
						]}
						isDialogOpen={isClearDialogOpen}
						setIsDialogOpen={setIsClearDialogOpen}
					/>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={exportBtnClickHandler}>
						<ListItemIcon>
							<FileDownloadIcon sx={{ fontSize: 32 }} />
						</ListItemIcon>
						<ListItemText
							primary="Export"
							secondary="Export all the settings in JSON format: history, bookmarks and sessions."
						/>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton
						onClick={() => setIsImportWarningDialogOpen(true)}
					>
						<ListItemIcon>
							<UploadIcon sx={{ fontSize: 32 }} />
						</ListItemIcon>
						<ListItemText
							primary="Import"
							secondary="Import all the settings from JSON format: history, bookmarks and sessions."
						/>
					</ListItemButton>
					<CustomDialog
						title="Error"
						content="Corrupted data found."
						buttons={["Ok"]}
						clickHandlers={[
							() => setIsImportErrorDialogOpen(false),
						]}
						isDialogOpen={isImportErrorDialogOpen}
						setIsDialogOpen={setIsImportErrorDialogOpen}
					/>
					<CustomDialog
						title="Warning"
						content="This will overwrite all your current data. Are you sure?"
						buttons={["Yes", "No"]}
						clickHandlers={[
							importBtnClickHandler,
							() => setIsImportWarningDialogOpen(false),
						]}
						isDialogOpen={isImportWarningDialogOpen}
						setIsDialogOpen={setIsImportWarningDialogOpen}
					/>
				</ListItem>
			</List>
		</Paper>
	);
};

export default Settings;
