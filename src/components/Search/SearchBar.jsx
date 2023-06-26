import { useState } from "react";
import styles from './SearchBar.module.css';

import { fetchPokemonByName } from "../../api/pokemonQuery";

const SearchBar = ({setPokemonData, setLoading, fetchPokemon, searchQuery, setSearchQuery}) => {

    const searchHandler = async () => {
        setLoading(true);
        const fetchData = async () => {
            fetchPokemonByName(searchQuery).then((data)=>{
                setPokemonData([data]);
                setLoading(false);
            }).catch((error)=>{
                if(error.response.status === 404){
                    setPokemonData(null);
                    setLoading(false);
                } else {
                    console.log("Error", error);
                    setLoading(false);
                }
            })
        };
        if(searchQuery!==""){
            fetchData();
        }else{
            setPokemonData([]);
            fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",true);
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <input placeholder="Enter Pokemon Name" onChange={(e)=>{
                setSearchQuery(e.target.value);
            }}></input>
            <button onClick={searchHandler}>Search</button>
        </div>
    )

}

export default SearchBar;