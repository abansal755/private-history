import History from "./components/History";
import { Route, Switch } from "react-router-dom";
import { Fragment, useState } from "react";
import {
	Container,
	Drawer,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import { Link as BrowserLink } from "react-router-dom";
import Favourites from "./components/Favourites";

const App = () => {
	const [drawerIdx, setDrawerIdx] = useState(0);

	return (
		<Fragment>
			<Drawer variant="permanent">
				<List>
					<ListItemButton
						component={BrowserLink}
						to="/"
						selected={drawerIdx === 0}
						onClick={() => setDrawerIdx(0)}
					>
						<ListItemText>History</ListItemText>
					</ListItemButton>
					<ListItemButton
						component={BrowserLink}
						to="/favourites"
						selected={drawerIdx === 1}
						onClick={() => setDrawerIdx(1)}
					>
						<ListItemText>Favourites</ListItemText>
					</ListItemButton>
				</List>
			</Drawer>
			<Container>
				<Typography variant="h2" component="h1" align="center">
					Private History
				</Typography>
				<Switch>
					<Route path="/" exact>
						<History />
						{/*<Favourites />*/}
					</Route>
					<Route path="/favourites">
						<Favourites />
					</Route>
				</Switch>
			</Container>
		</Fragment>
	);
};

export default App;
