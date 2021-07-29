# Chinook Api

This is a Node/Express API that interacts with a postgreSQL database. The base URL is `http://crud.timpotts.xyz/api`. From there you may add queries to interact with that database.

## Installation

To get started, clone the git repo and set up a database using the .sql file in the root directory. Then cd into the server directory and hit `npm i`, followed by `npm start`.

## Actors

There are multiple ways to interact with the vast list of actors.

### GET requests

To return all of the actors, simply send a `GET` request to `/api/actors`

There are three optional queries you can add to your request to refine results.

#### name=

This allows you to search through the list by name. It is not case-sensitive and will return all actors whose names contain your query.

#### page=

Each page contains 20 actors. A query for 2 pages will return 40 actors, a query for 4 pages will return 80 actors.

#### order=

This will choose which column the results will be ordered by. The default setting is by the id column, but you may specify any column you like.

All queries are to be added to the end of `/api/actors`, such as `/api/actors?name=tom&pages=2`. This will return two pages of actors with the name Tom or contain tom in their first or last name. You may make these queries in any order, just separate them using the & character.

You may also find all films of an actor if you have their id. This can by done with: `/api/actors/:id/films`.

### POST requests

You may add an actor to the database if one does not already exist. This can be done with a `POST` request to `api/actors` with a body in the format of `{firstname: leroy, lastname: jenkins}`.

### PUT requests

You may update an actor's first name, last name, or both with their id. The body format is the same as for the `POST` method, but you must include their id at the end i.e. `/api/actors/:id`.

### DELETE requests

This will delete an actor using their id. Simply make a call with the `DELETE` method and include their id in the request url.

## Films

### POST requests

You can create an association between an actor and a film in the film_actor junction table with the `POST` route `/api/films/film=:filmid/actor=:actorid`.

### GET request

You can `GET` a list of all films with `/api/films`. You may also find a list of all actors that appear in a given film with the film id using `/api/films/:id/actors`.

## Thoughts

REGARDING THE VIDEO RECORDING: I have not used a lot of screen recording software, so I just downloaded one from the ubuntu software store and started on the coding assignment. There was a pause and a stop option. I figured that pause would do just that, but apparently everything recorded prior to hitting pause was lost. On top of this, for my last recording, I had unplugged and plugged back in my headset, but the software did not automatically switch to the input source, so there is no audio. I apologize for the inconvenience.

If I were to implement this API in a production environment, I would obviously use more secure methods. Namely, not having my database URL exposed on github. I would use a .env file, or dockerize the application and push env variables in during the build/deployment phase.

The database is hosted on the same EC2 instance as the API, I just made a docker container and migrated the data using the psql cli. The data is mounted as a volume so if the container crashes, I can just spin up another container and the data will still be there.

Speaking of production, I would have certainly constructed a CI/CD pipeline instead of pulling the git repo down and starting the application manually. You can see an example of one of my pipelines [here](https://github.com/timmypotts/package-tracker/blob/master/.circleci/config.yml).

I had a lot of fun building this little project; thank you for the opportunity.
