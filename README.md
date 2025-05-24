# Meal Mate

Meal mate is an OpenAI powered meal plannng app.

### Technologies

Full stack TypeScript app using

- QwikCity frontend framework
- TRPC backend API layer
- Supabase auth ? or oauth
- relational db
- aws backend hostinbg
- vercel f/e for edge
- pwa app store w cordova's replacement
- cache layer to minimise extraneous storage of responses
- github ci/cd
- observability; todo

### app archit

hexagonal to decouple transport layer, bizzniss, mechanics

trpc routes resp for in/out validation

services hold biz logic e.g. permission checks, authorisation, app logic/behaviour

clients abstract over 3rd party integrations

repo abstracts over db

## inspo

https://github.com/fraybabak/hexagonal_example_nodejs/blob/main/src/index.ts

### TODO

**MVP**
Minimal example app should use mock user preference data to contact the chatgpt API and return a list of meals.

**Beta**

- [] Input user preferences to construct prompt
- [] Auth + user sessions
- [] Store and edit of preferences
- [] Store meal plans

**Feature Candidates**

- [] Save liked recipes
- [] Curate meal plan (change one meal etc, before accepting)
- [] Preseed recipes, fetch and store from URL
  Streaming Responses
  Show loading + partial recipe as it streams in.

Improve perceived speed and interactivity.

Normalize ingredients later for search/shopping features

## Vercel Edge

This starter site is configured to deploy to [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions), which means it will be rendered at an edge location near to your users.

## Installation

The adaptor will add a new `vite.config.ts` within the `adapters/` directory, and a new entry file will be created, such as:

```
└── adapters/
    └── vercel-edge/
        └── vite.config.ts
└── src/
    └── entry.vercel-edge.tsx
```

Additionally, within the `package.json`, the `build.server` script will be updated with the Vercel Edge build.

## Production build

To build the application for production, use the `build` command, this command will automatically run `npm run build.server` and `npm run build.client`:

```shell
npm run build
```

[Read the full guide here](https://github.com/QwikDev/qwik/blob/main/starters/adapters/vercel-edge/README.md)

## Dev deploy

To deploy the application for development:

```shell
npm run deploy
```

Notice that you might need a [Vercel account](https://docs.Vercel.com/get-started/) in order to complete this step!

## Production deploy

The project is ready to be deployed to Vercel. However, you will need to create a git repository and push the code to it.

You can [deploy your site to Vercel](https://vercel.com/docs/concepts/deployments/overview) either via a Git provider integration or through the Vercel CLI.

---

Left it here..

Tweaking ts config and package json to get files outputted to `/dist` but might need to go back to the vercel docs to make sure doing something sensible
