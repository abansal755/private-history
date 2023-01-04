import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("react-target"));
root.render(
	<BrowserRouter basename="/options.html">
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</QueryClientProvider>
	</BrowserRouter>
);
