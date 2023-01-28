import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import SnackbarActions from "./components/common/SnackbarActions";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("react-target"));
root.render(
	<SnackbarProvider
		maxSnack={3}
		autoHideDuration={3000}
		action={SnackbarActions}
		variant="info"
	>
		<ThemeProvider theme={darkTheme}>
			<QueryClientProvider client={queryClient}>
				<MemoryRouter
					basename="/options.html"
					initialEntries={[
						"/",
						"/favourites",
						"/sessions",
						"/settings",
					]}
					initialIndex={0}
				>
					<ReactQueryDevtools initialIsOpen={false} />
					<CssBaseline />
					<App />
				</MemoryRouter>
			</QueryClientProvider>
		</ThemeProvider>
	</SnackbarProvider>
);
