import React from "react";
import './Raza.css'
import { Link } from 'react-router-dom';

export default function Raza(props) {
    return (
        <div className="main-4">
            <h2>{props.name}</h2>
            <img src={!props.image.url ? 'https://cdn-icons-png.flaticon.com/512/3305/3305803.png' : props.image.url} alt={`dog number ${props.id}`} />
            <h3>Temperaments</h3> <p>{props.temperament}</p><br />
            <i>Weight: {props.weight.metric}</i><br />
            <Link className='links' to={`/main/${props.id}`}><button className="dog-button">See details</button></Link>
        </div>
    )
}