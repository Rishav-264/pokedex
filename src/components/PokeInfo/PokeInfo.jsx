import { useState, useEffect } from 'react';
import { colors } from '../../utils/pokeColors';

import styles from './PokeInfo.module.css';

import PokeStat from '../common/PokeStat/PokeStat';

const PokeInfo = ({selectedPokemon, setBookmarks, bookmarks}) => {
    const [isBookmark, setIsBookmark] = useState(false);

    useEffect(()=>{
        if(searchinBookmarks(selectedPokemon)!==-1){
            setIsBookmark(true);
        }
    },[])

    const addBookmark = () => {
        if(searchinBookmarks(selectedPokemon)===-1){
            setBookmarks(prev=>[...prev,selectedPokemon]);
        }
    }

    const removeBookmark = () => {
        let index = searchinBookmarks(selectedPokemon);
        if(index !== -1){
            setBookmarks(prev=>prev.splice(index,1));
        }
    }

    const searchinBookmarks = () => {
        let initialIndex = -1;
        bookmarks.forEach((bookmark, index)=>{
            if(bookmark.name === selectedPokemon.name){
                initialIndex = index;
                return true
            }
        })
        return initialIndex;
    }
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>{selectedPokemon?.name}</h2>
                {isBookmark ? <img src="/bookmarkFilled.svg" onClick={()=>{
                    setIsBookmark(false);
                    removeBookmark();
                }}/> : <img src="/bookmarkOutline.svg" onClick={()=>{
                    setIsBookmark(true);
                    addBookmark();
                }}/>}
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.imageContainer}>
                    <img src={selectedPokemon?.sprites?.other?.["official-artwork"]?.front_default} alt="sprite" />
                </div>
                <div>
                    <h2>Base Stats</h2>
                    {selectedPokemon?.stats?.map((stat)=>{
                        return(
                            <PokeStat width={stat?.base_stat} name={stat?.stat?.name} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PokeInfo;