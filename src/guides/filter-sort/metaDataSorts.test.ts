/** @jest-environment node */
import { testGuideMetaDataArrayMetaData } from "../test-helpers/guideMetaDataArray";
import { Languages, Tags, Topic } from "../types";
import {
	sortByAlphabetical,
	sortByNewest,
	sortByOldest,
} from "./metaDataSorts";

describe("metaDataSorts()", () => {
	const metaDataPreSorted = testGuideMetaDataArrayMetaData;
	describe("orderByNewest", () => {
		it("returns an array of metadata from newest to oldest by epoch", () => {
			const metaDataByNewest = [
				{
					title: "Quickly Setup NextJs ES6 with Typescript",
					link: "/programming/quickly-setup-next-js-with-typescript",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 1642762915,
					thumbnail: "TBD",
					subTitle:
						"Get up-and-running with a cleaned up but ready to go repo using nextJs. Includes setting up TS properly, clearing boilerplate, structuring components, routing, setting up an API and SEO consideration",
					topic: Topic.Programming,
					languages: [Languages.Typescript],
					tags: [Tags.StepByStep],
				},
				{
					title: "Try & Catch by a Type",
					link: "/programming/try-catch-by-type",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 1640257315,
					thumbnail: "TBD",
					subTitle:
						"Simple technique ff you ever need to handle a thrown error differently because it has a type. Use case: It might be an error you'd like the user to see.",
					topic: Topic.Programming,
					languages: [Languages.Typescript],
					tags: [Tags.CodeBlock],
				},
				{
					title: "Deploy to AWS EC2 using Terraform and Docker ",
					link: "/deploy-to-aws-ec2-using-terraform-and-docker",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 1639982632,
					thumbnail: "TBD",
					subTitle:
						"Step-by-step instructions to dockerize your repo and use terraform to spin up AWS and host your project from scratch",
					topic: Topic.Infrastructure,
					languages: [Languages.Docker, Languages.Terraform],
					tags: [Tags.Essay],
				},
			];

			const result = sortByNewest(metaDataPreSorted);

			expect(result).toEqual(metaDataByNewest);
		});
	});

	describe("orderByOldest", () => {
		it("returns an array of metadata from oldest to newest by epoch", () => {
			const metaDataByOldest = [
				{
					title: "Deploy to AWS EC2 using Terraform and Docker ",
					link: "/deploy-to-aws-ec2-using-terraform-and-docker",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 1639982632,
					thumbnail: "TBD",
					subTitle:
						"Step-by-step instructions to dockerize your repo and use terraform to spin up AWS and host your project from scratch",
					topic: Topic.Infrastructure,
					languages: [Languages.Docker, Languages.Terraform],
					tags: [Tags.Essay],
				},
				{
					title: "Try & Catch by a Type",
					link: "/programming/try-catch-by-type",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 1640257315,
					thumbnail: "TBD",
					subTitle:
						"Simple technique ff you ever need to handle a thrown error differently because it has a type. Use case: It might be an error you'd like the user to see.",
					topic: Topic.Programming,
					languages: [Languages.Typescript],
					tags: [Tags.CodeBlock],
				},
				{
					title: "Quickly Setup NextJs ES6 with Typescript",
					link: "/programming/quickly-setup-next-js-with-typescript",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 1642762915,
					thumbnail: "TBD",
					subTitle:
						"Get up-and-running with a cleaned up but ready to go repo using nextJs. Includes setting up TS properly, clearing boilerplate, structuring components, routing, setting up an API and SEO consideration",
					topic: Topic.Programming,
					languages: [Languages.Typescript],
					tags: [Tags.StepByStep],
				},
			];

			const result = sortByOldest(metaDataPreSorted);

			expect(result).toEqual(metaDataByOldest);
		});
	});

	describe("orderByAlphabetical", () => {
		it("returns an array of metadata from A to Z by first letter", () => {
			const metaDataByAlphabetical = [
				{
					title: "Deploy to AWS EC2 using Terraform and Docker ",
					link: "/deploy-to-aws-ec2-using-terraform-and-docker",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 1639982632,
					thumbnail: "TBD",
					subTitle:
						"Step-by-step instructions to dockerize your repo and use terraform to spin up AWS and host your project from scratch",
					topic: Topic.Infrastructure,
					languages: [Languages.Docker, Languages.Terraform],
					tags: [Tags.Essay],
				},
				{
					title: "Quickly Setup NextJs ES6 with Typescript",
					link: "/programming/quickly-setup-next-js-with-typescript",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 1642762915,
					thumbnail: "TBD",
					subTitle:
						"Get up-and-running with a cleaned up but ready to go repo using nextJs. Includes setting up TS properly, clearing boilerplate, structuring components, routing, setting up an API and SEO consideration",
					topic: Topic.Programming,
					languages: [Languages.Typescript],
					tags: [Tags.StepByStep],
				},
				{
					title: "Try & Catch by a Type",
					link: "/programming/try-catch-by-type",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 1640257315,
					thumbnail: "TBD",
					subTitle:
						"Simple technique ff you ever need to handle a thrown error differently because it has a type. Use case: It might be an error you'd like the user to see.",
					topic: Topic.Programming,
					languages: [Languages.Typescript],
					tags: [Tags.CodeBlock],
				},
			];

			const result = sortByAlphabetical(metaDataPreSorted);

			expect(result).toEqual(metaDataByAlphabetical);
		});
	});
});
