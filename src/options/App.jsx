import History from "./components/History";
import { Route, Switch } from "react-router-dom";
import { Fragment, useEffect, lazy, Suspense } from "react";
import { Container, Typography } from "@mui/material";
const Favourites = lazy(() => import("./components/Favourites"));
import Navbar from "./components/common/Navbar";
import { useQueryClient } from "react-query";
import { fetch as fetchFavourites } from "./services/Favourites";
import LoadingFallback from "./components/common/LoadingFallback";
const Sessions = lazy(() => import("./components/Sessions"));
const Settings = lazy(() => import("./components/Settings"));

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
						<Suspense fallback={<LoadingFallback />}>
							<Favourites />
						</Suspense>
					</Route>
					<Route path="/sessions">
						<Suspense fallback={<LoadingFallback />}>
							<Sessions />
						</Suspense>
					</Route>
					<Route path="/settings">
						<Suspense fallback={<LoadingFallback />}>
							<Settings />
						</Suspense>
					</Route>
				</Switch>
			</Container>
		</Fragment>
	);
};

export default App;
