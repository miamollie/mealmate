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


