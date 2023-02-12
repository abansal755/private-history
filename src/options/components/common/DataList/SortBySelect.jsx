import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

const SortBySelect = ({ sortBy, setSortBy }) => {
	return (
		<FormControl
			sx={{
				marginLeft: 2,
				minWidth: 100,
			}}
			size="small"
		>
			<InputLabel>Sort By</InputLabel>
			<Select
				label="Sort By"
				value={sortBy}
				onChange={(e) => setSortBy(e.target.value)}
			>
				<MenuItem value="asc">
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
						Timestamp <NorthIcon />
					</Box>
				</MenuItem>
				<MenuItem value="desc">
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
						Timestamp <SouthIcon />
					</Box>
				</MenuItem>
			</Select>
		</FormControl>
	);
};

export default SortBySelect;
