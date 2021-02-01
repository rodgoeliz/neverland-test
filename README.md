# neverland-test

# HOW TO RUN

## How to run - Server

- Ask for env file and replace it with proper configuration.
- Install node version manager
- move terminal cursor to root/app
- create .env file on `app/.env` copy emailed values
- app ~ `nvm use`
- app ~ `npm i`
- app ~ `npm run dev`
- You can explore the rest endpoint http://localhost:4000

## How to run - WebApp

- install node version manager
- move terminal cursor to root/web-app
- wab-app ~ `nvm use`
- web-app ~ `npm i`
- web-app ~ `npm run start`
- You can explore the app at http://localhost:3000

## [Non-coding]

```
Let's say we'd like to sort the product list with personalization (i.e. "Recommended for you"). How would you go about doing this? Describe your approach and what you'd need to do in code ( doesn't have to be code, just give us a sense of the architecture and how it'd work)
```

### Research time 1h.

http://www.cs.umd.edu/~samir/498/Amazon-Recommendations.pdf

https://neo4j.com/developer/cypher/guide-build-a-recommendation-engine/

https://www.algolia.com/doc/guides/getting-started/how-algolia-works/

This questions is building or using a recommender system.

Im guessing we are using a a recommender system as a service, if not i would research using graph based databases as their main use is live recomendations.

So to solve this issue we need data.

- First is the existing data stored on mongo, we have users that have bought products, or added product on their cart.
- Then we have information we can obtain from user actions, click navigation on the page, ( probably using google analytics or something akin to it)
- Then we have to give priority to the different data relationships, what marketing tell us is more important (this can be later improved with machine learning)
- We feed that data to the recomendation system, that should be able to give us a score for each item by user and globally
- We should decided what priority we give to each score, we should be able to request to the api that it sorts a lists of ids related to product.

```
FrontEnd -> BackendRest ----- Mongo
                        \       |
                         \____RecomendationAPI_____Algolia

```

# About this app

### Invested time 24hs

- Research typescript + rest + mongoose + redux slices 10hs
- Pagination frontend 8hs
- Others 6hs

### Considerations TO_DO

- Bonus parts not done.
- Missing test cases.
- More research required on redux slices.
- ProductsList.tsx should use a container pattern as it modifies the state.
- To much pagination logic on redux slice (more research required)
- Scroll to top on infinity scroll loads.
- infinity scroll implementation to dependent on css (needs to use refs, logic needs to be moved to a component to use as higher order component)
- Missing docker implementation.
- Missing compile commands from tsc to js
- Missing lerna or some kind of package manager for monorepos.
