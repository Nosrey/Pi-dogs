import React from "react";
import './Cards.css'
import Raza from "../Raza/Raza.jsx";

export default function Cards({ dogs, page, loading }) {
    return (
        <div className={loading? 'invisible' : "Cards"}>
            {dogs.slice(page, page + 8).map(el => {
                return <Raza key={el.id} id={el.id} name={el.name} image={el.image} temperament={el.temperament} weight={el.weight} />
            })}
        </div>
    )
}