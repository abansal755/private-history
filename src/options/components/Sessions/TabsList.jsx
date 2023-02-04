import { List, ListItem, ListItemText } from "@mui/material";
import { grey } from "@mui/material/colors";
import PublicIcon from "@mui/icons-material/Public";
import { useSnackbar } from "notistack";

const TabsList = ({ session }) => {
	const { enqueueSnackbar } = useSnackbar();

	const tabClickHandler = (tab) => {
		return async () => {
			await navigator.clipboard.writeText(tab.url);
			enqueueSnackbar("Copied to clipboard");
		};
	};

	return (
		<List>
			{session.tabs.map((tab, idx) => (
				<ListItem
					key={idx}
					sx={{
						"&": {
							cursor: "pointer",
							borderTopLeftRadius: idx === 0 ? 5 : 0,
							borderTopRightRadius: idx === 0 ? 5 : 0,
							borderBottomLeftRadius:
								idx === session.tabs.length - 1 ? 5 : 0,
							borderBottomRightRadius:
								idx === session.tabs.length - 1 ? 5 : 0,
							transition: "background-color 300ms",
						},
						"&:hover": {
							backgroundColor: grey[800],
						},
					}}
					onClick={tabClickHandler(tab)}
				>
					{tab.favIconUrl && (
						<img src={tab.favIconUrl} width="32" height="32" />
					)}
					{!tab.favIconUrl && <PublicIcon sx={{ fontSize: 32 }} />}
					<ListItemText
						primary={tab.title}
						secondary={tab.url}
						sx={{ marginX: 2, overflow: "hidden" }}
					/>
				</ListItem>
			))}
		</List>
	);
};

export default TabsList;
