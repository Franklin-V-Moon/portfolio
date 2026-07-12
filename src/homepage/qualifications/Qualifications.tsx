import { Grid } from "@mui/material";
import { qualificationMetaData } from "../../datasources/HomepageMetaData";
import { SubHeading } from "../SubHeading";
import { QualificationCard } from "./QualificationCard";
import { Gap } from "../salary/components/Gap";

export const Qualifications = () => {
	return (
		<>
			<SubHeading text={"Expertise"} />

			<Grid container spacing={5} sx={{ justifyContent: "center" }}>
				{qualificationMetaData.map((item, index) => {
					return (
						<Grid key={index}>
							<QualificationCard
								logo={item.logo}
								title={item.title}
								location={item.location}
							/>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
};
