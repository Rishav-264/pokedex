import { useEffect, useState } from "react";

import styles from "./PokeStat.module.css"

const PokeStat = ({width, name}) => {

    const [statName, setName] = useState("");
    const [color, setColor] = useState("");

    useEffect(()=>{
        if(name === "special-attack"){
            setName("Sp.Atk");
        } else if(name === "special-defense"){
            setName("Sp.Def");
        }else if (name === "hp"){
            setName("HP")
        } else {
            setName(name);
        }

        if(width<30){
            setColor("#f34444");
        } else if ( width >= 30 && width < 60){
            setColor("#ff7f0f")
        } else if (width >= 60 && width < 100){
            setColor("#ffdd57")
        } else {
            setColor("#a0e515")
        }
    },[])

    return(
        <div className={styles.stats}>
            <div>
                <span>{statName}</span>
            </div>
            <div>
                <span>{width}</span>
            </div>
            <div>
                <div style={{'--target-width':`${width}px`, backgroundColor:color}} className={styles.stat}></div>
            </div>
        </div>
    )
}

export default PokeStat;