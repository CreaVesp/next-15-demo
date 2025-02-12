To init Prisma:
1) Install ```npm i prisma```
2) Type in terminal ```npx prisma init --datasource-provider %db_name%``` without %
3) After that 'prisma' folder should appear at the root folder of a project, with 'schema.prisma' file in it.
That's a db models, like entities in NestJS.
4) To create db migrations type in terminal ```npx prisma migrate dev```
5) Create 'db' folder in 'src' directory with a file index.ts that'll be a provider for db.
6) Inside create an instance of PrismaClient.
```javascript
import {PrismaClient} from "@prisma/client";

export const db = new PrismaClient();
```

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Special filenames
Next special filenames in app folder:

**page.tsx** - primary content of the page

**layout.tsx** - wraps up the currently displayed page. Used to show content common across many pages

**not-found.tsx** - displayed when we call the notFound function inside the component

**loading.tsx** - displayed when server component is fetching data

**error.tsx** - displayed when error occurs in a server component

**route.tsx** - defines API endpoints

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
