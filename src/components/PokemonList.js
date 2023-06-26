import React, { useEffect, useState, useRef } from 'react';
import { fetchPokemon, fetchPokemonById } from '../api/pokemonQuery';
import styles from "./PokemonList.module.css";

import SearchBar from './Search/SearchBar';
import SkeletonLoader from './common/SkeletonLoader/SkeletonLoader';

const PokemonList = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonRows, setPokemonRows] = useState([]);
    const [nextPageToggler, setNextPageToggler] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    const contentRef = useRef(null);

    useEffect(() => {
        // const fetchData = async () => {
        //   try{
        //     const data = await fetchPokemon();
        //     setPokemonData(data.result);
        //     setNextPageUrl(data.next);
        //     // const promises = data.results?.map((pokemon) => getRow(pokemon.name, pokemon.url));
        //     // const rows = await Promise.all(promises);
        //     // setPokemonRows([rows]);
        //   }catch(error){
        //     console.log("error",error)
        //   }
        // };

        fetchPokemon().then((data)=>{
          setPokemonData(data.result);
          setNextPageUrl(data.next);
        }).catch((error)=>{
          console.log("error",error)
        })

        // const observer = new IntersectionObserver((entries)=>{
        //   const entry = entries[0];
        //   console.log("Entry",entry);
        //   if(entry.isIntersecting){
        //     console.log("Run function");
        //     console.log(nextPageUrl);
        //     loadMore();
        //   }else{
        //     console.log("Do not run function");
        //   }
        // }, {
        //   root: null,
        //   rootMargin: '0px',
        //   threshold: 0.5
        // })

            
        // fetchData();
        // if(contentRef.current){
        //   console.log("REF exists");
        //   observer.observe(contentRef.current);
        // }
        // return () => {
        //   if (contentRef.current) {
        //     observer.unobserve(contentRef.current);
        //   }
        // };
    },[]);


    // async function loadMoreContent() {
    //   try {
    //     // Make an API call to fetch new content
    //     const response = await fetchPokemon(nextPageUrl);
    //     setPokemonData([...pokemonData, ...response.result]);
    //     setNextPageUrl(response.next);
    //   } catch (error) {
    //     console.error('Error fetching content:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }

    // const getRow = async (name, url) => {
    //   return fetchPokemonById(url).then(data => (
    //     <>
    //       <span>
    //         <img src={data.sprites.front_default} alt='sprite' />
    //       </span>
    //       <span>{name}</span>
    //       <span>{data.stats[0].base_stat}</span>
    //       <span>{data.stats[1].base_stat}</span>
    //       <span>{data.stats[2].base_stat}</span>
    //       <span>{data.stats[3].base_stat}</span>
    //       <span>{data.stats[4].base_stat}</span>
    //       <span>{data.stats[5].base_stat}</span>
    //     </>
    //   ));
    // };

    // const loadMore = () => {
    //   console.log("In laod more");
    //   setIsMoreLoading(true);
    //   const fetchData = async () => {
    //     try{
    //       console.log("In try block");
    //       const data = await fetchPokemon(nextPageUrl);
    //       setPokemonData([...pokemonData,...data.results]);
    //       setNextPageUrl(data.next);
    //       const promises = data.results?.map((pokemon) => getRow(pokemon.name, pokemon.url));
    //       const rows = await Promise.all(promises);
    //       setPokemonRows([...pokemonRows,...rows]);
    //       setIsMoreLoading(false);
    //     }catch(error){
    //       console.log('Error in load more',error);
    //     }
    //   };
    //   if(nextPageUrl!==""){
    //     fetchData();
    //   }else{
    //     console.log("IT IS HERE",nextPageUrl);
    //   }
    // }

    return (
        <div>
          <h2>Pokemon List</h2> 
            <SearchBar setLoading={setIsLoading} setPokemonRows={setPokemonRows} setPokemonData={setPokemonData} />
              {isLoading ? <SkeletonLoader /> : <div className={styles.grid}>
                <p>#</p>
                <p>Name</p>
                <p>HP</p>
                <p>Attack</p>
                <p>Defense</p>
                <p>Sp. Attack</p>
                <p>Sp. Defense</p>
                <p>Speed</p>
                {/* <span onClick={loadMore} ref={contentRef} style={{padding:"20px"}}>Click</span> */}
              </div>}
              {pokemonData.map((elem)=>{
                  console.log("Here",elem);
                  return(
                    <div>
                      {/* <span>
                        <img src={elem?.sprites?.front_default} alt='sprite' />
                      </span>
                      <span>{elem?.name}</span>
                      <span>{elem?.stats?.[0]?.base_stat}</span>
                      <span>{elem?.stats?.[0]?.base_stat}</span>
                      <span>{elem?.stats?.[0]?.base_stat}</span>
                      <span>{elem?.stats?.[0]?.base_stat}</span>
                      <span>{elem?.stats?.[0]?.base_stat}</span>
                      <span>{elem?.stats?.[0]?.base_stat}</span> */}
                      <p>Hello</p>
                    </div>
                  )
                })}
            {isMoreLoading && <SkeletonLoader />}
        </div>
      );
}

export default PokemonList;