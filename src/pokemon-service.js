const pokemonService = {
    getAll(db) {
        return db
          .select('*')
          .from('pokemon')
    },

    getPokemon(db, id) {
        return db
          .select('*')
          .from('pokemon')
          .where({id})
          .first()
    },
    // adding insert and delete methods just incase
    createPokemon(db, pokeData) {
        return db
          .insert(pokeData)
          .into('pokemon')
          .returning('*')
          .then(([pokemon]) => pokemon)
          .then(pokemon => 
            pokemonService.getPokemon(db, pokemon.id)
          )
    },

    removePokemon(db, id) {
        return db
          .delete()
          .from('pokemon')
          .where({id})
    },

    patchPokemon(db, id, pokeUpdata) {
        return db
          .update(pokeUpdata)
          .where({id})
    },

    /* depending on how we want to run client 
    we could also set up the 
    increment and decrement functions here */
    serializePokeOne(pokeOne) {
        return {
            id: pokeOne.id,
            likes: pokeOne.likes,
            dex: pokeOne.dex,
            species: pokeOne.species,
            photo: pokeOne.photo,
            about: pokeOne.about,
            price: pokeOne.price
        }
    }, 
    
    serializePokeAll(pokeAll) {
        return pokeAll.map(this.serializePokeOne)
    }
}

module.exports = pokemonService