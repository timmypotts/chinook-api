# chinook-api

This is a fairly basic API that interacts with a postgreSQL database.

## Actors

There are multiple ways to interact with the vast list of actors.

### GET requests

To return all of the actors, simply send a `GET` request to `/api/actors`

There are three optional queries you can add to your request to refine results.

#### name=

This allows you to search through the list by name. It is not case-sensative and will return all actors whose names contain your query.

#### page=

Each page contians 20 actors. A query for 2 pages will return 40 actors, a query for 4 pages will return 80 actors.

#### order=

This will choose which column the results will be ordered by. The default setting is by the id column, but you may specify any column you like.

All queries are to be added to the end of `/api/actors`, such as `/api/actors?name=tom&pages=2`. This will return two pages of actors with the name Tom or contain tom in their first or last name. You may make these queries in any order, just seperate them using the & character.

You may also find all films of an actor if you have their id. This can by done with: `/api/actors/:id/films`.

### POST requests

You may add an actor to the database if one does not already exist. This can be done with a `POST` request to `api/actors` with a body in the format of `{firstname: leroy, lastname: jenkins}`.
