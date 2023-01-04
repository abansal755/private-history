import { Button, Link } from "@mui/material";

const DownloadButton = ({ history }) => {
	const blob = new Blob([JSON.stringify(history)]);
	const blobUrl = URL.createObjectURL(blob);

	return (
		<Button
			variant="contained"
			component={Link}
			href={blobUrl}
			download="private-history.json"
		>
			Download As File
		</Button>
	);
};

export default DownloadButton;
