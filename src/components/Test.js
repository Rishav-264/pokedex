import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from "./PokemonList.module.css";

import SearchBar from './Search/SearchBar';
import SkeletonLoader from './common/SkeletonLoader/SkeletonLoader';
import Loader from './common/Loader/Loader';
import PokemonRow from './PokemonRow/PokemonRow';
import Modal from './common/Modal/Modal';
import PokeInfo from './PokeInfo/PokeInfo';

const Test = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [bookmarks, setBookmarks ] = useState([]);
    const [isBookmarks, setIsBookmarks] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState({});

    const prevContentRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    },[]);

    useEffect(()=>{
      const observer = new IntersectionObserver((entries)=>{
        const entry = entries[0];
        if(entry.isIntersecting){
          if(nextPageUrl!=="" && searchQuery === "" && isBookmarks === false){
            fetchPokemon(nextPageUrl);
          }
        }else{
          console.log("Not Intersecting");
        }
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      })


      if (prevContentRef.current) {
        observer.unobserve(prevContentRef.current);
      }

      if(contentRef.current){
        observer.observe(contentRef.current);
        prevContentRef.current = contentRef.current;
      }
      return () => {
        if (prevContentRef.current) {
          observer.unobserve(prevContentRef.current);
        }
      };
    },[pokemonData])

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const fetchPokemon = async (url,reset) => {
      try {
          setIsMoreLoading(true);
          const response = await axios.get(url);
          setNextPageUrl(response.data.next);
          const pokemonUrls = response.data.results.map(elem => elem.url);
          const pokemonPromises = pokemonUrls.map(url => axios.get(url));
          const pokemonResponses = await Promise.all(pokemonPromises);
          const pokemonInfo = pokemonResponses.map(response => response.data);
          if(reset === true){
            setPokemonData(pokemonInfo);
          }else{
            setPokemonData([...pokemonData, ...pokemonInfo]);
          }
      } catch (error) {
          console.log("Error:", error);
      }finally{
        setIsMoreLoading(false);
      }
  }

    return (
        <div className={styles.container}>
          <div className={styles.header}>
            <SearchBar setPokemonData={setPokemonData} setLoading={setLoading} fetchPokemon={fetchPokemon} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <button onClick={()=>{
              if(isBookmarks){
                setPokemonData([]);
                fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",true);
                setIsBookmarks(false);
              }else{
                setPokemonData(bookmarks);
                setIsBookmarks(true);
              }
            }}>{isBookmarks ? "Show All" : "Show Bookmarks"}</button>
          </div>
            {isLoading ? <Loader /> : <div className={styles.cardContainer}>
              {pokemonData !== null && pokemonData.map((elem,index)=>
                <PokemonRow handleOpenModal={handleOpenModal} setSelectedPokemon={setSelectedPokemon} setBookmarks={setBookmarks} elem={elem} index={index} length={pokemonData.length} contentRef={contentRef} />
              )}
            </div>}
           {/* <div>
              <PokemonRow setBookmarks={setBookmarks} elem={pokemonData[0]} index={11} length={1} contentRef={contentRef} />
           </div> */}
           {pokemonData === null && !isLoading && <div>
              <p>No Pokemon Found</p>
            </div>}
           {isMoreLoading && <SkeletonLoader />}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <PokeInfo selectedPokemon={selectedPokemon} setBookmarks={setBookmarks} bookmarks={bookmarks} />
            </Modal>
        </div>
      );
}

export default Test;