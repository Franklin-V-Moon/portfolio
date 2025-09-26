import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Grid } from "@mui/material";
import { SubHeading } from "../SubHeading";
import { ContactCard } from "./ContactCard";

import styles from "./Contact.module.scss";

export const Contact = () => {
	return (
		<>
			<SubHeading text={"Get In Touch"} />

			<div className={styles.gap}>
				<Grid container spacing={3} justifyContent='center'>
					<Grid item>
						<ContactCard
							contactMethod={"Instagram"}
							link={"https://www.instagram.com/franklin.v.moon"}>
							<InstagramIcon color={"primary"} fontSize={"large"} />
						</ContactCard>
					</Grid>

					<Grid item>
						<ContactCard
							contactMethod={"LinkedIn"}
							link={"https://www.linkedin.com/in/franklin-von-moon-23572518a"}>
							<LinkedInIcon color={"primary"} fontSize={"large"} />
						</ContactCard>
					</Grid>

					<Grid item>
						<ContactCard
							contactMethod={"Github"}
							link={"https://github.com/Franklin-v-moon"}>
							<GitHubIcon color={"primary"} fontSize={"large"} />
						</ContactCard>
					</Grid>

					<Grid item>
						<ContactCard
							contactMethod={"Email"}
							link={
								"mailto:franklin.v.moon@gmail.com?body=Hey%20Franklin,%20I%20just%20discovered%20your%20email%20through%20your%20website!"
							}>
							<EmailIcon color={"primary"} fontSize={"large"} />
						</ContactCard>
					</Grid>
				</Grid>
			</div>
		</>
	);
};
