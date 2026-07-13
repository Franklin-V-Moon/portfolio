import { render } from "@testing-library/react";
import { WorkExpListItem } from "./WorkExpListItem";

describe("WorkExpListItem", () => {
	it("renders all parsed values", () => {
		const companyLogo = "company-logo";
		const employerName = "Employer Name";
		const periodWithEmployer = "January 2020 - Present";
		const employerLocation = "New York, NY";
		const employerExperiences = [
			{
				title: "Developer",
				subRole: "Frontend",
				period: "January 2020 - Present",
			},
		];

		const { getByText, getAllByText } = render(
			<WorkExpListItem
				companyLogo={companyLogo}
				employerName={employerName}
				periodWithEmployer={periodWithEmployer}
				employerLocation={employerLocation}
				employerExperiences={employerExperiences}
				index={0}
			/>,
		);

		expect(getByText(employerName)).toBeDefined();
		expect(getByText(employerLocation)).toBeDefined();
		expect(getAllByText(periodWithEmployer)).toBeDefined();
		expect(getByText(employerExperiences[0].title)).toBeDefined();
		expect(getByText(employerExperiences[0].subRole)).toBeDefined();
	});

	it("omits the employer location line when none is given", () => {
		const { queryByText, getAllByText } = render(
			<WorkExpListItem
				companyLogo='company-logo'
				employerName='Employer Name'
				periodWithEmployer='2020 - Present'
				employerExperiences={[{ title: "Developer", period: "2020 - Present" }]}
				index={0}
			/>,
		);

		expect(queryByText("New York, NY")).toBeNull();
		expect(getAllByText("2020 - Present")).toBeDefined();
	});
});
