import { Box, CircularProgress } from "@mui/material";

const LoadingFallback = () => {
	return (
		<Box justifyContent="center" display="flex">
			<CircularProgress />
		</Box>
	);
};

export default LoadingFallback;
