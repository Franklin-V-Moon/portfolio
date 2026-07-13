import { render } from "@testing-library/react";
import { VolunteerListItem } from "./VolunteerListItem";

describe("VolunteerListItem", () => {
	it("renders all parsed values", () => {
		const companyLogo = "company-logo";
		const agency = "Example Charity";
		const title = "Teacher";
		const volunteerLocation = "New York, NY";
		const periodVolunteering = "January 2020 - Present";

		const { getByText } = render(
			<VolunteerListItem
				logo={companyLogo}
				agency={agency}
				title={title}
				location={volunteerLocation}
				year={periodVolunteering}
				index={0}
			/>,
		);

		expect(getByText(agency)).toBeDefined();
		expect(getByText(title)).toBeDefined();
		expect(getByText(volunteerLocation)).toBeDefined();
		expect(getByText(periodVolunteering)).toBeDefined();
	});
});
