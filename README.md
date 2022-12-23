# Shelf Management Application

This is a Shelf Management Application developed on the T3 Stack.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Documentation for T3 stack](https://create.t3.gg/)

**Important Commands:**

- `npm run dev`: Run the development build on localhost:3000
- `npx prisma db push`: Push the prisma schema to the Database
- `npx prisma studio`: Browse the data in the Database in localhost:5555

**Project Development Log:**

- 22/12/2022
  - Clean up the T3 stack boilerplate code
  - Added temporary `Navbar` component to navigate between pages
- 23/12/2022
  - Created temporary schema for `Product` table for testing
  - Created tRPC router `productsRouter` for doing database queries from `Products` table in database
    - Added test function `getAll` to get all data from `Products` table
  - Fixed some styling for `Navbar`
