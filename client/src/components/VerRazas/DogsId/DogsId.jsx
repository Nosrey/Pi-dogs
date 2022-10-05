import React, { useState } from "react";
import './DogsId.css'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getBreeds } from '../../../actions/index';
import { useEffect } from "react";
import { connect } from "react-redux";



function DogsId({ breeds, getBreeds }) {
    var params = useParams();
    const [dog, setDog] = useState()
    // para traer las razas al acceder al componente
    useEffect(() => {
        if (!breeds.length) {
            getBreeds();
        }
        for (let i = 0; i < breeds.length; i++) {
            if (breeds[i].id == params.DogsId) setDog(breeds[i])
        }
        return () => {

        };
    }, [breeds]);



    return (
        <div className="Main">
            <h>Name: {!dog? 'cargando' : dog.name}</h><br/><br/>
            <img src={!dog? 'https://cdn-icons-png.flaticon.com/512/3305/3305803.png' : dog.image.url} /><br/>
            <strong>Temperament: {!dog? 'cargando' : dog.temperament}</strong>
            <p>Height: {!dog? 'cargando' : dog.height.metric}</p>
            <p>Weight: {!dog? 'cargando' : dog.weight.metric}</p>
            <p>Life span: {!dog? 'cargando' : dog.life_span}</p>
            <Link to='/main'><button>Regresar</button></Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        breeds: state.breeds
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getBreeds: () => dispatch(getBreeds())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DogsId);