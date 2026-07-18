&nbsp;

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Running Locally](#running-locally)
- [How To Update Content](#how-to-update-content)
  - [Add A Guide](#add-a-guide)
  - [Update Qualifications, Volunteering and Work Experience](#update-qualifications-volunteering-and-work-experience)
  - [Update Folio](#update-folio)
  - [Update Projects](#update-projects)
  - [Update Salary Expectations](#update-salary-expectations)
- [Contact](#contact)

&nbsp;

## Overview

![Homepage](https://github.com/user-attachments/assets/63411a74-1521-4cd9-b9f8-a77124ecdfc5)

This repository hosts my professional portfolio website, showcasing my coding
skills and the site's features.

&nbsp;

![Skills](https://github.com/user-attachments/assets/c14f1844-50b1-40ca-8816-4f8d35b56d8a)

A list of tools I have familiarity with and a brief breakdown of my confidence
in each

![Projects](https://github.com/user-attachments/assets/8835c765-e97d-4626-87bf-ccb53b6f9ba6)

I'll be continuously updating this repository with fresh content and resources,
and I'll adapt the code to align with evolving industry standards.

&nbsp;

![Guide Page](https://github.com/user-attachments/assets/2f2858a9-8b2b-40f2-bc36-90e002b28ae9)

Why did I build this site?

I developed this site with two main goals in mind. First, it serves as a tool to
enhance my marketability and differentiate myself in the competitive field of
web development. Second, it provided a valuable learning experience, deepening
my understanding of modern web development practices and the process of building
a project from the ground up. Completing this project has significantly
strengthened my front-end programming skills.

&nbsp;

![Travel Page](https://github.com/user-attachments/assets/74f19bac-c6b5-4854-8486-8b7f08742f39)

This section provides an overview of the countries I've traveled to. Each video
comes with a wide range of extra content that can be searched and sorted with
the search bar and sort options.

&nbsp;

![Assets Page](https://github.com/user-attachments/assets/8cc4172c-f0fc-4595-8364-8df0e32310f5)

To showcase and monetize specific digital content, the portfolio now features a
direct e-commerce integration. This system utilizes Gumroad as a payment gateway
and delivery system, allowing users to purchase digital assets directly from the
site.

&nbsp;

&nbsp;

## Tech Stack

Development

- Typescript
- React
- Next
- Material UI
- Sass
- Jest
- Notion CMS
- Gumroad Platform

&nbsp;

Deployment

- Github (Repository)
- Github Actions (For CI/CD)
- Vercel Cloud Platform (For Automated Deployments and Serverless Functions)

&nbsp;

&nbsp;

Performance was a key concern since this website is my portfolio and is
frequently visited by recruiters and potential employers. To ensure a smooth
user experience, I kept the use of NPM packages to a minimum and wrote custom
code for specific needs, preferring raw CSS whenever possible. My efforts to
optimize performance are reflected in the strong Lighthouse score, as shown
below.

![Lighthouse Score](https://user-images.githubusercontent.com/42459707/217158718-b1019176-005a-4f20-8c03-a5fedfdf1c4a.png)

&nbsp;

Test-driven development (TDD) was another major focus during this project. I
aimed to gain a solid understanding of this development style, though I found it
easier to implement with static pages. Complex APIs presented a greater
challenge in this regard. The results of these efforts are shown below.

![Yarn Test](https://user-images.githubusercontent.com/42459707/217159178-7104801d-195d-4262-b518-e8236a3b24a3.png)

&nbsp;

I also considered dark mode support, which added an interesting layer of
complexity to the development process. However, after a few years of testing, I
noticed almost no users voluntarily switched to light mode, so I've since
removed that feature.

![Homepage in Light Mode](https://user-images.githubusercontent.com/42459707/217158552-4cce377e-23ca-424a-88fb-7d4ac7d005d4.png)

&nbsp;

&nbsp;

## Running Locally

1. Prerequisites:

- Download and install Node version 18.12.0 or above from the official website:
  https://nodejs.org/en/download/
- Download and install Git from the official website:
  https://git-scm.com/downloads
- Verify the installations by running the commands `node -v` and git --version
  in a terminal window.

&nbsp;

2. Installing Yarn:

- Run the following command in a terminal window to install Yarn globally:
  `npm install -g yarn`
- Verify the installation by running the command `yarn -v` in a terminal window.

&nbsp;

3. Cloning the Repository:

- Use the following command to clone the repository to your local machine:
  `git clone https://github.com/OperationFman/portfolio.git`
- This will save the repository files in the current directory of the terminal
  window.

&nbsp;

4. Running the Development Server:

- Navigate to the repository directory using a terminal window and run the
  following command: yarn dev
- This will start the development server and make the application accessible at
  `http://localhost:3000/` in a web browser.

&nbsp;

&nbsp;

## How To Update Content

In the future, it is intended to implement a more efficient content updating
process utilizing a headless CMS solution such as [Strapi](https://strapi.io/).
Currently, updates to guide content are made directly within
[Notion Pages](https://www.notion.so/) and modifications to other page elements
are performed by updating the .ts files within the repository's
`~/src/datasources` directory. Hence, the subsequent instructions assume that
you have access to the local repository and are authorized to make and push
changes.

&nbsp;

### Add A Guide

1. Create a guide within any notion pages, ensure it has a cover image. It
   should be the same as the thumbnail but higher res (Ideal px width x height
   is 1500x850).

![Notion page](https://user-images.githubusercontent.com/42459707/217395178-a8891308-b9b9-44e7-93b9-d9afb5622581.png)

&nbsp;

2. Click share in the upper right

3. Click 'Share to web'

4. Copy the trailing number section of the link

![Share menu](https://user-images.githubusercontent.com/42459707/217398601-7e286957-0b52-48f6-b549-821da48c6bce.png)

&nbsp;

5. Save a thumbnail in the repo path `~/src/public/guides` with a shortened name
   eg `heating-blockchain.png`

- Ideal px width x height is 380x200
- Only use .png

&nbsp;

6. Open `~/src/datasources/GuideMetaData.ts` in your favorite text editor and
   add a key-value object to the top following this type:

```typescript
{
  title: string; // Title for the guide page
  link: string; // Will appear in the url, keep it short, e.g "self-heating-blockchain-guide"
  notionPage: string; // Copy only the numbers section from the notion pages link
  created: number; // Epoch number for the date the notion page was made
  thumbnail: string; // The ending path to the thumbnail, eg "/guides/heating-blockchain.png"
  subTitle: string; // Sub title for the guide page - Will be shortened above 50 characters
  topic: Topic; // Programming, Agile or Infrastructure etc, this shows on the guide page
  languages?: Languages[]; // Optional: If one or multiple programming languages, add them here. You can add new ones in `~src/guides/types.ts`
  tags?: Tags[]; // Optional: Tags convey the content, e.g 'guide', 'blog post' etc. You can add new ones in `~src/guides/types.ts`
}
```

7. Git push and after auto deployment you should see the guide card on the
   `https://www.franklin-v-moon.dev/guides` page

&nbsp;

&nbsp;

### Update Qualifications, Volunteering and Work Experience

1. Open `~/src/datasources/HomepageMetaData.ts` in your favorite text editor

2. Edit the content as desired

3. Git push and after auto deployment you should see the changes reflected on
   the `https://www.franklin-v-moon.dev/` page

Notes: Do not add more than 3 'For You' or 6 'Qualification' items. You can have
unlimited Volunteering or Work Experience items

&nbsp;

&nbsp;

### Update Folio

1. Open `~/src/datasources/SkillsMetaData.ts` in your favorite text editor

2. Edit the content as desired

3. Git push and after auto deployment you should see the changes reflected on
   the `https://www.franklin-v-moon.dev/folio` page

&nbsp;

&nbsp;

### Update Travel Videos And The World Map

1. Open `~/src/datasources/TravelMetaData.ts` in your favorite text editor

2. Add or edit a travel video entry. For every place listed in
   `extras.countries`, add a matching pin to `extras.mapLocations`:

```typescript
{
  place: string; // Label for the pin, e.g. "Kathmandu" or "Erbil"
  coordinates: [number, number]; // [longitude, latitude] of the pinned city
  countryId: string; // Country name matching src/generated/worldMapGeometry.json, used to highlight borders
}
```

3. Git push and after auto deployment the pin appears on the world map at
   `https://www.franklin-v-moon.dev/travel`

Notes: The map outlines are generated by `yarn generate-map` into
`src/generated/worldMapGeometry.json` — you only need to rerun it when changing
the map itself, never for new pins. The `mapDataService` tests fail if a
`countryId` does not match a country in the generated geometry.

&nbsp;

&nbsp;

### Update Projects

1. Add a new folder under `~/public` with the name of the project

2. Add all the images you can of the project

3. Open `~/src/datasources/ProjectsMetaData.ts` in your favorite text editor

4. Edit the content as desired, ensuring the images are referenced under the
   image key

5. Git push and after auto deployment you should see the changes reflected on
   the `https://www.franklin-v-moon.dev/projects` page

&nbsp;

&nbsp;

### Update Salary Expectations

1. Open `~/src/datasources/SalaryExpectationMetaData.ts` in your favorite text
   editor

2. Edit the content as desired

3. Git push and after auto deployment you should see the changes reflected on
   the `https://www.franklin-v-moon.dev/` page

&nbsp;

&nbsp;

&nbsp;

&nbsp;

## Contact

If you find any bugs or have any feedback or suggested improvements, I would
love to hear from you!

You can reach out to me:

- Email - Franklin.v.moon@gmail.com

- Instagram - https://www.instagram.com/franklin.v.moon/?hl=en

- LinkedIn - https://www.linkedin.com/in/franklin-moon-23572518a/

- Facebook - https://www.facebook.com/frank.moon.731/

&nbsp;

&nbsp;
