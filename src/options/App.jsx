import History from "./components/History";
import { Route, Switch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import Favourites from "./components/Favourites";
import Navbar from "./components/common/Navbar";
import { useQueryClient } from "react-query";
import { fetch as fetchFavourites } from "./services/Favourites";

const App = () => {
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.prefetchQuery("favourites", fetchFavourites);
	}, []);

	return (
		<Fragment>
			<Navbar />
			<Container>
				<Typography variant="h2" component="h1" align="center">
					Private History
				</Typography>
				<Switch>
					<Route path="/" exact>
						<History />
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
