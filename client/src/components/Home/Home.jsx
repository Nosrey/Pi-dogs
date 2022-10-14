import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import image from './DogIcon.png'

export default function Home() {
    return (
        <div className='main'>
            <div className='container'>
                <div className='header'>
                    <Link to='/main'><button class="button-home">Go!</button></Link>
                    <h2>Lets find him!</h2>
                    <img src={image} alt="puppy paw" className='icon' />
                </div>
            </div>
            <h1>Find your best friend!</h1>
        </div>
    )
}
