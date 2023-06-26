import axios from 'axios';

export const fetchPokemon = async (url) => {
    if(url === undefined){
      url="https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
    }
    try {
      let result = [];
      const response = await axios.get(url);
      await response.data.results.map((elem)=>{
        fetchPokemonById(elem.url).then((pokemon)=>{
          result.push(pokemon);
        }).catch((error)=>{
          throw error;
        })
      })
      console.log("Pokemn array",JSON.stringify(result));
      return {
        result:result,
        next: response.next
      };
    } catch (error) {
      throw error;
    }
  };

export const fetchPokemonById = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const fetchPokemonByName = async(name) => {
  let query = name.toLowerCase();
  try{
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
    return response.data;
  } catch(error) {
    throw error;
  }
}