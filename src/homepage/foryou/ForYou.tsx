import { Grid } from "@mui/material";
import { SubHeading } from "../SubHeading";
import { ForYouCard } from "../foryou/ForYouCard";
import { forYouMetaData } from "../../datasources/HomepageMetaData";

export const ForYou = () => {
	return (
		<>
			<SubHeading text={"What Can I Do For You?"} />

			<Grid container spacing={5} sx={{ justifyContent: "center" }}>
				{forYouMetaData.map((item, index) => {
					return (
						<Grid key={index}>
							<ForYouCard
								logo={item.logo}
								title={item.title}
								paragraph={item.paragraph}
							/>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
};
