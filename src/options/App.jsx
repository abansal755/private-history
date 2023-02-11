import History from "./components/History";
import { Route, Switch } from "react-router-dom";
import { Fragment, lazy, Suspense } from "react";
import { Box, Container, Typography } from "@mui/material";
const Favourites = lazy(() => import("./components/Favourites"));
import Navbar from "./components/common/Navbar";
import { useQueryClient } from "react-query";
import LoadingFallback from "./components/common/LoadingFallback";
const Sessions = lazy(() => import("./components/Sessions"));
const Settings = lazy(() => import("./components/Settings"));
import icon from "../../public/assets/icon-128.png";
const About = lazy(() => import("./components/About"));

const App = () => {
	const queryClient = useQueryClient();

	return (
		<Fragment>
			<Navbar />
			<Container>
				<Typography
					variant="h2"
					component="h1"
					align="center"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Box display="flex" marginRight={1}>
						<img src={icon} width={64} height={64} />
					</Box>
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
					<Route path="/about">
						<Suspense fallback={<LoadingFallback />}>
							<About />
						</Suspense>
					</Route>
				</Switch>
			</Container>
		</Fragment>
	);
};

export default App;
