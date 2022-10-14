import React, { useState } from "react";
import './DogsId.css'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getBreeds } from '../../actions/index';
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
            if (Number(breeds[i].id) === Number(params.DogsId)) setDog(breeds[i])
        }
        return () => {

        };
    }, [breeds]); //eslint-disable-line



    return (
        <div className="main-2 det">
            <div className="details">
                <img src={!dog ? 'https://cdn-icons-png.flaticon.com/512/3305/3305803.png' : dog.image.url} alt='dog full' /><br />
                <div className="details-info temps" >
                    <h1>{!dog ? 'cargando' : dog.name}</h1>
                    <strong>Temperament: <p>{!dog ? 'cargando' : dog.temperament}</p></strong>
                    <strong>Height: <p>{!dog ? 'cargando' : dog.height.metric}</p></strong>
                    <strong>Weight: <p>{!dog ? 'cargando' : dog.weight.metric}</p></strong>
                    <strong>Life span: <p>{!dog ? 'cargando' : dog.life_span}</p></strong>
                </div>
            </div>
            <Link to='/main'><button className="home-btn details-btn">Regresar</button></Link>
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