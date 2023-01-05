import { Button, useTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useSnackbar } from "notistack";

const SnackbarActions = (snackbarId) => {
	const { closeSnackbar } = useSnackbar();

	return (
		<Button
			sx={{
				"&": {
					color: blue[50],
				},
				"&:hover": {
					backgroundColor: blue[400],
				},
			}}
			onClick={() => closeSnackbar(snackbarId)}
		>
			Dismiss
		</Button>
	);
};

export default SnackbarActions;
