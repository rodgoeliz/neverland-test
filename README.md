# neverland-test

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
