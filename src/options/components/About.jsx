import { Box, Paper, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import ActionButton from "./About/ActionButton";
import { useSnackbar } from "notistack";

const About = () => {
	const { enqueueSnackbar } = useSnackbar();

	const emailBtnClickHandler = async () => {
		await navigator.clipboard.writeText("bansalakshitwork@gmail.com");
		enqueueSnackbar("Email copied to clipboard");
	};

	return (
		<Box display="flex" justifyContent="center">
			<Paper
				sx={{
					marginTop: 3,
					padding: 2,
				}}
			>
				<Box
					display="flex"
					alignItems="baseline"
					sx={{ marginBottom: 2 }}
				>
					<Typography variant="h6" marginRight={1}>
						Developed By
					</Typography>
					<Typography variant="h4">Akshit Bansal</Typography>
				</Box>
				<Box>
					<ActionButton
						icon={<LinkedInIcon />}
						onClick={() =>
							open("https://www.linkedin.com/in/abansal755/")
						}
					>
						LinkedIn
					</ActionButton>
					<ActionButton
						icon={<GitHubIcon />}
						sx={{ marginX: 2 }}
						onClick={() => open("https://github.com/abansal755")}
					>
						GitHub
					</ActionButton>
					<ActionButton
						icon={<EmailIcon />}
						onClick={emailBtnClickHandler}
					>
						Email
					</ActionButton>
				</Box>
			</Paper>
		</Box>
	);
};

export default About;
