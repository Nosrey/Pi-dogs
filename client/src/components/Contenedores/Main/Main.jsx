import React from 'react';
import './Main.css';
import Nav from '../../Nav/Nav';
import VerRazas from '../../VerRazas/VerRazas';
import { Link } from 'react-router-dom';

export default function Main() {
    return (
        <div>
            <Nav/>
            <Link to='/'><h1>Go Home</h1></Link>
            <Link to='/others/CreateBreed'><h1>Go to create breed</h1></Link>
            <VerRazas/>
        </div>
    )
}