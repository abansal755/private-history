import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";

const PrivateAccessDialog = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const dialogCloseHandler = () => {
		setIsDialogOpen(false);
	};

	const dialogOpenHandler = () => {
		setIsDialogOpen(true);
	};

	useEffect(() => {
		(async () => {
			const isAllowed = await chrome.extension.isAllowedIncognitoAccess();
			if (!isAllowed) setIsDialogOpen(true);
		})();
	}, []);

	return (
		<Dialog open={isDialogOpen} onClose={dialogCloseHandler}>
			<DialogTitle>Warning</DialogTitle>
			<DialogContent>
				<DialogContentText>
					This extension is not allowed in private mode. Please allow
					it in extension settings for smooth functioning.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={dialogCloseHandler}>Ok</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PrivateAccessDialog;
