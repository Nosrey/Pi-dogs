import React from "react";
import './Raza.css'
import { Link } from 'react-router-dom';

export default function Raza (props) {
    return (
        <div className="Main">
            <Link to={`/main/${props.id}`}><h1>{props.name}</  h1></Link><br/>
            <img src={props.image.url} alt={`imagen del perro numero ${props.id}`}/><br/>
            <b>Temperamento: {props.temperament}</b><br/>
            <i>Peso: {props.weight.metric}</i><br/>
        </div>
    )
}