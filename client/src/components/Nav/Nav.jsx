import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

export default function Nav() {
    return (
        <div className='interface'>
            <Link to='/'><button className='home-btn one'>Go home</button></Link>
            <Link to='/others/CreateBreed'><button className='home-btn two'>Go to create breed</button></Link>
        </div>
    )
}