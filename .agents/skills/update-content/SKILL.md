---
name: update-content
description: Update content on the portfolio site (guides, qualifications/experience, folio/skills, travel videos/world map pins, projects, or salary expectations). Use when the user asks to add a guide, update work experience or volunteering, change folio/skills, add or edit a travel video or map pin, add or edit a project, or update salary expectations.
---

All content lives in `src/datasources/*.ts` (plus one Notion integration for guide bodies). Edit the file matching the content type below, then commit and push — Vercel auto-deploys and the change appears on the live site.

## Add a guide

1. Write the guide as a Notion page with a cover image (ideal 1500x850px, same image as the thumbnail but higher-res).
2. In Notion: Share → Share to web → copy the trailing number segment of the link.
3. Save a thumbnail to `public/guides/` as a `.png`, ideal size 380x200px.
4. Add an entry to the top of `src/datasources/GuideMetaData.ts` matching this shape:
   ```typescript
   {
     title: string;        // Title for the guide page
     link: string;          // URL slug, keep short, e.g. "self-heating-blockchain-guide"
     notionPage: string;    // The numbers-only segment copied from the Notion share link
     created: number;       // Epoch timestamp for when the Notion page was made
     thumbnail: string;     // Path to the thumbnail, e.g. "/guides/heating-blockchain.png"
     subTitle: string;      // Shortened above 50 characters
     topic: Topic;          // Programming, Agile, Infrastructure, etc.
     languages?: Languages[]; // Optional — add new ones in src/guides/types.ts
     tags?: Tags[];          // Optional — add new ones in src/guides/types.ts
   }
   ```
5. Push. The guide appears at `/guides` after deployment.

## Update qualifications, volunteering, or work experience

Edit `src/datasources/HomepageMetaData.ts`. Limits: max 3 "For You" items, max 6 "Qualification" items. Volunteering and work experience are unlimited.

## Update folio (skills)

Edit `src/datasources/SkillsMetaData.ts`. Reflected on `/folio` after deployment.

## Add or update a travel video or world map pin

Edit `src/datasources/TravelMetaData.ts`. Every place in a trip's `extras.countries` needs a matching entry in `extras.mapLocations`:

```typescript
{
  place: string;                  // Pin label, e.g. "Kathmandu" or "Erbil"
  coordinates: [number, number];  // [longitude, latitude] of the pinned city
  countryId: string;              // Country name matching src/generated/worldMapGeometry.json
}
```

`countryId` drives country-border highlighting and must match a `name` in `src/generated/worldMapGeometry.json` (the `mapDataService` tests enforce this). The geometry file is regenerated with `yarn generate-map` only when the map outlines themselves change — never for new pins. Pins appear on the world map at `/travel` after deployment.

## Add or update a project

1. Add a new folder under `public/` named for the project, with all project images inside.
2. Edit `src/datasources/ProjectMetaData.ts`, referencing the images under the `image` key.
3. Push. Reflected on `/projects` after deployment.

## Update salary expectations

Edit `src/datasources/SalaryExpectationMetaData.ts`. Reflected on the homepage after deployment.
