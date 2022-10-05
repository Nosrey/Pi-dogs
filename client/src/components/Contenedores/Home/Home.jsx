import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className='main'>
            <Link to='/main'><button className='home-btn'>Home</button></Link>
        </div>
    )
}