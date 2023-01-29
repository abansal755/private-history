import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

const CustomDialog = ({
	title,
	content,
	buttons,
	clickHandlers,
	isDialogOpen,
	setIsDialogOpen,
}) => {
	return (
		<Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{buttons.map((btnText, idx) => (
					<Button onClick={clickHandlers[idx]} key={idx}>
						{btnText}
					</Button>
				))}
			</DialogActions>
		</Dialog>
	);
};

export default CustomDialog;
