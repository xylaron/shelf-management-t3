# Shelf Management Application
Project Deployment Link: https://shelf-management-t3.vercel.app/

This is a Shelf Management Application developed on the T3 Stack.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Faker-js](https://fakerjs.dev/)
- [Documentation for T3 stack](https://create.t3.gg/)

**Important Commands:**

- `npm run dev`: Run the development build on localhost:3000
- `npx prisma db push`: Push the prisma schema to the Database
- `npx prisma studio`: Browse the data in the Database in localhost:5555

**Project Development Log:**

- [22/12/2022]

  - Clean up the T3 stack boilerplate code
  - Added temporary `Navbar` component to navigate between pages

- [23/12/2022]

  - Created temporary schema for `Products` table for testing
  - Created tRPC router `productsRouter` for doing database queries from `Products` table in database
    - Added test function `getAll` to get all data from `Products` table
  - Fixed some styling for `Navbar`

- [24/12/2022]

  - Created `Table` component in `Products` page to display the data in a table form instead of the list form
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
