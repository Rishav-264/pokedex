import { useEffect, useState } from 'react';
import { colors } from '../../utils/pokeColors';

import styles from './PokemonRow.module.css';

const PokemonRow = ( {elem, index, length, contentRef, handleOpenModal, setSelectedPokemon} ) => {

    const [primaryType, setPrimaryType] = useState("");

    useEffect(()=>{
        setPrimaryType(colors[elem?.types?.[0]?.type?.name]);
    },[elem])


    return (
        <div className={styles.card} key={index} ref={(index === (length - 1)) ? contentRef : null} onClick={()=>{
            handleOpenModal()
            setSelectedPokemon(elem);
        }}>
            <div style={{backgroundColor: `${primaryType}80`}} className={styles.spriteContainer}>
                <img className={styles.sprite} src={elem?.sprites?.other?.home?.front_default} alt="sprite" />
            </div>
            <p>{elem?.name}</p>
            <div className={styles.typesContainer}>
                {elem?.types.map((type)=>{
                    return(
                        <div style={{backgroundColor: colors[type.type.name]}}>
                            <span>{type.type.name}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PokemonRow;