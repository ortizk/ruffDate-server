# OffLeash

[LINK TO COME](https://ortizk.github.io/triviaGame/home.html)


A full-stack MERN app for dogs and their owners! Connect with other dog owners in your area to go on dog walks and park visits.


# Proposal

An avenue to get to know people in your area that care about their dogs' quality of life. Dogs need friends, too!


## Development Approach

 

 1. I started by setting up Auth and all pertinent routes including login, signup, profile, homepage.
 2. Located an API that would allow me to find zip codes within a given radius.
 3.  Implemented zip API to render users in the database with zipcodes within a given radius
 4. Added the ability for users to add their dogs and have then render on their home page.
 5.   Styled for optimum user experience and functionality using React Materialize.

## Routes
| Method     | Path | Description   |
| :------- | ----: | :---: |
POST | /auth/signup | Adds new user to user database
POST | /auth/login | Authenticates login details
POST | /auth/me/from/token | Checks if token is present on browser refresh| POST    | /profile   |  user can add dog to their profile must be logged in to see   |
| GET     | /profile/:userID    |  refetches users db information, allows for immediate visibility of added dog  |
| POST    | /getdogsnearby   |  displays users and their dogs nearby to current user   |



## If I had more time...

 - Add chat
 - Allow users to upload images of their dogs
 - Add a map that displays users as markers as an option for search results. That map would also highlight off-leash dog parks

 
## Wireframes

![screen shot 2018-05-18 at 11 33 18 am](https://user-images.githubusercontent.com/34222706/40253035-291b0fa2-5a93-11e8-8505-ff389cf345f9.png)
![screen shot 2018-05-18 at 11 33 52 am](https://user-images.githubusercontent.com/34222706/40253036-2931b57c-5a93-11e8-9272-2fbc805f62c7.png)
![screen shot 2018-05-18 at 11 34 19 am](https://user-images.githubusercontent.com/34222706/40253037-294918f2-5a93-11e8-9185-41d497adcb54.png)
![screen shot 2018-05-18 at 11 34 52 am](https://user-images.githubusercontent.com/34222706/40253038-295f62e2-5a93-11e8-8090-ea45fee0722e.png)

## Tools and Technologies

 1. React
 2. React-Materialize
 3. Node.js
 4. Mongo
 5. Mongoose
 6. HTML
 7. CSS
 8. JavaScript
 9. JQuery
 10. Github
 11. Heroku



