# Pokeserver

Complete the following steps to install locally:

1. Clone this repository to your local machine
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm i`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`


## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

Price data is the average from 01.18.21 
at https://pokemonprices.com/

Images are coming from the bastionbot
https://pokeres.bastionbot.org/images/pokemon/{pokedexnumber}.png