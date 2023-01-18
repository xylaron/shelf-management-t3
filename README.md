# Shelf Management Application

This is a Shelf Management Application developed on the T3 Stack

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Faker-js](https://fakerjs.dev/)
- [Documentation for T3 stack](https://create.t3.gg/)

**Important Commands:**

- `npm run dev`: Run the development build on localhost:3000
- `npm run db-seed`: Runs seed.ts file to seed data into the database
- `npx prisma db push`: Push the prisma schema to the Database
- `npx prisma studio`: Browse the data in the Database in localhost:5555

**Project Development Log:**

- [22/12/2022]

  - Clean up the T3 stack boilerplate code
  - Added temporary `Navbar` component to navigate between pages

- [23/12/2022]

  - Added temporary schema for `Products` table for testing
  - Added tRPC router `productsRouter` for doing database queries from `Products` table in database
  - Fixed some styling for `Navbar`

- [24/12/2022]

  - Added `Table` component in `Products` page to display the data in a table form instead of the list form
  - Added global default styles for tables in `global.css`
  - Fixed some styling for multiple pages/components

- [27/12/2022]

  - Removed package and boilerplate code for `next-auth`
  - Added package `@faker-js/faker` for random data generation
  - Added `generateData.ts` for doing data generation for testing
  - Added `Transactions` page to display the generated transactions in console
  - Added `types` files for setting up interfaces for objects in the codebase
  - Added `baseUrl: "./src"` in `tsconfig.json` for easier imports
  - Fixed all files in `src` with nested dots (e.g. ../../../) to new import format

- [28/12/2022]

  - Added `types.ts` to define and export globally used types/interfaces
  - Added parameters to control the amount of data from generator functions in `generatedData.ts`
  - Changed `Products` and `Transactions` page, data are passed to the `Table` components as props
  - Added `sampleProducts.ts` to store sample product data for seeding the database

- [30/12/2022]

  - Added `seed.ts` to reset and seed the database with sample data
  - Added command `npm run db-seed` to run script to seed the database
  - Removed example models, changed `Product` model and added `Transactions` model in `schema.prisma`
  - Removed `Product` interface from `types.ts` as Prisma defines the interface directly from the schema
  - Moved `Table` components for `Products` and `Transactions` page to the `components` folder to prevent Next.js prerender error
  - Changed interface names to prevent type/interface confusions and amount of sample products
  - Removed some unused example files and routes from boilerplate code

- [18/1/2022]

  - Changed the database provider from `sqlite` to `postgresql` in `schema.prisma`
  - Added `Transactions` router to query data from `Transactions` table
  - Changed queries and added transactions seeding in `seed.ts`
  - Added `tests.ts` to be used to test key functions in the project
  - Changed `Transactions` page to query data from the `Transactions` router
