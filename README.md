<h1 align="center">Front End NextJS Apollo client</h1>

<br />
The data fetching with Apollo client to external backend GraphQL server.
Backend GraphQL uses Nexus schema and Prisma for the SQL database.

<br />

# 🚀 Available Scripts

In the project directory, you can run:

<br />

## ⚡️ dev

```
npm run dev
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Requies dependent external GraphQL servers of Strapi Blog and Backend Comment Graphql Server

<br />

```
npm run gqlgen
```

Runs the graphql queries hooks and typedefs code generator.\
Create .graphql files in src/graphql/queries and gqlren creates generated hooks and typedefs.

<br />

## 🧪 test

```
npm run test
```
Launches the test runner.

<br />

## 🦾 build

```
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles NextJS in production mode and optimizes the build for the best performance.

<br />

## 🧶 lint

```
npm run lint
```

<br />

# 🧬 Project structure

This is the structure of the files in the project:

```sh
    │
    ├── generated               # Apollo code generation of typedef and hooks from *.graphql files.
    ├── public                  # public files (favicon, .htaccess, manifest, ...)
    ├── src                     # source files
    │   ├── api
    │   │   ├── tests           # Tests for GraphQL resolvers
    │   │   │   ├── __helpers.ts
    │   │   │   └── posts.test.ts   
    │   │   └── context.ts      # Nexus schema for local Apollo GraphQL
    │   ├── components          # React components
    │   ├── constants           # Common Constants
    │   │   └── routes.ts       # Route paths
    │   ├── graphql             # GraphQL typedefs and reducers
    │   │   ├── queries         # Qraphql queries use with apps Apollo client
    │   │   │   ├── ext         # External qraphql queries
    │   │   │   │   ├── fragments
    │   │   │   │   │   └── category.graphql   
    │   │   │   │   └── articles.graphql       
    │   │   │   ├── local       # Local schema qraphql queries
    │   │   │   │   └── post.graphql  
    │   │   ├── resolvers       # Local schema resolvers for qraphql
    │   │   │   └── posts.ts    # Post query resolvers used in Post typedefs
    │   │   ├── types           # store's actions
    │   │   │   ├── index.ts    # index for all typedefs (used in schema.ts)
    │   │   │   └── posts.ts    # Post type defs
    │   │   └── schema.ts       # Apollo Server local schema
    │   ├── lib                 # Apollo client/server and Prisma client
    │   │   ├── apolloClient.ts # Apollo client (For external and local graph cache)
    │   │   ├── apolloServer.ts # Apollo server (local)
    │   │   └── primaClient.ts  # Prisma client
    │   ├── pages               # NextJS front end
    │   │   ├── api
    │   │   │   └── graphql.ts  # Web site of local graphql
    │   │   ├── blog
    │   │   │   ├── article     # Blog article dynamic [slug].tsx
    │   │   │   ├── category    # Blog category dynamic [slug].tsx
    │   │   │   └── index.tsx   # Blog index page
    │   │   ├── _app.tsx        # Common HTML for app
    │   │   ├── _document.tsx   # HTML Head
    │   │   └── index.tsx       # Home index page
    │   ├── prisma
    │   │   ├── migrations
    │   │   ├── schema.prisma   # Prisma SQL schema
    │   │   └── seed.ts         # Seed file for tests on dev SQL source
    │   └── styles
    │        ├── css             # UIKit css folder (UIkit 3.16.17 | https://www.getuikit.com)
    │        ├── js              # UIKit js  folder
    │        ├── _mixins.scss    # Sass mixins
    │        ├── _variables.scss # Sass variables
    │        └── main.scss       # Commom scss
    ├── .env
    ├── .env.local
    ├── .eslintrc.js
    ├── .gitignore
    ├── codegen.ts              # Grapgh ql queries hooks and types generator codegen runner
    ├── jest.config.js          # Jest testing
    ├── next-env.d.ts           # Next env
    ├── next.config.js          # Next config
    ├── package.json
    ├── README.md
    └── tsconfig.json
```

<p align="center">Bootstrapped with NextJS and Nexus</p>
