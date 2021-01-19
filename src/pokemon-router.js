const express = require('express')
const pokemonService = require('./pokemon-service')
const pokemonRouter = express.Router()
const jsonBodyParser = express.json()



pokemonRouter
    .route('/')
    .get((req, res, next) => {
        pokemonService.getAll(req.app.get('db'))
          .then(pokeData => {
              res.json(pokemonService.serializePokeAll(pokeData))
          })
          .catch(next)
    })
    // when we add in post it would go here 
pokemonRouter
    .route('/:id')
    .all(checkPokemonExists)
    .get((req, res) => {
        res.json(pokemonService.serializePokeOne(res.pokemon))
    })
    .delete((req, res, next) => {
        pokemonService(
            req.app.get('db'),
            req.params.id
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    // only using patch to edit the likes for now
    .patch(jsonBodyParser, (req,res, next) => {
        const { likes, dex, species, photo, about, price } = req.body
        const pokeUpdata = { likes, num, name, img, height, weight, candy, price }
        
        const inData = Object.values(pokeUpdata).filter(Boolean).length
        if (inData === 0) {
            return res.status(400).json({
            error: `Request body must contain content`
            })
        }
        pokemonService(
            req.app.get('db'),
            req.params.id,
            pokeUpdata
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

async function checkPokemonExists(req, res, next) {
    try {
        const pokemon = await pokemonService.getPokemon(
            req.app.get('db'),
            req.params.id
        )

        if(!pokemon) {
            return res.status(404).json({
                error: { message: `Pokemon doesn't exist, at least so far ...`}
            })
        }
        res.pokemon = pokemon
        next()
    } catch (error) {
        next(error)
    }
}
    

module.exports = pokemonRouter