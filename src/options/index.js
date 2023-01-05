import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
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
				<BrowserRouter basename="/options.html">
					<ReactQueryDevtools initialIsOpen={false} />
					<CssBaseline />
					<App />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	</SnackbarProvider>
);
