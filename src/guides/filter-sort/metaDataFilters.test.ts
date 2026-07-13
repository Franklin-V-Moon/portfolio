/** @jest-environment node */
import {} from "react";
import { testGuideMetaDataArrayMetaData } from "../test-helpers/guideMetaDataArray";
import { Languages, Tags, Topic } from "../types";
import {
	filterForLanguages,
	filterForTags,
	filterForTopic,
} from "./metaDataFilters";

describe("filterAndSort", () => {
	const metaDataPreSorted = testGuideMetaDataArrayMetaData;

	describe("filterForLanguages()", () => {
		it("returns an array of metadata that have the parsed in language", () => {
			const metaDataWithFilteredLanguages = [
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

			const result = filterForLanguages(metaDataPreSorted, [
				Languages.Typescript,
			]);

			expect(result).toEqual(metaDataWithFilteredLanguages);
		});

		it("returns an array of metadata that have any of multiple languages", () => {
			const metaDataWithMultipleLanguages = [
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [Languages.Typescript],
					tags: [],
				},
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [Languages.Docker],
					tags: [],
				},
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [Languages.Terraform],
					tags: [],
				},
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [],
					tags: [],
				},
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [Languages.Javascript],
					tags: [],
				},
			];

			const metaDataWithFilteredLanguages = [
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [Languages.Typescript],
					tags: [],
				},
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [Languages.Javascript],
					tags: [],
				},
			];

			const result = filterForLanguages(metaDataWithMultipleLanguages, [
				Languages.Typescript,
				Languages.Javascript,
			]);

			expect(result).toEqual(metaDataWithFilteredLanguages);
		});

		it("returns an empty array if no metadata objects contain the parsed language", () => {
			const result = filterForLanguages(metaDataPreSorted, [
				Languages.Javascript,
			]);

			expect(result).toEqual([]);
		});
	});

	describe("filterForTags()", () => {
		it("returns an array of metadata that have the parsed in tags", () => {
			const metaDatawithFilteredTag = [
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

			const result = filterForTags(metaDataPreSorted, [Tags.StepByStep]);

			expect(result).toEqual(metaDatawithFilteredTag);
		});

		it("returns an array of metadata that have any of multiple tags", () => {
			const metaDataWithMultipleTags = [
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [],
					tags: [Tags.StepByStep],
				},
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [],
					tags: [Tags.Essay],
				},
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [],
					tags: [Tags.StepByStep],
				},
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [],
					tags: [Tags.CodeBlock],
				},
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [],
					tags: [Tags.CodeBlock],
				},
			];

			const metaDataWithFilteredTags = [
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [],
					tags: [Tags.StepByStep],
				},
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [],
					tags: [Tags.Essay],
				},
				{
					title: "title",
					link: "link",
					notionPage: "c4ca92237cc4434cbc30119b104e9e87",
					created: 123,
					thumbnail: "TBD",
					subTitle: "subtitle",
					topic: Topic.Agile,
					languages: [],
					tags: [Tags.StepByStep],
				},
			];

			const result = filterForTags(metaDataWithMultipleTags, [
				Tags.StepByStep,
				Tags.Essay,
			]);

			expect(result).toEqual(metaDataWithFilteredTags);
		});

		it("returns an empty array if no metadata objects contain the parsed tags", () => {
			const result = filterForTags(metaDataPreSorted, [Tags.Story]);

			expect(result).toEqual([]);
		});
	});

	describe("filterForTopics()", () => {
		it("returns an array of metadata that have the parsed in topics", () => {
			const metaDataWithFilteredTopic = [
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

			const result = filterForTopic(metaDataPreSorted, Topic.Infrastructure);

			expect(result).toEqual(metaDataWithFilteredTopic);
		});

		it("returns an empty array if no metadata objects contain the parsed topic", () => {
			const result = filterForTopic(metaDataPreSorted, Topic.Agile);

			expect(result).toEqual([]);
		});
	});
});
