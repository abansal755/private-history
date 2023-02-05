import { Box, Button, Typography } from "@mui/material";

const ActionButton = ({ icon, children, sx = {}, onClick }) => {
	return (
		<Button
			variant="outlined"
			sx={{
				borderRadius: 5,
				textTransform: "none",
				...sx,
			}}
			onClick={onClick}
		>
			{icon}
			<Box marginLeft={1}>{children}</Box>
		</Button>
	);
};

export default ActionButton;
